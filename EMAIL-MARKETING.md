# AegeanPulse — Email Marketing Implementation Plan

_Written 2026-09-04. Every number below was read from the live Reach account
and from public DNS on that date — not from Hostinger's marketing pages._

## What the account actually looks like right now

| Fact | Value | Why it matters |
|---|---|---|
| Profile UUID | `b3bd9869-f69b-11f0-9166-42010a7501e7` | Needed in every API call |
| Sending domain | **`mail.aegeanpulse.com`** — active | Reach forces a subdomain; the apex is not selectable |
| **DKIM** | OK on the subdomain — `dkim=pass` at Gmail | Verified in a real received message |
| **DMARC** | OK — `dmarc=pass`, aligned | `p=none` on the subdomain |
| SPF / MX | present, Hostinger | Fine |
| Subscribers | **2** | First real signup landed |
| Subscriber cap | **100** | Hard ceiling on this plan |
| Email cap | **200 sends/month**, resets on the 1st | The real constraint |
| Automations | **locked** | No welcome sequence, no drip |
| HTML editor (UI) | **locked** | But the API accepts HTML — see Phase 3 |
| Remove branding | **locked** | Hostinger signature on every email |
| Campaigns / templates / forms | 1 sent + 1 draft / 2 / 0 | Issue 01 sent 2026-09-14 |
| Live articles to draw on | **17**, all live | The content already exists |
| **Inbox placement** | **INBOX (Promotions tab)** | Verified in the recipient mailbox — see Phase 5 |

### The constraint that decides the whole strategy

**200 sends per month ÷ your list size = campaigns per month.**

At 100 subscribers that is exactly **two sends a month**. Not weekly. Anyone
recommending a weekly newsletter on this plan is describing a list of 50 people
or a bigger plan. Plan fortnightly and you stay inside the cap even at a full
list.

A second, sharper edge: at 100 contacts you cannot add a 101st. Signups then
fail — loudly now, since Phase 1; they used to fail silently.

## Running the commands

Everything here runs through one script, `scripts/reach.ps1`. **Do not paste
multi-line PowerShell blocks into the terminal** — Windows PowerShell 5.1
corrupts long lines mid-paste (a line with quotes and `@{}` gets eaten
character by character), which leaves the auth header unset and every call
returns `401 Unauthorized`. One file, one short command, no session state:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 status
```

| Action | Shows |
|---|---|
| `status` | Everything at a glance — list size, quota left, sends left, DNS |
| `dns` | MX/SPF/DKIM/DMARC with actual values, and what to add if missing |
| `contacts` | The subscriber list |
| `campaigns` | Drafts and sent campaigns |
| `stats` | Open/click/unsubscribe for each sent campaign |

The script reads `HOSTINGER_API_TOKEN` from `.env.local` itself and resolves it
relative to its own location, so the working directory does not matter.

## Architecture

- **Capture stays as built.** `/api/newsletter/subscribe` → `src/lib/server/email/reach.ts` → `POST /reach/v1/contacts`. Consent-gated and rate-limited already, and since Phase 1 a refusal throws rather than reporting false success.
- **Composition is automated; sending stays manual.** The API can create an HTML template and a draft campaign. It cannot set audience, schedule, or send. So a script builds the draft and you press send in Reach — roughly 90% of the per-issue work removed.
- **The newsletter distributes the 17 articles you already have.** It is not a new content stream. Nothing in this plan asks you to write more long-form.

---

## Phase 0 — Unblock sending (before anything else)

Reach reported the domain "active" while DKIM was not actually published —
caught by checking Google's resolver independently of Reach. Sending in that
state means unsigned mail: Gmail and Outlook filter it, and early damage to a
fresh sending domain is slow to undo. Worth re-checking after any DNS change,
since Reach's own status field did not reflect reality.

The three records, added in hPanel → Domains → DNS Zone on `aegeanpulse.com`:

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | `reach-a._domainkey` | `reach-a.dkim.reach.hostinger.com` | 14400 |
| CNAME | `reach-b._domainkey` | `reach-b.dkim.reach.hostinger.com` | 14400 |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contact@aegeanpulse.com` | 14400 |

