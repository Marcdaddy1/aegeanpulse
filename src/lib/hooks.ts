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

/** Subscribe helper for reading a one-time client-only value (e.g. cookies). */
export const noopSubscribe = emptySubscribe;
