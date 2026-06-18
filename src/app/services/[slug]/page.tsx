import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StarterPrice } from "@/components/ui/price";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { SERVICES, getService } from "@/data/services";
import { CAL_URL, SITE_URL } from "@/data/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: service.title,
      description: service.short,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  // Standalone Service page: dedicated, indexable URL per offering so each can
  // rank and earn links independently. Service + breadcrumb structured data
  // ties back to the Organization defined in the root layout (by @id).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.short,
        serviceType: service.title,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${SITE_URL}/services/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-56 w-[22rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[90px] sm:h-80 sm:w-[42rem] sm:blur-[110px]" />
        </div>
        <Container className="relative py-16 md:py-24">
          <Reveal>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-accent">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/services" className="hover:text-accent">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground">{service.title}</li>
              </ol>
            </nav>

            <div className="mt-6 max-w-3xl">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <service.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {service.short}
              </p>
              <div className="mt-8">
                <Button href={CAL_URL} external size="lg">
                  Book a consultation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Detail */}
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Who it’s for
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {service.audience}
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-accent-soft/40 p-6">
                <p className="text-sm text-muted">
                  Fixed-scope engagements from{" "}
                  <StarterPrice className="font-semibold text-foreground" />.
                </p>
                <Button href={CAL_URL} external size="md" className="mt-4">
                  Book a consultation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-6">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Key deliverables
                </h2>
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
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Example outcomes
                </h2>
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
          </Reveal>
        </div>
      </Container>

      {/* Other services */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Explore other services
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {s.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
