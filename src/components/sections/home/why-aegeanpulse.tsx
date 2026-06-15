import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const POINTS = [
  "Commercially useful AI tied to real outcomes, not experiments",
  "Fixed scope and clear pricing — no open-ended consulting bills",
  "Implementation in your real tools, not slideware",
  "Plain-language guidance your whole team can act on",
];

export function WhyAegeanPulse() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Why AegeanPulse
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                Unlock Your Company’s Potential with Precision AI Solutions
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                AegeanPulse helps businesses adopt AI in a commercially useful
                way — improving operations, engagement, and growth without
                unnecessary complexity. We focus on what actually moves your
                business forward, then implement it properly.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                No hype, no jargon, no bloated retainers. Just practical AI that
                earns its place in your business.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-surface p-8 shadow-[0_1px_3px_rgba(28,35,33,0.04)]">
              <ul className="space-y-5">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
