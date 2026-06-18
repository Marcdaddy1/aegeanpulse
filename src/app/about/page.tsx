import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  Target,
  Compass,
  HandHeart,
  Layers,
} from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CAL_URL, FOUNDER, SITE_URL } from "@/data/site";

// Person structured data for the named founder — the key E-E-A-T signal that
// ties a real, credentialed individual (with a LinkedIn sameAs) to the
// Organization defined in the root layout.
const founderJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#marcus-aragbaye`,
  name: FOUNDER.name,
  jobTitle: FOUNDER.title,
  description: FOUNDER.bio,
  image: `${SITE_URL}${FOUNDER.image}`,
  url: FOUNDER.linkedin,
  sameAs: [FOUNDER.linkedin],
  worksFor: { "@id": `${SITE_URL}/#organization` },
};

export const metadata: Metadata = {
  title: "About",
  description:
    "AegeanPulse exists to democratize AI access for small businesses — combining tools, knowledge, and strategy to help them thrive in a digital-first economy.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: Target,
    title: "Practical over hype",
    text: "We care about outcomes, not buzzwords. Every recommendation ties back to real business value.",
  },
  {
    icon: Compass,
    title: "Strategy first",
    text: "We start with where you're going, then choose the AI that gets you there — never the other way around.",
  },
  {
    icon: HandHeart,
    title: "Genuine partnership",
    text: "We work as an extension of your team, with clear communication and no jargon walls.",
  },
  {
    icon: Layers,
    title: "Implementation-focused",
    text: "We don't stop at advice. We build, integrate, and make sure it actually works in your business.",
  },
];

const REASONS = [
  "Fixed-scope packages and transparent pricing — you always know what you're paying for.",
  "Commercially grounded recommendations tied to time saved, leads won, and service improved.",
  "Hands-on implementation in your real tools, not theoretical strategy decks.",
  "Plain-language guidance and training so your whole team can adopt AI with confidence.",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }}
      />
      <PageHero
        eyebrow="About AegeanPulse"
        title="Making practical AI accessible to every business"
        description="We're a practical, commercially grounded AI partner helping small businesses and modern service brands adopt AI in ways that genuinely move the needle."
      />

      {/* Mission */}
      <Section containerSize="narrow">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Our mission
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          Democratize AI access for small businesses and enterprises alike
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
          <p>
            AI shouldn’t be a privilege reserved for companies with large
            budgets and in-house data teams. AegeanPulse exists to close that
            gap — giving small businesses the tools, knowledge, and strategy
            they need to thrive in a digital-first economy.
          </p>
          <p>
            We translate fast-moving AI capability into practical, affordable
            systems that real businesses can adopt today. No hype, no
            complexity for its own sake — just AI that earns its place by making
            your business better.
          </p>
        </div>
      </Section>

      {/* Founder */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <Reveal>
            <Image
              src={FOUNDER.image}
              alt={`${FOUNDER.name}, ${FOUNDER.title} at AegeanPulse`}
              width={300}
              height={300}
              priority
              className="mx-auto h-64 w-64 rounded-2xl border border-border object-cover sm:h-72 sm:w-72 lg:h-[300px] lg:w-[300px]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Meet the founder
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {FOUNDER.name}
              </h2>
              <p className="mt-1 text-lg font-medium text-muted">
                {FOUNDER.title}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {FOUNDER.bio}
              </p>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong"
              >
                <LinkedInIcon className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section reveal={false} tone="muted">
        <SectionHeading
          eyebrow="What we value"
          title="Principles that guide every engagement"
        />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {VALUES.map((v) => (
            <StaggerItem key={v.title} className="h-full">
              <div className="flex h-full gap-5 rounded-2xl border border-border bg-surface p-7">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {v.text}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Why choose */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Why businesses choose us
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                A partner that’s as commercial as you are
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Businesses choose AegeanPulse because we make AI practical,
                affordable, and accountable — and we stay with them from first
                idea to working system.
              </p>
              <div className="mt-8">
                <Button href={CAL_URL} external size="lg">
                  Book a consultation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {REASONS.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="text-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
