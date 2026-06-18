// Fixed regional price points — no live FX conversion.
// The company is UK-based; visitors see their local currency.

export type CurrencyCode = "GBP" | "EUR" | "USD";

export interface PriceProfile {
  currency: CurrencyCode;
  locale: string;
  /** Starter / entry package amount in major units. */
  starter: number;
}

export const PRICE_PROFILES: Record<CurrencyCode, PriceProfile> = {
  GBP: { currency: "GBP", locale: "en-GB", starter: 399 },
  EUR: { currency: "EUR", locale: "en-IE", starter: 459 },
  USD: { currency: "USD", locale: "en-US", starter: 499 },
};

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

// Eurozone ISO-3166 alpha-2 country codes.
const EUROZONE = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV",
  "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

export function currencyForCountry(country: string | undefined): CurrencyCode {
  if (!country) return DEFAULT_CURRENCY;
  const code = country.toUpperCase();
  if (code === "GB") return "GBP";
  if (EUROZONE.has(code)) return "EUR";
  return DEFAULT_CURRENCY;
}

export function formatPrice(amount: number, currency: CurrencyCode): string {
  const profile = PRICE_PROFILES[currency];
  return new Intl.NumberFormat(profile.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Starter price formatted in the given currency, e.g. "£399". */
export function starterPrice(currency: CurrencyCode): string {
  return formatPrice(PRICE_PROFILES[currency].starter, currency);
}

export const COUNTRY_COOKIE = "ap_country";

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  prices: Record<CurrencyCode, number>;
  billing: "one-time" | "monthly";
  features: string[];
  highlight?: boolean;
  cta: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "discovery",
    name: "Discovery",
    tagline: "Understand your AI opportunity",
    description:
      "A clear, prioritised strategy for how AI can move the needle in your business — before you spend on tools or build.",
    prices: { GBP: 499, EUR: 579, USD: 649 },
    billing: "one-time",
    features: [
      "AI opportunity audit across your operations",
      "Prioritised 90-day action plan",
      "Tool & budget recommendations for your scale",
      "Risk, data & readiness assessment",
      "1× follow-up strategy session",
    ],
    cta: "Book a discovery call",
  },
  {
    id: "builder",
    name: "Builder",
    tagline: "Deploy your first AI system",
    description:
      "From strategy through to a working AI system in your tools — one complete workflow automated and your team ready to run it.",
    prices: { GBP: 2499, EUR: 2899, USD: 3249 },
    billing: "one-time",
    features: [
      "Everything in Discovery",
      "Custom AI solution design & architecture",
      "Full build & deployment of one core workflow",
      "Integration with your existing stack",
      "Team training & handover session",
      "30-day post-launch support",
    ],
    highlight: true,
    cta: "Start building",
  },
  {
    id: "partner",
    name: "Growth Partner",
    tagline: "Scale AI across your business",
    description:
      "An ongoing AI partnership — monitoring, optimising, and expanding your AI systems as your business grows.",
    prices: { GBP: 799, EUR: 929, USD: 1049 },
    billing: "monthly",
    features: [
      "Everything in Builder (initial setup included)",
      "Monthly performance monitoring & optimisation",
      "Two new workflow automations per quarter",
      "Monthly strategy & impact review",
      "Priority support channel",
      "AI landscape updates relevant to your sector",
    ],
    cta: "Discuss partnership",
  },
];
