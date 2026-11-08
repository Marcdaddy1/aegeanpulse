"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useIsPhone, useMounted } from "@/lib/hooks";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";
import { BOOK_BAR, CHAT_STATE, OPEN_CHAT, emit, useChannel } from "./chat-events";

// Phone article pages: above #book-bar-start (the worked example) the
// launcher would sit over the article text, and the booking bar that carries
// chat hasn't appeared yet. Read from the page directly, so the launcher's
// first render is already right; waiting for the bar to say so left it
// visible for ~200ms on every load.
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
function aboveBookBar() {
  const start = document.getElementById("book-bar-start");
  return (
    !!start &&
    window.matchMedia("(max-width: 639.98px)").matches &&
    start.getBoundingClientRect().top >= window.innerHeight
  );
}

export function ChatWidget() {
  const mounted = useMounted();
  const pathname = usePathname();
  const isPhone = useIsPhone();
  const [open, setOpen] = useState(false);
  // Whether a [data-hide-chat] block (an article's booking panel or
  // newsletter) is on screen, tagged with the path it was measured on so a
  // stale value never carries over to the next page.
  const [covering, setCovering] = useState({ path: "", on: false });
  // The phone booking bar carries its own chat button while it shows. Read
  // from the channel's last value, so a message sent before this widget
  // mounted isn't lost.
  const barOn = useChannel(BOOK_BAR, "on");
  const aboveBar = useSyncExternalStore(subscribeScroll, aboveBookBar, () => false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  // Whatever opened the chat gets focus back when it closes.
  const openerRef = useRef<HTMLElement | null>(null);
  const restoreFocus = useRef(false);

  // On phones the launcher sat over the end-of-article links. It steps aside
  // while those blocks are in view, and never while the chat is open.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-chat]");
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setCovering({ path: pathname, on: visible.size > 0 });
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname, mounted]);

  useEffect(() => {
    const onOpen = () => {
      openerRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(OPEN_CHAT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT, onOpen);
  }, []);

  // Tell the booking bar, and hand focus back after a close. The timeout lets
  // whichever control is returning (launcher or bar) shed `inert` first.
  useEffect(() => {
    if (!mounted) return;
    emit(CHAT_STATE, { open });
    if (open || !restoreFocus.current) return;
    restoreFocus.current = false;
    const t = window.setTimeout(() => {
      const opener = openerRef.current;
      const target =
        opener && opener.isConnected && !opener.closest("[inert]") ? opener : launcherRef.current;
      target?.focus({ preventScroll: true });
    }, 50);
    return () => window.clearTimeout(t);
  }, [open, mounted]);

  // Skip rendering until mounted: avoids any SSR/client markup mismatch and
  // means the widget only appears once the page is interactive.
  if (!mounted) return null;

  // One control at the bottom right at a time. On phones the open panel has
  // its own close button, so the launcher (a second X) steps aside too.
  const hidden = open
    ? isPhone
    : (covering.path === pathname && covering.on) || barOn || aboveBar;

  return (
    <>
      <ChatLauncher
        ref={launcherRef}
        open={open}
        tucked={hidden}
        onToggle={() => {
          if (open) restoreFocus.current = true;
          else openerRef.current = launcherRef.current;
          setOpen((v) => !v);
        }}
      />
      <ChatPanel
        open={open}
        onClose={() => {
          restoreFocus.current = true;
          setOpen(false);
        }}
      />
    </>
  );
}
