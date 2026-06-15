import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "free" | "freemium" | "paid" | "enterprise";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-background text-muted",
  accent: "border-accent/30 bg-accent-soft text-accent-strong",
  free: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  freemium: "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300",
  paid: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  enterprise:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function pricingTone(pricing: string): Tone {
  const key = pricing.toLowerCase();
  if (key === "free") return "free";
  if (key === "freemium") return "freemium";
  if (key === "paid") return "paid";
  if (key === "enterprise") return "enterprise";
  return "neutral";
}
