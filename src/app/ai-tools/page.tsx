import type { Metadata } from "next";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ToolsDirectory } from "@/components/sections/tools/tools-directory";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Discover the best current AI tools for business growth, automation, content, and productivity — curated and categorized by AegeanPulse.",
  alternates: { canonical: "/ai-tools" },
};

export default function AiToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Tools Directory"
        title="The AI tools worth your time"
        description="A curated directory of current AI tools for business growth, automation, content, and productivity. Filter by category to find the right fit — every tool here is one we'd genuinely recommend exploring."
      />

      <Container className="py-16 md:py-20">
        <Reveal>
          <ToolsDirectory />
        </Reveal>

        {/* Submit a tool */}
        <Reveal>
          <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-accent-soft/40 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white">
                  <PlusCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
                  Built or found a tool we should feature?
                </h2>
                <p className="mt-2 text-muted">
                  Submit an AI tool for consideration in our directory. We
                  review every submission for quality and relevance to small
                  businesses.
                </p>
              </div>
              <Button href="/contact#tool-submissions" size="lg">
                Submit a Tool
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
