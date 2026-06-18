import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { ValueStrip } from "@/components/sections/home/value-strip";
import { ServicesGrid } from "@/components/sections/home/services-grid";
import { SolutionsSection } from "@/components/sections/home/solutions-section";
import { WhyAegeanPulse } from "@/components/sections/home/why-aegeanpulse";
import { ProcessSteps } from "@/components/sections/home/process-steps";
import { Testimonials } from "@/components/sections/home/testimonials";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import type { Metadata } from "next";
import { CAL_URL } from "@/data/site";

export const metadata: Metadata = {
  // Lead the title with the primary keyword buyers actually search, rather than
  // the brand line. The layout template appends " — AegeanPulse".
  title: "AI Automation Services for Small Businesses",
  description:
    "AegeanPulse builds practical AI automation, chatbots, and content systems for small businesses — fixed-scope and affordable. Book a free consultation today.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Practical AI for Small Business Growth"
        headline="AI Automation Services for Small Businesses"
        subheadline="From chatbots and workflow automation to content systems and AI strategy — we implement practical, fixed-scope AI in the tools your business already runs."
        primaryCta={{
          label: "Book Consultation",
          href: CAL_URL,
          external: true,
        }}
        secondaryCta={{ label: "Explore Services", href: "/services" }}
        trustItems={[
          "AI Automation",
          "AI Agents",
          "Content Systems",
          "Chatbots",
          "Digital Growth",
          "SMB AI Enablement",
        ]}
      />
      <TrustStrip />
      <ValueStrip />
      <ServicesGrid />
      <SolutionsSection />
      <WhyAegeanPulse />
      <ProcessSteps />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
