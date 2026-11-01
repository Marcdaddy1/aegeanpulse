# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

UK small-business owners in any sector — owner-operators of businesses of roughly
1–50 staff (confirmed 2026-11-01). They want one working AI system that saves time or
money in the tools they already use, not a strategy deck or a technology lesson. They
arrive from a LinkedIn or Facebook post, the newsletter, a search, or a referral, and
judge in a minute whether AegeanPulse is practical, honest and affordable.

They are not technical. Copy and interface answer "what does this do for my business,
what does it cost, and what happens next?" — never how the technology works.

## Product Purpose

aegeanpulse.com is the shop window and lead engine for AegeanPulse, an AI agency run by
Marcus Aragbaye that builds AI agents, automations and smart websites for small
businesses. The site exists to turn a visitor into a booked 20-minute strategy call
(Cal.com, `ai-strategy-consultation`) or a newsletter subscriber.

Success: booked calls, newsletter sign-ups, and articles that get read and shared from
social posts.

## Positioning

Fixed-scope, fixed-price AI for small businesses, led personally by the founder from
first call to a working system. Three packages, priced in public:

- **Discovery** — £499 one-off: opportunity audit, prioritised 90-day plan, tool and
  budget advice, risk/data/readiness assessment, one follow-up session.
- **Builder** — £2,499 one-off: everything in Discovery plus the full build and
  deployment of one core workflow, integration with existing tools, team training and
  handover, 30 days of post-launch support.
- **Growth Partner** — £799/month: monitoring and optimisation, two new workflow
  automations per quarter, monthly review, priority support.

Source of truth: `src/data/pricing.ts`. Never state a practice, method or pricing rule
that isn't listed there.

## Operating Context

- Content engine: a Monday AI-industry brief (scheduled task, emailed to Marcus) feeds
  articles at `/ai-news/<slug>`, newsletter issues (Hostinger Reach, sent by hand) and
  social posts (LinkedIn, the AegeanPulse Facebook page, X). Articles are linked from
  social and the newsletter, so an article page is often a visitor's first page.
- AI chatbot on every page answers from services/pricing/FAQ data and can book real
  Cal.com appointments.
- Visitors are largely on phones, including iPhones (WebKit) — every page is checked in
  WebKit, not only Chrome.
- Deploys are manual or via a weekly Tuesday rebuild; articles are date-gated.

## Capabilities and Constraints

- Next.js 16 App Router, Tailwind v4 token theming, light and dark mode, self-hosted on
  a Hostinger VPS (see `CLAUDE.md`).
- Prices show in GBP, EUR or USD by visitor location from fixed price points; UK
  English, GBP first.
- Routes: home, services (6 service pages), pricing, AI tools directory, AI news
  articles, about, contact, privacy, terms.
- Newsletter sign-up requires explicit consent (UK GDPR).
- Articles are markdown with `## ` headings and one paragraph per line; no inline links.

## Brand Commitments

- Name: **AegeanPulse** only. Founder: Marcus Aragbaye, "Founder & AI Lead".
- Founder background (confirmed): 10+ years of IT support (Microsoft 365, Azure AD,
  Intune, networking) plus AI and automation certifications; the site's "software
  engineering and business strategy" framing is also accurate.
- Voice: an experienced practitioner talking to a peer. Plain UK English, specific
  numbers over adjectives, no hype, no jargon, no corporate language. Every claim
  traceable to a source.
- Booking link: `CAL_URL` in `src/data/site.ts`; contact `contact@aegeanpulse.com`.

## Evidence on Hand

- **Usable:** testimonial from Sarah Thompson, Deputy CEO, SoldiscInc (real, confirmed).
- **Do not use:** the "Michael Rodriguez, Marketing Director, Homecrackers" testimonial
  is not a real client quote (confirmed 2026-11-01). It is currently in
  `src/data/testimonials.ts` and live on the site.
- **Do not name:** WMS Recruitment is a real client, but is not cleared to be named
  publicly as a case study.
- Founder headshot: `public/marcus-aragbaye.png`. Article hero images:
  `public/images/articles/`.
- Absent, never to be fabricated: case studies, client logos, result metrics, review
  scores, press mentions.

## Product Principles

1. **Practical over impressive.** Lead with the outcome a small business can use this
   week; never with the technology.
2. **Honest by default.** Real numbers, real sources, real proof — or nothing. An
   absent claim beats an invented one.
3. **The price is part of the pitch.** Fixed scope and public prices are the
   differentiator; make them easy to find and understand.
4. **One clear next step.** Every surface points to a booked call or the newsletter.
5. **Built for the phone in the hand.** The first visit is usually a tap from a social
   post on a phone.

## Accessibility & Inclusion

`prefers-reduced-motion` is honoured: scroll animations fall back to static content.
No formal standard has been set; the working bar is readable body text, sufficient
contrast in both themes, and full keyboard and screen-reader use of navigation, the
chatbot and forms.
