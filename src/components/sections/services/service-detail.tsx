import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { StarterPrice } from "@/components/ui/price";
import { CAL_URL } from "@/data/site";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceDetail({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className="scroll-mt-24 border-b border-border py-16 md:py-20 last:border-b-0"
    >
      <Reveal>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-2 lg:gap-16",
            reversed && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <service.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {service.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {service.short}
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                Who it’s for
              </h3>
              <p className="mt-2 text-muted">{service.audience}</p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-accent-soft/40 p-6">
              <p className="text-sm text-muted">
                Fixed-scope engagements from{" "}
                <StarterPrice className="font-semibold text-foreground" />.
              </p>
              <Button
                href={CAL_URL}
                external
                size="md"
                className="mt-4"
              >
                Book a consultation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 lg:content-start">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Key deliverables
              </h3>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Example outcomes
              </h3>
              <ul className="mt-4 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-sm text-muted">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function SolutionsCrossLink() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-center">
      <p className="text-muted">
        Looking for packaged, ready-to-deploy use cases?{" "}
        <Link
          href="/#solutions"
          className="font-medium text-accent hover:text-accent-strong"
        >
          Explore our AI solutions →
        </Link>
      </p>
    </div>
  );
}
