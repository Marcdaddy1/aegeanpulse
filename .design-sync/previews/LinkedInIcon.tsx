import { LinkedInIcon } from "aegeanpulse";

// The SVG carries no width/height — it fills its box and inherits colour via
// currentColor. Without sizing and colour classes on className it paints
// nothing, so every cell here sets both.
export function Sizes() {
  return (
    <div className="flex items-center gap-6 bg-background p-8 text-foreground">
      <LinkedInIcon className="h-4 w-4" />
      <LinkedInIcon className="h-6 w-6" />
      <LinkedInIcon className="h-10 w-10" />
    </div>
  );
}

export function Colours() {
  return (
    <div className="flex items-center gap-6 bg-background p-8">
      <LinkedInIcon className="h-8 w-8 text-foreground" />
      <LinkedInIcon className="h-8 w-8 text-accent" />
      <LinkedInIcon className="h-8 w-8 text-muted" />
    </div>
  );
}

// How it is actually used: inline beside a name in the testimonial cards.
export function InlineWithName() {
  return (
    <div className="bg-background p-8">
      <a className="inline-flex items-center gap-2 text-foreground hover:text-accent">
        <span className="font-medium">Marcus Aragbaye</span>
        <LinkedInIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
