export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "AegeanPulse transformed our workflow automation in ways we never thought possible. Their expertise turned AI from an intimidating concept into a powerful business asset.",
    name: "Sarah Thompson",
    role: "Deputy CEO",
    company: "SoldiscInc",
  },
  {
    quote:
      "The team at AegeanPulse doesn't just implement AI—they become an extension of our strategic planning, helping us make smarter, data-driven decisions.",
    name: "Michael Rodriguez",
    role: "Marketing Director",
    company: "Homecrackers",
  },
];
