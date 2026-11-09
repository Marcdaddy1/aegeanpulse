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
  useChannel,
} from "@/components/sections/shared/chat-widget/chat-events";

const PHONE_QUERY = "(max-width: 639.98px)";

// Phones only. The header's booking button is hidden below 640px, so without
// this the first way to book on an article was ~10 screens down.
//
// When: from #book-bar-start until the closing panel's own booking button
// ([data-bar-until]) comes on screen, so there is one booking button in view
// at a time. It also waits while a [data-bar-yields] element is on screen (the
// rulebook pointer: one ask at a time), and never shows while the chat is
// open. The page places the marker: at a heading the article names
// (bookBarFrom), else after the worked example, else 60% in.
//
// What: one bottom bar that owns the bottom of the screen. It carries its own
// chat button, and the floating chat launcher steps aside while it shows, so
// there is one teal block over the text, not two. Without JavaScript it never
// shows, which is the safe failure.
//
// Above its range the launcher steps aside too (the chat widget measures
// #book-bar-start itself): on a phone it sat over the right edge of the prose
// for the first half of the article. The bar is the first way into chat here.
export function MobileBookBar() {
  // inZone: between the marker and the panel's button. yielding: something
  // the bar defers to is on screen. The launcher stays tucked across the whole
  // zone either way, so it doesn't pop up while the bar waits.
  const [zone, setZone] = useState({ inZone: false, yielding: false });
  const chatOpen = useChannel(CHAT_STATE, "open");
  const show = zone.inZone && !zone.yielding && !chatOpen;

  useEffect(() => {
    const start = document.getElementById("book-bar-start");
    const until =
      document.querySelector("#article-cta [data-bar-until]") ??
      document.getElementById("article-cta");
    if (!start || !until) return;
    const yields = [...document.querySelectorAll("[data-bar-yields]")];
    const mq = window.matchMedia(PHONE_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const inZone =
        mq.matches &&
        start.getBoundingClientRect().top < vh &&
        until.getBoundingClientRect().top > vh;
      const yielding = yields.some((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < vh;
      });
      setZone((z) => (z.inZone === inZone && z.yielding === yielding ? z : { inZone, yielding }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Let the chat launcher know it should step aside: across the whole zone,
  // including while the bar waits for the pointer to leave.
  useEffect(() => {
    emit(BOOK_BAR, { on: zone.inZone });
  }, [zone.inZone]);
  useEffect(() => () => emit(BOOK_BAR, { on: false }), []);

  return (
    // A fade from the page colour sits behind the buttons, so article text
    // doesn't show through between the pill and the chat circle. The fade
    // itself lets taps through; only the buttons catch them.
    <div
      inert={!show}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-linear-to-t from-background from-45% to-background/0 px-5 pb-5 pt-10 transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:hidden",
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        className={cn("flex items-center gap-3", show && "pointer-events-auto")}
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
    </div>
  );
}