`p=none` monitors without affecting delivery — the correct first DMARC policy.
Tighten to `p=quarantine` only after a month of clean reports.

**STATUS: RESOLVED 2026-09-14 — but note it regressed once in between.**

DKIM went missing between 2026-09-04 and 09-10 (zone serial `2026091001`), with
Reach still reporting the domain "active" throughout. Re-added and verified.

**The sending domain is now the `mail.aegeanpulse.com` subdomain, not the apex.**
Reach's "Change" dialog is titled *Change your sending subdomain* and the
`.aegeanpulse.com` suffix is fixed — the apex is not selectable, even though it
was the connected domain from 2025-08-29 until 2026-09-14 17:49 UTC. Disconnecting
to try to get back to the apex regenerates a **new TXT verification record**, so
it is not a free swap. Do not attempt it to fix deliverability — Phase 5 shows
authentication is not the problem.

Records now live on **both** the apex and the subdomain. Keep both: the apex set
means you can move back if Reach ever allows it, at no cost.

To re-verify what Reach sees at any time:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 dns
```

And to check public DNS independently — worth doing, because Reach reported
the domain "active" while DKIM was absent:

```powershell
Resolve-DnsName reach-a._domainkey.aegeanpulse.com -Type CNAME -Server 8.8.8.8
```

**Replies still need somewhere to land.** Campaigns send as
`marcus@mail.aegeanpulse.com` — the subdomain, not the apex — and that mailbox
almost certainly does not exist. Add a mailbox or a forwarder for it in
hPanel → Emails, or every reply bounces silently, which is worse than `noreply`
because the sender believes they reached you.

---

## Phase 1 — Fix the silent failure at the subscriber cap

**STATUS: fixed 2026-09-04.**

`src/lib/server/email/reach.ts` treated both 409 and 422 as success, to swallow
an "already exists" response. Probing the live API showed that reasoning was
wrong in both directions:

| Case | Actual response |
|---|---|
| New contact | `200 {"message":"Request accepted"}` |
| **Contact already on the list** | **also `200`, same body** |
| Invalid / missing email | `422 {message, errors:{email:[…]}, correlation_id}` |

Duplicates never returned 409 or 422 at all — idempotency is handled
server-side — so the special case protected against nothing while hiding every
genuine failure, including whatever the API returns once the 100-subscriber cap
is reached.

The adapter now throws `SubscribeError` on any non-2xx, carrying the parsed
`message`, field errors (deduped) and `correlation_id`. It also sets a
`listFull` flag, which the route logs on its own greppable line so a full list
reads as an alert rather than as organic flatlining. The exact cap response is
**not verified** — confirming it would mean adding 99 contacts — so `listFull`
is a best-effort hint on the message text, never control flow: every non-2xx
throws regardless.

`SubscribeError` lives in `provider.ts`, not the Reach adapter, so the route
still imports only from `@/lib/server/email` and swapping ESP stays a
one-file change.

Verified against the live API and with simulated cap responses:

| Case | Result |
|---|---|
| Existing contact | resolves (no false error) |
| Invalid email | throws, `status=422`, `listFull=false` |
| `403 Subscriber limit reached` | throws, `listFull=true` |
| `422 plan quota … Upgrade` | throws, `listFull=true` |
| `500` non-JSON body | throws, raw body preserved |

Weekly headroom check — `status` warns automatically once fewer than 10
subscriber slots remain:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 status
```

---

## Phase 2 — Get from 1 subscriber to 100

The list is the asset; everything else is mechanics. None of this needs new
long-form writing.

1. **Give people a reason.** "Subscribe to the newsletter" converts poorly.
   Offer one concrete thing. The strongest asset you already own is cost data:
   finish and publish the *AI Automation Cost* article (your one remaining
   draft) and make the incentive "the one-page version — plus what it actually
   cost the last three clients."
2. **Put the form where intent is highest.** It is already in the footer and
   after article bodies. Add it to `/pricing` — that page attracts people
   comparing cost, which is exactly the incentive above.
3. **Seed manually, lawfully.** Import contacts you have a lawful basis to
   email: past enquiries, WMS contacts who opted in, LinkedIn conversations
   where someone explicitly agreed. Never bought or scraped lists — UK GDPR
   consent is why the endpoint already requires `consent: true`.
