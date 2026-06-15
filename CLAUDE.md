@AGENTS.md

# Project Status

_Last updated: 2026-06-15._

> Canonical project guidance (architecture, conventions, routes) lives in the
> parent folder's `CLAUDE.md`, which is loaded when working from the workspace
> root but is **not** part of this repo. This section is the version-controlled
> snapshot of project status so a clone always carries it.

**Stage:** Active development. All routes are built and `npm run build` is green; current focus is hero polish and visual refinement.

**Version control:** This repo is the git root. Remote `origin` → https://github.com/Marcdaddy1/aegeanpulse (private), default branch `main`. Workflow: after each logical unit of work, commit locally with a clean message and push. Commit identity: `Marcus Aragbaye <88402273+Marcdaddy1@users.noreply.github.com>`.

**Hero:** `src/components/hero/index.tsx` exports **`VendorHero`** (the 21st.dev `woven-light-hero`), not the placeholder.
- `hero/vendor-hero.tsx` (adapter) maps `HeroProps` onto the vendor's `WovenCanvas` (Three.js) over a dark backdrop with brand-teal-tinted particles, because the vendor component ships hard-coded demo copy/nav and accepts no props.
- `hero/vendor/woven-light-hero.tsx` is the vendor source, verbatim except for documented deviations: exported `WovenCanvas`, brand-teal tint, rect-relative mouse mapping, rAF cleanup, and tunable `REPEL_RADIUS` / `REPEL_STRENGTH`.
- `FORCE_HERO_PARTICLES` (adapter) runs the particle field even under reduced motion; the hero text still respects it.

**Reduced-motion / hydration:** `Reveal`/`Stagger`/`StaggerItem` gate their static fallback behind `useMounted()` — `useReducedMotion()` is `false` on the server but `true` on a reduced-motion client, so branching the rendered element on it during the first render throws a hydration mismatch. Emit animated markup on the server + first client render, swap to static after mount. `<body>` has `suppressHydrationWarning` for browser-extension attrs.

**Known open items / TODO:**
- Hero perf pass: swap deprecated `THREE.Clock` → `THREE.Timer`; the 50k-particle loop allocates several `Vector3`s per particle per frame — refactor to reused vectors.
- `SITE_URL` in `src/data/site.ts` is still a placeholder until the domain is set.
