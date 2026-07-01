import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleBlock,
  type ArticleCategory,
} from "@/data/articles";

// Article content lives as one markdown file per article in
// src/content/articles/<slug>.md (frontmatter + prose). This loader parses
// them back into the same `Article` shape the site has always rendered, so
// the news pages/components didn't change when content moved out of the old
// hand-written array. Files with `draft: true` are invisible everywhere
// (list, detail pages, sitemap) until the flag is flipped — that's the
// review gate for AI-generated drafts.
//
// Format contract (mirrors scripts/migrate-articles-to-md.ts and
// generate-article.ts): "## " lines start a new block; every other non-blank
// line is one paragraph.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "articles");

function parseBody(md: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let current: ArticleBlock = { paragraphs: [] };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      if (current.heading || current.paragraphs.length) blocks.push(current);
      current = { heading: line.slice(3).trim(), paragraphs: [] };
    } else {
      current.paragraphs.push(line);
    }
  }
  if (current.heading || current.paragraphs.length) blocks.push(current);
  return blocks;
}

function loadArticle(filename: string): Article | null {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  const { title, category, summary, date, readingTime, featured } = data as {
    title?: string;
    category?: string;
    summary?: string;
    date?: string;
    readingTime?: number;
    featured?: boolean;
  };

  // Fail the build loudly with the offending filename rather than rendering
  // a broken article page.
  if (!title || !summary) {
    throw new Error(`Article ${filename}: frontmatter needs title and summary.`);
  }
  if (!category || !ARTICLE_CATEGORIES.includes(category as ArticleCategory)) {
    throw new Error(
      `Article ${filename}: category "${category}" must be one of: ${ARTICLE_CATEGORIES.join(", ")}`,
    );
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
    throw new Error(`Article ${filename}: date must be YYYY-MM-DD.`);
  }

  return {
    slug,
    title,
    category: category as ArticleCategory,
    summary,
    date: String(date),
    readingTime: Number(readingTime) || 5,
    featured: featured === true,
    body: parseBody(content),
  };
}

let cache: Article[] | null = null;

function loadAll(): Article[] {
  if (cache) return cache;
  const articles = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(loadArticle)
    .filter((a): a is Article => a !== null)
    // Newest first; slug tiebreak keeps ordering deterministic.
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  cache = articles;
  return articles;
}

export const ARTICLES: Article[] = loadAll();

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

export function getGridArticles(): Article[] {
  return ARTICLES.filter((a) => !a.featured);
}

export type { Article, ArticleBlock, ArticleCategory };
