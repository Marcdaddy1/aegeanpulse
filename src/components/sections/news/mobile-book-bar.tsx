"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { CAL_URL } from "@/data/site";
import { cn } from "@/lib/utils";

// Phones only. The header's booking button is hidden below 640px, so without
// this the first way to book on an article was ~10 screens down. The bar
// appears once the reader passes #book-bar-start (placed ~40% into the body)
// and leaves for good once the closing booking panel (#article-cta) reaches
// the screen, so there is never more than one booking ask in view. It sits
// left of the chat launcher rather than over it. Without JavaScript it never
// shows, which is the safe failure.
export function MobileBookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const start = document.getElementById("book-bar-start");
    const panel = document.getElementById("article-cta");
    if (!start || !panel) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      setShow(
        start.getBoundingClientRect().top < vh &&
          panel.getBoundingClientRect().top > vh,
      );
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

  return (
    <div
      inert={!show}
      className={cn(
        "fixed bottom-5 left-5 right-[5.5rem] z-30 transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({
          size: "lg",
          className: "w-full whitespace-nowrap shadow-[0_12px_28px_-8px_rgba(14,124,107,0.55)] hover:translate-y-0",
        })}
      >
        Book a free call
        <span className="sr-only"> (opens Cal.com in a new tab)</span>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
