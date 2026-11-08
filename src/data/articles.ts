// Article types + client-safe constants. The article CONTENT lives as one
// markdown file per article in src/content/articles/, loaded server-side by
// src/lib/articles.ts (which exports ARTICLES / getArticle / etc.). This
// module stays free of fs/server imports so client components (cards, grid
// filters) can import the types and category list directly.

export type ArticleCategory =
  | "AI News"
  | "Automation"
  | "Agents"
  | "Content"
  | "SEO"
  | "Small Business"
  | "Tutorials";

/** One piece of an article section, in reading order. Text may carry
 *  **bold** runs, which render as <strong>. */
export type ArticleNode =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "example"; label: string; lines: string[] };

export interface ArticleBlock {
  heading?: string;
  nodes: ArticleNode[];
}

export interface Article {
  slug: string;
  category: ArticleCategory;
  title: string;
  summary: string;
  readingTime: number;
  date: string;
  featured?: boolean;
  /** Hero image path under /public, e.g. "/images/articles/<slug>.webp". */
  image?: string;
  /** Accessible description of the hero image; required whenever image is set. */
  imageAlt?: string;
  /** Article-specific line for the closing booking panel; a default applies when absent. */
  ctaText?: string;
  /** Article-specific heading for the closing booking panel. */
  ctaHeading?: string;
  /** A jump link under the standfirst to the section that holds the payoff.
   *  `heading` must match one of the article's `## ` headings exactly. */
  skipTo?: { heading: string; label: string };
  /** A free download offered with the newsletter sign-up on this article. */
  leadMagnet?: ArticleLeadMagnet;
  body: ArticleBlock[];
}

export interface ArticleLeadMagnet {
  /** Newsletter block heading, e.g. "Get the one-page agent rulebook". */
  title: string;
  description: string;
  /** Path under /public, e.g. "/downloads/agent-rulebook.pdf". */
  file: string;
  /** Download link text, e.g. "Download the rulebook (PDF)". */
  label: string;
  /** Mid-article pointer shown after the first worked example. */
  pointer: string;
}

/** Heading text → anchor id, shared by the page and the build-time check. */
export function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "AI News",
  "Automation",
  "Agents",
  "Content",
  "SEO",
  "Small Business",
  "Tutorials",
];
