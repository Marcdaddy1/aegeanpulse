---
target: article page (ai-news/[slug]) — live build f59494f
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
target_fingerprint: "sha256:fa3fb7d80600699c455f20496eb2cb0a7524957945a8cb2939b9b4de33cfb3e7"
target_path: "C:\\Users\\AegeanPulse\\Desktop\\Claude Code Projects\\projects\\aegeanpulse\\src\\app\\ai-news\\[slug]\\page.tsx"
timestamp: 2026-11-08T13-21-26Z
slug: src-app-ai-news-slug-page-tsx
---
Method: dual-agent (A: design review · B: detector). Live https://aegeanpulse.com/ai-news/ai-agent-permissions-before-you-switch-it-on, build f59494f, 2026-11-08.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | States clear; no sense of place in a 6-min phone read |
| 2 | Match System / Real World | 3 | Vendor jargon mid-article (Intent Intelligence Framework, signed digital credential) |
| 3 | User Control and Freedom | 3 | Bar not dismissible; launcher over body text |
| 4 | Consistency and Standards | 3 | "our Discovery" prose vs "I/me" panel; two labels for one booking action |
| 5 | Error Prevention | 3 | Input border 1.20:1 light / 1.38:1 dark |
| 6 | Recognition Rather Than Recall | 3 | Slip relabels the six questions ~1,000px away |
| 7 | Flexibility and Efficiency | n/a | Single-pass Read surface |
| 8 | Aesthetic and Minimalist Design | 3 | Header + bar + launcher stack on phones |
| 9 | Error Recovery | 3 | Newsletter messages render below Subscribe, far from field |
| 10 | Help and Documentation | n/a | Article; chat covers help |
| **Total** | | **24/32** | **Good (75%)** |

## Design Specificity Verdict
Field Notebook system carried faithfully (Fraunces/Inter, warm paper, one teal pen, ruled example slip echoed by hero clipboard, founder-voiced panel). Skeleton is still a generic blog template; only the slip is content-specific; the "one page you can write this afternoon" is never offered as a takeable artefact.
Detector: source scan 0 findings (regex-only on .tsx, contrast/tiny-text rules did not run). URL scan: overused-font + cream-palette (false positives: DESIGN.md pins Inter + Field Paper); dark mode dark-glow on chat launcher (real: resting teal shadow breaks DESIGN.md hover-only shadow rule). Measured: mobile-menu active "AI News" 4.45:1; footer links 32px tall; all else passes (min body pair 5.38:1, dark buttons 7.72:1).

## Priority Issues
[P1] Phone: booking bar + chat launcher crowd the reading column; bar fires at 40% (ServiceNow, driest stretch). Fix: trigger after first example node (fallback 60%); tuck launcher while bar visible or merge; bottom padding on phones. /impeccable layout
[P1] Payoff (six questions + slip) at ~55-60% depth behind vendor news, no jump. Fix: h2 slug ids; "Skip to the six questions →" under standfirst; optional "In this article" strip. /impeccable clarify
[P2] First phone screen all type; hero image starts y=690 on 664px viewport. Fix: tighter mobile header padding, standfirst text-lg on phones, back link into meta row, close ~110px image→body gap. /impeccable adapt
[P2] Chat open on phone: bar still visible, two close buttons, three booking routes. Fix: hide bar while chat open; hide launcher while panel open on phones. /impeccable harden
[P2] Newsletter: errors below Subscribe (keyboard likely hides them), teal focus ring on red invalid border, input border ~1.2:1. Fix: per-field messages, danger focus ring when invalid, stronger input border (~#b9b1a5 / #4a535c). /impeccable harden

## Persona Red Flags
Casey: bar + launcher over text; first screen no image/body; 14-line paragraphs; no jump to checklist.
Jordan: no identity cue near top; "Agents" pill / "Back to AI News" assume context; jargon before payoff.
Sam: newsletter title is a <p> not a heading; chat greeting not announced on open.
Café/trades owner from LinkedIn: refund-agent example is online-shop specific; meets Marcus ~6,600px down (no-byline decision respected).

## Minor Observations
£499 Discovery three times in ~300px; dark-mode consent checkbox renders white (add color-scheme: dark); footer links 32px; mobile-menu AI News 4.45:1; launcher resting glow; date is <span> not <time>; slip labels weakly distinct; scrolled header 85% opacity (verify blur on real iPhone).

## Questions to Consider
Offer the one-page rulebook as a copyable/printable block (and newsletter lead magnet)? Do Amex/ServiceNow belong after the checklist? Is the mid-article bar earning taps vs a post-slip trigger?
