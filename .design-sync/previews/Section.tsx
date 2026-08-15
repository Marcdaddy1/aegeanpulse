import { Card, Section, SectionHeading } from "aegeanpulse";

// Section supplies the vertical rhythm (py-20/28) and the Container; it has
// no visible surface of its own at tone="default", so it renders as empty
// space without children. Every cell gives it real content.
export function Default() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="AI that earns its place"
        description="Fixed-scope builds for small businesses — automations, chatbots and content systems that ship."
      />
    </Section>
  );
}

// The two alternate tones exist to give adjacent sections visual separation.
export function Muted() {
  return (
    <Section tone="muted">
      <SectionHeading eyebrow="Muted tone" title="bg-surface/60" />
    </Section>
  );
}

export function Accent() {
  return (
    <Section tone="accent">
      <SectionHeading eyebrow="Accent tone" title="bg-accent-soft/40" />
    </Section>
  );
}

// reveal={false} is the required setting when the content runs its own
// Stagger — otherwise the two animations fight.
export function NarrowNoReveal() {
  return (
    <Section containerSize="narrow" reveal={false}>
      <Card>
        <p className="text-muted">
          containerSize=&quot;narrow&quot; with reveal disabled.
        </p>
      </Card>
    </Section>
  );
}
