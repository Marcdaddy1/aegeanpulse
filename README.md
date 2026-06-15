# AegeanPulse

Premium marketing website for AegeanPulse — practical AI solutions for small business growth.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Motion** (scroll animations), and **next-themes** (dark mode).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
src/
  app/                 # routes (/, /services, /ai-tools, /ai-news, /ai-news/[slug], /about, /contact, /privacy)
                       # + sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx, not-found.tsx
  components/
    layout/            # header, footer, mobile nav, theme toggle, logo
    motion/            # Reveal + Stagger scroll-animation primitives
    hero/              # hero contract (types.ts) + placeholder + swap point (index.tsx)
    sections/          # page section components (home, services, tools, news, contact, shared)
    ui/                # Button, Card, Badge, Section, Container, Price primitives
  data/                # typed content: services, solutions, tools, articles, testimonials, site, pricing
  lib/                 # cn() + useMounted hook
  proxy.ts             # sets geo country cookie for local-currency pricing
```

All content lives in `src/data/*` — edit those files to update copy, services, tools, or articles without touching JSX.

## Booking links

Every "Book Consultation" CTA points to `CAL_URL` in `src/data/site.ts`
(`https://cal.com/aegeanpulse`) and opens in a new tab. Change it in one place.

## Geo-based pricing

Visitors see the starter price in their local currency:

- **UK** → £399 · **Eurozone** → €459 · **Rest of world** → $499

`src/proxy.ts` reads Vercel's `x-vercel-ip-country` header and stamps an
`ap_country` cookie; `<StarterPrice>` (`src/components/ui/price.tsx`) renders
the matching currency. Price points are fixed in `src/data/pricing.ts` (no live
FX). Locally there's no geo header, so it defaults to USD — set the `ap_country`
cookie manually in DevTools (`GB`, `DE`, …) to preview other currencies.

## Swapping in a custom hero

The hero is integrated behind a stable contract so a provided 21st.dev / shadcn
component drops in without touching its animation layer:

1. Add the component's files **verbatim** under `src/components/hero/vendor/`.
2. Create `src/components/hero/vendor-hero.tsx` — a thin adapter that maps
   `HeroProps` (`src/components/hero/types.ts`) onto the vendor component's props.
3. In `src/components/hero/index.tsx`, export the adapter instead of
   `PlaceholderHero`. Nothing else in the app changes.
4. If the component imports `framer-motion`, run `npm i framer-motion`
   (we use the renamed `motion` package; both can coexist).

## Deploy (Vercel)

Push to a Git repo and import it in Vercel — zero config. The geo-pricing
`x-vercel-ip-country` header is provided automatically on Vercel. Set a custom
domain and update `SITE_URL` in `src/data/site.ts` for correct canonical/OG URLs.
