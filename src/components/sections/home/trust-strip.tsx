import { Container } from "@/components/ui/container";

const TRUST_ITEMS = [
  "AI Automation",
  "AI Agents",
  "Content Systems",
  "Chatbots",
  "Digital Growth",
  "SMB AI Enablement",
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface/40 py-8">
      <Container size="wide">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Capabilities we deliver
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="text-sm font-medium tracking-wide text-foreground/70"
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
