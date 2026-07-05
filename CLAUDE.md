@AGENTS.md

# Project Status

_Last updated: 2026-07-01._

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
- **Secrets:** `.env.local` (gitignored) holds `CAL_COM_API_KEY`, `CAL_COM_EVENT_TYPE_ID` (3835772, the "ai-strategy-consultation" event), `INTERNAL_CRON_SECRET`, `HOSTINGER_API_TOKEN`. `ANTHROPIC_API_KEY` is a Windows user-level env var on the dev machine; on the VPS it goes in `.env.local`. `.env.example` documents everything. Server-only modules live in `src/lib/server/` (import `"server-only"`).
- **AI chatbot** (`/api/chat` + `src/components/sections/shared/chat-widget/`, mounted in `layout.tsx`): Claude via shared client `src/lib/anthropic.ts`; grounded in services/pricing/FAQ data by `src/lib/server/chat-context.ts` (context-stuffing, no vector DB); books real Cal.com appointments via tool use (`src/lib/server/cal.ts`, v2 API — slots need header `cal-api-version: 2024-09-04`, bookings `2024-08-13`). Rate-limited (10/min, 60/day per IP) by shared `src/lib/server/rate-limit.ts`. Tools aren't registered when Cal env vars are absent (falls back to the booking link). Verified end-to-end: real booking created + cancelled.
- **AI article pipeline:** articles live as `src/content/articles/<slug>.md` (frontmatter + prose), loaded by server-only `src/lib/articles.ts` (gray-matter; `## ` = block heading, each non-blank line = one paragraph). `src/data/articles.ts` now holds only types + `ARTICLE_CATEGORIES` (client-safe). **`draft: true` files are invisible everywhere** (pages, params, sitemap) — that's the review gate. Topic queue: `src/data/content-topics.ts` (state = file existence, idempotent). Generator: `src/lib/server/generate-article.ts` (forced structured tool call). Trigger: `POST /api/internal/generate-draft` with header `x-internal-secret` — for manual curl now, VPS crontab weekly later. Publish flow: review draft file → edit → set `draft: false` → commit/push/deploy.
- **Newsletter (Hostinger Reach):** `src/lib/server/email/` — vendor-agnostic `EmailProvider` + Reach adapter (`POST https://developers.hostinger.com/api/reach/v1/contacts`, Bearer `HOSTINGER_API_TOKEN`). `/api/newsletter/subscribe` requires `consent: true` (UK GDPR), rate-limited 5/hour/IP. `<NewsletterSignup>` sits in the footer + after article bodies. **Reach's API cannot send campaigns** — sending happens manually in reach.hostinger.com after publishing an article.

**Deployment state (verified 2026-07-02):** aegeanpulse.com is LIVE on the Hostinger VPS (KVM 2, Ubuntu 24.04 + Docker template, IP `72.61.4.237`) — apex A/AAAA records point there; `X-Powered-By: Next.js` confirmed. The live build is the ~18 Jun SEO-pass commit; the backend features above are on `main` but NOT yet deployed. There is NO GitHub auto-deploy — updates are manual.

**VPS update runbook (run on the server):**
1. `cd` into the site checkout → `git pull`
2. `npm install` (new deps since last deploy: `@anthropic-ai/sdk`, `gray-matter`, `server-only`)
3. Create/refresh `.env.local` from `.env.example` — needs `ANTHROPIC_API_KEY`, `CAL_COM_API_KEY`, `CAL_COM_EVENT_TYPE_ID=3835772`, `INTERNAL_CRON_SECRET`, `HOSTINGER_API_TOKEN`
4. `npm run build` → restart the app process (PM2 or Docker, however it currently runs)
5. One-time: weekly draft crontab → `0 6 * * 1 curl -s -X POST -H "x-internal-secret: $SECRET" http://localhost:3000/api/internal/generate-draft`
6. One-time: confirm Nginx passes `X-Forwarded-For` to the app (IP rate limiting depends on it)
7. Smoke test: chat widget answers a pricing question; newsletter form subscribes; `/pricing` and an article page load

