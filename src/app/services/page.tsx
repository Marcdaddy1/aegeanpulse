import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  ServiceDetail,
  SolutionsCrossLink,
} from "@/components/sections/services/service-detail";
import { SERVICES } from "@/data/services";
import { CAL_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI strategy, custom solution design, implementation, support, training, and governance — practical, fixed-scope AI services for small businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
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
        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} />
        ))}
      </Container>

      <CtaBanner />
    </>
  );
}
