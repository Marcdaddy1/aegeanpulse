import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Boxes,
  Plug,
  LineChart,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  audience: string;
  deliverables: string[];
  outcomes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "ai-strategy-consultation",
    icon: Compass,
    title: "AI Strategy Consultation",
    short:
      "A clear, actionable AI roadmap mapped to your business goals — no jargon, no guesswork.",
    audience:
      "Organizations that want a clear, prioritized AI implementation strategy before investing in tools or build.",
    deliverables: [
      "AI opportunity audit across your operations and customer journey",
      "Prioritized roadmap with quick wins and longer-term plays",
      "Tooling and budget recommendations matched to your scale",
      "Risk, data, and readiness assessment",
    ],
    outcomes: [
      "A documented 90-day action plan you can execute immediately",
      "Confidence on where AI will actually move the needle",
      "A realistic cost model instead of open-ended spend",
    ],
  },
  {
    slug: "custom-ai-solution-design",
    icon: Boxes,
    title: "Custom AI Solution Design",
    short:
      "Tailored AI systems designed around your workflows when off-the-shelf tools fall short.",
    audience:
      "Businesses whose needs go beyond generic SaaS — bespoke agents, automations, and integrations.",
    deliverables: [
      "Solution architecture and data flow design",
      "Model, automation, and integration selection",
      "Prototype of the core workflow for validation",
      "Build specification ready for implementation",
    ],
    outcomes: [
      "A solution shaped to how you actually work",
      "Validated approach before full build investment",
      "Clear scope that controls cost and timeline",
    ],
  },
  {
    slug: "implementation-integration",
    icon: Plug,
    title: "Implementation & Integration",
    short:
      "We deploy AI into your real tools and workflows — CRM, support, content, and operations.",
    audience:
      "Teams ready to move from plan to production and connect AI to the systems they use daily.",
    deliverables: [
      "End-to-end build and deployment of the agreed solution",
      "Integration with your existing stack and data sources",
      "Testing, handover documentation, and team walkthrough",
      "Go-live support and monitoring setup",
    ],
    outcomes: [
      "Working AI in production, not a slide deck",
      "Automations connected to your live systems",
      "A team that knows how to run and trust the new workflow",
    ],
  },
  {
    slug: "ai-support-optimization",
    icon: LineChart,
    title: "Ongoing AI Support & Optimization",
    short:
      "Long-term monitoring, iteration, and improvement so your AI keeps paying off.",
    audience:
      "Businesses that want their AI systems maintained, measured, and continuously improved.",
    deliverables: [
      "Performance monitoring and regular optimization passes",
      "Prompt, model, and workflow refinements",
      "New use-case identification as you grow",
      "Priority support and quarterly reviews",
    ],
    outcomes: [
      "AI that improves instead of quietly degrading",
      "Measured impact tied to business metrics",
      "A partner on call as your needs evolve",
    ],
  },
  {
    slug: "ai-literacy-training",
    icon: GraduationCap,
    title: "AI Literacy & Training Programs",
    short:
      "Practical training that helps your team adopt AI tools confidently and responsibly.",
    audience:
      "Teams that want to use AI day to day without depending on a single power user.",
    deliverables: [
      "Role-specific, hands-on training sessions",
      "Reusable prompt libraries and playbooks",
      "Tool-selection guidance for everyday tasks",
      "Internal enablement materials and recordings",
    ],
    outcomes: [
      "A whole team that's productive with AI, not just one person",
      "Faster, safer adoption across departments",
      "Less wasted spend on tools nobody uses",
    ],
  },
  {
    slug: "ai-governance-ethics",
    icon: ShieldCheck,
    title: "AI Governance & Ethical Implementation",
    short:
      "Responsible, transparent AI rollout with the guardrails customers and regulators expect.",
    audience:
      "Organizations that need AI adopted responsibly — with clear policy, privacy, and accountability.",
    deliverables: [
      "AI usage policy and acceptable-use guidelines",
      "Data privacy and security review",
      "Transparency, bias, and human-oversight controls",
      "Documentation aligned to your compliance needs",
    ],
    outcomes: [
      "AI you can defend to customers and stakeholders",
      "Reduced privacy, legal, and reputational risk",
      "Clear ownership and oversight for every system",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
