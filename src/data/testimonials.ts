export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Personal LinkedIn profile — links the reviewer's name when present. */
  linkedin?: string;
  /** Company website — links the company name when present. */
  website?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "AegeanPulse transformed our workflow automation in ways we never thought possible. Their expertise turned AI from an intimidating concept into a powerful business asset.",
    name: "Sarah Thompson",
    role: "Deputy CEO",
    company: "SoldiscInc",
    linkedin: "https://www.linkedin.com/in/soldisc-incorporation-1aaa38334/",
  },
  {
    quote:
      "The team at AegeanPulse doesn't just implement AI—they become an extension of our strategic planning, helping us make smarter, data-driven decisions.",
    name: "Michael Rodriguez",
    role: "Marketing Director",
    company: "Homecrackers",
    website: "https://www.homecrackers.com",
  },
];
