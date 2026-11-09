---
target: live article page /ai-news/ai-agent-permissions-before-you-switch-it-on (critique 6)
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
target_fingerprint: "sha256:e7cbc0f111b07a8970e01b461197a0ef29250b64da019c88144c3ca4d6873715"
target_path: "C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
timestamp: 2026-11-08T19-49-40Z
slug: src-app-ai-news-slug-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

# Critique 6 — /ai-news/ai-agent-permissions-before-you-switch-it-on (live)

Live verification: 30/31; the failure was a real ~200ms chat-launcher flash on phone load, fixed in 4aa559e (31/31 locally x2, flash-free timelines), awaiting deploy.

## Design Health Score — 26/32 (Good, 81%), heuristics 7 and 10 n/a

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Form states complete; launcher flash (fixed, pending deploy); no progress cue on a ~15-screen phone read |
| 2 | Match system / real world | 4 | Plain UK English, printable sheet; nits: "$40" beside "£25", "one-page" vs 2-page PDF |
| 3 | User control and freedom | 3 | Skip link, :target back link, Escape all work |
| 4 | Consistency and standards | 3 | 1–6 numbering consistent; desktop slip label 4 wraps under its numeral |
| 5 | Error prevention | 3 | Consent unticked, sensible order; no email-typo hint |
| 6 | Recognition rather than recall | 3 | Numbering parity strong; questions 3 screens back at the form |
| 7 | Flexibility and efficiency | n/a | Read surface |
| 8 | Aesthetic and minimalist | 3 | Phone rulebook block leads with image + dead space; bar floats over prose without a fade |
| 9 | Error recovery | 4 | Inline errors, focus moves, announced, file delivered on server failure |
| 10 | Help and documentation | n/a | Read surface |

## Design Specificity Verdict
~80% authored: question/slip/PDF numbering, tilted printed sheet, ruled slip, first-person closing panel. Generic: Keep-reading grid, round chat bubble, AI-looking hero.

Deterministic scan: source exit 0, 1 advisory (design-system-font-size, page.tsx:283, phone H1 2rem vs DESIGN.md 2.25rem — real drift). Live URL: overused-font (Inter) and cream-palette (#faf7f2), both false positives mandated by DESIGN.md. 0 contrast failures across 126 elements both themes (teal numerals 4.78/5.10), no console errors, no overflow at 375px, clean heading order (h3 questions in ol role=list), all alts correct, thumbnail served as 6.5 KB webp.

## Priority Issues
- [P1] Booking bar arrives at the peak, in the same view as the rulebook pointer; floats over prose with no fade. Fix: move #book-bar-start to "What to do this week"; background fade behind the bar. /impeccable layout
- [P2] Rulebook block on phones leads with a 160px image and dead space; success state drops the heading and offers no next step; "one-page" vs "1 of 2". Fix: heading first, small thumb beside description; keep title on success, add page-2 note and a quiet call link; rename. /impeccable layout, /impeccable clarify
- [P2] Chat launcher flashed ~200-300ms on every phone load. Fixed in 4aa559e (widget measures #book-bar-start on first render); awaiting deploy. /impeccable harden (done)
- [P3] Desktop slip label "Hands to the owner" wraps under its numeral. Fix: numeral column inside the label, or 11rem label column. /impeccable polish
- [P3] Type-ramp drift: phone H1 2rem vs 2.25rem; h3 20px close to h2 24px. Fix: 2.25rem or document; h2 sm:text-[1.75rem]. /impeccable typeset

## Persona Red Flags
- Jordan: news-section jargon ("token that carries those limits", "signed digital credential"); $40 vs £25; one-page vs two pages.
- Sam: sr-only label + vanishing placeholder; 12px consent; same message for empty and malformed email; dark bar chat-circle border ~1.4:1.
- Casey: ~9,750px with no progress cue; bar over text with no fade; 40px header buttons, 36px chat chips; no chat entry 0–5,200px by design.

## Minor Observations
Hero "Pause switch" vs slip "Off switch"; 48px pointer thumb is a smudge on desktop; success panel tint barely visible in light mode; Title Case related cards. Byline suggestion set aside (user excluded bylines); invisible Person author in JSON-LD remains an option.

## Questions to Consider
- Should the rulebook come before the booking panel, with the call as its second line?
- Six questions as three pairs (access, money, safety)?
- Keep "one-page" if the PDF is two pages?
