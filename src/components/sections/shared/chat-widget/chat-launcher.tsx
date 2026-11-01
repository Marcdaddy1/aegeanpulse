"use client";

import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatLauncher({
  open,
  tucked = false,
  onToggle,
  ref,
}: {
  open: boolean;
  /** Slide out of the way (and out of the tab order) while content it would cover is on screen. */
  tucked?: boolean;
  onToggle: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close chat" : "Open chat"}
      aria-expanded={open}
      aria-controls="chat-panel"
      inert={tucked}
      // z-40, under the sticky header (z-50), so the mobile menu covers it.
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_12px_28px_-8px_rgba(14,124,107,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:bottom-6 sm:right-6",
        tucked && "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      {open ? (
        <X className="h-6 w-6" aria-hidden="true" />
      ) : (
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}
