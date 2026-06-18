@AGENTS.md

# Project Status

_Last updated: 2026-06-18._

> Canonical project guidance (architecture, conventions, routes) lives in the
> parent folder's `CLAUDE.md`, which is loaded when working from the workspace
> root but is **not** part of this repo. This section is the version-controlled
> snapshot of project status so a clone always carries it.

**Stage:** Active development. All routes are built and `npm run build` is green; current focus is hero polish and visual refinement.

**Version control:** This repo is the git root. Remote `origin` → https://github.com/Marcdaddy1/aegeanpulse (private), default branch `main`. Workflow: after each logical unit of work, commit locally with a clean message and push. Commit identity: `Marcus Aragbaye <88402273+Marcdaddy1@users.noreply.github.com>`.

**Hero:** `src/components/hero/index.tsx` exports **`VendorHero`** (the 21st.dev `woven-light-hero`), not the placeholder.
- `hero/vendor-hero.tsx` (adapter) maps `HeroProps` onto the vendor's `WovenCanvas` (Three.js) over a dark backdrop with brand-teal-tinted particles, because the vendor component ships hard-coded demo copy/nav and accepts no props.
- `hero/vendor/woven-light-hero.tsx` is the vendor source, verbatim except for documented deviations: exported `WovenCanvas`, brand-teal tint, rect-relative mouse mapping, rAF cleanup, tunable `REPEL_RADIUS` / `REPEL_STRENGTH`, and mobile support (touch listeners, device-scaled particle count + capped DPR, reused scratch vectors in the loop).
- `FORCE_HERO_PARTICLES` (adapter) runs the particle field even under reduced motion; the hero text still respects it.

**Mobile:** A dedicated mobile pass tightened spacing/type, made hero CTAs full-width and the hero shorter (`min-h-[80svh]`), constrained/hid oversized decorative blurs on small screens, added `overflow-x-hidden` on `<body>` as an anti-overflow safety net, set theme-color via the `viewport` export, and made the hero animation touch-interactive + performant on phones. Body copy uses `text-base sm:text-lg`; section grids collapse to a single column on phones.

**Reduced-motion / hydration:** `Reveal`/`Stagger`/`StaggerItem` gate their static fallback behind `useMounted()` — `useReducedMotion()` is `false` on the server but `true` on a reduced-motion client, so branching the rendered element on it during the first render throws a hydration mismatch. Emit animated markup on the server + first client render, swap to static after mount. `<body>` has `suppressHydrationWarning` for browser-extension attrs.

**Hero vendor file deviations from verbatim source:** exported `WovenCanvas`, brand-teal tint, rect-relative mouse mapping, rAF cleanup, tunable `REPEL_RADIUS`/`REPEL_STRENGTH`, mobile support, `THREE.Timer` (replaces deprecated `THREE.Clock` — requires `clock.update()` call per frame before `getElapsedTime()`).
