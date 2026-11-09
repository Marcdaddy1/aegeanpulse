---
target: live article page /ai-news/ai-agent-permissions-before-you-switch-it-on (critique 7)
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
target_fingerprint: "sha256:81e2cf16e52d6bf6338368b063bbf862e07b28efdb2507abee34b4da66e0a56e"
target_path: "C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
timestamp: 2026-11-09T17-58-40Z
slug: src-app-ai-news-slug-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

# Critique 7 — /ai-news/ai-agent-permissions-before-you-switch-it-on (live)

Live verification: 36/36; launcher timeline flash-free on three phone loads.

## Design Health Score — 26/32 (Good, 81%), heuristics 7 and 10 n/a

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Form states exemplary; phone bar appears and vanishes within one swipe |
| 2 | Match system / real world | 3 | "One-page" heads a two-page file; "Get this…" under the filled example points at the blank form |
| 3 | User control and freedom | 3 | Skip, back link, Escape+focus good; no book/chat route for first 62% on phones |
| 4 | Consistency and standards | 3 | "Book a free call" vs "Book a free 30-minute call"; off-voice footer tagline |
| 5 | Error prevention | 3 | Fill order; file delivered on failure |
| 6 | Recognition rather than recall | 4 | Numbered parity; PDF visible before the email ask |
| 7 | Flexibility and efficiency | n/a | Read surface |
| 8 | Aesthetic and minimalist | 3 | Flat heading scale; news half a wall of text on phones |
| 9 | Error recovery | 4 | Specific, in-place errors; focus moves; PDF on server failure |
| 10 | Help and documentation | n/a | Read surface |

## Design Specificity Verdict
~80% authored: one artefact runs hero → numbered questions → numbered slip → PDF thumbnail → page-2 note. Generic edges: header nav, Keep-reading cards, Title Case footer tagline.

Deterministic scan: source exit 0, 1 advisory (design-system-font-size, page.tsx:295, phone H1 2rem vs DESIGN.md 2.25rem, real drift). Live URL: overused-font and cream-palette, false positives per DESIGN.md. 0 console errors, no overflow at 375px, clean heading order, alts correct, teal links 4.78:1 (slim margin). Text partly behind the bar's fade measures low contrast at the fade edge — expected for a fade, not counted as a defect. Bar visible scrollY ~5,830–6,370 (≈540px); never shares the visible screen with the pointer.

## Priority Issues
- [P1] Phone booking bar is vestigial: ~540–550px of range (under one screen); no book/chat route for the first ~5,900px. Consequence of starting at "What to do this week". Fix: start at "Why the limits have to be checked while it runs" (~1,100px), or drop the bar on this article. /impeccable adapt
- [P2] Flat heading scale (H2 24 / H3 20 / body 18) and phone H1 2rem off the ramp. Fix: article H2 sm:text-3xl + larger section break; H1 2.25rem or document. /impeccable typeset
- [P2] News half is ~4.5 phone screens of prose; the $18/$40 demo is buried mid-paragraph. Fix: a two-line ruled slip via a `> Example:` block. /impeccable layout
- [P2] Lead-magnet copy contradicts itself: "one-page" heading vs two pages; pointer "Get this…" under the filled example shows the blank page. Fix: "Get the agent rulebook (printable)"; pointer "Get a blank copy to fill in, plus this example". /impeccable clarify
- [P3] Three booking links in one desktop view after sign-up; success link wraps "call" on phones. Fix: whitespace-nowrap; demote/drop the success link when the panel is in view. /impeccable distill

## Persona Red Flags
- Jordan: enterprise mechanics up front; summary never says "six"; one-page vs two pages at the email ask.
- Sam: good outline/focus/reduced motion; 12px consent, 15px privacy link, flat heading scale.
- Casey: no ask for 62% then a sub-screen bar; 78px of hero on first screen; 36px chat chips, 40px send.

## Minor Observations
Desktop slip label wrap (carried over); generic footer tagline; date wraps to a second meta line on phones; PDF reachable without sign-up; header see-through in WebKit screenshots (verify on a real iPhone).

## Questions to Consider
- If the bar can't have two screens, should phones get a bar at all?
- Move "Why the limits…" before the six questions so the tool leads into the action and the ask?
- Rulebook before the call panel for cold readers?
