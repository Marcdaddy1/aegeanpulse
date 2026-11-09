"use client";

import { useSyncExternalStore } from "react";
import {
  COUNTRY_COOKIE,
  DEFAULT_CURRENCY,
  currencyForCountry,
  starterPrice,
  formatPrice,
  type CurrencyCode,
} from "@/data/pricing";

// The visitor's currency, in order of trust:
// 1. The ap_country cookie, set by src/proxy.ts when a CDN sends a country
//    header (Cloudflare / Vercel). This VPS sends none today.
// 2. The browser's time zone: Europe/London → pounds, a eurozone city →
//    euros, anywhere else → dollars. Instant, no network call, no rate limit.
// 3. Pounds (DEFAULT_CURRENCY), the real price list.
//
// This replaced a call to ipapi.co, whose free tier rate-limits (HTTP 429).
// When it failed the site fell back to dollars, so UK visitors were often
// shown "$649" for the £499 Discovery.

const UK_ZONES = new Set([
  "Europe/London", "Europe/Belfast", "Europe/Guernsey", "Europe/Jersey", "Europe/Isle_of_Man",
]);

// Time zones of countries that use the euro.
const EURO_ZONES = new Set([
  "Europe/Vienna", "Europe/Brussels", "Europe/Zagreb", "Asia/Nicosia", "Asia/Famagusta",
  "Europe/Nicosia", "Europe/Tallinn", "Europe/Helsinki", "Europe/Mariehamn", "Europe/Paris",
  "Europe/Berlin", "Europe/Busingen", "Europe/Athens", "Europe/Dublin", "Europe/Rome",
  "Europe/Riga", "Europe/Vilnius", "Europe/Luxembourg", "Europe/Malta", "Europe/Amsterdam",
  "Europe/Lisbon", "Atlantic/Madeira", "Atlantic/Azores", "Europe/Bratislava",
  "Europe/Ljubljana", "Europe/Madrid", "Africa/Ceuta", "Atlantic/Canary", "Europe/Monaco",
  "Europe/San_Marino", "Europe/Vatican", "Europe/Andorra",
]);

function getCountryCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COUNTRY_COOKIE}=`))
    ?.split("=")[1];
}

let zoneCurrency: CurrencyCode | null | undefined;
function currencyFromTimeZone(): CurrencyCode | null {
  if (zoneCurrency !== undefined) return zoneCurrency;
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    zoneCurrency = !zone ? null : UK_ZONES.has(zone) ? "GBP" : EURO_ZONES.has(zone) ? "EUR" : "USD";
  } catch {
    zoneCurrency = null;
  }
  return zoneCurrency;
}

function readCurrency(): CurrencyCode {
  const country = getCountryCookie();
  if (country) return currencyForCountry(country);
  return currencyFromTimeZone() ?? DEFAULT_CURRENCY;
}

// Nothing changes the answer after load, so there's nothing to subscribe to.
const subscribe = () => () => {};

/**
 * The visitor's currency. The server and first client render use pounds (no
 * hydration mismatch, and right for most visitors); the client then switches
 * to euros or dollars where the visitor is placed elsewhere.
 */
export function useCurrency(): CurrencyCode {
  return useSyncExternalStore(subscribe, readCurrency, () => DEFAULT_CURRENCY);
}

/** "Packages from" price in the visitor's currency. */
export function StarterPrice({ className }: { className?: string }) {
  const currency = useCurrency();
  return <span className={className}>{starterPrice(currency)}</span>;
}

/** Any amount formatted in the visitor's local currency. */
export function Price({
  amount,
  currency: currencyProp,
  className,
}: {
  amount: number;
  currency?: CurrencyCode;
  className?: string;
}) {
  const detected = useCurrency();
  const currency = currencyProp ?? detected;
  return <span className={className}>{formatPrice(amount, currency)}</span>;
}
