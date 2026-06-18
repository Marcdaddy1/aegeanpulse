export const SITE_NAME = "AegeanPulse";
export const TAGLINE = "Practical AI Solutions for Small Business Growth";
export const SITE_DESCRIPTION =
  "AegeanPulse helps small businesses and modern service brands adopt AI through practical automation, chatbots, content systems, and strategy — affordable, fixed-scope, and built for real business use.";

export const SITE_URL = "https://aegeanpulse.com";
export const CAL_URL = "https://cal.com/aegeanpulse";
export const CONTACT_EMAIL = "contact@aegeanpulse.com";

// Named founder powers the About page E-E-A-T section and Person/Organization
// structured data. The headshot lives in /public.
export const FOUNDER = {
  name: "Marcus Aragbaye",
  title: "Founder & AI Lead",
  bio: "Marcus Aragbaye founded AegeanPulse to make practical AI accessible to the small businesses too often priced out of it. With a background spanning software engineering and business strategy, he focuses on AI that earns its place — automations, agents, and content systems tied to real commercial outcomes rather than hype. He leads every engagement personally, from the first strategy session to a working system in your tools.",
  linkedin: "https://www.linkedin.com/in/marcus-aragbaye/",
  image: "/marcus-aragbaye.jpg",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "AI News", href: "/ai-news" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "AI News", href: "/ai-news" },
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export const CONSULT_CTA = {
  label: "Book Consultation",
  href: CAL_URL,
  external: true,
};
