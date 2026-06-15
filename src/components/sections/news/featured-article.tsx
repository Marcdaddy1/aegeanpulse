import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/data/articles";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:border-accent/40 sm:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            Featured
          </span>
          <Badge tone="accent">{article.category}</Badge>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readingTime} min read
          </span>
        </div>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          <Link
            href={`/ai-news/${article.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {article.summary}
        </p>
        <span className="mt-7 inline-flex items-center gap-1.5 font-medium text-accent">
          Read Article
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
