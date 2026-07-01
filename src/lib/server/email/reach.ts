import "server-only";
import type { EmailProvider, SubscribeInput } from "./provider";

// Hostinger Reach adapter. Endpoint shape verified against the published
// OpenAPI spec (developers.hostinger.com/openapi/openapi.json):
//   POST /api/reach/v1/contacts  { email, name?, surname?, phone?, note? }
//   Auth: Bearer <Hostinger API token> (hPanel → API tokens)
// `note` is capped at 75 chars by the API — we use it to record the signup
// source for list hygiene.

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

    // 409/422 for an already-existing contact is success for our purposes —
    // the person is on the list, which is all the caller cares about.
    if (!res.ok && res.status !== 409 && res.status !== 422) {
      throw new Error(`Reach contact creation failed (${res.status}): ${await res.text()}`);
    }
  },
};