4. **Use the channels you own.** Change Studio and LinkedIn both already point
   at aegeanpulse.com. A line in a video description and a LinkedIn featured
   link cost nothing.

At roughly 40–60 subscribers you have a list worth sending to and can still
send 3–4 times a month inside the cap.

---

## Phase 3 — The send loop

**STATUS: Issue 01 SENT 2026-09-14 18:21:55 UTC to 2 recipients. Reached the inbox (Promotions tab) — see Phase 5.**

Two drafts exist in Reach. Send the **v2** one:

| Draft title | Template | Campaign | Use |
|---|---|---|---|
| `Issue 01 v2 - projects never ship (SEND THIS ONE)` | `8c16b376…` | `ebbe75bf…` | **this one** |
| `Issue 01 - projects never ship` | `3c9de927…` | `ec74f6b2…` | superseded — ignore |

The first draft used HTML that broke in Outlook (the Word engine ignores
`max-width`, so the card ran the full window width) and did not reflow on
mobile (no viewport meta — measured, the layout viewport stayed at 980px on a
375px screen). `drafts/issue-01.html` now carries an MSO ghost table and the
viewport meta; see commit `6271836`.

Reach has **no update or delete endpoint for templates or campaigns**, so a
correction means creating a new pair and leaving the old one behind. The UI
cannot be used to patch it either — `HtmlCodeEditor` is locked on this plan.

**Still unverified: whether the HTML survives Reach's sanitisation.** The API
never returns template content — not from the templates list, not from campaign
detail — so this can only be judged by eye. Open the draft in
reach.hostinger.com and check the layout holds before sending. If it is
mangled, the fallback is rebuilding the issue in their drag-drop editor.

Templates have **no delete endpoint**, so pass `-TemplateUuid` to attach a new
campaign to an existing template rather than creating a duplicate.


Automations are locked, so this is a deliberate, human-triggered loop:
fortnightly, on a Tuesday, matching the existing article cadence.

**What an issue is:** one live article, reframed as a short email making one
argument and linking out. Not a digest, not a roundup. Sixteen published
articles is eight months of fortnightly issues without writing anything new.

Suggested running order — the contrarian essays first, since they are the most
distinctive thing on the site:

| # | Article | Angle |
|---|---|---|
| 1 | Most small-business AI projects never ship | Why pilots die |
| 2 | You probably don't need a chatbot | Anti-sell; builds trust |
| 3 | The most valuable AI in your business is boring | Resets expectations |
| 4 | Stop calculating AI ROI before you've started | Removes a stall excuse |
| 5 | You don't need an AI strategy. You need one working thing | Straight to the offer |

**Creating the draft from the API — two calls.** Templates accept HTML even
though the UI's HTML editor is locked on this plan; that is the workaround for
the missing editor. Confirm it with the first template before relying on it —
the body is sanitised on save, so check what comes back.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 draft -Html .\drafts\issue-01.html -Title "Issue 01 - projects never ship" -Subject "Most small-business AI projects never ship" -Preheader "The reason is almost never the technology."
```

It creates the template, then the draft campaign against it, and prints both
UUIDs. `-From` and `-FromName` default to `marcus@aegeanpulse.com` /
"Marcus at AegeanPulse"; override them if you use a different mailbox.

Only `sender_name` and `sender_email` are required. `metadata` rejects any key
other than `preheader` and `source`.

**Then, in reach.hostinger.com:** open the draft, choose the audience, send.
Targeting and scheduling are deliberately not exposed by the API.

### Issue format — from Issue 02 onward

Three patterns borrowed from Forward Future (Matthew Berman), analysed
2026-09-19. Their palette is structurally ours already — warm off-white ground,
near-black text, one saturated accent — so nothing was restyled. What was worth
taking is the *structure*:

1. **Eyebrow labels** in `#0e7c6b`, 12px Helvetica, uppercase, `letter-spacing:
   0.12em`, above every section. This is what makes a long email scannable, and
   it is the highest-value change for the least work. The accent appears **only**
   on eyebrows, sub-heads and links — never on body text, never as a fill. That
   restraint is why their 40 uses of orange don't feel loud.
2. **A recurring ritual** — "Myth of the issue". Teased in the opener
   ("Plus, at the bottom: …") and paid off at the end, which is their trick for
   pulling the reader past the middle. One AI myth dismantled per issue; fits
   the contrarian voice and gives a reason to open that isn't the article.
3. **"Also worth reading"** — five one-line links, each with a bolded lead-in.
   Zero-effort surfacing of the 17-article back catalogue every issue.

Deliberately **not** taken: their daily cadence (impossible on 200 sends/month),
their 14 CDN images (blocked by default in most clients, and MailChannels would
rewrite them), and their 667px width — 560px reads better for a text-led letter,
which is what ours is. Their sectioning works because a news digest has many
short items; ours carries one argument, so the machinery stays minimal.

`drafts/issue-02.html` is the reference implementation. Copy it, swap the
content, keep the structure.

### Email shape

Plain, narrow, mostly text. The Hostinger signature is forced on this plan, so a
heavily designed template looks worse rather than better — it fights the footer.

```
Subject:   Most small-business AI projects never ship
Preheader: The reason is almost never the technology.

