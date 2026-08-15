import { Card, Reveal, SectionHeading } from "aegeanpulse";

// Reveal fades and lifts its children once, when they scroll into view
// (viewport once). In a still frame you see the settled state; the motion is
// opacity + transform only, and it short-circuits to static output under
// prefers-reduced-motion.
export function Default() {
  return (
    <div className="bg-background p-10">
      <Reveal>
        <SectionHeading
          eyebrow="Scroll reveal"
          title="Content fades up as it enters the viewport"
          description="Runs once. Animates opacity and transform only."
        />
      </Reveal>
    </div>
  );
}

// `delay` staggers sibling Reveals by hand where a full Stagger is overkill.
export function Delayed() {
  return (
    <div className="space-y-4 bg-background p-10">
      <Reveal>
        <Card>
          <p className="text-foreground">delay = 0</p>
        </Card>
      </Reveal>
      <Reveal delay={0.15}>
        <Card>
          <p className="text-foreground">delay = 0.15</p>
        </Card>
      </Reveal>
      <Reveal delay={0.3}>
        <Card>
          <p className="text-foreground">delay = 0.3</p>
        </Card>
      </Reveal>
    </div>
  );
}
