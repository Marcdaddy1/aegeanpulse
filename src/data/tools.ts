export type ToolCategory =
  | "Chatbots"
  | "Content Creation"
  | "Automation"
  | "SEO"
  | "Design"
  | "Agents"
  | "Productivity"
  | "Analytics";

export type Pricing = "Free" | "Freemium" | "Paid" | "Enterprise";

export interface Tool {
  name: string;
  category: ToolCategory;
  description: string;
  pricing: Pricing;
  url: string;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Chatbots",
  "Content Creation",
  "Automation",
  "SEO",
  "Design",
  "Agents",
  "Productivity",
  "Analytics",
];

export const TOOLS: Tool[] = [
  {
    name: "ChatGPT",
    category: "Chatbots",
    description:
      "Versatile AI assistant for drafting, brainstorming, support replies, and everyday business tasks.",
    pricing: "Freemium",
    url: "https://chat.openai.com",
  },
  {
    name: "Claude",
    category: "Chatbots",
    description:
      "Thoughtful AI assistant strong at long documents, analysis, and careful, natural writing.",
    pricing: "Freemium",
    url: "https://claude.ai",
  },
  {
    name: "Gemini",
    category: "Chatbots",
    description:
      "Google's multimodal assistant, tightly integrated with Workspace, search, and productivity apps.",
    pricing: "Freemium",
    url: "https://gemini.google.com",
  },
  {
    name: "Perplexity",
    category: "Analytics",
    description:
      "AI answer engine that researches the web and cites sources — ideal for fast market research.",
    pricing: "Freemium",
    url: "https://www.perplexity.ai",
  },
  {
    name: "Midjourney",
    category: "Design",
    description:
      "High-end AI image generation for striking, on-brand marketing and concept visuals.",
    pricing: "Paid",
    url: "https://www.midjourney.com",
  },
  {
    name: "Runway",
    category: "Content Creation",
    description:
      "AI video generation and editing suite for short-form content, ads, and creative production.",
    pricing: "Freemium",
    url: "https://runwayml.com",
  },
  {
    name: "ElevenLabs",
    category: "Content Creation",
    description:
      "Realistic AI voice generation for voiceovers, IVR, and AI phone or appointment agents.",
    pricing: "Freemium",
    url: "https://elevenlabs.io",
  },
  {
    name: "Zapier",
    category: "Automation",
    description:
      "Connects thousands of apps to automate repetitive workflows with AI steps built in.",
    pricing: "Freemium",
    url: "https://zapier.com",
  },
  {
    name: "n8n",
    category: "Automation",
    description:
      "Powerful workflow automation you can self-host, with deep AI and custom-logic support.",
    pricing: "Freemium",
    url: "https://n8n.io",
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description:
      "AI writing and knowledge assistant built into the Notion workspace your team already uses.",
    pricing: "Freemium",
    url: "https://www.notion.so/product/ai",
  },
  {
    name: "Jasper",
    category: "Content Creation",
    description:
      "Marketing-focused AI copy platform with brand voice controls and campaign workflows.",
    pricing: "Paid",
    url: "https://www.jasper.ai",
  },
  {
    name: "Descript",
    category: "Content Creation",
    description:
      "Edit video and podcasts by editing text, with AI transcription, cleanup, and dubbing.",
    pricing: "Freemium",
    url: "https://www.descript.com",
  },
  {
    name: "Synthesia",
    category: "Content Creation",
    description:
      "Create studio-quality AI avatar videos for training, onboarding, and explainers without filming.",
    pricing: "Paid",
    url: "https://www.synthesia.io",
  },
  {
    name: "Canva",
    category: "Design",
    description:
      "Approachable design platform with AI tools for graphics, presentations, and brand kits.",
    pricing: "Freemium",
    url: "https://www.canva.com",
  },
  {
    name: "Airtable AI",
    category: "Productivity",
    description:
      "Flexible database with AI fields to summarize, categorize, and act on your business data.",
    pricing: "Freemium",
    url: "https://www.airtable.com/product/ai",
  },
  {
    name: "Make",
    category: "Automation",
    description:
      "Visual automation platform for building multi-step, AI-powered workflows across your stack.",
    pricing: "Freemium",
    url: "https://www.make.com",
  },
  {
    name: "Replit",
    category: "Agents",
    description:
      "Browser-based coding platform with an AI agent that builds and ships apps from prompts.",
    pricing: "Freemium",
    url: "https://replit.com",
  },
  {
    name: "Lovable",
    category: "Agents",
    description:
      "AI app builder that turns plain-language descriptions into working web apps and prototypes.",
    pricing: "Freemium",
    url: "https://lovable.dev",
  },
  {
    name: "Cursor",
    category: "Agents",
    description:
      "AI-native code editor that writes, edits, and refactors code alongside your developers.",
    pricing: "Freemium",
    url: "https://www.cursor.com",
  },
];
