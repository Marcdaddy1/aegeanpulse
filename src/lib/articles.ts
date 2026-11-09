import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleBlock,
  type ArticleCategory,
  type ArticleLeadMagnet,
  type ArticleNode,
} from "@/data/articles";

// Article content lives as one markdown file per article in
// src/content/articles/<slug>.md (frontmatter + prose). This loader parses
// them back into the same `Article` shape the site has always rendered, so
// the news pages/components didn't change when content moved out of the old
// hand-written array. Files with `draft: true` are invisible everywhere
// (list, detail pages, sitemap) until the flag is flipped — that's the
// review gate for AI-generated drafts.
//
// Format contract (generate-article.ts writes the plain subset):
// - "## " starts a new section.
// - "- " lines in a row form a bullet list; "1. " lines a numbered one.
// - "> " lines in a row form a worked-example slip; the first is its label.
// - Every other non-blank line is one paragraph.
// - **bold** inside any text renders as <strong> (e.g. a list item's lead-in).
// There are deliberately no inline links: the closing booking panel and the
// newsletter carry the calls to action.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "articles");

function parseBody(md: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let current: ArticleBlock = { nodes: [] };
  const last = (): ArticleNode | undefined =>
    current.nodes[current.nodes.length - 1];
  // A blank line ends a list or example, so two lists can sit back to back.
  let open = false;

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      open = false;
      continue;
    }
    if (line.startsWith("## ")) {
      if (current.heading || current.nodes.length) blocks.push(current);
      current = { heading: line.slice(3).trim(), nodes: [] };
      open = false;
    } else if (line.startsWith("- ") || /^\d+\. /.test(line)) {
      const ordered = !line.startsWith("- ");
      const item = line.replace(/^(- |\d+\. )/, "").trim();
      const prev = last();
      if (open && prev?.type === "list" && Boolean(prev.ordered) === ordered) prev.items.push(item);
      else current.nodes.push({ type: "list", items: [item], ...(ordered ? { ordered } : {}) });
      open = true;
    } else if (line.startsWith("> ")) {
      const prev = last();
      if (open && prev?.type === "example") prev.lines.push(line.slice(2).trim());
      else
        current.nodes.push({ type: "example", label: line.slice(2).trim(), lines: [] });
      open = true;
    } else {
      current.nodes.push({ type: "p", text: line });
      open = false;
    }
  }
  if (current.heading || current.nodes.length) blocks.push(current);
  return blocks;
}

// Scheduled publishing: an article whose date is after "today" (UTC, at
// build time) stays invisible even with draft: false. Two independent gates:
// draft = editorial approval, date = release schedule. The weekly VPS
// rebuild cron is what makes a due date actually go live (see CLAUDE.md
// publish flow).
const TODAY = new Date().toISOString().slice(0, 10);

function loadArticle(filename: string): Article | null {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  const { title, category, summary, date, readingTime, featured, image, imageAlt, ctaText, ctaHeading } =
    data as {
      title?: string;
      category?: string;
      summary?: string;
      date?: string;
      readingTime?: number;
      featured?: boolean;
      image?: string;
      imageAlt?: string;
      ctaText?: string;
      ctaHeading?: string;
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
  if (String(date) > TODAY) return null;
  // Hero image is optional (older articles have none), but never without alt
  // text — an inaccessible hero fails the build instead of shipping.
  if (image && !imageAlt) {
    throw new Error(`Article ${filename}: image requires imageAlt.`);
  }

  const body = parseBody(content);

  // A skip link must land on a real heading, and a lead magnet must point at
  // a file that ships; either mistake fails the build rather than a reader.
  const skipTo = data.skipTo as { heading?: string; label?: string } | undefined;
  if (skipTo) {
    if (!skipTo.heading || !skipTo.label) {
      throw new Error(`Article ${filename}: skipTo needs heading and label.`);
    }
    if (!body.some((b) => b.heading === skipTo.heading)) {
      throw new Error(`Article ${filename}: skipTo heading "${skipTo.heading}" is not a ## heading.`);
    }
  }
  const bookBarFrom = data.bookBarFrom as string | undefined;
  if (bookBarFrom && !body.some((b) => b.heading === bookBarFrom)) {
    throw new Error(`Article ${filename}: bookBarFrom "${bookBarFrom}" is not a ## heading.`);
  }
  const lead = data.leadMagnet as Partial<ArticleLeadMagnet> | undefined;
  if (lead) {
    const missing = (["title", "description", "file", "label", "pointer"] as const).filter(
      (k) => !lead[k],
    );
    if (missing.length) {
      throw new Error(`Article ${filename}: leadMagnet is missing ${missing.join(", ")}.`);
    }
    for (const file of [lead.file, lead.preview].filter(Boolean)) {
      if (!fs.existsSync(path.join(process.cwd(), "public", String(file)))) {
        throw new Error(`Article ${filename}: leadMagnet file ${file} is not in public/.`);
      }
    }
    if (lead.preview && !lead.previewAlt) {
      throw new Error(`Article ${filename}: leadMagnet preview requires previewAlt.`);
    }
  }

  return {
    slug,
    title,
    category: category as ArticleCategory,
    summary,
    date: String(date),
    readingTime: Number(readingTime) || 5,
    featured: featured === true,
    ...(image ? { image, imageAlt } : {}),
    ...(ctaText ? { ctaText: String(ctaText) } : {}),
    ...(ctaHeading ? { ctaHeading: String(ctaHeading) } : {}),
    ...(skipTo ? { skipTo: { heading: String(skipTo.heading), label: String(skipTo.label) } } : {}),
    ...(bookBarFrom ? { bookBarFrom: String(bookBarFrom) } : {}),
    ...(lead ? { leadMagnet: lead as ArticleLeadMagnet } : {}),
    body,
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
  // Exclude only the article actually shown in the featured slot — filtering
  // ALL featured:true entries made any older featured article vanish from the
  // list page entirely once a newer one took the slot.
  const featured = getFeaturedArticle();
  return ARTICLES.filter((a) => a.slug !== featured.slug);
}

export type { Article, ArticleBlock, ArticleCategory, ArticleLeadMagnet, ArticleNode };
