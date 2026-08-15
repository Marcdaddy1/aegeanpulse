import { Badge } from "aegeanpulse";

// The four pricing tones are what `pricingTone()` maps AI-tool pricing labels
// onto, so they are shown with the labels they actually carry on /ai-tools.
export function Tones() {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-background p-8">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="free">Free</Badge>
      <Badge tone="freemium">Freemium</Badge>
      <Badge tone="paid">Paid</Badge>
      <Badge tone="enterprise">Enterprise</Badge>
    </div>
  );
}

export function InContext() {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-background p-8">
      <Badge tone="accent">Most popular</Badge>
      <Badge tone="neutral">Fixed scope</Badge>
      <Badge tone="free">No card required</Badge>
    </div>
  );
}
