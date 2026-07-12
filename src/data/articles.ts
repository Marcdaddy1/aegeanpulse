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

export interface ArticleBlock {
  heading?: string;
  paragraphs: string[];
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
  body: ArticleBlock[];
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
