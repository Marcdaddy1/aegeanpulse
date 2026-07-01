import { NextResponse } from "next/server";
import { generateDraft } from "@/lib/server/generate-article";

// Internal trigger for the AI article drafting pipeline. Called manually
// (curl) or by a VPS crontab entry, e.g. weekly:
//   0 6 * * 1  curl -s -X POST -H "x-internal-secret: $SECRET" http://localhost:3000/api/internal/generate-draft
// Guarded by a shared secret — this endpoint spends real API money.
// The draft lands as a `draft: true` markdown file in src/content/articles/;
// nothing is published without a human flipping the flag and deploying.

export async function POST(request: Request) {
  const secret = process.env.INTERNAL_CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "INTERNAL_CRON_SECRET is not configured." },
      { status: 503 },
    );
  }
  if (request.headers.get("x-internal-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const result = await generateDraft();
    if (!result) {
      return NextResponse.json({
        status: "queue-empty",
        message: "All topics in content-topics.ts already have article files.",
      });
    }
    return NextResponse.json({ status: "drafted", ...result });
  } catch (err) {
    console.error("[api/internal/generate-draft] failed:", err);
    return NextResponse.json({ error: "Draft generation failed — see server logs." }, { status: 500 });
  }
}
