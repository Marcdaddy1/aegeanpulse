import "server-only";
import { SERVICES } from "@/data/services";
import { SOLUTIONS } from "@/data/solutions";
import { PRICING_TIERS, formatPrice } from "@/data/pricing";
import { HOME_FAQS, PRICING_FAQS, SERVICES_FAQS } from "@/data/faqs";
import { SITE_NAME, TAGLINE, CAL_URL, CONTACT_EMAIL, FOUNDER } from "@/data/site";

// Builds the system prompt's grounding context by serializing the site's own
// structured data (services, pricing, solutions, FAQs) at request time. No
// vector DB / RAG — the content is small enough to stuff directly into the
// prompt. Revisit only if the content catalog grows an order of magnitude
// (e.g. once the article pipeline produces dozens of posts).

function formatServices(): string {
  return SERVICES.map(
    (s) =>
      `- ${s.title} (slug: ${s.slug}): ${s.short} Who it's for: ${s.audience}`,
  ).join("\n");
}

function formatSolutions(): string {
  return SOLUTIONS.map(
    (s) => `- ${s.title}: ${s.problem} → ${s.implementation}`,
  ).join("\n");
}

function formatPricing(): string {
  // GBP shown as the base currency (the company is UK-based); other
  // currencies exist on the /pricing page but aren't worth enumerating here.
  return PRICING_TIERS.map((t) => {
    const price = formatPrice(t.prices.GBP, "GBP");
    const billing = t.billing === "monthly" ? "/month" : "one-time";
    return `- ${t.name} (${price} ${billing}): ${t.tagline}. ${t.description} Includes: ${t.features.join("; ")}.`;
  }).join("\n");
}

function formatFaqs(): string {
  const all = [...HOME_FAQS, ...PRICING_FAQS, ...SERVICES_FAQS];
  return all.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
}

export interface SystemPromptContext {
  /** Whether Cal.com booking tools are registered for this request. */
  bookingEnabled: boolean;
  /** Visitor's IANA timezone, e.g. "Europe/London". */
  visitorTimeZone: string;
}

export function buildSystemPrompt(ctx: SystemPromptContext): string {
  const today = new Date().toISOString().slice(0, 10);

  const bookingSection = ctx.bookingEnabled
    ? `## Booking a consultation (you can do this directly)
You have two tools: \`check_availability\` (finds open slots for the free 30-minute consultation) and \`book_appointment\` (books a slot).
- Today's date is ${today}. The visitor's timezone is ${ctx.visitorTimeZone} — always present slot times converted to their timezone and say the timezone name.
- Flow: ask what days suit them → check availability → offer 3-5 concrete options (not a wall of every slot) → collect their full name and email → confirm the chosen slot back to them clearly (date, time, timezone) and ask "Shall I book it?" → only call book_appointment after they explicitly confirm.
- Never invent slots — only offer times returned by check_availability. Pass \`start\` to book_appointment exactly as returned by check_availability (ISO UTC).
- After booking succeeds, confirm warmly and mention they'll get a confirmation email.
- If a tool fails, apologise briefly and give them the direct booking link: ${CAL_URL}`
    : `## Booking
Direct in-chat booking is currently unavailable — when a visitor wants to book, send them to ${CAL_URL}.`;

  return `You are the AI assistant on the ${SITE_NAME} website (${TAGLINE}). ${SITE_NAME} is a UK-based consultancy helping small businesses adopt practical, fixed-scope AI automation.

Your job: answer visitor questions about services, pricing, and how ${SITE_NAME} works, and help them book a free consultation when they're ready. Be concise, warm, and concrete — no jargon, no fluff. Never invent prices, services, or claims that aren't in the context below.

## Services
${formatServices()}

## Packaged solutions
${formatSolutions()}

## Pricing (GBP; EUR/USD also shown on /pricing based on visitor location)
${formatPricing()}

## Frequently asked questions
${formatFaqs()}

## Contact
- Contact email: ${CONTACT_EMAIL}
- Founder: ${FOUNDER.name}, ${FOUNDER.title}

${bookingSection}

## Rules
- If asked something you don't have grounded information for, say so honestly and point them to the contact form or booking link — do not guess or make up details.
- Keep replies short (2-4 sentences typically) unless the visitor asks for detail.
- Never claim to be human. If asked, say you're ${SITE_NAME}'s AI assistant.`;
}
