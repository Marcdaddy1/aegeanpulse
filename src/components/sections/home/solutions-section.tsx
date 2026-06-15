import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card } from "@/components/ui/card";
import { CAL_URL } from "@/data/site";
import { SOLUTIONS } from "@/data/solutions";

export function SolutionsSection() {
  return (
    <Section id="solutions" reveal={false} tone="muted">
      <SectionHeading
        eyebrow="Solutions"
        title="Packaged AI solutions for practical SMB use cases"
        description="Commercially useful systems you can put to work — each solving a real problem with a clear business benefit."
      />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((solution) => (
          <StaggerItem key={solution.slug} className="h-full">
            <Card hover className="flex h-full flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <solution.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {solution.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-medium text-foreground/80">
                  The problem:
                </span>{" "}
                {solution.problem}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                <span className="font-medium text-accent-strong">
                  The benefit:
                </span>{" "}
                {solution.benefit}
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Discuss this solution
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
