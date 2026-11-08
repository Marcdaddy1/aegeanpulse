import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, Clock } from "lucide-react";
import { headingId } from "@/data/articles";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { NewsletterSignup } from "@/components/sections/shared/newsletter-signup";
import { ArticleCard } from "@/components/sections/news/article-card";
import { ArticleCta } from "@/components/sections/news/article-cta";
import { MobileBookBar } from "@/components/sections/news/mobile-book-bar";
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

// A numeral in the display face, shared by the numbered list and the slip so
// question 3 and slip line 3 read as the same thing (the PDF numbers match).
const NUMERAL = "font-display font-semibold tabular-nums text-accent";

function BodyNode({ node, numbered = false }: { node: ArticleNode; numbered?: boolean }) {
  if (node.type === "list" && node.ordered) {
    // A numbered list is the article's checklist: each item leads with its
    // question in bold, set here as its own line so the list can be scanned.
    // role="list" keeps list semantics in Safari, which drops them from a
    // list with list-style: none. The numerals stay readable to assistive tech.
    return (
      <ol role="list" className={`mt-6 space-y-6 ${BODY_TEXT}`}>
        {node.items.map((item, i) => {
          const lead = /^\*\*(.+?)\*\*\s*(.*)$/.exec(item);
          return (
            <li key={i} className="grid grid-cols-[1.75rem_1fr] gap-x-2 sm:grid-cols-[2.25rem_1fr]">
              <span className={`${NUMERAL} text-2xl leading-8`}>{i + 1}</span>
              {lead ? (
                <div>
                  <h3 className="text-balance font-display text-xl font-semibold leading-8 tracking-tight text-foreground">
                    {lead[1]}
                  </h3>
                  {lead[2] && (
                    <p className="mt-1">
                      <Rich text={lead[2]} />
                    </p>
                  )}
                </div>
              ) : (
                <p className="pt-0.5">
                  <Rich text={item} />
                </p>
              )}
            </li>
          );
        })}
      </ol>
    );
  }
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
    // A worked example reads as a ruled slip of notebook paper: each
    // "**Label:** value" line is a field label over (or, on wider screens,
    // beside) its filled-in value, like a form someone has completed.
    return (
      <figure
        id="worked-example"
        className="mt-6 max-w-[60ch] rounded-2xl border border-border bg-surface px-6 pb-2 pt-5 shadow-[0_1px_3px_rgba(28,35,33,0.04)] sm:px-7"
      >
        <figcaption className="text-sm font-semibold text-accent">
          {node.label}
        </figcaption>
        <ul className="mt-3 divide-y divide-border">
          {node.lines.map((line, i) => {
            const field = /^\*\*(.+?):?\*\*:?\s*(.*)$/.exec(line);
            return (
              <li key={i} className="py-3 text-base leading-relaxed">
                {field ? (
                  <div className="sm:grid sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                    <span className="block text-sm font-semibold text-foreground sm:pt-0.5">
                      {/* Numbered when each line answers the same-numbered question. */}
                      {numbered && (
                        <span className={`${NUMERAL} inline-block w-5 text-base`}>{i + 1}</span>
                      )}
                      {field[1]}
                    </span>
                    <span className={`block text-foreground/85 ${numbered ? "pl-5 sm:pl-0" : ""}`}>
                      {/* Stacked under its label, the value reads as its own line. */}
                      <Rich text={field[2].charAt(0).toUpperCase() + field[2].slice(1)} />
                    </span>
                  </div>
                ) : (
                  <span className="text-foreground/85">
                    <Rich text={line} />
                  </span>
                )}
              </li>
            );
          })}
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

  // The first worked example, if any: the booking bar starts after it.
  const exampleAt = { block: -1, node: -1 };
  article.body.some((b, bi) => {
    const ni = b.nodes.findIndex((n) => n.type === "example");
    if (ni === -1) return false;
    exampleAt.block = bi;
    exampleAt.node = ni;
    return true;
  });

  // The worked example is numbered when its labelled lines answer an ordered
  // list one-for-one (the six questions and the six slip lines).
  const nodes = article.body.flatMap((b) => b.nodes);
  const ordered = nodes.find(
    (n): n is Extract<ArticleNode, { type: "list" }> => n.type === "list" && Boolean(n.ordered),
  );
  const example = nodes.find(
    (n): n is Extract<ArticleNode, { type: "example" }> => n.type === "example",
  );
  const numberSlip = Boolean(ordered && example && example.lines.length === ordered.items.length);
  const lead = article.leadMagnet;

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
          {/* Phones: the first screen used to be chrome, a back link and type,
              with the hero image starting below the fold. The back link now
              lives in the meta row and the spacing is tighter, so the image
              starts on the first screen. */}
          <Container size="narrow" className="pb-6 pt-4 md:py-20">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link
                href="/ai-news"
                className="-ml-1 inline-flex min-h-11 items-center gap-1 rounded-full px-1 text-sm font-medium text-accent hover:text-accent-strong"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                AI News
              </Link>
              <Badge tone="accent">{article.category}</Badge>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {article.readingTime} min read
              </span>
              <time dateTime={article.date} className="text-sm text-muted">
                {formatDate(article.date)}
              </time>
            </div>
            <h1 className="mt-4 text-balance font-display text-[2rem] font-semibold leading-tight tracking-tight text-foreground sm:mt-6 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted sm:mt-5 sm:text-xl">
              {article.summary}
            </p>
            {article.skipTo && (
              <a
                href={`#${headingId(article.skipTo.heading)}`}
                className="-ml-1 mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-medium text-accent hover:text-accent-strong"
              >
                {article.skipTo.label}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </Container>
        </header>

        {article.image && (
          <Container size="narrow" className="pt-6 md:pt-12">
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

        <Container size="narrow" className="pb-14 pt-8 md:py-16">
          <div className="space-y-8">
            {article.body.map((block, i) => (
              <section key={i}>
                {/* Fallback start for the phone booking bar when an article
                    has no worked example: 60% into the body. */}
                {exampleAt.block === -1 && i === Math.floor(article.body.length * 0.6) && (
                  <div id="book-bar-start" aria-hidden="true" />
                )}
                {block.heading && (
                  <h2
                    id={headingId(block.heading)}
                    className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground"
                  >
                    {block.heading}
                  </h2>
                )}
                {block.nodes.map((node, j) => (
                  <Fragment key={j}>
                    <BodyNode node={node} numbered={node.type === "example" && numberSlip} />
                    {i === exampleAt.block && j === exampleAt.node && (
                      <>
                        {/* The booking bar waits until the reader has had
                            something useful: it starts after the example. */}
                        <div id="book-bar-start" aria-hidden="true" />
                        {lead && (
                          // The reward is visible where the reader decides
                          // they want it: a small picture of the page itself.
                          <a
                            href="#get-the-rulebook"
                            className="group mt-4 flex max-w-[60ch] items-center gap-4 rounded-xl py-1 text-sm font-medium text-accent hover:text-accent-strong"
                          >
                            {lead.preview && (
                              <Image
                                src={lead.preview}
                                alt=""
                                width={1191}
                                height={1684}
                                sizes="48px"
                                className="w-12 shrink-0 rounded-[3px] border border-border bg-white shadow-[0_2px_6px_-2px_rgba(28,35,33,0.25)] transition-transform duration-200 group-hover:-rotate-2 motion-reduce:transition-none"
                              />
                            )}
                            <span className="inline-flex items-center gap-1.5">
                              {lead.pointer}
                              <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </span>
                          </a>
                        )}
                      </>
                    )}
                  </Fragment>
                ))}
              </section>
            ))}
          </div>

          {/* One booking ask, then the newsletter as a quieter second option.
              The site-wide CtaBanner and the footer's CTA and newsletter are
              left off article pages so the end of an article has one next step. */}
          <ArticleCta heading={article.ctaHeading} text={article.ctaText} />

          <div
            id={lead ? "get-the-rulebook" : undefined}
            data-hide-chat
            className="group mt-12 border-t border-border pt-10"
          >
            {lead ? (
              <>
                {/* Shown only to readers who jumped here from the pointer
                    under the example (this block is then the URL's :target),
                    so they can get back to where they were reading. */}
                {exampleAt.block !== -1 && (
                  <a
                    href="#worked-example"
                    className="-ml-1 mb-4 hidden min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-medium text-accent hover:text-accent-strong group-target:inline-flex"
                  >
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                    Back to the example
                  </a>
                )}
                <div
                  className={
                    lead.preview
                      ? "grid gap-7 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-8"
                      : undefined
                  }
                >
                  {lead.preview && (
                    // The page itself, so the reader sees what they get before
                    // giving an email: a printed sheet, white, slightly askew.
                    <Image
                      src={lead.preview}
                      alt={lead.previewAlt ?? ""}
                      width={1191}
                      height={1684}
                      sizes="160px"
                      className="w-40 -rotate-[1.5deg] rounded-[4px] border border-border bg-white shadow-[0_10px_24px_-10px_rgba(28,35,33,0.35)]"
                    />
                  )}
                  <NewsletterSignup
                    source="article-rulebook"
                    titleAs="h2"
                    title={lead.title}
                    description={lead.description}
                    download={{ href: lead.file, label: lead.label }}
                  />
                </div>
              </>
            ) : (
              <NewsletterSignup
                source="article"
                titleAs="h2"
                title="Want the next one?"
                description="New practical guides like this one, by email. No spam, unsubscribe anytime."
              />
            )}
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

      <MobileBookBar />
    </>
  );
}
