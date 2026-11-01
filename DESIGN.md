---
name: AegeanPulse
description: Practical AI for small-business growth — a warm, editorial field notebook with one teal pen.
colors:
  aegean-teal: "#0e7c6b"
  aegean-teal-deep: "#0b6557"
  teal-wash: "#e6f2ef"
  field-paper: "#faf7f2"
  clean-page: "#ffffff"
  notebook-ink: "#1c2321"
  pencil-grey: "#5f6864"
  rule-line: "#e8e2d9"
  night-hero: "#05070d"
  dark-paper: "#12161a"
  dark-page: "#1a2026"
  dark-ink: "#f2efe9"
  dark-pencil: "#9aa39f"
  dark-teal: "#2fb39c"
  dark-teal-bright: "#45c7b0"
  dark-teal-wash: "#15302b"
  dark-rule: "#2a3138"
  danger-red: "#b42318"
  dark-danger-red: "#f97066"
typography:
  display:
    fontFamily: "Fraunces, ui-serif, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Fraunces, ui-serif, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Fraunces, ui-serif, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.18em"
rounded:
  card: "16px"
  panel: "24px"
  pill: "9999px"
spacing:
  gutter-mobile: "24px"
  gutter: "32px"
  card-padding: "28px"
  section-y-mobile: "80px"
  section-y: "112px"
components:
  button-primary:
    backgroundColor: "{colors.aegean-teal}"
    textColor: "{colors.clean-page}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.aegean-teal-deep}"
  button-secondary:
    backgroundColor: "{colors.clean-page}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.teal-wash}"
  card:
    backgroundColor: "{colors.clean-page}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  input:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  badge-accent:
    backgroundColor: "{colors.teal-wash}"
    textColor: "{colors.aegean-teal-deep}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: AegeanPulse

## Overview

**Creative North Star: "The Field Notebook"**

AegeanPulse reads like a practitioner's field notebook: warm paper, dark ink, serif headings with a little character, and one teal pen used for whatever matters on the page. The site is editorial before it is promotional. Articles, prices and plain explanations carry the weight; decoration stays out of their way.

Density is calm. Sections breathe on generous vertical rhythm, content sits in a readable column, and cards are soft paper slips laid on the page rather than glossy tiles. The one deliberate exception is the home hero: a night-dark field of teal-tinted particles that gives the first screen a pulse before the notebook opens.

Components are soft and approachable. Buttons and inputs are fully rounded, cards have gently curved corners, and interactive surfaces lift a few pixels on hover. Motion is a single quiet gesture — content fades up into place as it scrolls into view — and disappears entirely for visitors who ask for reduced motion.

**Key Characteristics:**
- Warm off-white paper (light) and deep blue-black (dark), both driven by the same token names.
- One accent: Aegean Teal for links, buttons, eyebrows, focus rings and selection.
- Fraunces serif for every heading; Inter for everything else.
- Pill-shaped buttons and inputs; 16px cards; 24px feature panels.
- Hairline borders over heavy shadows.
- Fade-up-on-scroll as the only ambient motion.

## Colors

A warm paper-and-ink neutral base with a single teal pen; dark mode swaps the paper for night and brightens the teal so it still reads.

