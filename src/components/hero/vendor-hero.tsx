"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HeroProps } from "./types";
import { WovenCanvas } from "./vendor/woven-light-hero";

const REVEAL_EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Hero-specific motion opt-in. The site globally honors `prefers-reduced-motion`,
// which would otherwise suppress the WebGL particle field entirely. Keeping this
// `true` runs the particle background regardless of that setting (the text
// fade-ins below still respect it). Set to `false` to also calm the hero
// background for users who asked the OS to reduce motion.
const FORCE_HERO_PARTICLES = true;

// Adapter: maps HeroProps onto the vendor woven-light-hero. The vendor component
// ships hard-coded demo copy ("Woven by Light") and its own nav, neither of which
// fit a real marketing site — so we reuse only its Three.js <WovenCanvas> as a
// background and render AegeanPulse content on top. The hero backdrop is kept
// intentionally dark (independent of site theme) so the additive-blended particle
// field reads the way the vendor designed it.
export function VendorHero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  trustItems,
}: HeroProps) {
  const reduce = useReducedMotion();
  const showParticles = FORCE_HERO_PARTICLES || !reduce;

  // `initial` is kept constant (NOT branched on `reduce`) so the server and the
  // first client render emit identical markup — branching it on the client-only
  // reduced-motion value is what caused the hydration mismatch. `animate` always
  // restores the visible state, and only `transition` (which is never serialized
  // into the SSR HTML) depends on `reduce`: reduced-motion users snap instantly
  // instead of moving, while the text can never be stranded at opacity:0.
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.7, delay, ease: REVEAL_EASE },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#05070d] text-white">
      {/* Vendor Three.js background — runs whenever FORCE_HERO_PARTICLES is set,
          otherwise skipped under reduced motion */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {showParticles && <WovenCanvas />}
        {/* Brand teal glow for depth */}
        <div className="absolute left-1/2 top-0 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
        {/* Vignette only at top/bottom edges so the particle field stays clear
            through the center while seams blend into the header / next section */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05070d] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#05070d] to-transparent" />
      </div>

      <Container size="wide" className="relative">
        <div className="flex min-h-[88vh] flex-col items-center justify-center py-24 text-center md:py-32">
          {eyebrow && (
            <motion.span
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            {...fade(0.08)}
            className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {subheadline}
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              rel={primaryCta.external ? "noopener noreferrer" : undefined}
              className={buttonClasses({ size: "lg" })}
            >
              {primaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={secondaryCta.href}
              target={secondaryCta.external ? "_blank" : undefined}
              rel={secondaryCta.external ? "noopener noreferrer" : undefined}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
            >
              {secondaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          {trustItems.length > 0 && (
            <motion.ul
              {...fade(0.32)}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            >
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </Container>
    </section>
  );
}
