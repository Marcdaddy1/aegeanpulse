import type { ArticleCategory } from "./articles";

// Topic queue for the AI drafting pipeline (src/lib/server/generate-article.ts).
// The generator takes the FIRST topic whose article file does not yet exist in
// src/content/articles/ — so "status" is derived from the filesystem, never
// tracked here: file exists = drafted; frontmatter draft:false = published.
// That makes generation idempotent (a double-fired cron can't create dupes).
//
// Seeded from the content strategy's three clusters (AI Automation, AI
// Chatbots, AI Consulting), excluding angles already covered by live articles.
// Add new topics to the END of the list; the queue drains top-down.

export interface ContentTopic {
  /** Becomes the article filename/URL: /ai-news/<slug>. Keyword-rich. */
  slug: string;
  workingTitle: string;
  targetKeyword: string;
  cluster: "AI Automation" | "AI Chatbots" | "AI Consulting";
  category: ArticleCategory;
  /** Brief for the AI: the angle, intent, and anything it must cover. */
  angle: string;
}

export const CONTENT_TOPICS: ContentTopic[] = [
  {
    slug: "ai-automation-cost-small-business",
    workingTitle: "AI Automation Cost: What Small Businesses Actually Pay in 2026",
    targetKeyword: "AI automation cost small business",
    cluster: "AI Automation",
    category: "Small Business",
    angle:
      "Commercial-intent pricing guide. Break costs into platform/subscription, build, and maintenance. Give honest realistic ranges in GBP. Reference that AegeanPulse's own fixed-scope packages start at £499 (Discovery) and £2,499 (Builder) as concrete data points, without turning the article into a sales page. End with how to budget for a first project.",
  },
  {
    slug: "automate-customer-follow-up-ai",
    workingTitle: "How to Automate Customer Follow-Up with AI (No Code Required)",
    targetKeyword: "AI follow-up automation small business",
    cluster: "AI Automation",
    category: "Automation",
    angle:
      "Practical how-to. The problem: leads going cold because follow-up is manual. Walk through what an automated follow-up workflow looks like end to end (enquiry → draft reply → send/approve → CRM log → scheduled nudges), which off-the-shelf tools can do it, and where a done-for-you build makes more sense.",
  },
  {
    slug: "ai-automation-vs-zapier",
    workingTitle: "AI Automation vs. Zapier: What's the Difference?",
    targetKeyword: "AI automation vs Zapier",
    cluster: "AI Automation",
    category: "Automation",
    angle:
      "Comparison post for buyers who know Zapier. Zapier = deterministic trigger-action plumbing; AI automation = handles unstructured input and judgement calls. They compose: Zapier/Make as transport, AI as the brain. Include a 'which do you need' decision guide.",
  },
  {
    slug: "ai-chatbot-cost-small-business",
    workingTitle: "How Much Does an AI Chatbot Cost for a Small Business?",
    targetKeyword: "AI chatbot cost small business",
    cluster: "AI Chatbots",
    category: "Agents",
    angle:
      "Commercial-intent pricing guide. DIY tools vs done-for-you builds; setup vs running costs (model usage is pennies at small-business volume — say so honestly); what drives cost up (integrations, training data, human handoff). Realistic GBP ranges.",
  },
  {
    slug: "ai-chatbot-vs-live-chat",
    workingTitle: "AI Chatbot vs. Live Chat: Which Is Better for Small Business?",
    targetKeyword: "AI chatbot vs live chat",
    cluster: "AI Chatbots",
    category: "Agents",
    angle:
      "Comparison post. Live chat quality depends on someone actually answering; AI answers instantly 24/7 but needs guardrails. The winning setup for most small teams is AI-first with clean human handoff. Include response-time expectations and staffing reality.",
  },
  {
    slug: "train-ai-chatbot-business-knowledge",
    workingTitle: "How to Train an AI Chatbot on Your Business's Knowledge",
    targetKeyword: "train AI chatbot on business data",
    cluster: "AI Chatbots",
    category: "Tutorials",
    angle:
      "Practical tutorial, no code. What 'training' actually means today (grounding/context, not model training); gathering FAQs, policies, tone examples; keeping it from making things up; testing before launch; keeping content fresh.",
  },
  {
    slug: "when-to-hire-ai-consultant",
    workingTitle: "How to Know If You're Ready to Hire an AI Consultant",
    targetKeyword: "when to hire AI consultant",
    cluster: "AI Consulting",
    category: "Small Business",
    angle:
      "Informational, builds authority. Signals you're ready (repeatable friction, tool overwhelm, stalled experiments) vs signals you're not (no clear process, expecting magic). What a good engagement looks like; questions to ask any consultant before hiring them — including us.",
  },
  {
    slug: "ai-readiness-checklist-small-business",
    workingTitle: "AI Readiness Checklist for Small Businesses",
    targetKeyword: "AI readiness checklist",
    cluster: "AI Consulting",
    category: "Small Business",
    angle:
      "Shareable checklist format. Sections: process clarity, data access, team appetite, budget honesty, success metrics. Each checklist item gets a one-paragraph explanation. Backlink-friendly; end with what to do about the gaps it exposes.",
  },
  {
    slug: "ai-strategy-session-what-to-expect",
    workingTitle: "What Does an AI Strategy Session Actually Include?",
    targetKeyword: "AI strategy consultation",
    cluster: "AI Consulting",
    category: "Small Business",
    angle:
      "Commercial-intent. Demystify a strategy engagement: audit, prioritisation, roadmap, tooling and budget recommendations, risk review. Use AegeanPulse's Discovery package structure as the concrete example of deliverables, honestly and without hard selling.",
  },
];
