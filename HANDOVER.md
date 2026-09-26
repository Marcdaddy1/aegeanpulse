# AegeanPulse — Session Handover

_Last updated: 2026-09-26. Read this, then `CLAUDE.md`, then `EMAIL-MARKETING.md`
before doing anything._

This file is the bridge between sessions. It records **state that is not
derivable from the code** — what is live, what is waiting on a human, and the
lessons that cost real time to learn. Update the status tables when you change
anything.

---

## 1. Do these first — status as of 2026-09-26

| # | Item | State | Who |
|---|---|---|---|
| 1 | **Redeploy** so the "build quote" article (re-dated 26 Sept) goes live (see §4) | Committed; first deploy 26 Sept ran before the re-date | Marcus (manual deploy) |
| 2 | **Send Issue 02** in Reach | Draft, **unsent** | Marcus (Reach UI) |
| 3 | **Post the social pack** for the new article | Written, in `drafts/` | Marcus |
| 4 | Create **Issue 03** in Reach — only after the article is live | HTML built, not in Reach | Next session |
| 5 | **Forwarder** for `marcus@mail.aegeanpulse.com` → real inbox | Not done | Marcus (hPanel) |
| 6 | **Paste the new Monday brief prompt** into the scheduled task (§6) | Written, not pasted | Marcus (claude.ai Scheduled tasks) |
| 7 | **Rotate** the Cal.com key and Hostinger API token (both pasted in chat months ago) | Not done | Marcus |

Order matters for 1 → 4: the article must be **live** before Issue 03 is sent,
because Issue 03's hero and first link both point at it.

---

## 2. What is live right now

Verify rather than trust this table — see §4 for the two curl checks.

