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
| 1 | **Deploy** the "build quote" article + hero (see §4) | Committed, **not live** | Marcus (manual deploy) |
| 2 | **Send Issue 02** in Reach | Draft, **unsent** | Marcus (Reach UI) |
| 3 | **Post the social pack** for the new article | Written, in `drafts/` | Marcus |
| 4 | Create **Issue 03** in Reach — only after the article is live | HTML built, not in Reach | Next session |
| 5 | **Forwarder** for `marcus@mail.aegeanpulse.com` → real inbox | Not done | Marcus (hPanel) |
| 6 | **Fix the Monday brief generator's prompt** (§6) | Location unknown | Marcus to say where it runs |
| 7 | **Rotate** the Cal.com key and Hostinger API token (both pasted in chat months ago) | Not done | Marcus |

Order matters for 1 → 4: the article must be **live** before Issue 03 is sent,
because Issue 03's hero and first link both point at it.

---

## 2. What is live right now

Verify rather than trust this table — see §4 for the two curl checks.

| Thing | State |
|---|---|
| Site | aegeanpulse.com on Hostinger VPS `72.61.4.237`, Docker. Last build seen: **2026-09-22 07:06 UTC** |
| Articles | **17 live**, all with a hero image. An 18th (`why-ai-hasnt-made-your-build-quote-cheaper`) is committed and dated **2026-09-29** — invisible until a deploy on or after that date |
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

**For the 29 Sept article specifically:** deploy **on or after 2026-09-29**.
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

## 6. The Monday content brief — needs a prompt fix

A "Content ideas — week of …" email arrives Mondays ~09:30 from
`aegeanpulse1@gmail.com` to `marcdaddy.business@gmail.com`. It is **not** a local
scheduled task and is not in this repo — where it runs is unknown.

Its research is good (sources verified 2026-09-26). Its **copy is not safe to
publish as-is**:

1. It writes practices into Marcus's voice that are **not true** of AegeanPulse
   ("we quote on depth", "we pass consumption through at cost"). AegeanPulse sells
   fixed packages: Discovery £499, Builder £2,499, Growth Partner £799/month.
2. It writes for **agency peers**; AegeanPulse's buyers are **SMB owners**.
3. It links social posts to the **source**, not aegeanpulse.com.
4. It over-interprets sources (turned a paper's "restoration depth" into
   "layers of logic" and built a pricing method on it).

Add to its prompt: *"Audience is SMB owners. Never state an AegeanPulse practice
unless one is supplied. Link to aegeanpulse.com, not the source. Quote findings in
the source's own terms."*

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

Built from the Monday brief of 21 Sept (see §6):

| Deliverable | File | State |
|---|---|---|
| Article: *Why AI hasn't made your build quote cheaper* | `src/content/articles/why-ai-hasnt-made-your-build-quote-cheaper.md` | see status below |
| Hero image | `public/images/articles/…webp`, `public/images/email/…jpg` | see status below |
| Newsletter Issue 03 | `drafts/issue-03.html` | see status below |
| Social pack (LinkedIn, X, thread) | `drafts/2026-09-29-social-build-quote.md` | see status below |

_Status of the above is recorded at the end of the session in §10._

## 10. End-of-session status

_(filled in when the build finishes)_
