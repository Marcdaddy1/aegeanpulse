"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge, pricingTone } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { TOOLS, TOOL_CATEGORIES, type ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";

type Filter = "All" | ToolCategory;

export function ToolsDirectory() {
  const [active, setActive] = useState<Filter>("All");

  const filters: Filter[] = ["All", ...TOOL_CATEGORIES];

  const visible = useMemo(
    () => (active === "All" ? TOOLS : TOOLS.filter((t) => t.category === active)),
    [active],
  );

  return (
    <div>
      {/* Filter chips */}
      <div
        role="tablist"
        aria-label="Filter tools by category"
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

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "tool" : "tools"}
        {active !== "All" && ` in ${active}`}.
      </p>

      {/* Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tool) => (
          <article
            key={tool.name}
            className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-18px_rgba(14,124,107,0.35)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {tool.name}
                </h3>
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {tool.category}
                </span>
              </div>
              <Badge tone={pricingTone(tool.pricing)}>{tool.pricing}</Badge>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
              {tool.description}
            </p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonClasses({ variant: "secondary", size: "sm" }),
                "mt-5 w-full",
              )}
            >
              Visit Tool
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
