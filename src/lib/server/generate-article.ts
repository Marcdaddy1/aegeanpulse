import "server-only";
import fs from "node:fs";
import path from "node:path";
import type Anthropic from "@anthropic-ai/sdk";
import { getAnthropicClient, CLAUDE_MODEL } from "@/lib/anthropic";
import { CONTENT_TOPICS, type ContentTopic } from "@/data/content-topics";
import { SITE_NAME, SITE_URL, CAL_URL } from "@/data/site";

// AI article drafting. Writes src/content/articles/<slug>.md with
// `draft: true` — the article is invisible on the site until a human reviews
// the file, edits as needed, and flips draft to false (see src/lib/articles.ts).
// Structured output is enforced via a forced tool call so the result always
// parses; no regex-scraping of free-form model text.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "articles");

const ARTICLE_TOOL: Anthropic.Tool = {
  name: "write_article",
  description: "Submit the finished article in structured form.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "Final headline, <= 70 chars, includes the target keyword naturally" },
      summary: { type: "string", description: "1-2 sentence standfirst used as the meta description, <= 160 chars" },
      readingTimeMinutes: { type: "integer", description: "Honest estimated reading time" },
      blocks: {
        type: "array",
        description: "Article body: an intro block (no heading) followed by 4-7 headed sections",
        items: {
          type: "object",
          properties: {
            heading: { type: "string", description: "Section heading (omit for the intro block)" },
            paragraphs: {
              type: "array",
              items: { type: "string" },
              description: "1-4 paragraphs of plain prose. No markdown syntax inside paragraphs.",
            },
          },
          required: ["paragraphs"],
        },
      },
    },
    required: ["title", "summary", "readingTimeMinutes", "blocks"],
  },
};

interface GeneratedArticle {
  title: string;
  summary: string;
  readingTimeMinutes: number;
  blocks: { heading?: string; paragraphs: string[] }[];
}

function draftPrompt(topic: ContentTopic): string {
  return `Write an article for the ${SITE_NAME} blog (${SITE_URL}/ai-news). ${SITE_NAME} is a UK-based AI consultancy for small businesses — practical, commercially grounded, anti-hype.

Topic brief:
- Working title: ${topic.workingTitle}
- Target keyword (use naturally in the title, early in the intro, and in at least one heading): ${topic.targetKeyword}
- Content cluster: ${topic.cluster}
- Angle: ${topic.angle}

Voice and style (match the existing blog):
- Plain UK English, confident and concrete. Short sentences. No buzzwords, no "in today's fast-paced world" filler.
- Practical over promotional: the reader should leave with something they can act on even if they never contact us.
- Use British spelling (prioritise, organisation) and GBP for money.
- Where the brief references ${SITE_NAME} packages or booking, mention them honestly at most once or twice; the booking link is ${CAL_URL}. Never invent testimonials, statistics, client names, or specific research citations.
- 1,000-1,400 words total. Intro block first (no heading), then 4-7 headed sections.

When done, submit via the write_article tool.`;
}

/** First topic whose article file doesn't exist yet — filesystem is the queue state. */
export function nextPendingTopic(): ContentTopic | null {
  for (const topic of CONTENT_TOPICS) {
    if (!fs.existsSync(path.join(CONTENT_DIR, `${topic.slug}.md`))) return topic;
  }
  return null;
}

const yamlStr = (s: string) => JSON.stringify(s);

export interface DraftResult {
  slug: string;
  title: string;
  file: string;
}

export async function generateDraft(): Promise<DraftResult | null> {
  const topic = nextPendingTopic();
  if (!topic) return null;

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8000,
    messages: [{ role: "user", content: draftPrompt(topic) }],
    tools: [ARTICLE_TOOL],
    tool_choice: { type: "tool", name: "write_article" },
  });

  const toolBlock = response.content.find((b) => b.type === "tool_use");
  if (!toolBlock || toolBlock.type !== "tool_use") {
    throw new Error("Model did not return a structured article.");
  }
  const article = toolBlock.input as GeneratedArticle;
  if (!article.title || !article.summary || !article.blocks?.length) {
    throw new Error("Structured article was incomplete.");
  }

  const today = new Date().toISOString().slice(0, 10);
  const fm = [
    "---",
    `title: ${yamlStr(article.title)}`,
    `category: ${yamlStr(topic.category)}`,
    `summary: ${yamlStr(article.summary.slice(0, 200))}`,
    `date: ${yamlStr(today)}`,
    `readingTime: ${Math.min(Math.max(Math.round(article.readingTimeMinutes) || 5, 3), 20)}`,
    "draft: true",
    "---",
  ].join("\n");

  const body = article.blocks
    .map((block) => {
      const lines = [];
      if (block.heading) lines.push(`## ${block.heading.trim()}`);
      for (const p of block.paragraphs) {
        // One paragraph per line, blank-line separated — the loader's format
        // contract. Strip embedded newlines so a paragraph can't split.
        lines.push(p.replace(/\s*\n\s*/g, " ").trim());
      }
      return lines.join("\n\n");
    })
    .join("\n\n");

  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  const file = path.join(CONTENT_DIR, `${topic.slug}.md`);
  fs.writeFileSync(file, `${fm}\n\n${body}\n`, "utf-8");

  return { slug: topic.slug, title: article.title, file: path.relative(process.cwd(), file) };
}
