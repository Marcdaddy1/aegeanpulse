import "server-only";

// Thin wrapper over Cal.com's v2 REST API — no SDK needed for two endpoints.
// Verified against the live API: slots requires `cal-api-version: 2024-09-04`,
// bookings requires `cal-api-version: 2024-08-13`.

const CAL_API_BASE = "https://api.cal.com/v2";

function calApiKey(): string {
  const key = process.env.CAL_COM_API_KEY;
  if (!key) {
    throw new Error("CAL_COM_API_KEY is not set. Add it to .env.local (see .env.example).");
  }
  return key;
}

export function calEventTypeId(): number {
  const id = Number(process.env.CAL_COM_EVENT_TYPE_ID);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("CAL_COM_EVENT_TYPE_ID is not set or invalid. Add it to .env.local.");
  }
  return id;
}

export function calConfigured(): boolean {
  return Boolean(
    process.env.CAL_COM_API_KEY && Number(process.env.CAL_COM_EVENT_TYPE_ID) > 0,
  );
}

/** Map of ISO date ("2026-07-02") → available slot start times (ISO 8601 UTC). */
export type AvailableSlots = Record<string, { start: string }[]>;

export async function getAvailability(
  startIso: string,
  endIso: string,
): Promise<AvailableSlots> {
  const params = new URLSearchParams({
    eventTypeId: String(calEventTypeId()),
    start: startIso,
    end: endIso,
  });
  const res = await fetch(`${CAL_API_BASE}/slots?${params}`, {
    headers: {
      Authorization: `Bearer ${calApiKey()}`,
      "cal-api-version": "2024-09-04",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Cal.com slots request failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { data: AvailableSlots };
  return json.data ?? {};
}

export interface BookingResult {
  uid: string;
  title: string;
  start: string;
  end: string;
  meetingUrl?: string;
}

export async function createBooking(input: {
  name: string;
  email: string;
  /** Slot start time, ISO 8601 UTC — must be one returned by getAvailability. */
  start: string;
  /** IANA timezone of the attendee, e.g. "Europe/London". */
  timeZone: string;
  notes?: string;
}): Promise<BookingResult> {
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${calApiKey()}`,
      "cal-api-version": "2024-08-13",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventTypeId: calEventTypeId(),
      start: input.start,
      attendee: {
        name: input.name,
        email: input.email,
        timeZone: input.timeZone,
        language: "en",
      },
      ...(input.notes ? { metadata: { notes: input.notes.slice(0, 500) } } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Cal.com booking failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as {
    data: {
      uid: string;
      title: string;
      start: string;
      end: string;
      meetingUrl?: string;
      location?: string;
    };
  };
  const b = json.data;
  return {
    uid: b.uid,
    title: b.title,
    start: b.start,
    end: b.end,
    meetingUrl: b.meetingUrl ?? b.location,
  };
}

/** Cancel a booking by uid — used for test bookings and future cancel flows. */
export async function cancelBooking(uid: string, reason: string): Promise<void> {
  const res = await fetch(`${CAL_API_BASE}/bookings/${uid}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${calApiKey()}`,
      "cal-api-version": "2024-08-13",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cancellationReason: reason }),
  });
  if (!res.ok) {
    throw new Error(`Cal.com cancel failed (${res.status}): ${await res.text()}`);
  }
}
