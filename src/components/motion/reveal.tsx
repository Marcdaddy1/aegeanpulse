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
      // amount MUST stay "some" (any part visible), never a fraction. A
      // fractional threshold is unsatisfiable once the element is taller than
      // (1 / amount) x the viewport: at amount 0.2 a 6,099px article body needs
      // 1,220px on screen, which a 908px phone viewport can never provide — so
      // whileInView never fired and the body sat at opacity 0 forever. That is
      // exactly how every long article silently "failed to load" in Sept 2026.
      viewport={{ once: true, amount: "some", margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
