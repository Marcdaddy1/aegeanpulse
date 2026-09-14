import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SITE_NAME, CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use ${SITE_NAME}'s website and services.`,
  alternates: { canonical: "/terms" },
  // Without this, og:url falls back to the root layout's homepage URL
  // and disagrees with the canonical above.
  openGraph: { url: "/terms" },
};

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "Acceptance of these terms",
    paragraphs: [
      `These Terms of Service govern your use of the ${SITE_NAME} website and any services you book or purchase through it. By using this site or engaging our services, you agree to these terms. If you don't agree, please don't use the site.`,
    ],
  },
  {
    heading: "Our services",
    paragraphs: [
      `${SITE_NAME} provides AI automation, agent, and website-building services for small businesses, delivered under the packages described on our Pricing and Services pages. Specific deliverables, timelines, and scope for a paid engagement are agreed separately in writing (for example, in a proposal, invoice, or statement of work) and take precedence over the general descriptions on this site.`,
    ],
  },
  {
    heading: "Website use",
    paragraphs: [
      "You may browse and use this site for lawful purposes only. You agree not to misuse the site — for example, by attempting to disrupt it, scrape it at scale, or use it to distribute malicious content.",
    ],
  },
  {
    heading: "Pricing and payment",
    paragraphs: [
      "Prices on this site are shown in GBP by default and converted to an approximate equivalent in your local currency based on your region — the GBP price is the one that applies unless we agree otherwise in writing. Package pricing, inclusions, and payment terms are as stated on our Pricing page at the time of booking, or as set out in your proposal or invoice if different.",
    ],
  },
  {
    heading: "Consultations and bookings",
    paragraphs: [
      "Consultations are scheduled through our booking provider, Cal.com. If you need to reschedule or cancel, please do so as early as possible using the link in your booking confirmation. Repeated no-shows may affect our ability to offer future bookings.",
    ],
  },
  {
    heading: "AI chat assistant",
    paragraphs: [
      "Our website chat assistant is an AI system (built on Anthropic's Claude) that can answer questions about our services and help arrange bookings. Its responses are generated automatically, may occasionally be incomplete or inaccurate, and don't constitute professional, financial, or legal advice. Please confirm anything important — pricing, scope, or booking details — directly with us before relying on it.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      `Unless stated otherwise, the content on this site — text, design, graphics, and code — belongs to ${SITE_NAME} or its licensors. You may view and share it for personal, non-commercial reference, but not reproduce or repurpose it commercially without our permission. Deliverables you commission and pay for under a separate agreement are governed by the terms of that agreement.`,
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: [
      "We rely on third-party providers to run parts of this site and our services, including our hosting provider, Cal.com (bookings), Anthropic (the chat assistant), and Hostinger Reach (our newsletter). Their own terms and privacy practices apply to the parts of the service they provide — see our Privacy Policy for how we use them.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      `To the fullest extent permitted by law, ${SITE_NAME} is not liable for indirect or consequential loss arising from your use of this website. This doesn't affect any liability we can't legally exclude, or the specific liability terms in a separate written agreement covering a paid engagement.`,
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time to reflect changes to our services or legal requirements. The version on this page is the one that applies — please check back periodically if you use our services on an ongoing basis.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of England and Wales, and any disputes are subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions about these terms? Email us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that apply when you use our website or book our services."
      />
      <Container size="narrow" className="py-16 md:py-20">
        <Reveal>
          <p className="text-sm text-muted">Last updated: September 2026</p>
          <div className="mt-10 space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="leading-relaxed text-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Reveal>
      </Container>
    </>
  );
}
