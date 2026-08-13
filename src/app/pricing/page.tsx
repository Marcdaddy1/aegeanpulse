import type { Metadata } from "next";
import { PRICING_FAQS } from "@/data/faqs";
import { SITE_URL } from "@/data/site";
import PricingContent from "./pricing-content";

// Server wrapper for /pricing. Exists purely so the route can export
// `metadata` — the interactive body (pricing-content.tsx) is a Client
// Component because `useCurrency` drives every price display, and Client
// Components cannot export metadata.
//
// Without this wrapper the route inherited the ROOT LAYOUT's metadata:
// the homepage <title>, the generic site description, and
// `alternates: { canonical: "/" }` — i.e. /pricing declared itself a
// duplicate of the homepage. Google drops non-canonical duplicates from the
// index, so the one page built to rank for "AI automation cost" was telling
// search engines not to rank it at all.

export const metadata: Metadata = {
  title: "AI Automation Pricing for Small Businesses",
  description:
    "Transparent, fixed-scope AI pricing: Discovery from £499, Builder from £2,499, and an ongoing Growth Partner retainer. No hourly billing, no surprises.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    title: "AI Automation Pricing for Small Businesses — AegeanPulse",
    description:
      "Transparent, fixed-scope AI pricing: Discovery from £499, Builder from £2,499, and an ongoing Growth Partner retainer.",
    url: `${SITE_URL}/pricing`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE_URL}/pricing`,
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PricingContent />
    </>
  );
}
