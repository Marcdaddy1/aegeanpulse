import { NextResponse } from "next/server";
import { emailProvider, emailConfigured, SubscribeError } from "@/lib/server/email";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";

// Newsletter signup endpoint. UK GDPR: the client form requires an explicit,
// unchecked-by-default consent checkbox and we refuse requests without
// consent:true — consent is never implied by submission alone.

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = checkRateLimit(ip, {
    key: "newsletter",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many signup attempts — please try again later." },
      { status: 429 },
    );
  }

  if (!emailConfigured()) {
    return NextResponse.json(
      { error: "Newsletter signup isn't available right now." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, consent, source } = (body ?? {}) as {
    email?: unknown;
    consent?: unknown;
    source?: unknown;
  };

  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (consent !== true) {
    return NextResponse.json(
      { error: "Please tick the consent box to subscribe." },
      { status: 400 },
    );
  }

  try {
    await emailProvider.subscribe({
      email: email.trim().toLowerCase(),
      source: typeof source === "string" ? source.slice(0, 30) : undefined,
    });
    return NextResponse.json({ subscribed: true });
  } catch (err) {
    // A full subscriber list is an operational problem, not a visitor error:
    // it needs a plan upgrade, and until then every signup is lost. Log it on
    // its own line so it is greppable rather than buried among transient 502s.
    if (err instanceof SubscribeError && err.listFull) {
      console.error(
        "[api/newsletter/subscribe] SUBSCRIBER LIST FULL — signups are being rejected. " +
          "Upgrade the Reach plan; see EMAIL-MARKETING.md.",
        err.detail,
      );
    } else {
      console.error("[api/newsletter/subscribe] failed:", err);
    }
    return NextResponse.json(
      { error: "Couldn't subscribe you just now — please try again later." },
      { status: 502 },
    );
  }
}
