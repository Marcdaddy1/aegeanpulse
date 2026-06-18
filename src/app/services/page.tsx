import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SolutionsCrossLink } from "@/components/sections/services/service-detail";
import { SERVICES } from "@/data/services";
import { CAL_URL, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "AI Services for Small Businesses",
  description:
    "AI strategy, custom solution design, implementation, support, training, and governance — practical, fixed-scope AI services for small businesses.",
  alternates: { canonical: "/services" },
};

// Service + breadcrumb structured data so Google can understand each offering as
// a distinct service provided by the Organization defined in the root layout
// (referenced here by @id), and surface the services in rich results.
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
      ],
    },
    {
      "@type": "ItemList",
      itemListElement: SERVICES.map((service, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          serviceType: service.title,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <PageHero
        eyebrow="Services"
        title="AI services that move your business forward"
        description="From first strategy to ongoing optimization, we deliver practical AI services with clear scope, fair pricing, and real outcomes — built for how small businesses actually operate."
      >
        <Button href={CAL_URL} external size="lg">
          Book a consultation
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </PageHero>

      <Container className="py-12 md:py-16">
        <div className="mb-10">
          <SolutionsCrossLink />
        </div>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card hover className="flex h-full flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <service.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-strong">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <CtaBanner />
    </>
  );
}
