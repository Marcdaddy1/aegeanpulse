# AegeanPulse — Email Marketing Implementation Plan

_Written 2026-09-04. Every number below was read from the live Reach account
and from public DNS on that date — not from Hostinger's marketing pages._

## What the account actually looks like right now

| Fact | Value | Why it matters |
|---|---|---|
| Profile UUID | `b3bd9869-f69b-11f0-9166-42010a7501e7` | Needed in every API call |
| Sending domain | `aegeanpulse.com` — **active** | Cleared to send |
| **DKIM** | **missing** | **Blocks everything. Fix first.** |
| **DMARC** | **missing** | Gmail/Yahoo penalise bulk senders without it |
| SPF / MX | present, Hostinger | Fine |
| Subscribers | **1** (your own address) | Zero base — growth is job one |
| Subscriber cap | **100** | Hard ceiling on this plan |
| Email cap | **200 sends/month**, resets on the 1st | The real constraint |
| Automations | **locked** | No welcome sequence, no drip |
| HTML editor (UI) | **locked** | But the API accepts HTML — see Phase 3 |
| Remove branding | **locked** | Hostinger signature on every email |
| Campaigns / templates / forms | 0 / 0 / 0 | Greenfield |
| Live articles to draw on | **16** | The content already exists |

### The constraint that decides the whole strategy

**200 sends per month ÷ your list size = campaigns per month.**

At 100 subscribers that is exactly **two sends a month**. Not weekly. Anyone
recommending a weekly newsletter on this plan is describing a list of 50 people
or a bigger plan. Plan fortnightly and you stay inside the cap even at a full
list.

A second, sharper edge: at 100 contacts you cannot add a 101st. Signups start
failing — and today they would fail *silently*. See Phase 1.

## Architecture

- **Capture stays as built.** `/api/newsletter/subscribe` → `src/lib/server/email/reach.ts` → `POST /reach/v1/contacts`. Consent-gated and rate-limited already. Only the cap bug needs touching.
- **Composition is automated; sending stays manual.** The API can create an HTML template and a draft campaign. It cannot set audience, schedule, or send. So a script builds the draft and you press send in Reach — roughly 90% of the per-issue work removed.
- **The newsletter distributes the 16 articles you already have.** It is not a new content stream. Nothing in this plan asks you to write more long-form.

---

## Phase 0 — Unblock sending (before anything else)

Reach reports the domain "active", but DKIM is not published — confirmed
against Google's resolver independently of Reach. Sending now means unsigned
mail: Gmail and Outlook will filter it, and early damage to a fresh sending
domain is slow to undo.

