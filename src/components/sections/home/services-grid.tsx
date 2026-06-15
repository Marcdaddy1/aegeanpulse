import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card } from "@/components/ui/card";
import { SERVICES } from "@/data/services";

export function ServicesGrid() {
  return (
    <Section id="services" reveal={false}>
      <SectionHeading
        eyebrow="Services"
        title="End-to-end AI services, built around your business"
        description="From strategy to implementation and beyond — practical support at every stage of your AI journey."
      />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <StaggerItem key={service.slug} className="h-full">
            <Card hover className="flex h-full flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <service.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.short}
              </p>
              <Link
                href={`/services#${service.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Learn more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
