import { Price } from "aegeanpulse";

// Price renders a bare <span>, so on its own it is invisible in a preview
// frame. Each cell gives it type and a label. Without an explicit `currency`
// it formats in the visitor's detected currency, which is USD by default.
export function Amounts() {
  return (
    <div className="space-y-3 bg-background p-8 text-foreground">
      <p className="font-display text-3xl font-semibold">
        <Price amount={499} />
      </p>
      <p className="font-display text-3xl font-semibold">
        <Price amount={2499} />
      </p>
      <p className="font-display text-3xl font-semibold">
        <Price amount={799} />
      </p>
    </div>
  );
}

// `currency` overrides detection — the three profiles the site ships.
export function Currencies() {
  return (
    <div className="flex flex-wrap items-baseline gap-8 bg-background p-8 text-foreground">
      <span className="font-display text-2xl font-semibold">
        <Price amount={2499} currency="GBP" />
      </span>
      <span className="font-display text-2xl font-semibold">
        <Price amount={2499} currency="EUR" />
      </span>
      <span className="font-display text-2xl font-semibold">
        <Price amount={2499} currency="USD" />
      </span>
    </div>
  );
}

export function InPricingCard() {
  return (
    <div className="bg-background p-8">
      <div className="max-w-xs rounded-2xl border border-border bg-surface p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Builder
        </p>
        <p className="mt-3 font-display text-4xl font-semibold text-foreground">
          <Price amount={2499} currency="GBP" />
        </p>
        <p className="mt-2 text-muted">Fixed scope, fixed price.</p>
      </div>
    </div>
  );
}
