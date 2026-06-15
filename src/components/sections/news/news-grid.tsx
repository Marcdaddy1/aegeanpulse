"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "./article-card";
import { ARTICLE_CATEGORIES, type Article, type ArticleCategory } from "@/data/articles";
import { cn } from "@/lib/utils";

type Filter = "All" | ArticleCategory;

export function NewsGrid({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<Filter>("All");

  // Only show categories that actually have articles in the grid.
  const available = useMemo(() => {
    const present = new Set(articles.map((a) => a.category));
    return ARTICLE_CATEGORIES.filter((c) => present.has(c));
  }, [articles]);

  const filters: Filter[] = ["All", ...available];

  const visible = useMemo(
    () =>
      active === "All"
        ? articles
        : articles.filter((a) => a.category === active),
    [active, articles],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter articles by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const selected = active === filter;
          return (
            <button
              key={filter}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                selected
                  ? "border-accent bg-accent text-white shadow-sm"
                  : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
