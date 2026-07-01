import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NewsletterSignup } from "@/components/sections/shared/newsletter-signup";
import {
  FOOTER_NAV,
  SITE_NAME,
  TAGLINE,
  CONSULT_CTA,
  CONTACT_EMAIL,
} from "@/data/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-border bg-surface/40">
      {/* Footer CTA */}
      <Container className="py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-accent-soft/50 px-8 py-12 sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Ready to put AI to work in your business?
              </h2>
              <p className="mt-2 text-muted">
                Book a free consultation and get a practical, fixed-scope plan
                you can act on.
              </p>
            </div>
            <Button href={CONSULT_CTA.href} external size="lg">
              {CONSULT_CTA.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>

      <Container className="pb-12">
        <div className="border-t border-border pt-10 pb-2">
          <div className="max-w-xl">
            <NewsletterSignup source="footer" />
          </div>
        </div>

        <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1.4fr_1fr] mt-10">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-strong"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-2 sm:gap-x-8">
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>Practical AI for small business growth.</p>
        </div>
      </Container>
    </footer>
  );
}
