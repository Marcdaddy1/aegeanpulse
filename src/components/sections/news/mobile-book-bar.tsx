"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { CAL_URL } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  BOOK_BAR,
  CHAT_STATE,
  OPEN_CHAT,
  emit,
} from "@/components/sections/shared/chat-widget/chat-events";

const PHONE_QUERY = "(max-width: 639.98px)";

// Phones only. The header's booking button is hidden below 640px, so without
// this the first way to book on an article was ~10 screens down.
//
// When: from #book-bar-start (placed after the article's worked example, once
// the reader has had something useful) until the closing booking panel
// (#article-cta) reaches the screen, so there is never more than one booking
// ask in view. Never while the chat is open.
//
// What: one bottom bar that owns the bottom of the screen. It carries its own
// chat button, and the floating chat launcher steps aside while it shows, so
// there is one teal block over the text, not two. Without JavaScript it never
// shows, which is the safe failure.
export function MobileBookBar() {
  const [inRange, setInRange] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const show = inRange && !chatOpen;

  useEffect(() => {
    const start = document.getElementById("book-bar-start");
    const panel = document.getElementById("article-cta");
    if (!start || !panel) return;
    const mq = window.matchMedia(PHONE_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      setInRange(
        mq.matches &&
          start.getBoundingClientRect().top < vh &&
          panel.getBoundingClientRect().top > vh,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onChat = (e: Event) => setChatOpen(Boolean((e as CustomEvent).detail?.open));
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener(CHAT_STATE, onChat);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener(CHAT_STATE, onChat);
    };
  }, []);

  // Let the chat launcher know whether to step aside.
  useEffect(() => {
    emit(BOOK_BAR, { on: show });
  }, [show]);
  useEffect(() => () => emit(BOOK_BAR, { on: false }), []);

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-5 bottom-5 z-30 flex items-center gap-3 transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({
          size: "lg",
          className:
            "min-w-0 flex-1 whitespace-nowrap shadow-[0_8px_20px_-6px_rgba(28,35,33,0.3)] hover:translate-y-0",
        })}
      >
        Book a free call
        <span className="sr-only"> (opens Cal.com in a new tab)</span>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        // Safari doesn't focus a button on tap, and the chat hands focus
        // back to whatever was focused when it opened.
        onClick={(e) => {
          e.currentTarget.focus({ preventScroll: true });
          emit(OPEN_CHAT);
        }}
        aria-label="Open chat"
        aria-controls="chat-panel"
        className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-[0_8px_20px_-6px_rgba(28,35,33,0.3)] transition-colors hover:bg-accent-soft"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
