"use client";

import { useState, useCallback } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Marcus's AI assistant. I can explain the packages and prices, or book you a free 30-minute call with him.",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;

      const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
      setMessages(next);
      setPending(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Only send role+content — strip any client-only fields before posting.
          // timeZone lets the bot present booking slots in the visitor's local time.
          body: JSON.stringify({
            messages: next.map((m) => ({ role: m.role, content: m.content })),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Something went wrong. Please try again.");
          return;
        }

        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } catch {
        setError("Couldn't reach the assistant. Check your connection and try again.");
      } finally {
        setPending(false);
      }
    },
    [messages, pending],
  );

  return { messages, pending, error, sendMessage };
}
