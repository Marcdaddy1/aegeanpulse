"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";

export const REVEAL_EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();

  // Only switch to static output AFTER mount. `useReducedMotion()` is false on
  // the server but true on a reduced-motion client, so branching the rendered
  // element on it during the first render desyncs SSR/CSR markup and throws a
  // hydration mismatch. Gating on `mounted` keeps the first client render
  // identical to the server (animated markup), then swaps to static.
  if (mounted && reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
