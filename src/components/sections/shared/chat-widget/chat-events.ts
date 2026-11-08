import { useSyncExternalStore } from "react";

// A tiny window-event channel between the chat widget (mounted once in the
// root layout) and the phone booking bar (mounted by article pages). They
// live in different trees, and the only thing they need to agree on is who
// owns the bottom of a phone screen at any moment.

/** Chat opened or closed. detail: { open: boolean } */
export const CHAT_STATE = "ap:chat-state";
/** Phone booking bar shown or hidden. detail: { on: boolean } */
export const BOOK_BAR = "ap:book-bar";
/** Ask the chat widget to open (the booking bar's chat button). */
export const OPEN_CHAT = "ap:open-chat";

// The last detail sent on each channel. Events alone are lost if the
// listener mounts after the sender: on the live site the article (and its
// booking bar) can hydrate before the layout's chat widget, so the first
// "step aside" went unheard and the launcher sat over the text until the
// reader scrolled far enough to change the state.
const last = new Map<string, Record<string, boolean> | undefined>();

export function emit(name: string, detail?: Record<string, boolean>) {
  last.set(name, detail);
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/** Current value of a boolean field on a channel, including anything sent
 *  before this component mounted. */
export function useChannel(name: string, key: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener(name, onChange);
      return () => window.removeEventListener(name, onChange);
    },
    () => Boolean(last.get(name)?.[key]),
    () => false,
  );
}
