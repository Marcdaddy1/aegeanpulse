import { StarterPrice } from "aegeanpulse";

// StarterPrice is the "from" figure — it takes no amount, only the visitor's
// detected currency. It renders a bare <span>, so the cells supply the
// surrounding sentence it is designed to sit inside.
export function Inline() {
  return (
    <div className="bg-background p-8 text-lg text-foreground">
      <p>
        Projects start from{" "}
        <StarterPrice className="font-semibold text-accent" />.
      </p>
    </div>
  );
}

export function InServiceCta() {
  return (
    <div className="bg-background p-8">
      <div className="max-w-md rounded-2xl border border-border bg-surface p-7">
        <h3 className="font-display text-xl font-semibold text-foreground">
          AI chatbots
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          A chatbot that answers real client questions and books the call.
        </p>
        <p className="mt-5 text-foreground">
          From{" "}
          <span className="font-display text-2xl font-semibold">
            <StarterPrice />
          </span>
        </p>
      </div>
    </div>
  );
}