**Known open items / TODO:**
- Deploy the backend features to the VPS (runbook above).
- Pending draft awaiting review: `src/content/articles/ai-automation-cost-small-business.md` (AI-generated, `draft: true`) — check the description of the Discovery package before publishing.
- Rotate the Cal.com API key and Hostinger API token (both were shared in chat), then update `.env.local` on dev machine + VPS.
- The dev machine has `prefers-reduced-motion` ON — account for it when testing animations.
- `bis_skin_checked` hydration warnings in dev console are Bitdefender browser extension injections — not a code bug. Invisible in Incognito and in production for unaffected users.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000 (Turbopack)
npm run build    # production build — also runs full TypeScript check + static generation
npm run lint     # ESLint (eslint-config-next); CI-clean is expected
```

There is no test suite. `npm run build` is the primary correctness gate: it type-checks every file and statically generates all routes (currently 31 pages — including 6 `/services/[slug]` and 11 `/ai-news/[slug]` SSG pages), so a green build catches client/server boundary errors and broken `generateStaticParams`.

## Critical: this is Next.js 16, not earlier versions

APIs differ from older Next.js (see `AGENTS.md`). Bundled docs live in `node_modules/next/dist/docs/` — **read the relevant file there before using an unfamiliar convention.** Key differences already relied on in this codebase:

- **`middleware` is renamed to `proxy`.** The geo logic lives in `src/proxy.ts` exporting a `proxy(request)` function — do not recreate a `middleware.ts`.
- **`params` is a Promise** in dynamic routes and `generateMetadata` — always `const { slug } = await params`.
- Turbopack is the default for both dev and build (no `--turbopack` flag needed).

## Architecture (the parts that span multiple files)

**Tailwind v4, token-driven theming.** No `tailwind.config.ts`. All design tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind via `@theme inline`. Components use **semantic classes only** (`bg-background`, `text-foreground`, `text-muted`, `bg-accent`, `border-border`) — dark mode is a pure variable flip under `.dark`, so avoid `dark:` variants except for intentional one-offs. Dark mode is class-based via `next-themes`; the `@custom-variant dark` line in `globals.css` is what makes `.dark` work in v4 (v4 defaults to media-query dark mode without it).

**Content lives in `src/data/*`, not in JSX.** Services, solutions, tools, articles, testimonials, nav, pricing, and FAQs are typed arrays. Pages/sections map over them. Edit copy there. `src/data/site.ts` is the single source for nav, `CAL_URL` (all booking CTAs), site metadata, and the `FOUNDER` record (name/title/bio/LinkedIn/image) — never hardcode these elsewhere.

Key data files:
- `src/data/site.ts` — `SITE_NAME`, `SITE_URL`, `CAL_URL`, `CONTACT_EMAIL`, `NAV_ITEMS`, `FOOTER_NAV`, `FOUNDER`
- `src/data/services.ts` — `SERVICES[]` (slug, icon, title, short, audience, deliverables, outcomes)
- `src/data/pricing.ts` — `PRICE_PROFILES` (GBP/EUR/USD), `PRICING_TIERS[]` (Discovery £499 / Builder £2,499 / Growth Partner £799 per month), `currencyForCountry`, `formatPrice`
- `src/data/faqs.ts` — `HOME_FAQS`, `PRICING_FAQS`, `SERVICES_FAQS`
- `src/data/articles.ts` — article types + `ARTICLE_CATEGORIES` (client-safe; article content lives in `src/content/articles/*.md`)
- `src/data/testimonials.ts` — `TESTIMONIALS[]` (with optional `linkedin`/`website` fields)

**Animation system.** Every page section is wrapped in a scroll-triggered fade-in. Two primitives in `src/components/motion/` (using the `motion` package — the renamed framer-motion, imported from `motion/react`):
- `<Reveal>` — single fade-in; `<Section>` (`src/components/ui/section.tsx`) composes section + container + `Reveal`, so most sections just use `<Section>`.
- `<Stagger>`/`<StaggerItem>` — for grids. When a section uses stagger, render `<Section reveal={false}>` and put `<Stagger>` inside to avoid double-animating.
- Both short-circuit to static output under `prefers-reduced-motion` via `useReducedMotion()`. Keep animated properties to `opacity`/`transform` only.
- **Hydration-safe reduced motion:** the static fallback in `Reveal`/`Stagger`/`StaggerItem` is gated behind `useMounted()` — see "Reduced-motion / hydration" in Project Status above.

**Hero swap contract.** The hero is integrated behind a stable interface so a vendor (21st.dev / shadcn) component can drop in without editing its animation layer. `src/components/hero/index.tsx` is the single swap point; pages import only `@/components/hero` and pass `HeroProps` (`src/components/hero/types.ts`). To integrate a vendor hero: drop its files verbatim under `hero/vendor/`, add a thin `vendor-hero.tsx` adapter mapping `HeroProps` → its props, and flip the export in `index.tsx`. The hero renders **outside** any `Reveal`/`Section` wrapper so its own entrance animation isn't masked by an opacity-0 ancestor. (`PlaceholderHero` is kept as a commented one-line revert; current state is in Project Status above.)

**Geo-based pricing flow.** `src/proxy.ts` reads `x-vercel-ip-country` (Vercel), `cf-ipcountry` (Cloudflare), or `x-country` (generic) and stamps an `ap_country` cookie. If no cookie is present after hydration, `price.tsx` fires a one-time `ipapi.co` lookup as a client-side fallback — this makes geo work on Hostinger VPS or any self-hosted server. `src/data/pricing.ts` maps country → `PRICE_PROFILES` (GBP/EUR/USD, fixed rates, no live FX). `price.tsx` exports:
- `useCurrency()` hook — reads cookie via `useSyncExternalStore` with a module-level listener registry (`subscribeCurrency`/`notifyCurrencyChange`) so all price components re-render together when the IP lookup resolves.
- `<StarterPrice>` — inline starter price (used in service CTAs).
- `<Price amount={n}>` — any amount in the visitor's currency.

SSR always renders `DEFAULT_CURRENCY` (USD) to avoid hydration mismatches; client corrects after mount. To test other currencies locally, set `document.cookie = "ap_country=GB"` in DevTools.

**React lint constraint.** `eslint-config-next` enforces `react-hooks/set-state-in-effect`. Don't call `setState` synchronously inside `useEffect`. Established patterns here: `useMounted()` (`src/lib/hooks.ts`) via `useSyncExternalStore` for mount guards, and adjusting state during render (comparing previous value) for resets — see the route-change menu close in `src/components/layout/header.tsx`.

## Routes

Real App Router pages: `/`, `/services`, `/services/[slug]` (6 SSG pages), `/pricing`, `/ai-tools`, `/ai-news`, `/ai-news/[slug]` (11 SSG pages), `/about`, `/contact`, `/privacy`, plus `not-found.tsx`. Solutions is **not** a route — it's a home-page section anchored at `/#solutions`.

SEO infrastructure (file-convention):
- `sitemap.ts` — includes `/`, `/services`, `/pricing`, all `/services/[slug]`, all `/ai-news/[slug]`
- `robots.ts`, `opengraph-image.tsx` (ImageResponse), `icon.svg`
- JSON-LD in `layout.tsx`: Organization (with logo + founder) + WebSite
- JSON-LD per page: Article on `/ai-news/[slug]`, Service + Breadcrumb on `/services/[slug]`, Service + ItemList + Breadcrumb on `/services`, FAQPage on `/`, `/services`, `/pricing`, Person on `/about`

`SITE_URL` is set to `https://aegeanpulse.com` in `src/data/site.ts`.

## Deploy notes (beyond the runbook above)

- Serve with PM2 (`pm2 start npm -- start`) behind an Nginx reverse proxy: port 80/443 → localhost:3000.
- Geo pricing on the VPS: the `proxy.ts` geo header won't fire without Vercel/Cloudflare, but `price.tsx` falls back to `ipapi.co` client-side. To also enable server-side geo, put Cloudflare (free) in front of the VPS — it sends `CF-IPCountry`, which `proxy.ts` already reads.
- Local dev always defaults to USD (no geo header); set the `ap_country` cookie in DevTools to test GBP/EUR.

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
