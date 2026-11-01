"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "./use-chat";

// Starter questions shown until the visitor sends something. Each one is
// answerable from the chat's grounding (services, pricing, FAQs) or its
// booking tools, so none of them invites a made-up answer.
const SUGGESTIONS = [
  "Which package fits a small business?",
  "What does the £499 Discovery include?",
  "Book a free 30-minute call",
];

export function ChatPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { messages, pending, error, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  // Opening moves focus into the panel so keyboard and screen-reader users
  // land where they can type; closing hands it back via ChatWidget.
  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || pending) return;
    sendMessage(input);
    setInput("");
  };

  const showSuggestions = messages.length === 1 && !pending;

  return (
    // A labelled region, not a dialog: the panel is non-modal (the page stays
    // usable behind it), so it shouldn't claim dialog semantics it can't keep.
    // inert while closed: aria-hidden left the message box focusable.
    <section
      id="chat-panel"
      aria-label="AegeanPulse chat assistant"
      inert={!open}
      className={cn(
        "fixed bottom-24 right-5 z-40 flex h-[70svh] max-h-[600px] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] transition-[opacity,transform] duration-200 sm:bottom-28 sm:right-6",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {/* Header. The close button is drawn here but sits last in the DOM, so
          tabbing forward from the message box reaches it. */}
      <div className="border-b border-border bg-accent py-3 pl-5 pr-16 text-accent-foreground">
        <h2 className="font-display text-sm font-semibold">AegeanPulse Assistant</h2>
        <p className="text-xs">Ask about packages and prices, or book a call with Marcus</p>
      </div>

      {/* Messages: announced as they arrive. */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversation"
        aria-busy={pending}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-background text-foreground",
              )}
            >
              <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
              {m.content}
            </div>
          </div>
        ))}
        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(s)}
                className="min-h-9 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-left text-xs font-medium text-accent-strong transition-colors hover:border-accent/60"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {pending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Thinking…
            </div>
          </div>
        )}
        {error && (
          <p className="rounded-xl border border-danger/30 bg-background px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
        <input
          ref={inputRef}
          type="text"
          aria-label="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          disabled={pending}
          maxLength={2000}
          className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-60"
        />
        {/* Enabled even when empty (an empty send does nothing), so it stays
            in the tab order on the way to the close button. */}
        <button
          type="submit"
          disabled={pending}
          aria-label="Send message"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-50"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close chat"
        className="absolute right-3 top-2.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-accent-foreground transition-colors hover:bg-accent-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </section>
  );
}
