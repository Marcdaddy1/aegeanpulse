import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, true afterwards —
 * the canonical "mounted" guard, without calling setState inside an effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

// Phones: below Tailwind's `sm` breakpoint (640px).
const PHONE_QUERY = "(max-width: 639.98px)";

/** True on phone-width screens. False during SSR and the first client render. */
export function useIsPhone(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(PHONE_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );
}

/** Subscribe helper for reading a one-time client-only value (e.g. cookies). */
export const noopSubscribe = emptySubscribe;
