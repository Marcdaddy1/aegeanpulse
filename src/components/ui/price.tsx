"use client";

import { useSyncExternalStore } from "react";
import { noopSubscribe } from "@/lib/hooks";
import {
  COUNTRY_COOKIE,
  DEFAULT_CURRENCY,
  currencyForCountry,
  starterPrice,
  type CurrencyCode,
} from "@/data/pricing";

function readCurrency(): CurrencyCode {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COUNTRY_COOKIE}=`));
  return currencyForCountry(match?.split("=")[1]);
}

/**
 * Renders the starter price in the visitor's local currency.
 * The server (and first client render) shows the USD default — matching the
 * server-rendered HTML so there's no hydration mismatch — then resolves from
 * the geo cookie. `currencyForCountry` returns a primitive, so the snapshot is
 * stable and won't loop.
 */
export function StarterPrice({ className }: { className?: string }) {
  const currency = useSyncExternalStore(
    noopSubscribe,
    readCurrency,
    () => DEFAULT_CURRENCY,
  );

  return <span className={className}>{starterPrice(currency)}</span>;
}
