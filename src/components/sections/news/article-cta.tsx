import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAL_URL, FOUNDER } from "@/data/site";

// The one booking ask on an article page. Articles are plain markdown with no
// inline links, so the closing pitch used to sit in the prose as an untappable
// cal.com address. This panel turns it into a real button at the reader's most
// interested moment, and puts a face on the call: most readers arrive from
// Marcus's own posts.
const DEFAULT_TEXT =
  "Tell me the job you'd like to hand to AI. You'll get a straight answer on whether it's worth doing, and which fixed-price package fits.";

export function ArticleCta({ text }: { text?: string }) {
  return (
    <aside
      aria-labelledby="article-cta-heading"
      className="mt-14 rounded-3xl border border-border bg-surface p-7 sm:p-8"
    >
      <div className="flex items-center gap-4">
        <Image
          src={FOUNDER.image}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
        />
        <p className="text-sm leading-snug text-muted">
          <span className="block font-medium text-foreground">{FOUNDER.name}</span>
          Founder, AegeanPulse
        </p>
      </div>

      <h2
        id="article-cta-heading"
        className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Book a free 20-minute call
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-foreground/85">
        {text ?? DEFAULT_TEXT}
      </p>
      <p className="mt-3 text-sm text-muted">
        Free, 20 minutes, and you talk to me, not a salesperson.
      </p>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button
          href={CAL_URL}
          external
          size="lg"
          className="w-full sm:w-auto"
        >
          Book a free 20-minute call
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Link
          href="/pricing"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:text-accent-strong hover:underline"
        >
          See the fixed prices
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
