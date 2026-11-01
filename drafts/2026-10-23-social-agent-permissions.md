# Social pack — "Write your AI agent's limits before you switch it on"

> **Posted 2026-11-01 04:36 UTC** via Composio, on Marcus's instruction:
> LinkedIn (personal profile) post `urn:li:share:7522516808206303232` with the link
> as first comment; AegeanPulse Facebook Page post
> https://www.facebook.com/122129551047255050/posts/122133541251255050 (link-preview
> card). X not posted (no connection).
>
> **Copy below humanised and shortened on 2026-11-01, after posting.** The live
> posts still carry the original wording until they are edited.

Post **after** the article is live: deploy, or wait for the Tuesday 27 Oct 07:05 UTC
rebuild. Check the article URL loads before posting — every link below 404s until then.

Article: `https://aegeanpulse.com/ai-news/ai-agent-permissions-before-you-switch-it-on`

Where each piece goes:

| Piece | Channel | How |
|---|---|---|
| LinkedIn post + first comment | Marcus's LinkedIn profile | Composio can post it (`LINKEDIN_CREATE_LINKED_IN_POST`) — on Marcus's say-so only |
| Facebook post | AegeanPulse page (id `897682703439540`) | Composio can post it — on Marcus's say-so only |
| X post + thread | X | By hand — no X connection |
| Short script | AegeanPulse YouTube / reels | Optional. No AegeanPulse Instagram or YouTube is connected; Composio's Instagram and Pinterest are Homecrackers |

## What changed from the Monday brief, and why

- **Dropped "most small businesses I talk to are doing the opposite".** It's an
  anecdote nobody can check, written in Marcus's voice by the brief. The post makes
  the same point as an observation about how agents are sold.
- **"Rejected" → "stopped because it needed a person to review it".** SiliconANGLE
  says the $40 refund was rejected at runtime *because it exceeded the threshold for
  human review*. That detail is the point, so it stays in.
- **"Amex built a spending limit" softened.** Amex's framework records the shop,
  maximum budget and preferences the customer agreed to. A budget is one part of it,
  not the whole thing.
- **Links point at the article**, with UTMs, instead of the `/ai-news/` index.

Sources checked 2026-10-23: TechCrunch (Amex, 13 Oct 2026, Sarah Perez) and
SiliconANGLE (ServiceNow, 15 Oct 2026, Paul Gillin).

---

## LinkedIn

Article link goes in the **first comment** — posts with links in the body tend to be
shown to fewer people.

```
Two big launches for AI agents in October, and neither led with what the agent can do.

On 13 October, American Express showed a framework that records what a customer agreed to (the shop, the maximum budget, their preferences) before an agent can buy anything. The agent then pays with a token that carries those limits instead of the card number.

Two days later ServiceNow announced AI Passport, a signed credential listing what an agent may do, checked while it works. In their demo, an agent allowed to refund under $25 put an $18 refund straight through and stopped a $40 one so a person could review it.

Both set the limits before the abilities. Most small-business agents get built the other way round, because the demo that sells an agent always shows it succeeding.

Before yours goes live, write one page: what it can read, change and spend, what it must hand to a person, who gets told, and how you switch it off.

What would you never let an agent do without you?
```

First comment:

```
The one-page version, with a worked example for a refund agent: https://aegeanpulse.com/ai-news/ai-agent-permissions-before-you-switch-it-on?utm_source=linkedin&utm_medium=social&utm_campaign=agent-permissions
```

---

## Facebook — AegeanPulse page

```
An AI agent was allowed to issue refunds under $25. It put an $18 refund straight through and stopped a $40 one so a person could check it. That was ServiceNow's AI Passport demo in October, two days after American Express showed a framework that records the shop and budget a customer agreed to before an agent can buy anything.

Both set the limits first. Most small businesses switch the agent on and sort out the limits after something goes wrong.

Before you hand a job to an agent, write down what it can read, change and spend, what it must pass to a person, who gets told, and how you switch it off. The full guide, with a worked example:
https://aegeanpulse.com/ai-news/ai-agent-permissions-before-you-switch-it-on?utm_source=facebook&utm_medium=social&utm_campaign=agent-permissions

#AIAgents #SmallBusiness
```

---

## X

```
ServiceNow's AI Passport demo: an agent allowed refunds under $25 put an $18 one through and stopped a $40 one for a person to check. Amex showed limits for shopping agents two days earlier.

Write your agent's limits before you switch it on:
https://aegeanpulse.com/ai-news/ai-agent-permissions-before-you-switch-it-on?utm_source=x&utm_medium=social&utm_campaign=agent-permissions
```

### X thread (5 posts)

1. **Hook** — two launches for AI agents in the same week, and both led with what an agent must *not* do.
2. **Amex (13 Oct)** — records the shop, maximum budget and preferences the customer agreed to before an agent buys; the agent pays with a token carrying those limits, not the card number.
3. **ServiceNow (15 Oct)** — AI Passport, a signed credential of what an agent may do, checked while it works. The $25 / $18 / $40 refund demo.
4. **The lesson** — limits first, abilities second. Small-business agents usually get built the other way round, because the demo always shows the agent succeeding.
5. **The fix** — one page per agent: read, change, spend, hand to a person, who's told, off switch. Link with `utm_source=x`.

---

## Short video (optional, 9:16)

**Hook (0–3s):** "An AI agent was allowed refunds under twenty-five dollars. Watch what happened at forty."

- 3–12s — "ServiceNow showed this in October. Eighteen-dollar refund: straight through. Forty-dollar refund: stopped mid-run, because it needed a person to check it."
- 12–22s — "Two days earlier, American Express showed the same idea for shopping: the agent can only buy what you agreed to — the shop, the budget — and it never sees your card number."
- 22–32s — "Both of them built the brakes first. Most small businesses switch the agent on, then work out the limits after something goes wrong."
- 32–45s — "So before you switch yours on, write one page. What it can read. What it can spend. What it must hand to you. And how you turn it off."

On-screen text: `Refunds allowed: under $25` · `$18 ✓` · `$40 ✗ → a person` · `Limits first` · `One page per agent`

Cover text: **$18 YES. $40 NO.**

Thumbnail: designed 9:16 1080x1920 JPG under 2 MB plus a 16:9 1280x720 backup; fallback cover frame at ~5s (the "$40 ✗" overlay).
