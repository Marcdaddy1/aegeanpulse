import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  /** Wrap content in a scroll-reveal. Disable when the inner content
   *  manages its own stagger animation. */
  reveal?: boolean;
  /** Alternate surface tint for visual rhythm between sections. */
  tone?: "default" | "muted" | "accent";
}

const tones = {
  default: "",
  muted: "bg-surface/60",
  accent: "bg-accent-soft/40",
};

export function Section({
  id,
  children,
  className,
  containerSize = "default",
  reveal = true,
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 md:py-28", tones[tone], className)}
    >
      <Container size={containerSize}>
        {reveal ? <Reveal>{children}</Reveal> : children}
      </Container>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
