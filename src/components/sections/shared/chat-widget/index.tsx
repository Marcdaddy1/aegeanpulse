"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMounted } from "@/lib/hooks";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const mounted = useMounted();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Whether a [data-hide-chat] block (an article's booking panel or
  // newsletter) is on screen, tagged with the path it was measured on so a
  // stale value never carries over to the next page.
  const [covering, setCovering] = useState({ path: "", on: false });
  const launcherRef = useRef<HTMLButtonElement>(null);

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

  // Skip rendering until mounted: avoids any SSR/client markup mismatch and
  // means the widget only appears once the page is interactive.
  if (!mounted) return null;

  const tucked = !open && covering.path === pathname && covering.on;

  return (
    <>
      <ChatLauncher
        ref={launcherRef}
        open={open}
        tucked={tucked}
        onToggle={() => setOpen((v) => !v)}
      />
      <ChatPanel
        open={open}
        onClose={() => {
          setOpen(false);
          launcherRef.current?.focus();
        }}
      />
    </>
  );
}
