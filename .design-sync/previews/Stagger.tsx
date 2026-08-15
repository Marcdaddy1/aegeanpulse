import { Card, Stagger, StaggerItem } from "aegeanpulse";

// Stagger is the grid counterpart to Reveal: it animates its StaggerItem
// children in sequence (0.08s apart) as the grid enters view. It only drives
// children that are StaggerItems — plain children will not animate.
export function Grid() {
  return (
    <div className="bg-background p-10">
      <Stagger className="grid gap-6 sm:grid-cols-3">
        <StaggerItem>
          <Card hover>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Discovery
            </h3>
            <p className="mt-2 text-muted">Find where automation pays off.</p>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card hover>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Builder
            </h3>
            <p className="mt-2 text-muted">Build it and hand it over.</p>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card hover>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Growth Partner
            </h3>
            <p className="mt-2 text-muted">Keep it running and improving.</p>
          </Card>
        </StaggerItem>
      </Stagger>
    </div>
  );
}

export function List() {
  return (
    <div className="bg-background p-10">
      <Stagger className="space-y-3">
        {["Audit", "Design", "Build", "Hand over"].map((step) => (
          <StaggerItem key={step}>
            <div className="rounded-xl border border-border bg-surface px-5 py-4 text-foreground">
              {step}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
