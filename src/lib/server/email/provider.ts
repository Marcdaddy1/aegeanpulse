import "server-only";

// Vendor-agnostic email marketing interface. The concrete provider is chosen
// in index.ts — swapping ESPs means writing a new adapter file, not changing
// callers. Deliberately minimal: Hostinger Reach's public API supports
// contact management but NOT programmatic campaign sending (campaigns are
// sent from reach.hostinger.com), so this interface only models what every
// provider can actually do. Extend it if a future provider adds capability.

export interface SubscribeInput {
  email: string;
  /** Optional first name, if the form collects it. */
  name?: string;
  /** Where the signup came from, for list hygiene, e.g. "footer" | "article". */
  source?: string;
}

export interface EmailProvider {
  /** Add a subscriber to the marketing list. Must be idempotent per email. */
  subscribe(input: SubscribeInput): Promise<void>;
}
