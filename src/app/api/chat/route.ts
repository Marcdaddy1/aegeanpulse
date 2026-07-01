import { NextResponse } from "next/server";
import { getAnthropicClient, CLAUDE_MODEL } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/server/chat-context";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";

// Q&A-only chatbot backend (v1). Non-streaming, no tool use — appointment
// booking via Cal.com is a deliberate fast-follow once this baseline is
// validated in production. See the project plan for the phased build order.

const MAX_MESSAGE_LENGTH = 2000;
const MAX_TURNS = 20;
const MAX_RESPONSE_TOKENS = 1024;

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

export async function POST(request: Request) {
  const ip = getClientIp(request);

  // Two limiter tiers: a tight per-minute cap to blunt bursts, a daily cap to
  // bound worst-case cost from a single source.
  const perMinute = checkRateLimit(ip, {
    key: "chat-minute",
    limit: 10,
    windowMs: 60 * 1000,
  });
  if (!perMinute.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(perMinute.retryAfterMs / 1000)) } },
    );
  }

  const perDay = checkRateLimit(ip, {
    key: "chat-day",
    limit: 60,
    windowMs: 24 * 60 * 60 * 1000,
  });
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

  const { messages } = (body ?? {}) as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "`messages` array is required." }, { status: 400 });
  }
  if (messages.length > MAX_TURNS) {
    return NextResponse.json(
      {
        error:
          "This conversation has gotten long — please use the contact form or booking link for anything further.",
      },
      { status: 400 },
    );
  }
  if (!messages.every(isValidMessage)) {
    return NextResponse.json(
      { error: `Each message needs a role and non-empty content under ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  let client;
  try {
    client = getAnthropicClient();
  } catch {
    return NextResponse.json(
      { error: "The chat assistant isn't configured yet. Please use the contact form instead." },
      { status: 503 },
    );
  }

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_RESPONSE_TOKENS,
      system: buildSystemPrompt(),
      messages: messages as ChatMessage[],
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[api/chat] Anthropic request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again or use the contact form." },
      { status: 502 },
    );
  }
}
