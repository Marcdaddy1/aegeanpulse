import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { NewsletterSignup } from "@/components/sections/shared/newsletter-signup";
import { ArticleCard } from "@/components/sections/news/article-card";
import { ArticleCta } from "@/components/sections/news/article-cta";
import { ARTICLES, getArticle, type ArticleNode } from "@/lib/articles";
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
      // Per-article social card when a hero exists; otherwise the site-wide
      // opengraph-image.tsx template applies.
      ...(article.image
        ? {
            images: [
              {
                url: `${SITE_URL}${article.image}`,
                width: 1600,
                height: 900,
                alt: article.imageAlt,
              },
            ],
          }
        : {}),
    },
  };
}

// Renders **bold** runs inside article text; everything else stays plain.
function Rich({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

// Body measure: ~70 characters per line on desktop (measured). The 768px
// column alone ran to ~82. 60ch, not 70ch: `ch` is the width of "0", which is
// wider than Inter's average letter.
const BODY_TEXT = "max-w-[60ch] text-pretty text-lg leading-relaxed text-foreground/85";

function BodyNode({ node }: { node: ArticleNode }) {
  if (node.type === "list") {
    return (
      <ul className={`mt-4 space-y-3 ${BODY_TEXT}`}>
        {node.items.map((item, i) => (
          <li
            key={i}
            className="relative pl-6 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-3 before:bg-accent"
          >
            <Rich text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (node.type === "example") {
    // A worked example reads as a ruled slip of notebook paper.
    return (
      <figure className="mt-6 max-w-[60ch] rounded-2xl border border-border bg-surface px-6 pb-2 pt-5 shadow-[0_1px_3px_rgba(28,35,33,0.04)] sm:px-7">
        <figcaption className="text-sm font-semibold text-accent">
          {node.label}
        </figcaption>
        <ul className="mt-3 divide-y divide-border">
          {node.lines.map((line, i) => (
            <li key={i} className="py-3 text-base leading-relaxed text-foreground/85">
              <Rich text={line} />
            </li>
          ))}
        </ul>
      </figure>
    );
  }
  return (
    <p className={`mt-4 ${BODY_TEXT}`}>
      <Rich text={node.text} />
    </p>
  );
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

  // schema.org requires Article.image and Article.publisher.logo — both were
  // previously absent (image only when the article had a hero, logo never),
  // which failed structured-data validation on every article page. The 12
  // older articles have no hero, so they fall back to the generated site OG
  // card rather than emitting no image at all.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    articleSection: article.category,
    image: article.image
      ? `${SITE_URL}${article.image}`
      : `${SITE_URL}/opengraph-image`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
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
          {/* Nothing on article pages uses Reveal: it ships opacity:0 in the
              server HTML, so content stayed blank until JavaScript hydrated.
              Most readers arrive from a social post inside an in-app browser,
              often on a slow connection. */}
          <Container size="narrow" className="py-14 md:py-20">
            <Link
              href="/ai-news"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
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
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-muted">
              {article.summary}
            </p>
          </Container>
        </header>

        {article.image && (
          <Container size="narrow" className="pt-10 md:pt-12">
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full rounded-2xl border border-border object-cover"
            />
          </Container>
        )}

        <Container size="narrow" className="py-14 md:py-16">
          <div className="space-y-8">
            {article.body.map((block, i) => (
              <section key={i}>
                {block.heading && (
                  <h2 className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground">
                    {block.heading}
                  </h2>
                )}
                {block.nodes.map((node, j) => (
                  <BodyNode key={j} node={node} />
                ))}
              </section>
            ))}
          </div>

          {/* One booking ask, then the newsletter as a quieter second option.
              The site-wide CtaBanner and the footer's CTA and newsletter are
              left off article pages so the end of an article has one next step. */}
          <ArticleCta heading={article.ctaHeading} text={article.ctaText} />

          <div className="mt-12 border-t border-border pt-10">
            <NewsletterSignup source="article" />
          </div>
        </Container>
      </article>

      {/* Related */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((a, i) =>
              // Two cards on phones and tablets; the third returns on desktop.
              i < 2 ? (
                <ArticleCard key={a.slug} article={a} />
              ) : (
                <div key={a.slug} className="hidden h-full lg:block">
                  <ArticleCard article={a} />
                </div>
              ),
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
