# AegeanPulse — how to design with this system

These are the real components from aegeanpulse.com. A design built from them
maps 1:1 onto shippable code, so follow the conventions below rather than
reaching for ad-hoc markup.

## Brand in one line

Practitioner to peer: calm, plain UK English, anti-hype. The audience is
non-technical small-business owners who are hype-fatigued and time-poor. If a
screen feels like a SaaS landing page from a template, it is wrong.

## Colour — semantic tokens only

Never use a raw hex or a Tailwind palette class (`bg-teal-600`, `text-gray-500`).
Use the semantic classes; dark mode is a pure variable flip under `.dark`, and
hardcoded colours silently break it.

| Use | Class |
|---|---|
| Page ground | `bg-background` |
| Raised surface (cards, panels) | `bg-surface` |
| Primary text | `text-foreground` |
| Secondary text | `text-muted` |
| Brand teal | `bg-accent` / `text-accent` |
| Pressed / deeper teal | `bg-accent-strong` / `text-accent-strong` |
| Quiet teal fill | `bg-accent-soft` |
| Rules and dividers | `border-border` |

`dark:` variants are a deliberate one-off, not the default way to theme.

## Type

Two families, both already loaded. **Fraunces** (`font-display`) for headings and
prices; **Inter** for everything else. Headings are semibold with tight tracking.
Do not introduce a third family or a script/display face.

## Layout

`Section` owns vertical rhythm and wraps its children in a `Container` — do not
nest your own container inside it, and do not hand-roll section padding. Reach
for `containerSize="narrow"` for prose, the default for most grids, `"wide"` only
for full-bleed. Alternate `tone="muted"` / `tone="accent"` between adjacent
sections for rhythm rather than adding borders everywhere.

## Motion

Animate **opacity and transform only** — never width, height, or colour.
`Reveal` for a single block, `Stagger` + `StaggerItem` for grids and lists.
When a section's content uses `Stagger`, set `reveal={false}` on the `Section`,
or the two animations fight. Both primitives fall back to static output under
`prefers-reduced-motion`, so never rely on motion to convey meaning.

## Content

Lead with the outcome, never with background. Prices are real and fixed
(Discovery £499, Builder £2,499, Growth Partner £799/mo) — render them with
`Price` or `StarterPrice` so the visitor's currency is respected; never hardcode
a currency symbol. Buttons say what happens ("Book a strategy call"), not
"Learn more" or "Get started".

## One deviation from the app source

`Button` renders a plain `<a>` here. In the real codebase it renders a Next.js
`<Link>` for internal `href`s — the API and the markup are otherwise identical,
so designs translate directly.
