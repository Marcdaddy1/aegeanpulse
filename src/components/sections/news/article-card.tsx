import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-18px_rgba(14,124,107,0.35)]">
      <div className="flex items-center justify-between">
        <Badge tone="accent">{article.category}</Badge>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {article.readingTime} min read
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-foreground">
        <Link
          href={`/ai-news/${article.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {article.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Read Article
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </article>
  );
}
