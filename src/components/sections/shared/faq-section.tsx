"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import type { FAQ } from "@/data/faqs";
import { cn } from "@/lib/utils";

function FaqItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
      )}
    </div>
  );
}

interface FaqSectionProps {
  faqs: FAQ[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "default" | "muted";
}

export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Common questions",
  description,
  tone = "default",
}: FaqSectionProps) {
  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-10">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} faq={faq} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
