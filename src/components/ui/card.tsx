import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-7 shadow-[0_1px_3px_rgba(28,35,33,0.04)]",
        hover &&
          "group transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-18px_rgba(14,124,107,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
