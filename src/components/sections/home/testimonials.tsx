import { Quote, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section reveal={false} tone="muted">
      <SectionHeading
        eyebrow="Client stories"
        align="center"
        title="Trusted to turn AI into a real business asset"
      />
      <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <StaggerItem key={t.name} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-[0_1px_3px_rgba(28,35,33,0.04)]">
              <Quote
                className="h-8 w-8 text-accent/40"
                aria-hidden="true"
              />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground sm:text-lg">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-accent"
                  >
                    {t.name}
                    <LinkedInIcon className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="block font-semibold text-foreground">
                    {t.name}
                  </span>
                )}
                <span className="block text-sm text-muted">
                  {t.role},{" "}
                  {t.website ? (
                    <a
                      href={t.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted underline decoration-border underline-offset-2 hover:text-accent"
                    >
                      {t.company}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    t.company
                  )}
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
