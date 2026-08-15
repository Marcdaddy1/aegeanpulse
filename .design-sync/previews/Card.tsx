import { Badge, Card } from "aegeanpulse";

export function Default() {
  return (
    <div className="bg-background p-8">
      <Card className="max-w-md">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Discovery
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          A fixed-scope audit of where automation actually pays off in your
          business, and what it would cost to build.
        </p>
      </Card>
    </div>
  );
}

// `hover` adds the lift + teal shadow used by the service and pricing grids.
// Static in a screenshot — the difference is visible on pointer hover.
export function Hover() {
  return (
    <div className="bg-background p-8">
      <Card hover className="max-w-md">
        <Badge tone="accent">Most popular</Badge>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          Builder
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          We build and ship the automation, chatbot or content system end to
          end, then hand it over documented.
        </p>
      </Card>
    </div>
  );
}

export function Grid() {
  return (
    <div className="grid gap-6 bg-background p-8 sm:grid-cols-2">
      <Card hover>
        <h3 className="font-display text-lg font-semibold text-foreground">
          AI chatbots
        </h3>
        <p className="mt-2 text-muted">Answer client queries and book calls.</p>
      </Card>
      <Card hover>
        <h3 className="font-display text-lg font-semibold text-foreground">
          Workflow automation
        </h3>
        <p className="mt-2 text-muted">Remove the copy-paste work in between.</p>
      </Card>
    </div>
  );
}
