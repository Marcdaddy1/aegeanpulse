import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { ArticleCard } from "@/components/sections/news/article-card";
import { ARTICLES, getArticle } from "@/data/articles";
import { SITE_NAME, SITE_URL } from "@/data/site";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/ai-news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: `${SITE_URL}/ai-news/${article.slug}`,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  ).slice(0, 3);
  const fallback = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const recommendations = related.length > 0 ? related : fallback;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    articleSection: article.category,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/ai-news/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="border-b border-border">
          <Container size="narrow" className="py-14 md:py-20">
            <Reveal>
              <Link
                href="/ai-news"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to AI News
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge tone="accent">{article.category}</Badge>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {article.readingTime} min read
                </span>
                <span className="text-sm text-muted">
                  {formatDate(article.date)}
                </span>
              </div>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-muted">
                {article.summary}
              </p>
            </Reveal>
          </Container>
        </header>

        <Container size="narrow" className="py-14 md:py-16">
          <Reveal>
            <div className="space-y-8">
              {article.body.map((block, i) => (
                <section key={i}>
                  {block.heading && (
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                      {block.heading}
                    </h2>
                  )}
                  {block.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="mt-4 text-lg leading-relaxed text-foreground/85"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </Reveal>
        </Container>
      </article>

      {/* Related */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
