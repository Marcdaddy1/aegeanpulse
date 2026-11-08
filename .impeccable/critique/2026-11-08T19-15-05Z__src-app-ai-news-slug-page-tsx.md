---
target: live article page /ai-news/ai-agent-permissions-before-you-switch-it-on (critique 5)
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
target_fingerprint: "sha256:74cd36cdfe43d5b18024a8c2e7b4d9e4d09d43b5fb05b9932291fcd211b0a163"
target_path: "C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
timestamp: 2026-11-08T19-15-05Z
slug: src-app-ai-news-slug-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

# Critique 5 — /ai-news/ai-agent-permissions-before-you-switch-it-on (live)

Live verification: 22/22 checks pass (WebKit iPhone 13 light+dark, desktop Chromium).

## Design Health Score — 25/32 (Good, 78%), heuristics 7 and 10 n/a

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Form states complete; no sense of progress through an 8,500px phone article |
| 2 | Match system / real world | 3 | Article copy concrete; Title Case related card and stock footer tagline break voice |
| 3 | User control and freedom | 3 | Skip link + Escape focus restore good; rulebook pointer jumps ~2,300px with no way back |
| 4 | Consistency and standards | 3 | Two equal teal primaries ~600px apart; rulebook H2 (text-lg) smaller than "Keep reading" (2xl) |
| 5 | Error prevention | 3 | Natural field order; "test@" gets the same message as empty |
| 6 | Recognition rather than recall | 3 | Six questions unnumbered; question / slip line / PDF box don't visibly map |
| 7 | Flexibility and efficiency | n/a | Read surface |
| 8 | Aesthetic and minimalist | 3 | Calm body; ending stacks CTA, form, cards, footer, launcher |
| 9 | Error recovery | 4 | Inline per-field errors, focus moves, announced, file delivered even on server failure |
| 10 | Help and documentation | n/a | Read surface |

## Design Specificity Verdict
Authored, not interchangeable. Hero clipboard, ruled slip and PDF page 2 show one object three times; founder face and first-person CTA. Last ~1,500px slide to defaults: off-voice related card, generic footer tagline, rulebook shown as text only.

Deterministic scan: source exit 0, 1 advisory (design-system-font-size, page.tsx:226, text-[2rem] off the ramp). Live URL: line-length (newsletter-signup.tsx:126, ~89ch at desktop) real/minor; overused-font (Inter) and cream-palette (#faf7f2) false positives per DESIGN.md. No contrast failures (lowest teal link 4.78:1), no console errors, no overflow at 375px, heading order clean, alts present, PDF 200. Sub-44px: header buttons 40px, chat chips 36px. Overlay ran in a throwaway Chromium with loopback flags.

## Priority Issues
- [P1] Rulebook invisible, low and undersold: no thumbnail, below the CTA at ~80% depth, H2 smaller than "Keep reading", pointer jumps ~2,300px with no return, success button wraps "(PDF)". Fix: page-1 thumbnail, text-2xl heading, back-to-article link, shorter label, consider inline offer after the slip. /impeccable bolder, /impeccable onboard
- [P1] Six questions don't scan: dash list with barely-heavier lead-ins; no list semantics. Fix: <ol> 1-6 with teal Fraunces numerals, question on its own line, number slip rows and PDF boxes to match. /impeccable typeset
- [P2] Chat launcher overlaps prose for the first ~4,400px on phones. Fix: keep it tucked until #book-bar-start on phone articles, or a 44px surface ghost over prose. /impeccable adapt
- [P2] Ending loses focus and voice: two equal teal primaries plus 6+ links; off-voice related card; stock footer tagline. Fix: demote one primary, curate Keep reading, rewrite tagline. /impeccable distill, /impeccable clarify
- [P3] Slip loses its form character on phones (14px labels lighter than 16px values). Fix: small uppercase tracked teal field labels. /impeccable polish

## Persona Red Flags
- Jordan: pointer jump with no return; never sees the PDF before giving an email; two equal teal buttons at the end.
- Sam: questions structured by weight only (no <ol>); 12px muted consent text; rulebook H2 looks smaller than its rank.
- Casey: launcher over prose for half the article; booking only via menu before the example; success button wraps; 36px chat chips.

## Minor Observations
Orphaned summary line on phone; founder caption wraps to 3 lines; PDF publicly reachable (soft gate); phone H1 2rem off ramp; newsletter description ~89ch at desktop.

## Questions to Consider
- Why does anyone first see the PDF after handing over an email?
- Should the article end on the rulebook rather than the booking panel?
- Does the floating launcher pay its way on article pages?
