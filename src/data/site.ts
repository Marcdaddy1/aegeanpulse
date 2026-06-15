export const SITE_NAME = "AegeanPulse";
export const TAGLINE = "Practical AI Solutions for Small Business Growth";
export const SITE_DESCRIPTION =
  "AegeanPulse helps small businesses and modern service brands adopt AI through practical automation, chatbots, content systems, and strategy — affordable, fixed-scope, and built for real business use.";

export const SITE_URL = "https://aegeanpulse.com";
export const CAL_URL = "https://cal.com/aegeanpulse";
export const CONTACT_EMAIL = "contact@aegeanpulse.com";

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
