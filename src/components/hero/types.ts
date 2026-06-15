export interface HeroCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** Capability keywords; a hero may render or ignore these. */
  trustItems: string[];
}