Hi {{name}},

Most AI projects I get called into have already failed once.

Not because the tool was wrong. Because nobody agreed what problem it was
meant to solve, so there was no way to tell whether it had worked.

I wrote up what actually separates the ones that ship:

-> Most small-business AI projects never ship  [link to article]

If you want a straight answer on whether automation is worth it in your
business, that is a 20-minute call, free, no pitch:
https://cal.com/aegeanpulse/ai-strategy-consultation

- Marcus
```

Rules that matter more than design: one link to the article, one to the call,
nothing else. Subject under about 45 characters. Never "Newsletter #1" — nobody
subscribes to a number.

---

## Phase 4 — Measure only what changes a decision

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 stats
```

Three numbers per send, kept in a running note:

- **Open rate** — under ~25% means the subject or the from-name is wrong.
- **Click rate** — under ~2% means the email did not earn the click.
- **Unsubscribes** — over ~1% per send means wrong list or wrong frequency.

Ignore everything else at this list size; the sample is too small to read.

**If you follow Phase 5 and turn tracking off, open and click rates stop
working** — the pixel and the link rewriting are what produce them. That is the
right trade: inbox placement beats metrics you cannot act on at two
subscribers. Revisit once the list is large enough for a rate to mean something,
and weigh it against deliverability then.

The number that actually matters is **booked calls attributable to email**, and
it survives tracking being off because it is measured at Cal.com, not in the
email. Tag the CTA:

```
https://cal.com/aegeanpulse/ai-strategy-consultation?utm_source=reach&utm_campaign=issue-01
```

---

## Phase 5 — Deliverability: where Issue 01 actually landed

**Issue 01 sent 2026-09-14 18:21:55 UTC to 2 recipients. It reached the inbox.**

This section previously said it went to spam. That was wrong — corrected
2026-09-19 by reading the recipient mailbox directly through the Composio Gmail
connector:

```
subject:  Most small-business AI projects never ship
from:     Marcus at AegeanPulse <marcus@mail.aegeanpulse.com>
labelIds: ["CATEGORY_PROMOTIONS", "INBOX"]
```

`INBOX`, not `SPAM`. It was filed under Gmail's **Promotions tab**, which sits
inside the inbox behind a separate tab and is easy to mistake for the spam
folder. A spam-filtered message carries the `SPAM` label and is not in `INBOX`
at all.

**Promotions is the correct and expected destination** for a marketing email
carrying a `List-Unsubscribe` header. Most newsletters land there, including
ones from senders with years of reputation. This is not a problem to fix.

### Two traps worth keeping

