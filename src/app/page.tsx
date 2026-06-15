import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { ValueStrip } from "@/components/sections/home/value-strip";
import { ServicesGrid } from "@/components/sections/home/services-grid";
import { SolutionsSection } from "@/components/sections/home/solutions-section";
import { WhyAegeanPulse } from "@/components/sections/home/why-aegeanpulse";
import { ProcessSteps } from "@/components/sections/home/process-steps";
import { Testimonials } from "@/components/sections/home/testimonials";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { CAL_URL } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Practical AI for Small Business Growth"
        headline="Transforming Business Through Intelligent AI Automation"
        subheadline="Transform your business with cutting-edge AI automation and strategic digital solutions designed for practical growth."
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
