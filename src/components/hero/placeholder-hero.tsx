"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { HeroProps } from "./types";

const REVEAL_EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function PlaceholderHero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: REVEAL_EASE },
        };

  return (
    <section className="relative overflow-hidden">
      {/* Background: subtle grid + teal glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute -top-32 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute right-[8%] top-[20%] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
          {/* Copy */}
          <div className="max-w-2xl">
            {eyebrow && (
              <motion.span
                {...fade(0)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm font-medium text-accent-strong backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              {...fade(0.08)}
              className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
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
                className={buttonClasses({ variant: "secondary", size: "lg" })}
              >
                {secondaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Floating UI mockup blocks */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96, y: 24 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.2, ease: REVEAL_EASE },
                })}
            className="relative hidden h-[26rem] lg:block"
          >
            <FloatingCard
              className="absolute left-0 top-6 w-64"
              delay={0}
              reduce={reduce}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Support Agent
                  </p>
                  <p className="text-xs text-muted">Resolved 1,284 tickets</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded-full bg-border" />
                <div className="h-2 w-4/5 rounded-full bg-border" />
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute right-2 top-0 w-56"
              delay={0.4}
              reduce={reduce}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Time saved / week
              </p>
              <p className="mt-1 font-display text-3xl font-semibold text-foreground">
                18.5 hrs
              </p>
              <div className="mt-3 flex items-end gap-1">
                {[40, 65, 50, 80, 72, 95].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-accent/70"
                    style={{ height: `${h * 0.4}px` }}
                  />
                ))}
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute bottom-0 left-10 w-60"
              delay={0.8}
              reduce={reduce}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Workflow
                </p>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent-strong">
                  Live
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {["Lead captured", "Qualified by AI", "Booked"].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-xs text-muted">{step}</span>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FloatingCard({
  children,
  className,
  delay,
  reduce,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={
        reduce
          ? undefined
          : {
              duration: 6,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      className={cn(
        "rounded-2xl border border-border bg-surface/90 p-5 shadow-[0_20px_50px_-24px_rgba(28,35,33,0.4)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
