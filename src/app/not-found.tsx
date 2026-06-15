import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PulseMark } from "@/components/layout/logo";
import { CONSULT_CTA } from "@/data/site";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <PulseMark className="h-12 w-12" />
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        404 — Page not found
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        This page took a different route
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you’re looking for doesn’t exist or has moved. Let’s get you
        back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="secondary" size="lg">
          Back to Home
        </Button>
        <Button href={CONSULT_CTA.href} external size="lg">
          {CONSULT_CTA.label}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </Container>
  );
}
