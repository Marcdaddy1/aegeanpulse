import { Badge, Card, Stagger, StaggerItem } from "aegeanpulse";

// StaggerItem carries the per-child variant (fade + 20px lift). It is inert
// on its own — it only animates inside a Stagger parent, which drives the
// sequence. Both cells therefore show it in that parent.
export function InsideStagger() {
  return (
    <div className="bg-background p-10">
      <Stagger className="grid gap-4 sm:grid-cols-2">
        <StaggerItem>
          <Card>
            <Badge tone="accent">Item one</Badge>
            <p className="mt-3 text-muted">Animates first.</p>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card>
            <Badge tone="neutral">Item two</Badge>
            <p className="mt-3 text-muted">Follows 0.08s later.</p>
          </Card>
        </StaggerItem>
      </Stagger>
    </div>
  );
}

// className passes straight through, so items can carry their own layout.
export function WithClassName() {
  return (
    <div className="bg-background p-10">
      <Stagger className="flex flex-wrap gap-3">
        {["Chatbots", "Automation", "Content", "Reporting"].map((tag) => (
          <StaggerItem key={tag} className="shrink-0">
            <Badge tone="accent">{tag}</Badge>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
