import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedArticle } from "@/components/sections/news/featured-article";
import { NewsGrid } from "@/components/sections/news/news-grid";
import { getFeaturedArticle, getGridArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "AI News & Insights",
  description:
    "Stay ahead of AI trends, tools, automation, and business adoption with practical insights and tutorials from AegeanPulse.",
  alternates: { canonical: "/ai-news" },
};

export default function AiNewsPage() {
  const featured = getFeaturedArticle();
  const grid = getGridArticles();

  return (
    <>
      <PageHero
        eyebrow="AI News & Insights"
        title="Stay ahead of what AI means for your business"
        description="Practical insights on AI trends, tools, automation, and adoption — written for business owners who want signal, not hype."
      />

      <Container className="py-16 md:py-20">
        <Reveal>
          <FeaturedArticle article={featured} />
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Latest articles
            </h2>
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <NewsGrid articles={grid} />
            </Reveal>
          </div>
        </div>
      </Container>

      <CtaBanner />
    </>
  );
}
