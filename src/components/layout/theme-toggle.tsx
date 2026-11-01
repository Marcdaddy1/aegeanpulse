"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/lib/hooks";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // The label waits for mount (the theme is only known on the client);
      // the icon doesn't: CSS picks it from the .dark class, so the button is
      // never an empty circle, even before JavaScript loads.
      aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Moon className="h-[1.15rem] w-[1.15rem] dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-[1.15rem] w-[1.15rem] dark:block" aria-hidden="true" />
    </button>
  );
}
