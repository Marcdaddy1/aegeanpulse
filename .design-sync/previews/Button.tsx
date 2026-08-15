import { Button } from "aegeanpulse";

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-background p-8">
      <Button variant="primary">Book a strategy call</Button>
      <Button variant="secondary">See pricing</Button>
      <Button variant="ghost">Read the guide</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-background p-8">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

// Button renders an <a> when given href, and adds target/rel when external.
export function AsLink() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-background p-8">
      <Button href="/pricing">Internal link</Button>
      <Button href="https://cal.com/aegeanpulse" external variant="secondary">
        External link
      </Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-background p-8">
      <Button disabled>Primary disabled</Button>
      <Button variant="secondary" disabled>
        Secondary disabled
      </Button>
    </div>
  );
}
