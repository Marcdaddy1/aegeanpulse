"use client";

import { usePathname } from "next/navigation";

// Article pages end with their own booking panel and newsletter form, so the
// footer's copies of both are hidden there to leave one next step. The
// /ai-news index keeps them.
export function HideOnArticle({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (/^\/ai-news\/[^/]+\/?$/.test(pathname)) return null;
  return children;
}
