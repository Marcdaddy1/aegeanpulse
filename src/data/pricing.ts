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
