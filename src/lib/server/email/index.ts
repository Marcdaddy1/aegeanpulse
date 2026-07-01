import "server-only";
import type { EmailProvider } from "./provider";
import { reachProvider, reachConfigured } from "./reach";

// Active provider selection. Currently Hostinger Reach (the user's live
// subscription). To swap ESPs: add an adapter file implementing
// EmailProvider and change this export.

export const emailProvider: EmailProvider = reachProvider;
export const emailConfigured = reachConfigured;
export type { EmailProvider, SubscribeInput } from "./provider";
