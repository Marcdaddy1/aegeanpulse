import "server-only";
import { SubscribeError, type EmailProvider, type SubscribeInput } from "./provider";

// Hostinger Reach adapter. Endpoint shape verified against the published
// OpenAPI spec (developers.hostinger.com/openapi/openapi.json):
//   POST /api/reach/v1/contacts  { email, name?, surname?, phone?, note? }
//   Auth: Bearer <Hostinger API token> (hPanel → API tokens)
// `note` is capped at 75 chars by the API — we use it to record the signup
// source for list hygiene.
//
// Response behaviour, measured against the live API on 2026-09-04:
//   - new contact        → 200 { "message": "Request accepted" }
//   - contact ALREADY on the list → also 200, same body
//   - invalid/missing email → 422 { message, errors: { email: [...] }, correlation_id }
// Idempotency is therefore handled server-side and needs no special case here.
// An earlier version treated 409 and 422 as success to swallow "already
// exists"; that was wrong twice over — duplicates never return either code, and
// swallowing 422 hid genuine failures. The plan caps at 100 subscribers
// (see EMAIL-MARKETING.md), so the endpoint WILL start rejecting signups once
// the list is full; silently reporting success there would look like organic
// flatlining rather than a wall.

const REACH_API_BASE = "https://developers.hostinger.com";

function reachToken(): string {
  const token = process.env.HOSTINGER_API_TOKEN;
  if (!token) {
    throw new Error("HOSTINGER_API_TOKEN is not set. Add it to .env.local (see .env.example).");
  }
  return token;
}

export function reachConfigured(): boolean {
  return Boolean(process.env.HOSTINGER_API_TOKEN);
}

/**
 * Pull a human-readable reason out of a Reach error body. The 422 shape is
 * `{ message, errors: { field: [msg] }, correlation_id }`; other statuses are
 * not documented, so fall back to the raw text rather than assuming JSON.
 */
function describeFailure(status: number, raw: string): { detail: string; listFull: boolean } {
  let detail = raw.slice(0, 300);
  try {
    const body = JSON.parse(raw) as {
      message?: string;
      errors?: Record<string, string[]>;
      correlation_id?: string;
    };
    // `message` usually repeats the first field error verbatim — dedupe so the
    // log line reads once, not twice.
    const parts = [body.message, ...Object.values(body.errors ?? {}).flat()].filter(
      (v): v is string => Boolean(v),
    );
    detail = [...new Set(parts)].join(" | ") || detail;
    if (body.correlation_id) detail += ` [correlation_id: ${body.correlation_id}]`;
  } catch {
    // Not JSON — keep the truncated raw body.
  }

  // The exact response at the subscriber cap is NOT verified: confirming it
  // would mean filling the list to 100. Treat it as a hint that makes the log
  // line actionable, never as control flow — every non-2xx throws regardless.
  const listFull = status === 403 || /limit|quota|subscriber|plan|upgrade/i.test(detail);

  return { detail, listFull };
}

export const reachProvider: EmailProvider = {
  async subscribe(input: SubscribeInput): Promise<void> {
    const res = await fetch(`${REACH_API_BASE}/api/reach/v1/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${reachToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        ...(input.name ? { name: input.name.slice(0, 100) } : {}),
        note: `aegeanpulse.com signup${input.source ? `: ${input.source}` : ""}`.slice(0, 75),
      }),
    });

    if (res.ok) return;

    const { detail, listFull } = describeFailure(res.status, await res.text().catch(() => ""));
    throw new SubscribeError({ status: res.status, detail, listFull, provider: "Reach" });
  },
};