Add three records in hPanel → Domains → DNS Zone, on `aegeanpulse.com`:

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | `reach-a._domainkey` | `reach-a.dkim.reach.hostinger.com` | 14400 |
| CNAME | `reach-b._domainkey` | `reach-b.dkim.reach.hostinger.com` | 14400 |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contact@aegeanpulse.com` | 14400 |

`p=none` monitors without affecting delivery — the correct first DMARC policy.
Tighten to `p=quarantine` only after a month of clean reports.

Verify each returns a value rather than NXDOMAIN:

```bash
nslookup -type=CNAME reach-a._domainkey.aegeanpulse.com 8.8.8.8
```

```bash
nslookup -type=TXT _dmarc.aegeanpulse.com 8.8.8.8
```

Then confirm Reach agrees:

```bash
cd ~/path/to/aegeanpulse && TOKEN=$(sed -n 's/^HOSTINGER_API_TOKEN=//p' .env.local | tr -d '"\r') && curl -s -H "Authorization: Bearer $TOKEN" "https://developers.hostinger.com/api/reach/v1/profiles/b3bd9869-f69b-11f0-9166-42010a7501e7/domains/dns-status"
```

**Also confirm the from-address mailbox exists and is monitored.** The domain is
verified, but replies need to reach a human. Use `marcus@aegeanpulse.com` if it
exists, otherwise `contact@aegeanpulse.com`.

---

## Phase 1 — Fix the silent failure at the subscriber cap

`src/lib/server/email/reach.ts` currently treats HTTP 422 as success:

```ts
if (!res.ok && res.status !== 409 && res.status !== 422) {
```

That was right for "contact already exists". But 422 is also the likely
response once the 100-subscriber cap is reached — in which case the form thanks
the visitor and nobody is added. On a 100-contact plan you *will* hit this.

The fix is to separate the two cases by response body: treat "already exists" as
success and anything else as a real error that logs loudly, so a full list shows
up as an alert rather than as mysteriously flat growth. Read the body of a real
422 before assuming its shape.

Add a headroom check to the weekly routine:

```bash
cd ~/path/to/aegeanpulse && TOKEN=$(sed -n 's/^HOSTINGER_API_TOKEN=//p' .env.local | tr -d '"\r') && curl -s -H "Authorization: Bearer $TOKEN" "https://developers.hostinger.com/api/reach/v1/profiles/b3bd9869-f69b-11f0-9166-42010a7501e7/limits"
```

Returns `emails`, `recipients` and `ai_credits`, each as `{limit, used, remaining}`.

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

```bash
cd ~/path/to/aegeanpulse && TOKEN=$(sed -n 's/^HOSTINGER_API_TOKEN=//p' .env.local | tr -d '"\r') && curl -s -X POST "https://developers.hostinger.com/api/reach/v1/profiles/b3bd9869-f69b-11f0-9166-42010a7501e7/templates" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Issue 01 - projects never ship","template_content":"<html><body><p>Hi,</p></body></html>"}'
```

That returns a `uuid`. Use it as `template_uuid`:

```bash
cd ~/path/to/aegeanpulse && TOKEN=$(sed -n 's/^HOSTINGER_API_TOKEN=//p' .env.local | tr -d '"\r') && curl -s -X POST "https://developers.hostinger.com/api/reach/v1/profiles/b3bd9869-f69b-11f0-9166-42010a7501e7/campaigns" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"sender_name":"Marcus at AegeanPulse","sender_email":"marcus@aegeanpulse.com","title":"Issue 01 - projects never ship","subject":"Most small-business AI projects never ship","template_uuid":"REPLACE_WITH_TEMPLATE_UUID","metadata":{"preheader":"The reason is almost never the technology.","source":"api"}}'
```

Only `sender_name` and `sender_email` are required. `metadata` rejects any key
other than `preheader` and `source`.

**Then, in reach.hostinger.com:** open the draft, choose the audience, send.
Targeting and scheduling are deliberately not exposed by the API.

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

```bash
cd ~/path/to/aegeanpulse && TOKEN=$(sed -n 's/^HOSTINGER_API_TOKEN=//p' .env.local | tr -d '"\r') && curl -s -H "Authorization: Bearer $TOKEN" "https://developers.hostinger.com/api/reach/v1/profiles/b3bd9869-f69b-11f0-9166-42010a7501e7/campaigns/REPLACE_WITH_CAMPAIGN_UUID/statistics"
```

Three numbers per send, kept in a running note:

- **Open rate** — under ~25% means the subject or the from-name is wrong.
- **Click rate** — under ~2% means the email did not earn the click.
- **Unsubscribes** — over ~1% per send means wrong list or wrong frequency.

Ignore everything else at this list size; the sample is too small to read.

The number that actually matters is **booked calls attributable to email**. Tag
the CTA so it is visible in Cal.com:

```
https://cal.com/aegeanpulse/ai-strategy-consultation?utm_source=reach&utm_campaign=issue-01
```

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

- [ ] Publish the three DNS records (Phase 0) — nothing else can start first
- [ ] Confirm which from-address mailbox exists and is monitored
- [ ] Fix the 422 handling in `reach.ts`; verify the real cap response body
- [ ] Finish and publish the *AI Automation Cost* draft — it is the signup incentive
- [ ] Add the signup form to `/pricing`
- [ ] Confirm an API-created HTML template survives sanitisation
