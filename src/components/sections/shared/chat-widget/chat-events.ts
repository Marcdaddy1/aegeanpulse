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

export function emit(name: string, detail?: Record<string, boolean>) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}
