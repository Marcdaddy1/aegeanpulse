@AGENTS.md

# Project Status

_Last updated: 2026-06-18._

> Canonical project guidance (architecture, conventions, routes) lives in the
> parent folder's `CLAUDE.md`, which is loaded when working from the workspace
> root but is **not** part of this repo. This section is the version-controlled
> snapshot of project status so a clone always carries it.

**Stage:** Active development. All routes are built and `npm run build` is green (31 static pages + 6 SSG service pages + 11 SSG article pages). Current focus: VPS deployment on Hostinger.

**Version control:** This repo is the git root. Remote `origin` → https://github.com/Marcdaddy1/aegeanpulse (private), default branch `main`. Workflow: after each logical unit of work, commit locally with a clean message and push. Commit identity: `Marcus Aragbaye <88402273+Marcdaddy1@users.noreply.github.com>`.

**Hero:** `src/components/hero/index.tsx` exports **`VendorHero`** (the 21st.dev `woven-light-hero`), not the placeholder.
- `hero/vendor-hero.tsx` (adapter) maps `HeroProps` onto the vendor's `WovenCanvas` (Three.js) over a dark backdrop with brand-teal-tinted particles, because the vendor component ships hard-coded demo copy/nav and accepts no props.
- `hero/vendor/woven-light-hero.tsx` is the vendor source, verbatim except for documented deviations: exported `WovenCanvas`, brand-teal tint, rect-relative mouse mapping, rAF cleanup, tunable `REPEL_RADIUS` / `REPEL_STRENGTH`, mobile support (touch listeners, device-scaled particle count + capped DPR, reused scratch vectors in the loop), and `THREE.Timer` replacing the deprecated `THREE.Clock` (requires `clock.update()` per frame before `clock.getElapsed()`).
- `FORCE_HERO_PARTICLES` (adapter) runs the particle field even under reduced motion; the hero text still respects it.

**Mobile:** A dedicated mobile pass tightened spacing/type, made hero CTAs full-width and the hero shorter (`min-h-[80svh]`), constrained/hid oversized decorative blurs on small screens, added `overflow-x-hidden` on `<body>` as an anti-overflow safety net, set theme-color via the `viewport` export, and made the hero animation touch-interactive + performant on phones. Body copy uses `text-base sm:text-lg`; section grids collapse to a single column on phones.

**Reduced-motion / hydration:** `Reveal`/`Stagger`/`StaggerItem` gate their static fallback behind `useMounted()` — `useReducedMotion()` is `false` on the server but `true` on a reduced-motion client, so branching the rendered element on it during the first render throws a hydration mismatch. Emit animated markup on the server + first client render, swap to static after mount. `<body>` has `suppressHydrationWarning` for browser-extension attrs.

**SEO (completed 2026-06-18):**
- Homepage H1 → "AI Automation Services for Small Businesses"; keyword-first `<title>` and meta description.
- Standalone `/services/[slug]` pages (6 routes) — each indexable, with own metadata, breadcrumb, and `Service` JSON-LD.
- `/pricing` page with `PricingTier` cards, accordion FAQ, `FAQPage` + `BreadcrumbList` JSON-LD.
- `FAQPage` JSON-LD on homepage (general AI FAQs) and `/services` (service FAQs).
- `Person` JSON-LD on `/about` for Marcus Aragbaye (founder, LinkedIn sameAs) wired into the `Organization` schema site-wide.
- `Service` + `ItemList` JSON-LD on `/services`; `Organization` schema includes `logo` and `founder`.
- Testimonials: Sarah Thompson's name links to LinkedIn; Homecrackers links to its website.
- Founder headshot at `public/marcus-aragbaye.png` (600×600, optimised from 4096×4096 source).

**Known open items / TODO:**
- VPS deployment on Hostinger (in progress).
- The dev machine has `prefers-reduced-motion` ON — account for it when testing animations.
- `bis_skin_checked` hydration warnings in dev console are Bitdefender browser extension injections — not a code bug. Invisible in Incognito and in production for unaffected users.
