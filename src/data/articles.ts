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

export const ARTICLES: Article[] = [
  {
    slug: "ai-automation-for-small-business-guide",
    category: "Automation",
    title: "AI Automation for Small Business: A Complete Guide (2026)",
    summary:
      "Everything a small business owner needs to know about AI automation — what it is, where to start, which workflows to target first, what it costs, and how to avoid the most common mistakes.",
    readingTime: 12,
    date: "2026-06-18",
    featured: true,
    body: [
      {
        paragraphs: [
          "AI automation is one of the most significant productivity shifts small businesses have ever had access to — and it's happening right now, not in five years. But for most small business owners, the landscape is confusing: too many tools, too much hype, and not enough clarity on what actually delivers a return.",
          "This guide cuts through that. By the end, you'll know exactly what AI automation is, which parts of your business are the best candidates, how to approach your first project, what it realistically costs, and how to avoid the mistakes that cause most early efforts to fail quietly.",
        ],
      },
      {
        heading: "What is AI automation for small businesses?",
        paragraphs: [
          "AI automation means using artificial intelligence to handle tasks that previously required human time and attention. Unlike traditional automation (which follows rigid if-then rules), AI can process unstructured inputs — emails, customer enquiries, documents, voice — and make judgement calls based on context.",
          "For a small business, this might mean: a chatbot that answers customer questions in your brand voice at 2am, an AI that drafts follow-up emails from your CRM data, a system that triages incoming support requests and routes them to the right person, or a tool that produces a first draft of your weekly content in your style.",
          "The common thread is time: AI automation returns hours to your team by handling the repetitive, rules-based, or language-heavy work that currently eats their day.",
        ],
      },
      {
        heading: "Which workflows should you automate first?",
        paragraphs: [
          "The most reliable framework is to start with friction: identify the tasks that are repetitive, time-consuming, and low-stakes if occasionally imperfect. The best early candidates share three properties — they happen frequently (weekly or daily), they follow a predictable pattern, and a mistake is recoverable.",
          "Customer communication is usually the highest-value starting point. Answering the same questions across email, chat, and social media is something most small business owners or their teams spend hours on each week. An AI trained on your FAQs, product details, and tone of voice can handle 70–80% of these interactions end-to-end.",
          "Content and marketing is the second major opportunity. Drafting newsletters, writing product descriptions, repurposing a podcast into a blog post, generating social media copy from a brief — these are tasks where AI produces strong first drafts that your team can refine in a fraction of the time.",
          "Internal operations is the third area: meeting summaries, first drafts of proposals, data entry from documents into your CRM, and routing logic between tools. Less glamorous than customer-facing automation, but often where the largest time savings hide.",
        ],
      },
      {
        heading: "How to run your first AI automation project",
        paragraphs: [
          "The biggest mistake is starting with a tool. A new AI product launches, it looks impressive, and suddenly there's pressure to find a use for it. That's the wrong direction. Start with a problem — a specific, named friction point in your business — and then find the right tool for it.",
          "A simple four-step approach works consistently: (1) Pick one workflow that costs your team at least two to three hours per week. (2) Map out what that workflow currently looks like step by step — inputs, decisions, outputs. (3) Identify which steps involve language, classification, or information retrieval — those are your AI candidates. (4) Build and test a minimum version before expanding.",
          "Partial automation is the enemy of adoption. If a process is half-automated, people still have to remember the manual half, and they quietly abandon the whole thing. Pick one complete workflow and automate it end-to-end, including the human handoff where judgement is needed. A single workflow that genuinely runs itself is worth more than ten experiments that never leave the testing phase.",
          "Run a short pilot — two to four weeks — before committing further. Track the impact in business terms: hours saved, response time, leads followed up, content published. If you can't measure it in numbers your business already cares about, reconsider the workflow.",
        ],
      },
      {
        heading: "What does AI automation cost for small businesses?",
        paragraphs: [
          "Costs break into three categories: the AI platform or model costs (typically subscription-based), the build cost (the work of connecting and configuring the system), and ongoing maintenance.",
          "Platform costs for small business AI tools typically run £20–£200/month depending on usage and the tools involved. Most well-known platforms (OpenAI, Anthropic, Google) charge per token (per piece of text processed), which for typical small business workloads amounts to a few pounds to a few tens of pounds per month.",
          "Build cost is where the investment is most variable. Off-the-shelf tools like ChatGPT, Zapier AI, or Make can handle simple automations with minimal setup. Custom-built systems — where AI is wired into your specific CRM, support desk, or workflow — require design and development work, typically ranging from £500 for a simple strategy engagement up to £2,500–£5,000 for a complete custom implementation.",
          "Ongoing maintenance is often underestimated. AI models and platforms update regularly, prompts may need tuning as your business evolves, and new use cases will emerge. Budget for a quarterly review at minimum. A good implementation partner will build your systems so your team can manage them day-to-day, with specialist support for larger changes.",
        ],
      },
      {
        heading: "The most common mistakes — and how to avoid them",
        paragraphs: [
          "Starting too big is the most common failure mode. Businesses try to automate everything at once, or tackle a complex, high-stakes workflow before they've built any AI muscle. The businesses that succeed start with one workflow, prove it, then expand. Scope discipline is the difference between a working system and an abandoned project.",
          "Choosing the wrong tool for the job wastes months. The AI tool market is noisy and moves fast. The right choice depends on your specific workflow, your existing stack, your data, and your team's technical comfort level — not which tool was written up in the press last week. Get advice that's grounded in your situation, not the current hype cycle.",
          "Skipping the measurement step means you never know if it worked. Define a baseline before you start: how long does this task currently take, how many do you process per week, what does a 'good' outcome look like? Check those numbers at week four. AI implementations that aren't measured quietly get abandoned even when they're working, because no one noticed.",
          "Not involving the team who'll use it leads to systems that no one trusts. The people who do the work daily know the edge cases, the exceptions, and the informal rules that don't appear in any documentation. Get them involved in the design phase, not just the rollout. AI that your team helped design is AI your team will actually use.",
        ],
      },
      {
        heading: "Is AI automation right for your business right now?",
        paragraphs: [
          "A useful litmus test: if your team regularly spends time on tasks they describe as 'the same thing over and over', AI automation almost certainly has something to offer. The question isn't whether AI can help — it's which problem to solve first and how to scope it sensibly.",
          "The businesses that are pulling ahead in 2026 aren't the ones with the biggest AI budget or the most tools. They're the ones that picked a real problem, built a working solution, measured the impact, and moved on to the next one. That approach is available to businesses of any size.",
          "If you'd like a clear view of where AI can move the needle in your specific business — before spending on tools or build — a structured strategy engagement is the fastest way to get there. AegeanPulse offers fixed-scope Discovery engagements that produce a prioritised action plan for your operations, tailored to your size and budget.",
        ],
      },
    ],
  },
  {
    slug: "smb-ai-playbook-2026",
    category: "Small Business",
    title: "The 2026 SMB AI Playbook: From Curiosity to Real Results",
    summary:
      "A practical framework for small businesses moving past AI hype into measurable, profitable adoption this year.",
    readingTime: 7,
    date: "2026-05-28",
    featured: true,
    body: [
      {
        paragraphs: [
          "For most small businesses, 2024 and 2025 were years of experimentation. People tried ChatGPT, played with a few tools, and got a glimpse of what was possible. 2026 is the year that experimentation needs to turn into results. The businesses pulling ahead aren't the ones using the most AI — they're the ones using it deliberately, on the right problems, with a plan.",
          "This playbook lays out how to make that shift without a large budget or a technical team.",
        ],
      },
      {
        heading: "Start with friction, not features",
        paragraphs: [
          "The most common mistake is starting from the tool. A new model launches, it looks impressive, and suddenly there's pressure to use it somewhere. That's backwards. The right starting point is friction: the repetitive, time-draining, easy-to-get-wrong tasks already slowing your business down.",
          "List the things your team does every week that are necessary but low-value — answering the same questions, formatting reports, chasing follow-ups, drafting routine copy. Those are your first AI candidates, because the return is obvious and the risk is low.",
        ],
      },
      {
        heading: "Automate one workflow end to end",
        paragraphs: [
          "Partial automation rarely sticks. If a process is half-automated, people still have to remember the manual half, and they quietly abandon it. Pick one complete workflow — lead intake, support triage, content drafting — and automate it from start to finish, including the hand-off to a human where judgement is needed.",
          "A single workflow that genuinely runs itself builds more confidence than a dozen experiments that never leave the testing phase.",
        ],
      },
      {
        heading: "Measure in business terms",
        paragraphs: [
          "Track the impact in numbers your business already cares about: hours saved, response time, leads followed up, content published, revenue influenced. If you can't connect an AI tool to one of those, it's a hobby, not an investment.",
          "Review monthly. Keep what moves the metrics, cut what doesn't, and reinvest the time you've freed up into the next opportunity. That loop — friction, automate, measure, reinvest — is the whole game in 2026.",
        ],
      },
    ],
  },
  {
    slug: "best-ai-tools-small-business-2026",
    category: "Small Business",
    title: "Best AI Tools for Small Business Growth in 2026",
    summary:
      "A curated look at the AI tools delivering real ROI for small businesses this year — and how to choose between them.",
    readingTime: 6,
    date: "2026-05-20",
    body: [
      {
        paragraphs: [
          "The AI tool market is crowded, and most 'best tools' lists are just feature dumps. What actually matters for a small business is fit: the right tool for your size, your stack, and the specific problem you're solving. Here's how to think about the categories that matter most in 2026.",
        ],
      },
      {
        heading: "Assistants for everyday work",
        paragraphs: [
          "General assistants like ChatGPT, Claude, and Gemini remain the highest-leverage starting point. They handle drafting, summarizing, research, and analysis across almost every role. Pick one as your team's default, learn it well, and standardize prompts so quality is consistent.",
        ],
      },
      {
        heading: "Automation that connects your stack",
        paragraphs: [
          "Tools like Zapier, Make, and n8n turn AI from a chat window into something that actually does work in your systems. They connect your CRM, inbox, forms, and spreadsheets so that AI steps happen automatically — no copy-paste required.",
          "This is usually where the biggest time savings live for a small business.",
        ],
      },
      {
        heading: "Content and design at volume",
        paragraphs: [
          "For marketing, tools like Jasper, Descript, Canva, and Runway let a small team produce content at a scale that used to require an agency. The key is keeping a human in the loop for brand voice and accuracy — the tools accelerate production, they don't replace judgement.",
          "Choose based on where your bottleneck actually is. The best tool is the one that removes your biggest constraint, not the one with the longest feature list.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-changing-customer-support",
    category: "Agents",
    title: "How AI Agents Are Changing Customer Support",
    summary:
      "AI agents are moving support from scripted bots to systems that actually resolve issues — here's what's different.",
    readingTime: 5,
    date: "2026-05-12",
    body: [
      {
        paragraphs: [
          "For years, 'support automation' meant rigid chatbots that frustrated customers and deflected tickets without solving anything. AI agents are a genuine break from that. Instead of following a fixed script, they understand the request, take real actions, and know when to escalate.",
        ],
      },
      {
        heading: "From deflection to resolution",
        paragraphs: [
          "The old metric was deflection — how many people you could stop from reaching a human. The new metric is resolution. A modern support agent can look up an order, process a return, update a booking, or answer a nuanced policy question using your actual documentation.",
          "That shift changes the customer experience entirely: fewer dead ends, faster answers, and less repetition.",
        ],
      },
      {
        heading: "Humans handle what matters",
        paragraphs: [
          "Good implementations don't try to remove people. They hand off cleanly. The agent resolves the routine 60–70% and passes the complex, sensitive, or high-value cases to staff with full context already attached.",
          "Your team spends its time on the conversations where empathy and judgement actually matter — and customers feel the difference.",
        ],
      },
      {
        heading: "What it takes to do well",
        paragraphs: [
          "The results depend on the setup: clean knowledge sources, clear boundaries on what the agent can do, and honest escalation. Done carelessly, an agent invents answers. Done well, it becomes one of the most reliable members of your support team.",
        ],
      },
    ],
  },
  {
    slug: "practical-ai-automation-workflows-smbs",
    category: "Automation",
    title: "Practical AI Automation Workflows for SMBs",
    summary:
      "Five concrete automation workflows small businesses can implement now — with the business case for each.",
    readingTime: 6,
    date: "2026-05-04",
    body: [
      {
        paragraphs: [
          "Automation sounds abstract until you see it applied to real tasks. Here are five workflows that consistently pay off for small businesses, ranked roughly by how quickly they deliver value.",
        ],
      },
      {
        heading: "1. Lead capture and routing",
        paragraphs: [
          "When a form is submitted, AI qualifies the enquiry, enriches it, drafts a tailored first response, and routes it to the right person — instantly. Slow follow-up is one of the biggest silent revenue leaks in small businesses, and this closes it.",
        ],
      },
      {
        heading: "2. Support triage",
        paragraphs: [
          "Incoming messages are summarized, categorized, and prioritized automatically, with suggested replies drafted for your team to approve. It turns a chaotic inbox into an ordered queue.",
        ],
      },
      {
        heading: "3. Content repurposing",
        paragraphs: [
          "One piece of long-form content is automatically reshaped into social posts, an email, and a summary — keeping your channels active without extra writing time.",
        ],
      },
      {
        heading: "4. Reporting and summaries",
        paragraphs: [
          "Data from your tools is pulled together and summarized into a plain-language weekly report, so you see what matters without building spreadsheets.",
        ],
      },
      {
        heading: "5. Internal knowledge answers",
        paragraphs: [
          "Staff ask a question and get an accurate answer drawn from your own documents — cutting the constant interruptions that slow everyone down.",
          "Start with the one that maps to your biggest weekly time sink. Prove it, then expand.",
        ],
      },
    ],
  },
  {
    slug: "chatbots-vs-ai-assistants",
    category: "Agents",
    title: "Chatbots vs AI Assistants: What Businesses Actually Need",
    summary:
      "The terms get used interchangeably, but the difference matters for cost, capability, and customer experience.",
    readingTime: 5,
    date: "2026-04-26",
    body: [
      {
        paragraphs: [
          "'Chatbot' and 'AI assistant' are often used to mean the same thing, but choosing the wrong one wastes money and disappoints customers. The distinction is really about scope and capability.",
        ],
      },
      {
        heading: "Chatbots: focused and predictable",
        paragraphs: [
          "A chatbot handles a defined set of jobs — answering FAQs, capturing details, booking a slot. It's predictable, affordable, and easy to control. For many small businesses, a well-built chatbot on the website covers the majority of customer questions perfectly well.",
        ],
      },
      {
        heading: "Assistants: capable and contextual",
        paragraphs: [
          "An AI assistant is broader. It holds context across a conversation, takes actions in your systems, and adapts to requests it wasn't explicitly scripted for. It's closer to a junior team member than a menu of answers.",
          "That power comes with more setup, cost, and the need for guardrails.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Match the tool to the job. If you mostly need to answer common questions and capture leads, a chatbot is the pragmatic, cost-effective choice. If you need something that completes multi-step tasks and handles genuine variety, invest in an assistant.",
          "Many businesses end up with both: a chatbot for the front door, an assistant for the work behind it.",
        ],
      },
    ],
  },
  {
    slug: "ai-content-production-without-losing-quality",
    category: "Content",
    title: "How to Use AI for Content Production Without Losing Quality",
    summary:
      "AI can multiply your content output or flood your brand with generic filler. The difference is in the process.",
    readingTime: 6,
    date: "2026-04-18",
    body: [
      {
        paragraphs: [
          "AI makes it trivial to produce more content. It does not make it easy to produce good content. The businesses getting this right treat AI as an accelerator inside a strong process — not a replacement for thinking.",
        ],
      },
      {
        heading: "Lead with a real point of view",
        paragraphs: [
          "Generic content fails because it has nothing to say. Start every piece with a genuine opinion, insight, or piece of first-hand experience that only your business has. Use AI to express it faster — never to invent it.",
        ],
      },
      {
        heading: "Feed it your voice and facts",
        paragraphs: [
          "AI defaults to bland because it's given nothing specific to work with. Provide your brand voice, real examples, data, and customer language. The quality of what comes out is mostly determined by the quality of what goes in.",
        ],
      },
      {
        heading: "Keep a human in the loop",
        paragraphs: [
          "Every published piece should pass through a person who checks accuracy, sharpens the argument, and makes it sound like you. This is non-negotiable for anything that carries your name — especially with search engines and audiences increasingly able to spot filler.",
        ],
      },
      {
        heading: "Build a system, not one-offs",
        paragraphs: [
          "Turn what works into a repeatable workflow: brief, draft, edit, publish, repurpose. A consistent system beats sporadic bursts of AI output every time — and it scales without diluting quality.",
        ],
      },
    ],
  },
  {
    slug: "ai-seo-2026-what-still-works",
    category: "SEO",
    title: "AI SEO in 2026: What Still Works",
    summary:
      "Search has changed with AI overviews and answer engines. The fundamentals that still drive results may surprise you.",
    readingTime: 6,
    date: "2026-04-10",
    body: [
      {
        paragraphs: [
          "AI overviews, answer engines, and conversational search have reshaped how people find information. Plenty of old tactics have stopped working — but the core of what drives organic visibility is more durable than the panic suggests.",
        ],
      },
      {
        heading: "Genuine expertise wins",
        paragraphs: [
          "As AI-generated content floods the web, search systems lean harder on signals of real experience and authority. First-hand knowledge, original data, named authors, and demonstrable expertise are now competitive advantages, not nice-to-haves.",
        ],
      },
      {
        heading: "Be the source AI cites",
        paragraphs: [
          "Answer engines summarize and cite sources. The goal shifts from ranking a page to being the trusted source that gets quoted. Clear, well-structured, genuinely useful content that directly answers real questions is what gets pulled into those answers.",
        ],
      },
      {
        heading: "Technical basics still matter",
        paragraphs: [
          "Fast pages, clean structure, sensible internal linking, and crawlable content remain table stakes. AI hasn't changed the fact that search engines need to access and understand your site easily.",
        ],
      },
      {
        heading: "What to stop doing",
        paragraphs: [
          "Thin, keyword-stuffed, mass-produced pages are now actively risky. Volume without substance is a liability. The winning strategy in 2026 is fewer, deeper, more credible pages — exactly the kind of content that's hard to fake.",
        ],
      },
    ],
  },
  {
    slug: "ai-voice-agents-appointment-booking",
    category: "AI News",
    title: "The Rise of AI Voice Agents for Appointment Booking",
    summary:
      "Natural-sounding voice agents are quietly becoming a practical front desk for service businesses.",
    readingTime: 5,
    date: "2026-04-02",
    body: [
      {
        paragraphs: [
          "Voice AI has crossed an important threshold. The latest agents sound natural, handle interruptions, and hold a real conversation — and service businesses are starting to use them as an always-available front desk.",
        ],
      },
      {
        heading: "Why booking is the perfect use case",
        paragraphs: [
          "Appointment booking is structured, repetitive, and time-sensitive — exactly what a voice agent does well. It can answer calls around the clock, check availability, book or reschedule, and confirm by text, without keeping callers on hold.",
          "For clinics, salons, trades, and local services, every missed call is lost revenue. A voice agent catches the calls staff can't.",
        ],
      },
      {
        heading: "Where humans still matter",
        paragraphs: [
          "The best setups route anything sensitive, unusual, or high-value to a person. The agent handles the routine volume; staff handle the moments that need a human touch.",
        ],
      },
      {
        heading: "Getting it right",
        paragraphs: [
          "Success depends on accurate calendar integration, clear scripts, honest disclosure that it's an AI, and a clean path to a human. Done well, customers barely notice — they just get their appointment booked quickly.",
        ],
      },
    ],
  },
  {
    slug: "building-internal-ai-knowledge-bases",
    category: "Tutorials",
    title: "Building Internal AI Knowledge Bases for Teams",
    summary:
      "A step-by-step approach to giving your team instant, accurate answers from your own documents.",
    readingTime: 6,
    date: "2026-03-25",
    body: [
      {
        paragraphs: [
          "Every growing business hits the same wall: knowledge lives in scattered documents and a few people's heads. New staff take months to get up to speed, and the same questions get asked over and over. An internal AI knowledge base fixes this — here's how to build one well.",
        ],
      },
      {
        heading: "1. Gather and clean your sources",
        paragraphs: [
          "Start by collecting the documents that actually hold your knowledge: process docs, policies, FAQs, past tickets. Remove outdated and contradictory material first — an assistant trained on stale information confidently gives stale answers.",
        ],
      },
      {
        heading: "2. Connect, don't copy",
        paragraphs: [
          "Use a system that reads from your live sources where possible, so answers stay current as documents change. A knowledge base that drifts out of date quickly loses trust.",
        ],
      },
      {
        heading: "3. Set boundaries and citations",
        paragraphs: [
          "Configure the assistant to answer only from your approved sources and to cite where each answer came from. This keeps it accurate and lets staff verify anything important.",
        ],
      },
      {
        heading: "4. Roll out and refine",
        paragraphs: [
          "Launch to a small team first, watch the questions it struggles with, and fill the gaps in your documentation. The questions people ask become a map of what your knowledge base is still missing.",
          "Done right, onboarding speeds up, interruptions drop, and your hard-won knowledge stays inside the business.",
        ],
      },
    ],
  },
  {
    slug: "what-to-automate-first-small-business",
    category: "Small Business",
    title: "What to Automate First in a Small Business",
    summary:
      "A simple prioritization method for choosing the automation that will pay off fastest.",
    readingTime: 5,
    date: "2026-03-17",
    body: [
      {
        paragraphs: [
          "The hardest part of automation isn't the technology — it's knowing where to start. Pick the wrong first project and you burn time and goodwill. Pick the right one and you build momentum for everything after. Here's a simple way to choose.",
        ],
      },
      {
        heading: "Score tasks on three axes",
        paragraphs: [
          "For each candidate task, rate it on frequency (how often it happens), time cost (how long it takes), and error rate (how often it goes wrong manually). High scores across all three are your best first targets — frequent, slow, error-prone work is where automation shines.",
        ],
      },
      {
        heading: "Favor low-risk, visible wins",
        paragraphs: [
          "Your first automation should be something where a mistake is easy to catch and the benefit is obvious to the team. Internal, repetitive tasks are usually safer first steps than anything customer-facing and high-stakes.",
        ],
      },
      {
        heading: "Avoid the common traps",
        paragraphs: [
          "Don't start with your most complex process just because it's the most painful — complexity raises the risk of an early failure. And don't automate a broken process; fix the workflow first, then automate the good version.",
        ],
      },
      {
        heading: "Build momentum",
        paragraphs: [
          "One clear, measurable win earns the trust and the time to tackle bigger projects. Automation in a small business compounds — the first success funds the next.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

export function getGridArticles(): Article[] {
  return ARTICLES.filter((a) => !a.featured);
}
