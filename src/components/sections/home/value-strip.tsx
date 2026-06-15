import { Wallet, Zap, Target } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StarterPrice } from "@/components/ui/price";

const HIGHLIGHTS = [
  {
    icon: Wallet,
    title: "Affordable AI automation",
    text: "Fixed-price packages with clear scope and no open-ended retainers — built for small-business budgets.",
  },
  {
    icon: Zap,
    title: "Fast implementation",
    text: "Practical solutions deployed in weeks, not quarters, so you see value quickly.",
  },
  {
    icon: Target,
    title: "Built for real business use",
    text: "Every solution is tied to an actual outcome — saved time, more leads, better service.",
  },
];

export function ValueStrip() {
  return (
    <Section reveal={false} tone="muted">
      <SectionHeading
        eyebrow="Why it works"
        align="center"
        title="Affordable, fixed-scope AI for small businesses"
        description={
          <>
            Practical implementation over hype. Fixed-price packages starting
            at <StarterPrice className="font-semibold text-foreground" /> — so
            you know exactly what you’re getting before you commit.
          </>
        }
      />
      <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <StaggerItem key={h.title}>
            <div className="h-full rounded-2xl border border-border bg-surface p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <h.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {h.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