**Reach's stats cannot tell you where mail landed.** `delivered_count: 2,
bounced: 0` only means the receiving server accepted it — inbox, Promotions and
spam all look identical from the sending side. Placement can only be read from a
recipient mailbox.

**Promotions is not spam.** Check the label before concluding anything. The
whole earlier diagnosis, and the remediation built on it, came from assuming a
tab was the spam folder.

### Authentication — verified clean

From the raw headers of the received message:

```
dkim=pass   header.i=@mail.aegeanpulse.com  header.s=reach-a
spf=pass    designates 23.83.214.40 as permitted sender
dmarc=pass  (p=NONE sp=NONE dis=NONE) header.from=mail.aegeanpulse.com
```

All three pass and all three align to the sending domain. No DNS work
outstanding. This is also why switching back to the apex was dropped — it would
have changed nothing.

### How to check placement in future

Read the recipient mailbox through Composio. Both Gmail accounts are connected;
`marcdaddy.business@gmail.com` is the newsletter subscriber:

| Account ID | Email |
|---|---|
| `gmail_smith-aimore` | `marcdaddy.business@gmail.com` — the list subscriber |
| `gmail_lamina-dode` | `aegeanpulse1@gmail.com` |

`GMAIL_FETCH_EMAILS` with `include_spam_trash: true` and the sending domain as
the query returns `labelIds`, which is the answer. `INBOX` = delivered,
`CATEGORY_PROMOTIONS` = inbox Promotions tab, `SPAM` = actually filtered.

### Optional hygiene — not urgent

These are real but cosmetic now that placement is confirmed good. Do them when
convenient, not as a rescue:

| Thing | Why it is imperfect | Worth changing? |
|---|---|---|
| Links rewritten via `click.mailchannels.net` | anchor text says `aegeanpulse.com`, href points at a shared redirector | Yes, eventually — turn off click tracking |
| Hidden open-tracking pixel | `<img src="https://open.mailchannels.net/…" style="display:none">` | Same — turn off open tracking |
| No plain-text alternative | `Content-Type: text/html` rather than `multipart/alternative` | Reach's call, cannot change |
| ~100 zero-width chars of preheader padding | injected by Reach as a spacer | Reach's call, cannot change |
| Shared MailChannels relay, `X-MC-Relay: Neutral` | no dedicated IP at this tier | Structural to the plan |

Turning tracking off removes the two fixable items and makes links honest. It
costs the open and click rates — a fair trade at two subscribers, and revisit
when the list is big enough for a rate to mean anything.

### On changing ESP

The earlier version of this section argued for leaving Reach because mail was
being spam-filtered. **That argument is void** — mail reaches the inbox,
authentication is clean, and there is no deliverability problem to solve.

Reach's real constraints are the ones in the table at the top of this file: 100
subscribers, 200 sends a month, no automations. Those are reasons to upgrade or
move *when the list justifies it*, not deliverability.

## When to upgrade

Upgrade when **either** is true:

- The list reaches ~90 subscribers — you are about to start losing signups, or
- Two sends a month is demonstrably costing you: email has produced at least
  one booked call and you want to test higher frequency.

What the upgrade actually buys: higher subscriber and send caps,
**automations** — which unlocks the single highest-value email, a welcome
message sent the moment someone subscribes — removal of the Hostinger
signature, and the UI HTML editor.

Until then, do not build a welcome sequence. It cannot be automated on this
plan, and sending one by hand would eat from a 200/month budget.

## Open items

- [x] DKIM + DMARC — **done 2026-09-14**, verified by `dkim=pass`/`dmarc=pass` in a received message
- [x] Fix the 422 handling in `reach.ts` — **done 2026-09-04**; cap response still unverified by design
- [x] Publish the *AI Automation Cost* article — **live**, corrected against `src/data/pricing.ts`
- [x] Add the signup form to `/pricing` — **live**
- [x] Confirm the API-created HTML survives sanitisation — **yes**; Reach kept the tables, inline styles, MSO ghost table and viewport meta intact
- [ ] Turn off click + open tracking in Reach (Phase 5) — optional hygiene now that placement is confirmed good, not a rescue
- [ ] Add a mailbox or forwarder for `marcus@mail.aegeanpulse.com`, or replies bounce silently
- [ ] Grow the list (Phase 2) — still only 2 subscribers; the `/pricing` form and cost article are now live to feed it
- [ ] Decide whether Reach is the long-term ESP before investing in list growth — on the plan caps (100 subs / 200 sends / no automations), **not** deliverability, which is fine
