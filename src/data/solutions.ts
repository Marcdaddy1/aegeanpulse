import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Bot,
  PenLine,
  FileText,
  Palette,
  Search,
  Workflow,
  BookOpen,
} from "lucide-react";

export interface Solution {
  slug: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  implementation: string;
  benefit: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "customer-support-chatbots",
    icon: MessageSquare,
    title: "Customer Support Chatbots",
    problem:
      "Repetitive questions overwhelm your team and slow down response times for customers.",
    implementation:
      "A trained chatbot on your site and channels that answers FAQs, handles common requests, and hands off cleanly to a human when needed.",
    benefit:
      "Faster replies around the clock and a support team freed up for the conversations that matter.",
  },
  {
    slug: "ai-virtual-assistants",
    icon: Bot,
    title: "AI Virtual Assistants",
    problem:
      "Admin, scheduling, and routine follow-ups eat hours that should go to real work.",
    implementation:
      "An AI assistant that books appointments, qualifies enquiries, drafts replies, and keeps your pipeline moving automatically.",
    benefit:
      "Hours back every week and fewer leads lost to slow follow-up.",
  },
  {
    slug: "automated-content-creation",
    icon: PenLine,
    title: "Automated AI Content Creation",
    problem:
      "Publishing consistently is hard when content competes with running the business.",
    implementation:
      "A content system that drafts posts, emails, and captions in your voice from a simple brief, with human review built in.",
    benefit:
      "A steady publishing rhythm without hiring a full content team.",
  },
  {
    slug: "eeat-blog-content",
    icon: FileText,
    title: "EEAT-Focused Blog Content",
    problem:
      "Generic AI articles don't rank and can quietly damage your credibility.",
    implementation:
      "Research-backed, expertise-driven blog content built around real experience, sources, and search intent — not thin output.",
    benefit:
      "Articles that earn trust, rank, and bring in qualified traffic over time.",
  },
  {
    slug: "ai-graphic-design",
    icon: Palette,
    title: "AI Graphic Design Strategy",
    problem:
      "On-brand visuals are slow and expensive to produce at the volume modern marketing needs.",
    implementation:
      "A repeatable AI-assisted design workflow with brand-locked templates for social, ads, and campaigns.",
    benefit:
      "Consistent, professional visuals produced in a fraction of the time.",
  },
  {
    slug: "ai-seo-link-building",
    icon: Search,
    title: "Premium AI SEO Outreach & Link Building",
    problem:
      "Quality backlinks and outreach are time-consuming and easy to get wrong.",
    implementation:
      "AI-assisted prospecting, personalized outreach, and content workflows that earn relevant, high-quality links.",
    benefit:
      "Stronger domain authority and rankings without a bloated agency retainer.",
  },
  {
    slug: "custom-ai-agents",
    icon: Workflow,
    title: "Custom AI Agent Development",
    problem:
      "Off-the-shelf tools can't handle the specific, multi-step jobs your business runs on.",
    implementation:
      "Bespoke AI agents that complete real workflows end to end — connected to your data, tools, and approvals.",
    benefit:
      "Complex processes handled automatically, with you in control of the outcomes.",
  },
  {
    slug: "internal-knowledge-assistants",
    icon: BookOpen,
    title: "Internal Knowledge Assistants",
    problem:
      "Answers are buried across docs, drives, and people's heads — and onboarding is slow.",
    implementation:
      "A private assistant trained on your internal knowledge so staff get accurate answers instantly and securely.",
    benefit:
      "Faster onboarding, less repeated questioning, and knowledge that stays in the business.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
