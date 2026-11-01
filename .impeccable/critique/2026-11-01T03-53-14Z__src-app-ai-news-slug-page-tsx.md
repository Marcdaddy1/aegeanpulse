---
target: article page (ai-news/[slug]) — local build of 78b1bb4
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
target_fingerprint: "sha256:037ef1515848b6bb7ba8c1015f6a069c1ae1ac9d348e003157b547eca3d29acc"
target_path: "C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
timestamp: 2026-11-01T03-53-14Z
slug: src-app-ai-news-slug-page-tsx
---
Method: dual-agent (A: design-review sub-agent · B: detector + browser sub-agent). Target: local build of commit 78b1bb4.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Subscribe disabled with no reason; newsletter + related blank ~8.8s on slow connections |
| 2 | Match System / Real World | 3 | Plain UK English; Title Case card copy remains |
| 3 | User Control and Freedom | 3 | Esc closes chat and returns focus; no close control inside chat |
| 4 | Consistency and Standards | 2 | "Book a free call" / "Book a free 20-minute call" / "free consultation"; panel mixes "we'll" and "me" |
| 5 | Error Prevention | 2 | Subscribe disabled until consent, never says why |
| 6 | Recognition Rather Than Recall | 3 | Six questions not scannable |
| 7 | Flexibility and Efficiency | n/a | Linear article (reviewer would give 2: no contents/share) |
| 8 | Aesthetic and Minimalist Design | 3 | Panel repeats "free 20-minute" three times |
| 9 | Error Recovery | 2 | Newsletter errors not announced or field-linked; red outside tokens |
| 10 | Help and Documentation | n/a | Content page; chat covers help |
| **Total** | | **20/32** | **Acceptable (63%)** |

## Design Specificity Verdict

Ending now authored (face, first-person line, single button). Body still generic blog: the six-question rulebook and refund example render as identical 18px paragraphs; Field Notebook lives in tokens, not layout.
Detector: CLI 0 findings. URL desktop 8 / mobile 10: placeholder contrast 2.93:1; body ~82ch/line at 1440 (canvas-measured); stragglers incl. "salesperson." in panel; unbalanced headings; overused-font + cream-palette = deliberate (false positives). Confirmed fixed: 1 booking link + 1 newsletter after body; no double footer border; header/hero/body/panel visible with JS off; 0 invisible focus stops; menu + chat inert; chat focus in/out correct; LCP ~0.3s; 0 console errors; 0 overflow.
Overlay: ran on localhost (Browser pane), 4 anti-patterns.

## Priority Issues

[P1] Related-card links have no visible focus (article-card.tsx:19 focus-visible:outline-none, no replacement). Fails WCAG 2.4.7. Fix: has-[:focus-visible] ring on the card. /impeccable harden
[P1] Newsletter + "Keep reading" still wrapped in Reveal (page.tsx:183,194): ~1,700px blank with JS off; 8.8s blank at 400 kbps. Fix: remove Reveal there. /impeccable harden
[P1] Six-question rulebook + worked example typeset as plain paragraphs; body ~82ch on desktop. Fix: list + bold lead-in support in parseBody; worked-example "paper slip"; ~68ch measure. /impeccable typeset
[P2] £499 line then "free call" panel; "free 20-minute" x3; we/me mix; vague "See the fixed prices". Fix: "Free and no obligation. Discovery (£499) only starts if you want it."; "What the £499 Discovery includes"; per-article ctaHeading; I/me throughout. /impeccable clarify
[P2] Mobile: no author until 74% depth; panel button wraps in fixed-height pill at 390px; back link 20px tall. Fix: byline under metadata; nowrap/short label on phones; min-h-11 back link. /impeccable adapt

## Persona Red Flags

LinkedIn owner: anonymous until the panel; no visible sources; no testimonial near the ask.
Casey: 8.8s blank newsletter/related; chat launcher over body text; ask at ~6,400px; small back/privacy targets.
Jordan: £499 then free call unexplained; Subscribe looks broken.
Sam: no card focus; newsletter form unnamed; errors unannounced; new-tab booking link unannounced; Tab escapes open chat panel.

## Minor Observations

viewport themeColor dark under prefers-color-scheme while site is light-only (layout.tsx:64-67); theme toggle empty circle without JS; translucent sticky header shows content behind logo; desktop left edges inconsistent (112 / 368 / 176px); carried newsletter-form issues; related card "starting from £500" vs £499.

## Questions to Consider

Six questions as the newsletter lead magnet? Panel opens the in-page booking chat instead of a new tab? Does a 56px chat launcher over text earn its place on a reading page?
