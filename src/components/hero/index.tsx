// Single import point for the hero. To swap in a provided 21st.dev / shadcn
// component, drop its files verbatim into ./vendor, add a thin adapter that
// maps HeroProps onto its API, and re-export it here instead of the placeholder.
//
// Active: VendorHero (21st.dev woven-light-hero adapter). The original
// PlaceholderHero remains available below as a fallback — swap the two exports
// to revert.
export { VendorHero as Hero } from "./vendor-hero";
// export { PlaceholderHero as Hero } from "./placeholder-hero";
export type { HeroProps, HeroCta } from "./types";
