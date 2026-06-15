import type { Metadata } from "next";
import {
  ArrowUpRight,
  CalendarCheck,
  Handshake,
  PlusCircle,
  Mail,
} from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { CAL_URL, CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to AegeanPulse about AI consultation, partnerships, or submitting a tool. Book a free consultation or send us a message.",
  alternates: { canonical: "/contact" },
};

const CARDS = [
  {
    id: "consultation",
    icon: CalendarCheck,
    title: "Consultation",
    text: "Book a free, no-pressure call to scope how AI can help your business.",
    cta: { label: "Book a time", href: CAL_URL, external: true },
  },
  {
    id: "partnerships",
    icon: Handshake,
    title: "Partnerships",
    text: "Agencies and software partners — let’s explore working together.",
    cta: { label: "Email us", href: `mailto:${CONTACT_EMAIL}`, external: false },
  },
  {
    id: "tool-submissions",
    icon: PlusCircle,
    title: "Tool submissions",
    text: "Built or found a great AI tool? Submit it for our directory.",
    cta: { label: "Email us", href: `mailto:${CONTACT_EMAIL}`, external: false },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about AI that actually helps"
        description="Whether you’re ready to start or just exploring what’s possible, we’d love to hear from you. Tell us about your business and we’ll point you to the fastest path to value."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Send us a message
              </h2>
              <p className="mt-2 text-muted">
                We typically respond within one business day.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Side cards */}
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <div className="rounded-3xl border border-border bg-accent-soft/40 p-7">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Prefer to book directly?
                </h3>
                <p className="mt-2 text-muted">
                  Skip the back-and-forth and grab a free consultation slot.
                </p>
                <Button
                  href={CAL_URL}
                  external
                  size="md"
                  className="mt-5"
                >
                  Schedule a Free Consultation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-4 flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>

              {CARDS.map((card) => (
                <div
                  key={card.id}
                  id={card.id}
                  className="scroll-mt-24 rounded-3xl border border-border bg-surface p-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.text}
                  </p>
                  <a
                    href={card.cta.href}
                    target={card.cta.external ? "_blank" : undefined}
                    rel={card.cta.external ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
                  >
                    {card.cta.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
