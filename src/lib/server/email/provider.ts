import "server-only";

// Vendor-agnostic email marketing interface. The concrete provider is chosen
// in index.ts — swapping ESPs means writing a new adapter file, not changing
// callers. Deliberately minimal: Hostinger Reach's public API can manage
// contacts and create draft campaigns, but cannot target, schedule or send
// them (that happens in reach.hostinger.com), so this interface only models
// what every provider can actually do. Extend it if a future provider adds
// capability.

export interface SubscribeInput {
  email: string;
  /** Optional first name, if the form collects it. */
  name?: string;
  /** Where the signup came from, for list hygiene, e.g. "footer" | "article". */
  source?: string;
}

/**
 * A subscribe attempt the provider refused.
 *
 * `listFull` exists because every ESP has a plan ceiling, and hitting it is an
 * operational failure (needs an upgrade) rather than a visitor mistake — the
 * caller should be able to alert on it without knowing which provider is
 * wired up. Adapters set it on a best-effort basis; it is never a guarantee.
 */
export class SubscribeError extends Error {
  readonly status: number;
  readonly detail: string;
  readonly listFull: boolean;

  constructor(opts: { status: number; detail: string; listFull?: boolean; provider: string }) {
    const { status, detail, listFull = false, provider } = opts;
    super(
      listFull
        ? `${provider} rejected the signup — the subscriber list appears to be full (${status}): ${detail}`
        : `${provider} contact creation failed (${status}): ${detail}`,
    );
    this.name = "SubscribeError";
    this.status = status;
    this.detail = detail;
    this.listFull = listFull;
  }
}

export interface EmailProvider {
  /**
   * Add a subscriber to the marketing list. Must be idempotent per email.
   * Throws `SubscribeError` if the provider refuses the contact.
   */
  subscribe(input: SubscribeInput): Promise<void>;
}