| Thing | State |
|---|---|
| Site | aegeanpulse.com on Hostinger VPS `72.61.4.237`, Docker. Last build seen: **2026-09-22 07:06 UTC** |
| Articles | **17 live**, all with a hero image. An 18th (`why-ai-hasnt-made-your-build-quote-cheaper`) is committed and dated **2026-09-26** (moved forward from 29 Sept at Marcus's request) — live after the 26 Sept redeploy |
| iOS article bug | **Fixed and live** — `Reveal`/`Stagger` use `viewport.amount: "some"`. See §7 |
| Email images | 17/17 JPEGs live at `/images/email/<slug>.jpg`; the 18th ships with the next deploy |
| `/pricing` signup form, `/terms` | Live |

---

## 3. Email marketing — current state

Full detail lives in `EMAIL-MARKETING.md`. The essentials:

| Fact | Value |
|---|---|
| ESP | Hostinger Reach, profile `b3bd9869-f69b-11f0-9166-42010a7501e7` |
| **Sending domain** | **`mail.aegeanpulse.com`** — Reach forces a subdomain; the apex cannot be selected |
| Sender | `Marcus at AegeanPulse <marcus@mail.aegeanpulse.com>` (UI currently shows name "Marcus") |
| Auth | SPF/DKIM/DMARC all **pass and align** — verified in a real received message |
| Placement | Issue 01 reached **INBOX, Promotions tab** — *not* spam (was misreported as spam once) |
| List | **2 contacts** (one is Marcus). Cap 100 subscribers, **200 sends/month**, resets on the 1st |
| Quota | 198/200 emails left, period ends 2026-09-30 |

**Campaigns in Reach**

| Title | Status | Note |
|---|---|---|
| Issue 01 v2 — projects never ship | **sent** 2026-09-14 | delivered 2, opened 2, clicked 1 |
| Issue 01 — projects never ship | draft | superseded — ignore. Reach cannot delete it |
| **Issue 02 — you probably don't need a chatbot** | **draft** | template `c9e78336…`, campaign `41b4bf6d…`. Ready to send |

**Issue format** (from Issue 02 on): brand-teal eyebrow labels above every
section · a hero image · "Myth of the issue" ritual teased in the opener and
paid off at the end · "Also worth reading" five-link block. Reference
implementation: `drafts/issue-02.html`.

**To create a draft in Reach** (never paste multi-line PowerShell — see §7):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 draft -Html .\drafts\issue-03.html -Title "Issue 03 - ..." -Subject "..." -Preheader "..."
```

Other actions: `status`, `dns`, `contacts`, `campaigns`, `stats`.

**Checking where a sent email landed:** Reach's stats cannot tell you — `delivered`
means *accepted*, not *inboxed*. Read the recipient mailbox via Composio Gmail
(`gmail_smith-aimore` = `marcdaddy.business@gmail.com`) and check `labelIds`.
Composio needs re-authorising in claude.ai connector settings as of 2026-09-26.

---

## 4. Deploy — manual, and it matters

**There is no auto-deploy.** A push reaches the site only when someone runs this.
It also means date-gated articles never publish themselves: an article appears
only after a rebuild on or after its `date`.

```bash
ssh root@72.61.4.237
```

```bash
cd /var/lib/docker/volumes/aegeanpulse_app_data/_data && git pull && docker exec aegeanpulse-app-1 npm run build && docker restart aegeanpulse-app-1
```

- The site **returns 502 for a minute or two** during the build. Expected.
- `&&` means a failed build never restarts the container.
- **The build step is not optional.** `git pull && docker restart` alone serves the
  old `.next` output and changes nothing.

**Verify after deploying** (the timestamp should be today):

```bash
curl -s https://aegeanpulse.com/sitemap.xml | grep -m1 -o "<lastmod>[^<]*"
```

```bash
curl -s https://aegeanpulse.com/sitemap.xml | grep -c "/ai-news/"
```

Compare the second number with `ls src/content/articles/*.md`.

**Date-gated articles:** a future-dated article appears only after a rebuild on or after its date. The build-quote article was moved to 26 Sept so it could ship the same day.
Deploying earlier builds a site where the article is still hidden by its date.

---

## 5. Content pipeline

| Step | How |
|---|---|
| Hero image | `media-gen` skill, model key `nano-banana-pro` (API id `nano-banana-2`), 16:9, short label in a brand-teal block. **View every image** — AI invents garbled text on paper and screens |
| Site WebP | 1600×900 → `public/images/articles/<slug>.webp` |
| Email JPEG | `node scripts/email-images.mjs <slug>` → `public/images/email/<slug>.jpg`. **Never WebP in email** — Outlook on Windows cannot render it |
| Originals | `source-assets/generated/<date>-<batch>/` (media-gen writes to the Change Studio folder by default — move them) |
| Frontmatter | `image:` + `imageAlt:` — the email reuses the alt text |

House image style: documentary photography, natural window light, shallow depth
of field, muted palette, real objects. **Never** AI-brain / glowing-circuit /
neon imagery — the brand argues against that aesthetic.

---

## 6. The Monday content brief — prompt rewritten, paste pending

It is a **Claude scheduled task** named *"Monday Content Ideas — weekly AI industry
brief"* (claude.ai → Scheduled tasks), every Monday 09:00, permissions Auto. It
emails `marcdaddy.business@gmail.com` and commits to `Marcdaddy1/research`. The
local scheduled-tasks tool cannot see it, so it can only be edited in that UI.

Marcus had already added "audience is SMB owners", "never state an AegeanPulse
practice" and "link to aegeanpulse.com". The 21 Sept brief still made factual
slips (renamed "restoration depth" to "layers", "credit" for "agent" prices,
invented rankings, a "Microsoft Research" affiliation, wrong date).

The full replacement prompt is in
`Claude Code Projects/workflows/monday-content-brief-prompt.md`. It adds: the real
package facts (Discovery £499, Builder £2,499, Growth Partner £799/month) as the
only AegeanPulse claims allowed; a per-idea **"Checked:"** line quoting the
source phrase behind every figure; and explicit rules on source terms, rankings,
affiliations and dates. **Open:** Marcus pastes it into the task (pencil icon),
then read the 28 Sept brief to confirm the "Checked" lines appear.

---

## 7. Hard-won lessons — each cost real time

- **Test iOS in WebKit, not Chrome.** A fractional `viewport.amount` left article
  bodies at `opacity: 0` forever on iOS while Chrome was fine. On iOS *every*
  browser is WebKit. Use Playwright `webkit` + `devices['iPhone 13']`.
- **The in-app browser pane, when hidden, freezes animations and
  IntersectionObserver.** Measurements taken there looked like bugs and weren't.
  Use headless Playwright for anything animation-related.
- **Measure, don't eyeball screenshots.** A `devicePixelRatio: 2` capture made a
  correct 560px card look broken.
- **Never paste multi-line PowerShell** into the terminal — PS 5.1 mangles long
  lines mid-paste, leaving variables unset and every call `401`. Use the scripts.
- **`Get-Content -Raw` is not a plain string** — it carries PSObject properties that
  `ConvertTo-Json` serialises. Use `[System.IO.File]::ReadAllText`.
- **Reach's DNS panel is unreliable in both directions** — said "active" while DKIM
  was missing, then "missing" while records were present. Check public DNS.
- **DNS got wiped once** (zone reset ~2026-09-10). Re-check with `reach.ps1 dns`
  before each send.
- **Reach cannot delete templates or campaigns.** Every correction leaves clutter.
  Use `-TemplateUuid` to reuse a template.
- **Reach duplicates are `200`, not `409/422`.** The adapter throws on any non-2xx.
- **Promotions tab ≠ spam.** Check `labelIds` before diagnosing deliverability.
- **Don't report deploy state from docs** — curl the live sitemap.
- **media-gen `model_id`s drift.** `nano-banana-pro` pointed at a display name and
  422'd; the working id is bare `nano-banana-2`. Verify against `createTask`.
- **Verify generated research before publishing it.** The Monday brief is
  AI-written; check the load-bearing numbers at the source.

---

## 8. Accounts and connectors

| Connector | Reaches | Notes |
|---|---|---|
| Direct Gmail (`mcp__ce803f87…`) | `aegeanpulse1@gmail.com` only | Where the Monday brief is *sent from* |
| Composio Gmail | both — `gmail_smith-aimore` = marcdaddy, `gmail_lamina-dode` = aegeanpulse1 | **Needs re-auth** as of 2026-09-26 |
| Hostinger API token (`.env.local`) | Reach only | **Cannot** manage DNS, VPS or mailboxes — returns "customer does not own aegeanpulse.com". The domain lives in a different Hostinger account |
| Hostinger MCP servers | intermittent | Frequently time out; fall back to `curl` against the REST API |

---

## 9. This session's work — 2026-09-26

Built from the Monday brief of 21 Sept (see §6). **All committed and pushed; none
of it is live until the deploy.**

| Deliverable | File | State |
|---|---|---|
| Article: *Why AI hasn't made your build quote cheaper* | `src/content/articles/why-ai-hasnt-made-your-build-quote-cheaper.md` | Done. Dated **2026-09-26** (moved from 29 Sept) |
| Hero image (label THE HARD PART) | `public/images/articles/…webp` (86KB), `public/images/email/…jpg` (64KB), original in `source-assets/generated/2026-09-26-article-heroes/` | Done |
| Newsletter Issue 03 | `drafts/issue-03.html` | Done. **Not yet in Reach** — create it only after the article is live |
| Social pack (LinkedIn, X, thread, Short) | `drafts/2026-09-26-social-build-quote.md` | Done. Post after the article is live |

**Facts in all three were checked against the sources on 2026-09-26** — and three
of the brief's claims were dropped because the sources don't support them:

- "No model cleared 50%" / "28.8% was second place" — the paper names two agents
  and their scores, nothing more.
- "Microsoft Research" — the arXiv page lists the authors but no affiliation.
- "HubSpot cut its credit prices" — the source says an April cut to **agent
  prices**. Issue 03 uses the source's wording.

The paper was submitted **16 Sept** (the brief said 17th).

## 10. End-of-session status — 2026-09-26

**Verified**

- `npm run build` and `npm run lint` pass.
- The new article is correctly **absent** from today's build (it was date-gated to 29 Sept at the time; since moved to 26 Sept).
- Issue 03 passes the email-client audit: MSO ghost table, viewport meta, one
  JPEG hero with width attribute and alt text, four eyebrows, `utm_campaign=issue-03`,
  no leftover Issue 02 copy. (The audit's "all links teal" check flags the hero's
  wrapper link — a false positive, it wraps an image, not text.)
- Every back-catalogue link in Issue 03 returns 200. The article URL and its email
  JPEG return 404 **as expected** until the deploy.

**Not verified — do on deploy day**

- The article page itself has not been rendered, because it is date-gated. After
  deploying, load it and run the iOS WebKit check (§7).
- Once live, re-check Issue 03's two new URLs return 200 before creating it in Reach.

**Known cosmetic flaws, accepted**

- New hero: the laptop calendar header reads "Maroet 2016". Tiny at any display
  size; regenerate for ~$0.06 if it bothers you.
- Customer-support hero: faint nonsense in a ticket-ID column.
- Workflows hero: "Fulfillment" is US spelling.

**Next session, in order:** deploy (26 Sept) → verify the article renders
(incl. iOS) → post the social pack → create Issue 03 in Reach with `reach.ps1 draft`
→ send Issue 02 first if it still hasn't gone, then Issue 03 a fortnight later.
