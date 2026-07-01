@AGENTS.md

# Project Status

_Last updated: 2026-07-01._

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

**Backend features (added 2026-07-01 — the site is no longer fully static):**
- **Secrets:** `.env.local` (gitignored) holds `CAL_COM_API_KEY`, `CAL_COM_EVENT_TYPE_ID` (3198282, the "30min" event), `INTERNAL_CRON_SECRET`, `HOSTINGER_API_TOKEN`. `ANTHROPIC_API_KEY` is a Windows user-level env var on the dev machine; on the VPS it goes in `.env.local`. `.env.example` documents everything. Server-only modules live in `src/lib/server/` (import `"server-only"`).
- **AI chatbot** (`/api/chat` + `src/components/sections/shared/chat-widget/`, mounted in `layout.tsx`): Claude via shared client `src/lib/anthropic.ts`; grounded in services/pricing/FAQ data by `src/lib/server/chat-context.ts` (context-stuffing, no vector DB); books real Cal.com appointments via tool use (`src/lib/server/cal.ts`, v2 API — slots need header `cal-api-version: 2024-09-04`, bookings `2024-08-13`). Rate-limited (10/min, 60/day per IP) by shared `src/lib/server/rate-limit.ts`. Tools aren't registered when Cal env vars are absent (falls back to the booking link). Verified end-to-end: real booking created + cancelled.
- **AI article pipeline:** articles live as `src/content/articles/<slug>.md` (frontmatter + prose), loaded by server-only `src/lib/articles.ts` (gray-matter; `## ` = block heading, each non-blank line = one paragraph). `src/data/articles.ts` now holds only types + `ARTICLE_CATEGORIES` (client-safe). **`draft: true` files are invisible everywhere** (pages, params, sitemap) — that's the review gate. Topic queue: `src/data/content-topics.ts` (state = file existence, idempotent). Generator: `src/lib/server/generate-article.ts` (forced structured tool call). Trigger: `POST /api/internal/generate-draft` with header `x-internal-secret` — for manual curl now, VPS crontab weekly later. Publish flow: review draft file → edit → set `draft: false` → commit/push/deploy.
- **Newsletter (Hostinger Reach):** `src/lib/server/email/` — vendor-agnostic `EmailProvider` + Reach adapter (`POST https://developers.hostinger.com/api/reach/v1/contacts`, Bearer `HOSTINGER_API_TOKEN`). `/api/newsletter/subscribe` requires `consent: true` (UK GDPR), rate-limited 5/hour/IP. `<NewsletterSignup>` sits in the footer + after article bodies. **Reach's API cannot send campaigns** — sending happens manually in reach.hostinger.com after publishing an article.

**Known open items / TODO:**
- VPS deployment on Hostinger (in progress). Deploy additions: create `.env.local` on the VPS (see `.env.example`); add weekly crontab → `0 6 * * 1 curl -s -X POST -H "x-internal-secret: $SECRET" http://localhost:3000/api/internal/generate-draft`; confirm Nginx forwards `x-forwarded-for` (rate limiting keys on it).
- Pending draft awaiting review: `src/content/articles/ai-automation-cost-small-business.md` (AI-generated, `draft: true`).
- Live Reach subscribe test pending `HOSTINGER_API_TOKEN`.
- The dev machine has `prefers-reduced-motion` ON — account for it when testing animations.
- `bis_skin_checked` hydration warnings in dev console are Bitdefender browser extension injections — not a code bug. Invisible in Incognito and in production for unaffected users.

## gstack (REQUIRED — global install)

**Before doing ANY work, verify gstack is installed:**

```bash
test -d ~/.claude/skills/gstack/bin && echo "GSTACK_OK" || echo "GSTACK_MISSING"
```

If GSTACK_MISSING: STOP. Do not proceed. Tell the user:

> gstack is required for all AI-assisted work in this repo.
> Install it:
> ```bash
> git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
> cd ~/.claude/skills/gstack && ./setup --team
> ```
> Then restart your AI coding tool.

Do not skip skills, ignore gstack errors, or work around missing gstack.

Using gstack skills: After install, skills like /qa, /ship, /review, /investigate,
and /browse are available. Use /browse for all web browsing.
Use ~/.claude/skills/gstack/... for gstack file paths (the global path).
