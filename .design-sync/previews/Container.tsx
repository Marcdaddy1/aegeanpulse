import { Container } from "aegeanpulse";

// Container is invisible by itself — it only sets a max-width and the
// responsive side padding. The tinted band makes each width legible.
function Band({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-6 text-center text-sm font-medium text-accent-strong">
      {label}
    </div>
  );
}

export function Sizes() {
  return (
    <div className="space-y-4 bg-background py-8">
      <Container size="narrow">
        <Band label="narrow — max-w-3xl (article bodies)" />
      </Container>
      <Container>
        <Band label="default — max-w-6xl (most sections)" />
      </Container>
      <Container size="wide">
        <Band label="wide — max-w-7xl (full-bleed grids)" />
      </Container>
    </div>
  );
}

export function WithContent() {
  return (
    <div className="bg-background py-8">
      <Container size="narrow">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Most AI projects fail before the first line of code
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Not because the technology does not work, but because nobody agreed
          what problem it was meant to solve.
        </p>
      </Container>
    </div>
  );
}
