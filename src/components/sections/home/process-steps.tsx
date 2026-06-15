import { Search, Map, Hammer, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    text: "We learn your business, map where AI fits, and pinpoint the highest-value opportunities.",
  },
  {
    icon: Map,
    title: "Plan",
    text: "We design a clear, fixed-scope plan with priorities, tooling, and a realistic timeline.",
  },
  {
    icon: Hammer,
    title: "Build",
    text: "We implement and integrate the solution into your real workflows and systems.",
  },
  {
    icon: TrendingUp,
    title: "Optimize",
    text: "We monitor, refine, and expand — keeping your AI delivering as you grow.",
  },
];

export function ProcessSteps() {
  return (
    <Section reveal={false}>
      <SectionHeading
        eyebrow="How we work"
        align="center"
        title="A clear, four-step path to working AI"
        description="A proven process that takes you from uncertainty to results — with no surprises along the way."
      />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <StaggerItem key={step.title} className="h-full">
            <div className="group relative h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-3xl font-semibold text-border sm:text-4xl">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
