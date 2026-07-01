"use client";

import { useState } from "react";
import { useMounted } from "@/lib/hooks";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  // Skip rendering until mounted: avoids any SSR/client markup mismatch and
  // means the widget only appears once the page is interactive.
  if (!mounted) return null;

  return (
    <>
      <ChatLauncher open={open} onToggle={() => setOpen((v) => !v)} />
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
