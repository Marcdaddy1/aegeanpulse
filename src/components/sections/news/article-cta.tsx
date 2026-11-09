import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAL_URL, FOUNDER } from "@/data/site";

// The one booking ask on an article page. Articles are plain markdown with no
// inline links, so the closing pitch used to sit in the prose as an untappable
// cal.com address. This panel turns it into a real button at the reader's most
// interested moment, and puts a face on the call: most readers arrive from
// Marcus's own posts. Copy is first person throughout ("I", "me").
const DEFAULT_HEADING = "Got a job you'd hand to AI?";
const DEFAULT_TEXT =
  "Tell me what it is. You'll get a straight answer on whether it's worth doing, and which fixed-price package fits.";

export function ArticleCta({
  heading,
  text,
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <aside
      id="article-cta"
      data-hide-chat
      aria-labelledby="article-cta-heading"
      className="mt-14 rounded-3xl border border-border bg-surface p-7 sm:p-8"
    >
      <div className="flex items-center gap-4">
        <Image
          src={FOUNDER.image}
          alt=""
          // 112px source for a 56px circle: sharp on 2x and 3x phone screens.
          // Eager, because a lazy load left an empty ring when readers
          // scrolled straight to the panel on slow connections.
          width={112}
          height={112}
          loading="eager"
          className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
        />
        <p className="text-sm leading-snug text-muted">
          <span className="block font-medium text-foreground">{FOUNDER.name}</span>
          {FOUNDER.title}, AegeanPulse
        </p>
      </div>

      <h2
        id="article-cta-heading"
        className="mt-6 text-balance font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {heading ?? DEFAULT_HEADING}
      </h2>
      <p className="mt-3 text-pretty text-lg leading-relaxed text-foreground/85">
        {text ?? DEFAULT_TEXT}
      </p>
      {/* Answers the question the price in the article raises: the call is
          free, and the £499 Discovery only starts if the reader asks for it. */}
      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
        No obligation, and you talk to me, not a salesperson. The £499
        Discovery only starts if you want it.
      </p>

      {/* data-bar-until: the phone booking bar steps aside as this row (the
          panel's own booking button) comes on screen. */}
      <div data-bar-until className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button
          href={CAL_URL}
          external
          size="lg"
          className="w-full whitespace-nowrap sm:w-auto"
        >
          {/* The full label wrapped onto two lines inside the pill at 390px. */}
          <span className="sm:hidden">Book a free call</span>
          <span className="hidden sm:inline">Book a free 30-minute call</span>
          <span className="sr-only"> (opens Cal.com in a new tab)</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Link
          href="/pricing"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:text-accent-strong hover:underline"
        >
          What&apos;s in a Discovery
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
