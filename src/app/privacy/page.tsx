import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SITE_NAME, CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your personal data.`,
  alternates: { canonical: "/privacy" },
};

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "Overview",
    paragraphs: [
      `This Privacy Policy explains how ${SITE_NAME} ("we", "us") collects, uses, and protects information when you visit our website or contact us. We keep this policy short and honest, and we only collect what we need to help you.`,
    ],
  },
  {
    heading: "Data we collect",
    paragraphs: ["We collect limited information, only when you provide it:"],
    list: [
      "Contact details you submit through our contact form (name, email, company, and your message).",
      "Booking information you provide when scheduling a consultation through our booking provider (Cal.com).",
      "A small cookie that stores your approximate country (derived from your IP region) so we can show prices in your local currency. It does not identify you.",
    ],
  },
  {
    heading: "How we use your data",
    paragraphs: ["We use the information you provide to:"],
    list: [
      "Respond to your enquiries and provide the services you ask about.",
      "Schedule and manage consultations you book with us.",
      "Display relevant pricing in your local currency.",
      "Improve our website and the way we communicate.",
    ],
  },
  {
    heading: "Data sharing",
    paragraphs: [
      "We do not sell your personal data. We share information only with the service providers needed to operate our site and bookings (such as our hosting provider and Cal.com), and only as far as necessary to provide those services.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "We keep enquiry and booking information only as long as needed to respond to you and maintain our business records, after which it is deleted or anonymized.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can request access to, correction of, or deletion of the personal data we hold about you at any time. To do so, contact us using the details below and we will respond promptly.",
    ],
  },
  {
    heading: "Contact for privacy requests",
    paragraphs: [
      `For any privacy questions or requests, email us at ${CONTACT_EMAIL} and we’ll be happy to help.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="We respect your privacy and collect only what we need. Here’s exactly what we gather and how we use it."
      />
      <Container size="narrow" className="py-16 md:py-20">
        <Reveal>
          <p className="text-sm text-muted">Last updated: June 2026</p>
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
