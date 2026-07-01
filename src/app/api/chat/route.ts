import { NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { getAnthropicClient, CLAUDE_MODEL } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/server/chat-context";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";
import { calConfigured, getAvailability, createBooking } from "@/lib/server/cal";

// Chatbot backend with Cal.com booking via Claude tool use (non-streaming).
// When Cal.com env vars are absent the tools simply aren't registered and the
// bot falls back to linking the booking page — no hard dependency.

const MAX_MESSAGE_LENGTH = 2000;
const MAX_TURNS = 20;
const MAX_RESPONSE_TOKENS = 1024;
// Bound cost per request: each tool round is another Claude call.
const MAX_TOOL_ROUNDS = 4;
const MAX_AVAILABILITY_DAYS = 14;
const MAX_SLOTS_PER_DAY = 8;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== "object" || m === null) return false;
  const { role, content } = m as Record<string, unknown>;
  return (
    (role === "user" || role === "assistant") &&
    typeof content === "string" &&
    content.length > 0 &&
    content.length <= MAX_MESSAGE_LENGTH
  );
}

const IANA_TZ_RE = /^[A-Za-z_+-]+(?:\/[A-Za-z_+-]+){0,2}$/;

const BOOKING_TOOLS: Anthropic.Tool[] = [
  {
    name: "check_availability",
    description:
      "Look up open slots for the free 30-minute consultation between two dates. Returns available start times in ISO 8601 UTC, grouped by date.",
    input_schema: {
      type: "object",
      properties: {
        startDate: { type: "string", description: "First date to check, YYYY-MM-DD" },
        endDate: { type: "string", description: "Last date to check (inclusive), YYYY-MM-DD" },
      },
      required: ["startDate", "endDate"],
    },
  },
  {
    name: "book_appointment",
    description:
      "Book the free 30-minute consultation. Only call after the visitor has explicitly confirmed a specific slot and provided their full name and email.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's full name" },
        email: { type: "string", description: "Visitor's email address" },
        start: {
          type: "string",
          description:
            "Slot start time in ISO 8601 UTC, exactly as returned by check_availability",
        },
        notes: {
          type: "string",
          description: "Optional short note about what the visitor wants to discuss",
        },
      },
      required: ["name", "email", "start"],
    },
  },
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

async function runTool(
  name: string,
  input: Record<string, unknown>,
  visitorTimeZone: string,
): Promise<string> {
  if (name === "check_availability") {
    const { startDate, endDate } = input as { startDate?: string; endDate?: string };
    if (!startDate || !endDate || !DATE_RE.test(startDate) || !DATE_RE.test(endDate)) {
      return JSON.stringify({ error: "Dates must be YYYY-MM-DD." });
    }
    const startMs = Date.parse(`${startDate}T00:00:00Z`);
    const endMs = Date.parse(`${endDate}T23:59:59Z`);
    if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs < startMs) {
      return JSON.stringify({ error: "Invalid date range." });
    }
    if (endMs - startMs > MAX_AVAILABILITY_DAYS * 86_400_000) {
      return JSON.stringify({ error: `Date range too wide — check at most ${MAX_AVAILABILITY_DAYS} days at a time.` });
    }
    const slots = await getAvailability(
      new Date(startMs).toISOString(),
      new Date(endMs).toISOString(),
    );
    // Compact the payload: cap slots per day so a wide-open calendar doesn't
    // balloon the token count.
    const compact: Record<string, string[]> = {};
    for (const [date, entries] of Object.entries(slots)) {
      compact[date] = entries.slice(0, MAX_SLOTS_PER_DAY).map((e) => e.start);
    }
    return JSON.stringify({ timezoneNote: "Times are UTC — convert for the visitor.", slots: compact });
  }

  if (name === "book_appointment") {
    const { name: attendeeName, email, start, notes } = input as {
      name?: string;
      email?: string;
      start?: string;
      notes?: string;
    };
    if (!attendeeName || attendeeName.trim().length < 2 || attendeeName.length > 100) {
      return JSON.stringify({ error: "A full name (2-100 chars) is required." });
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return JSON.stringify({ error: "A valid email address is required." });
    }
    if (!start || Number.isNaN(Date.parse(start))) {
      return JSON.stringify({ error: "`start` must be a valid ISO 8601 time from check_availability." });
    }
    const booking = await createBooking({
      name: attendeeName.trim(),
      email: email.trim(),
      start,
      timeZone: visitorTimeZone,
      notes,
    });
    return JSON.stringify({ booked: true, ...booking });
  }

  return JSON.stringify({ error: `Unknown tool: ${name}` });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const perMinute = checkRateLimit(ip, { key: "chat-minute", limit: 10, windowMs: 60 * 1000 });
  if (!perMinute.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(perMinute.retryAfterMs / 1000)) } },
    );
  }

  const perDay = checkRateLimit(ip, { key: "chat-day", limit: 60, windowMs: 24 * 60 * 60 * 1000 });
  if (!perDay.allowed) {
    return NextResponse.json(
      { error: "Daily message limit reached. Please use the contact form instead." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { messages, timeZone } = (body ?? {}) as { messages?: unknown; timeZone?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "`messages` array is required." }, { status: 400 });
  }
  if (messages.length > MAX_TURNS) {
    return NextResponse.json(
      { error: "This conversation has gotten long — please use the contact form or booking link for anything further." },
      { status: 400 },
    );
  }
  if (!messages.every(isValidMessage)) {
    return NextResponse.json(
      { error: `Each message needs a role and non-empty content under ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const visitorTimeZone =
    typeof timeZone === "string" && timeZone.length <= 64 && IANA_TZ_RE.test(timeZone)
      ? timeZone
      : "Europe/London";

  let client;
  try {
    client = getAnthropicClient();
  } catch {
    return NextResponse.json(
      { error: "The chat assistant isn't configured yet. Please use the contact form instead." },
      { status: 503 },
    );
  }

  const bookingEnabled = calConfigured();
  const system = buildSystemPrompt({ bookingEnabled, visitorTimeZone });
  const convo: Anthropic.MessageParam[] = (messages as ChatMessage[]).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  try {
    let response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_RESPONSE_TOKENS,
      system,
      messages: convo,
      ...(bookingEnabled ? { tools: BOOKING_TOOLS } : {}),
    });

    // Tool-use loop: execute requested tools, feed results back, repeat until
    // Claude produces a final text reply or we hit the round cap.
    let rounds = 0;
    while (response.stop_reason === "tool_use" && rounds < MAX_TOOL_ROUNDS) {
      rounds += 1;
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        let result: string;
        try {
          result = await runTool(block.name, block.input as Record<string, unknown>, visitorTimeZone);
        } catch (err) {
          console.error(`[api/chat] tool ${block.name} failed:`, err);
          result = JSON.stringify({ error: "The booking system had a problem — offer the direct booking link instead." });
        }
        toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
      }

      convo.push({ role: "assistant", content: response.content });
      convo.push({ role: "user", content: toolResults });

      response = await client.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: MAX_RESPONSE_TOKENS,
        system,
        messages: convo,
        ...(bookingEnabled ? { tools: BOOKING_TOOLS } : {}),
      });
    }

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n");

    return NextResponse.json({
      reply: reply || "Sorry — I couldn't complete that. Please try again or use the booking link.",
    });
  } catch (err) {
    console.error("[api/chat] Anthropic request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again or use the contact form." },
      { status: 502 },
    );
  }
}
