---
target: article page (ai-news/[slug])
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
target_fingerprint: "sha256:36a4e7cd1ab7cacc1ffb9ea7020813f1456cde0358f8c411d1f80b097f125785"
target_path: "C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
timestamp: 2026-11-01T01-40-35Z
slug: src-app-ai-news-slug-page-tsx
---
Method: dual-agent (A: design-review sub-agent · B: detector + browser sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Subscribe disabled at 50% until consent ticked, no reason; article body arrives at opacity 0 until hydration |
| 2 | Match System / Real World | 3 | Article copy plain UK English; CtaBanner "elevate your organization", "intelligent, efficient future" |
| 3 | User Control and Freedom | 3 | Back link, Esc closes menu/chat, external links marked |
| 4 | Consistency and Standards | 2 | Three labels for one action; two "Ready to…" panels back to back; Title Case vs sentence case |
| 5 | Error Prevention | 2 | Consent checkbox sits below the disabled button |
| 6 | Recognition Rather Than Recall | 2 | Article CTA asks reader to type cal.com URL; hyphen-breaks on mobile |
| 7 | Flexibility and Efficiency | n/a | Linear article |
| 8 | Aesthetic and Minimalist Design | 2 | ~3,400px of asks after the body on mobile; two identical newsletter forms |
| 9 | Error Recovery | 2 | Newsletter errors not live-announced; hard-coded red outside tokens |
| 10 | Help and Documentation | n/a | Content page; chat covers help |
| **Total** | | **18/32** | **Acceptable (56%)** |

## Design Specificity Verdict

LLM: top two-thirds authored (768px column, Fraunces/Inter, bespoke hero showing the article's own rules). Everything after the last paragraph is category-interchangeable: newsletter card, 3 cards, dark "Ready to Redefine Your Business Potential?" panel with teal glow + grid mask, second "Ready to put AI to work" panel, second identical newsletter form, footer.

Detector: CLI source scan 0 findings (regex-only on .tsx; rendered rules did not run). URL scan desktop 12 / mobile 10: low-contrast placeholder 2.9:1 on newsletter inputs (newsletter-signup.tsx:80; only visible label), line-length ~86ch desktop (page.tsx:168-173), stragglers, unbalanced headings; overused-font (Inter) and cream-palette are deliberate per DESIGN.md (false positives as defects). Playwright: body contrast 9.51:1, 0 overflow, 0 console errors, mobile 514 KB transfer, LCP 1.16s mobile / 1.72s desktop.

Overlay: skipped (production HTTPS target).

## Priority Issues

[P1] Article's own CTA is dead text — "Book a free 20-minute call at cal.com/aegeanpulse/ai-strategy-consultation" is not a link (markdown has no inline links). Fix: optional `cta` frontmatter rendered as a closing panel after the body (headshot, "Free · 20 minutes · with Marcus", primary pill to CAL_URL); strip URL sentence from markdown. Command: /impeccable layout

[P1] End-of-page CTA pile-up + off-voice banner — ~7 asks; two booking panels; two newsletter forms; banner copy hype + US spelling. Fix: drop CtaBanner on article pages; one newsletter form; 2 related cards on mobile; rewrite CtaBanner defaults sitewide in voice. Command: /impeccable distill

[P1] Article invisible until JS hydrates — 6 Reveal wrappers ship opacity:0 (header/H1, hero, body, newsletter, related, banner). Fix: render article header, hero and body static; reveal only below-fold sections. Command: /impeccable harden

[P1] Invisible elements in tab order (sitewide) — closed mobile menu overlay focusable below 1024px (8 stops); closed chat panel input focusable while aria-hidden. Fix: `inert` when closed; focus management for chat. Command: /impeccable harden

[P2] Newsletter form order and pitch — input → disabled Subscribe → consent; no aria-live; placeholder fails contrast as only visible label; generic title. Fix: consent above button, enabled button with inline message, aria-live, visible label or darker placeholder, article-specific pitch. Command: /impeccable clarify

## Persona Red Flags

LinkedIn-arriving UK owner: no Marcus on page (no headshot/byline; JSON-LD author is Organization); £499 buried; generic US banner; no testimonial at booking; likely blank pre-hydration in LinkedIn WebView.
Casey: blank pre-hydration; "Back to AI News" 20px tall; chat launcher overlaps body text right edge; untappable hyphen-broken URL; banner button wraps with orphaned arrow at 390px.
Jordan: no who/byline; "Discovery package" with no route to /pricing; two "Ready to…" panels look like different services; "Agents" badge looks tappable.
Sam: 8 invisible menu stops; focusable input in aria-hidden chat; no chat focus management; disabled Subscribe without reason; errors/success not announced. Positives: skip link, clean H1→H2→H3, good alt.

## Minor Observations

Keep reading container jumps 768→1152px; repeated "Agents" badge on all cards; banner glow + grid mask breaks paper-on-paper restraint; newsletter cadence claim "monthly" vs reality; date not a <time>; no share/copy-link.

## Questions to Consider

Why does generic banner copy get the heaviest panel while the specific, priced pitch gets unlinked text? Would one ask at the end raise bookings? Why give the six-question scope away as prose instead of as an email-gated template?
