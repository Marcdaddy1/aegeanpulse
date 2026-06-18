"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { useCurrency } from "@/components/ui/price";
import {
  PRICING_TIERS,
  formatPrice,
  type CurrencyCode,
} from "@/data/pricing";
import { PRICING_FAQS } from "@/data/faqs";
import { CAL_URL, SITE_URL } from "@/data/site";
import { cn } from "@/lib/utils";

// Pricing page is a Client Component so `useCurrency` can drive all the price
// displays from a single hook call — avoids each tier card making its own
// useSyncExternalStore call and ensures they all flip together.

const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  GBP: "£ GBP",
  EUR: "€ EUR",
  USD: "$ USD",
};

function PricingCard({
  tier,
  currency,
}: {
  tier: (typeof PRICING_TIERS)[number];
  currency: CurrencyCode;
}) {
  const price = formatPrice(tier.prices[currency], currency);
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-8",
        tier.highlight
          ? "border-accent bg-accent text-white shadow-[0_24px_60px_-12px_rgba(14,124,107,0.45)]"
          : "border-border bg-surface",
      )}
    >
      {tier.highlight && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-accent">
          Most popular
        </span>
      )}

      <div>
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.16em]",
            tier.highlight ? "text-white/70" : "text-accent",
          )}
        >
          {tier.name}
        </p>
        <p
          className={cn(
            "mt-1 font-display text-lg font-semibold",
            tier.highlight ? "text-white" : "text-foreground",
          )}
        >
          {tier.tagline}
        </p>
      </div>

      <div className="mt-6 flex items-end gap-1.5">
        <span
          className={cn(
            "font-display text-4xl font-semibold tracking-tight",
            tier.highlight ? "text-white" : "text-foreground",
          )}
        >
          {price}
        </span>
        <span
          className={cn(
            "mb-1 text-sm",
            tier.highlight ? "text-white/60" : "text-muted",
          )}
        >
          {tier.billing === "monthly" ? "/ month" : "one-time"}
        </span>
      </div>

      <p
        className={cn(
          "mt-4 text-sm leading-relaxed",
          tier.highlight ? "text-white/75" : "text-muted",
        )}
      >
        {tier.description}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                tier.highlight ? "text-white/80" : "text-accent",
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "text-sm",
                tier.highlight ? "text-white/80" : "text-muted",
              )}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
          tier.highlight
            ? "bg-white text-accent hover:bg-white/90"
            : "bg-accent text-white hover:bg-accent-strong",
        )}
      >
        {tier.cta}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function FaqItem({ faq }: { faq: (typeof PRICING_FAQS)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
      )}
    </div>
  );
}

export default function PricingPage() {
  const currency = useCurrency();

  // Build FAQPage JSON-LD here (inside the component) so it uses the
  // server-rendered default and doesn't cause hydration issues.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: `${SITE_URL}/pricing`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-56 w-[22rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[90px] sm:h-80 sm:w-[42rem] sm:blur-[110px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        </div>
        <Container className="relative py-20 md:py-28">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Pricing
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                Clear pricing. Fixed scope. Real results.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Every engagement has a defined deliverable and a set price —
                no retainer lock-ins, no open-ended hourly billing, no
                surprises. Prices shown in{" "}
                <strong className="font-semibold text-foreground">
                  {CURRENCY_LABELS[currency]}
                </strong>{" "}
                based on your location.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Tiers */}
      <Container className="py-14 md:py-20">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <StaggerItem key={tier.id} className="h-full">
              <PricingCard tier={tier} currency={currency} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mt-8 text-center text-sm text-muted">
            Not sure which fits?{" "}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:text-accent-strong"
            >
              Book a free 30-min call
            </a>{" "}
            and we&apos;ll scope it together.{" "}
            <Link
              href="/services"
              className="font-medium text-accent hover:text-accent-strong"
            >
              View full service details →
            </Link>
          </p>
        </Reveal>
      </Container>

      {/* What's included detail */}
      <section className="border-t border-border bg-surface/50 py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                What &quot;fixed scope&quot; actually means
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Before any work starts, you receive a written brief detailing
                exactly what we&apos;ll deliver, by when, and for what price. If
                scope changes, we quote separately — your original price never
                creeps.
              </p>
            </div>
          </Reveal>

          <Stagger className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Free consultation",
                text: "We understand your business, your tools, and where AI will genuinely move the needle.",
              },
              {
                step: "2",
                title: "Fixed-scope brief",
                text: "You receive a written proposal with deliverables, timeline, and a set price before we start.",
              },
              {
                step: "3",
                title: "Build & handover",
                text: "We build, integrate, train your team, and hand over documentation. You own the system.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="rounded-2xl border border-border bg-surface p-6 text-center">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                Pricing questions answered
              </h2>
              <p className="mt-3 text-lg text-muted">
                Everything you need to know before booking.
              </p>
              <div className="mt-10">
                {PRICING_FAQS.map((faq) => (
                  <FaqItem key={faq.question} faq={faq} />
                ))}
              </div>
              <div className="mt-10">
                <Button href={CAL_URL} external size="lg">
                  Still have questions? Book a free call
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