### Primary
- **Aegean Teal** (#0e7c6b): the pen. Primary buttons, inline links, eyebrow labels, focus rings, text selection, the newsletter success tick and the hero particle tint. Brightens to **Dark Teal** (#2fb39c) in dark mode.
- **Aegean Teal Deep** (#0b6557): hover state for primary buttons and links, and text on teal-washed badges. **Dark Teal Bright** (#45c7b0) in dark mode.
- **Teal Wash** (#e6f2ef): the faint highlighter. Accent badges, the active item in the mobile menu, hover fill on secondary buttons, and the `accent` section tone at 40%. **Dark Teal Wash** (#15302b) in dark mode.

### Neutral
- **Field Paper** (#faf7f2): the page background and input fill. **Dark Paper** (#12161a) in dark mode.
- **Clean Page** (#ffffff): card and panel surfaces sitting on Field Paper, and the `muted` section tone at 60%. **Dark Page** (#1a2026) in dark mode.
- **Notebook Ink** (#1c2321): headings and body text; also the fill of the closing call-to-action banner. **Dark Ink** (#f2efe9) in dark mode.
- **Pencil Grey** (#5f6864): secondary text — summaries, metadata, descriptions, placeholder text. **Dark Pencil** (#9aa39f) in dark mode.
- **Rule Line** (#e8e2d9): every border and divider. **Dark Rule** (#2a3138) in dark mode.
- **Night Hero** (#05070d): the home hero backdrop only, in both themes.

### Status
- **Danger Red** (#b42318): form validation and error messages only, as text and as the border of an invalid field. **Dark Danger Red** (#f97066) in dark mode. Never a fill, never decoration.

### Named Rules
**The One Pen Rule.** Teal is the only accent colour; Danger Red is a status colour, not an accent. It marks what is clickable or what to read first; it is never used as a large decorative fill outside the hero particles and washed tints.

**The Token-Only Rule.** Components use the semantic tokens (`background`, `surface`, `foreground`, `muted`, `accent`, `border`), never raw hex. Dark mode is a variable swap under `.dark`, so a component written against tokens is correct in both themes without `dark:` variants.

## Typography

**Display Font:** Fraunces (with ui-serif, Georgia, serif), loaded with its optical-size axis.
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif).

**Character:** Fraunces gives the headings a hand-set, slightly literary voice; Inter keeps the reading and the interface plain and legible. The contrast is the notebook: a considered heading over practical notes.

### Hierarchy
- **Display** (600, 2.25rem → 3rem → 3.75rem across breakpoints, line-height 1.08, tight tracking): the home hero headline only, in white on Night Hero.
- **Headline** (600, 2.25rem on phones → 3rem from 640px, line-height 1.25, tight tracking): page and article H1s.
- **Title** (600, 1.5rem, tight tracking): article section headings and closing-section headings; 1.875–2.25rem for section headings on landing pages, 1.125–1.25rem for card titles.
- **Body** (400, 1rem on phones → 1.125rem from 640px, line-height 1.625): running text. Article bodies sit in a 768px column at 1.125rem with ink at 85% opacity; summaries and standfirsts step up to 1.25rem in Pencil Grey.
- **Label** (600, 0.875rem, 0.18em tracking, uppercase, Aegean Teal): eyebrows above section headings. Metadata and badges use Inter at 0.75–0.875rem, medium weight.

### Named Rules
**The Serif Headline Rule.** Every heading, at every level, is Fraunces at weight 600 with tight tracking. Inter never sets a heading; Fraunces never sets body copy, buttons or form text.

## Layout

A centred single-column model. Containers are 768px (narrow — articles and page heroes), 1152px (default — most sections) and 1280px (wide — header and footer), with a 24px side gutter on phones and 32px from 640px. Sections stack vertically with 80px of padding top and bottom on phones and 112px from 768px, alternating a plain, a 60% Clean Page or a 40% Teal Wash tone for rhythm.

Grids collapse to a single column on phones and expand to two columns from 640px and three from 1024px. Calls to action go full-width on phones and return to natural width from 640px. The header is sticky at 72px; anchor scrolling is offset by 88px so headings clear it. The page body hides horizontal overflow as a safety net.

## Elevation & Depth

Mostly flat with tonal layering: white cards on warm paper, separated by a hairline Rule Line border rather than a shadow. Shadows exist only as a whisper at rest and a teal glow on hover.

### Shadow Vocabulary
- **Paper rest** (`box-shadow: 0 1px 3px rgba(28,35,33,0.04)`): every card at rest — barely there, just enough to lift paper off paper.
- **Teal lift** (`box-shadow: 0 18px 40px -18px rgba(14,124,107,0.35)`): interactive cards on hover, paired with a 4px upward move and a teal-tinted border.
- **Button lift** (Tailwind `shadow-sm` → `shadow-md`): primary buttons at rest and on hover, with a 2px upward move.

### Named Rules
**The Paper-on-Paper Rule.** Depth comes from a lighter surface and a hairline border first. A visible shadow appears only in response to hover.

## Shapes

Soft and consistent. Interactive controls — buttons, inputs, badges, the theme toggle, the menu button, the chat launcher — are full pills or circles (9999px). Content containers use gently rounded 16px corners; larger feature panels such as the article's closing call-to-action and the site-wide CTA banner use 24px. Images inside articles keep the 16px card radius with a hairline border. There are no sharp corners and no mixed radii within one component.

## Components

### Buttons
Soft, confident, and always pill-shaped.
- **Shape:** full pill (9999px), icon gap 8px, medium weight Inter.
- **Primary:** Aegean Teal fill, white text, small shadow. Sizes: 36px high with 16px side padding (header), 44px with 24px (default), 52px with 32px and 1rem text (heroes and banners).
- **Hover / Focus:** fills to Aegean Teal Deep, lifts 2px and gains a medium shadow over 200ms; settles back on press. Focus shows a 2px Aegean Teal ring offset from the page background.
- **Secondary:** Clean Page fill with a Rule Line border and ink text; hover tints to Teal Wash with a half-strength teal border and the same 2px lift.
- **Ghost:** ink text, no fill; hover tints to Teal Wash.
- **External links** carry a small up-right arrow icon (16px).

### Badges
- **Style:** full pill, 12px Inter medium with slight tracking, 1px border.
- **Accent:** Teal Wash fill, Aegean Teal Deep text, 30% teal border — article categories.
- **Neutral:** Field Paper fill, Pencil Grey text, Rule Line border.
- **Pricing tones** (AI tools directory only): emerald for free, teal for freemium, amber for paid, violet for enterprise, each as a 10% fill with a 30% border.

### Cards / Containers
- **Corner Style:** 16px; 24px for feature panels.
- **Background:** Clean Page on Field Paper.
- **Shadow Strategy:** Paper rest; Teal lift on hover for linked cards (see Elevation & Depth).
- **Border:** 1px Rule Line; turns 40% Aegean Teal on hover for linked cards.
- **Internal Padding:** 28px; 28–32px for feature panels.

### Inputs / Fields
- **Style:** full pill, Field Paper fill, 1px Rule Line border, 20px side padding, 14px Inter, placeholder in Pencil Grey at 70%.
- **Focus:** border turns Aegean Teal with a soft 2px teal ring at 30%; no default outline.
- **Consent checkbox:** native checkbox tinted Aegean Teal, label in 12px Pencil Grey.
- **Error state:** the field's border turns Danger Red and a one-line message in Danger Red, announced to screen readers, says what's missing ("Enter your email address", "Tick the box above"). The submit button stays enabled; it never greys out to signal an invalid form.
- **Success state:** a Teal Wash panel with a teal circle and white tick replaces the form, announced as a status.

### Navigation
- **Desktop (from 1024px):** pill-shaped text links in 14px medium Inter — Pencil Grey at rest, ink on hover, Aegean Teal when current. A small primary "Book Consultation" button and a circular theme toggle sit on the right.
- **Scroll state:** the header starts transparent and, after 8px of scroll, gains a hairline bottom border and an 85% Field Paper backdrop with blur.
- **Phones and tablets:** a 40px circular menu button opens a full-screen overlay of 18px links with Teal Wash for the current page and a full-width primary button at the bottom. The header's consult button is hidden below 640px so the menu button always fits.

### Home Hero (signature)
The one dark, kinetic moment: a Three.js field of teal-tinted particles on Night Hero that bends away from the cursor or a touch. White Fraunces display headline, 70% white supporting text, a primary pill button and a translucent white-outlined secondary pill. The particles keep running under reduced motion; the text entrance does not.

### Scroll Reveal (signature motion)
Sections fade up 24px over 0.6s, and grid items 20px over 0.55s, on the curve `cubic-bezier(0.21, 0.47, 0.32, 0.98)`, once, as any part enters the viewport. Grids stagger their children. Under reduced motion everything renders static after mount.

## Do's and Don'ts

### Do:
- **Do** set every heading in Fraunces 600 with tight tracking, and everything else in Inter.
- **Do** use Aegean Teal (#0e7c6b) as the only accent — links, primary buttons, eyebrows, focus rings.
- **Do** build components from the semantic tokens so light and dark mode both work without `dark:` variants.
- **Do** keep buttons and inputs fully rounded and cards at 16px.
- **Do** separate surfaces with a 1px Rule Line border and reserve visible shadows for hover.
- **Do** keep scroll reveals at `viewport.amount: "some"` and test them in WebKit (iPhone), where fractional thresholds leave tall content invisible.
- **Do** give long-form reading a 768px column at 1.125rem with 1.625 line-height.

### Don't:
- **Don't** introduce a second accent colour outside the AI-tools pricing badges.
- **Don't** use hard-coded hex values in components; the Night Hero backdrop is the single exception.
- **Don't** mix sharp corners or square buttons into the pill-and-soft-card shape language.
- **Don't** animate anything other than opacity and transform, and don't add motion that ignores reduced-motion preferences outside the hero particles.
- **Don't** use heavy, dark drop shadows; depth is paper on paper.
