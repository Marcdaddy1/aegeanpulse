"use client";

import { useSyncExternalStore, useEffect } from "react";
import {
  COUNTRY_COOKIE,
  DEFAULT_CURRENCY,
  currencyForCountry,
  starterPrice,
  formatPrice,
  type CurrencyCode,
} from "@/data/pricing";

// --- Listener registry -------------------------------------------------
// Module-level so all currency components (StarterPrice, tier prices, etc.)
// re-render together when the geo lookup resolves.
const listeners = new Set<() => void>();

function subscribeCurrency(notify: () => void) {
  listeners.add(notify);
  return () => { listeners.delete(notify); };
}

function notifyCurrencyChange() {
  listeners.forEach((fn) => fn());
}

// --- Cookie helpers ----------------------------------------------------
function getCountryCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COUNTRY_COOKIE}=`))
    ?.split("=")[1];
}

function setCountryCookie(country: string) {
  document.cookie = `${COUNTRY_COOKIE}=${country}; path=/; max-age=31536000; samesite=lax`;
}

function readCurrency(): CurrencyCode {
  return currencyForCountry(getCountryCookie());
}

// --- IP geo fallback ---------------------------------------------------
// Fires once per page load when no country cookie is present.
// ipapi.co: free tier, HTTPS, no API key, returns plain-text country code.
let geoFetchStarted = false;

function initGeoFetch() {
  if (geoFetchStarted || typeof window === "undefined") return;
  if (getCountryCookie()) return;
  geoFetchStarted = true;

  fetch("https://ipapi.co/country_code/", { cache: "no-store" })
    .then((r) => r.text())
    .then((code) => {
      const trimmed = code.trim();
      if (trimmed.length === 2 && /^[A-Z]{2}$/.test(trimmed)) {
        setCountryCookie(trimmed);
        notifyCurrencyChange();
      }
    })
    .catch(() => {
      // Silently fail — visitors see the USD default.
    });
}

// --- Hooks -------------------------------------------------------------

/**
 * Returns the visitor's resolved currency code.
 * - Server + first client render: DEFAULT_CURRENCY (avoids hydration mismatch).
 * - After hydration: reads the ap_country cookie set by the proxy (Vercel /
 *   Cloudflare) or, if absent, waits for the ipapi.co lookup to resolve and
 *   re-renders automatically via the listener registry.
 */
export function useCurrency(): CurrencyCode {
  const currency = useSyncExternalStore(
    subscribeCurrency,
    readCurrency,
    () => DEFAULT_CURRENCY,
  );

  // Kick off the IP lookup on mount. Guarded so it only fetches once.
  useEffect(() => {
    initGeoFetch();
  }, []);

  return currency;
}

// --- Components --------------------------------------------------------

/** Inline starter price in the visitor's local currency. */
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
