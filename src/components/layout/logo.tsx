import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/data/site";

export function PulseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        className="stroke-accent/25"
        strokeWidth="2"
      />
      <path
        d="M5 16h4.5l2.5-7 4 14 3-9 2 2H27"
        className="stroke-accent"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg",
        className,
      )}
      aria-label={`${SITE_NAME} home`}
    >
      <PulseMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        Aegean<span className="text-accent">Pulse</span>
      </span>
    </Link>
  );
}
