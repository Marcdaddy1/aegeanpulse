import { SectionHeading } from "aegeanpulse";

export function Full() {
  return (
    <div className="bg-background p-10">
      <SectionHeading
        eyebrow="Pricing"
        title="Fixed scope. Fixed price. No retainer you cannot leave."
        description="Three ways to work together, priced up front so you can decide without a sales call."
      />
    </div>
  );
}

export function TitleOnly() {
  return (
    <div className="bg-background p-10">
      <SectionHeading title="Frequently asked questions" />
    </div>
  );
}

export function Centered() {
  return (
    <div className="bg-background p-10">
      <SectionHeading
        align="center"
        eyebrow="Case studies"
        title="Work that shipped"
        description="Every example here is a real build, not a mockup."
      />
    </div>
  );
}
