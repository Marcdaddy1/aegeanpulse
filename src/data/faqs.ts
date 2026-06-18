export interface FAQ {
  question: string;
  answer: string;
}

export const HOME_FAQS: FAQ[] = [
  {
    question: "What is AI automation for small businesses?",
    answer:
      "AI automation means using artificial intelligence to handle repetitive, time-consuming tasks in your business — things like answering customer questions, drafting content, triaging support requests, or processing data. Unlike traditional software, AI can handle unstructured inputs (emails, documents, open-ended questions) and make judgement calls that would previously need a human. For small businesses, this means compressing hours of admin into seconds, without hiring more staff.",
  },
  {
    question: "How long does an AI project typically take?",
    answer:
      "A Discovery engagement takes 1–2 weeks. A Builder project — from strategy through to a working system in your tools — typically runs 4–8 weeks depending on complexity. Growth Partner is an ongoing monthly relationship. We keep scopes tight so you see results quickly, not six months down the line.",
  },
  {
    question: "Do I need any technical knowledge to work with AegeanPulse?",
    answer:
      "None at all. We translate the technical side so you never need to understand the underlying models or infrastructure. Our job is to make AI work in your existing tools — your CRM, your inbox, your website — so your team can use it without knowing how it's built.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with small businesses and service brands across a wide range of sectors — professional services, e-commerce, hospitality, healthcare admin, marketing agencies, and more. The common thread isn't the industry; it's the business problem. If you have repetitive, rules-based tasks or customer communication that eats your team's time, there's almost certainly an AI workflow worth building.",
  },
  {
    question: "How is working with AegeanPulse different from just using ChatGPT?",
    answer:
      "ChatGPT and similar tools are starting points — they're powerful but generic. AegeanPulse builds AI systems around your specific workflows, connected to your actual data sources and tools. That means an AI that knows your products, speaks in your brand voice, routes to the right team member, and hands off cleanly to a human when needed. It's the difference between a capable individual and a trained, integrated employee.",
  },
];

export const PRICING_FAQS: FAQ[] = [
  {
    question: "How do fixed-scope packages work?",
    answer:
      "We define exactly what's included before any work starts — deliverables, timeline, and price are locked in writing. You don't get an open-ended bill at the end. If you need something beyond the agreed scope, we quote it separately before proceeding. No surprises.",
  },
  {
    question: "Can I start with Discovery and move to Builder later?",
    answer:
      "Yes — and most clients do. The Discovery fee is credited against the Builder price if you proceed within 60 days. Starting with Discovery is a low-risk way to validate where AI will genuinely help before committing to a larger build.",
  },
  {
    question: "What does 'one core workflow' in the Builder package mean?",
    answer:
      "It means one complete, end-to-end automated process — for example: a customer enquiry received by email → AI drafts a personalised response → routes to the right team member → logs the interaction in your CRM. We focus depth over breadth so the first system is solid before expanding.",
  },
  {
    question: "Are prices inclusive of VAT?",
    answer:
      "Prices shown are exclusive of VAT. UK clients will be charged VAT at the prevailing rate (currently 20%) on top of the listed price. International clients outside the UK are generally not subject to UK VAT — we'll confirm this at the proposal stage based on your location.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Builder projects can be split into two equal payments — 50% at project kick-off and 50% on delivery. Growth Partner is billed monthly with no minimum term beyond the first month. Discovery is payable upfront given the short engagement window.",
  },
  {
    question: "What tech stack do you work with?",
    answer:
      "We're tool-agnostic and work with whatever your business already runs. Common integrations include HubSpot, Salesforce, Notion, Slack, Gmail, Zapier, Make, and custom APIs. We select the AI model layer (OpenAI, Anthropic, Google, open-source) based on what's right for your use case — not what we're locked into.",
  },
  {
    question: "What if my needs don't fit neatly into a package?",
    answer:
      "Book a free consultation and we'll scope something custom. The packages cover the most common engagement shapes, but we regularly scope bespoke projects — particularly for businesses with specific data, compliance, or integration requirements.",
  },
];

export const SERVICES_FAQS: FAQ[] = [
  {
    question: "What's the difference between AI strategy and AI implementation?",
    answer:
      "Strategy answers 'what should we build and why' — it's the audit, the roadmap, the prioritisation. Implementation answers 'how do we build it' — the actual system design, development, and deployment. Many clients need both in sequence; some come to us with a clear strategy already and just need build support.",
  },
  {
    question: "Can you integrate AI with the tools we already use?",
    answer:
      "Yes — this is central to how we work. We connect AI to your existing CRM, helpdesk, content tools, email, and databases rather than replacing them. The goal is to make your current stack smarter, not to add another tool your team has to learn.",
  },
  {
    question: "What happens after the implementation project ends?",
    answer:
      "We offer a 30-day post-launch support window on all Builder projects. After that, you can run the system independently, or move onto a Growth Partner retainer for ongoing monitoring, optimisation, and expansion. We hand over documentation and training so your team isn't dependent on us.",
  },
  {
    question: "Do you work with non-technical teams?",
    answer:
      "Our typical client has no dedicated tech team — that's who we're built for. We handle the technical complexity and deliver systems your operations or marketing team can manage day-to-day. Training is included in every project.",
  },
];
