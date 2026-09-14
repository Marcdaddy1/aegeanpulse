# Reach config snapshot — 2026-09-14, before disconnect/reconnect

Captured so the working setup can be rebuilt if the reconnect flow does not
restore it. Profile UUID `b3bd9869-f69b-11f0-9166-42010a7501e7`.

## Reach sending domain (before disconnect)

```json
{"domain":"mail.aegeanpulse.com","status":"active","created_at":"2025-08-29T13:45:36Z","updated_at":"2026-09-14T17:49:04Z","suspended_sender_emails":[]}
```

## DNS — apex aegeanpulse.com

| Record | Value |
|---|---|
| SPF | `v=spf1 include:_spf.mail.hostinger.com include:_spf.reach.hostinger.com ~all` |
| DKIM reach-a | `reach-a.dkim.reach.hostinger.com` |
| DKIM reach-b | `reach-b.dkim.reach.hostinger.com` |
| DMARC | `v=DMARC1; p=none; rua=mailto:contact@aegeanpulse.com` |
| MX | `mx2.hostinger.com mx1.hostinger.com ` |

## DNS — subdomain mail.aegeanpulse.com

| Record | Value |
|---|---|
| SPF | `v=spf1 include:_spf.reach.hostinger.com ~all` |
| DKIM reach-a | `reach-a.dkim.reach.hostinger.com` |
| DKIM reach-b | `reach-b.dkim.reach.hostinger.com` |
| DMARC | `v=DMARC1; p=none;` |
| MX | `mx2.hostinger.com mx1.hostinger.com ` |

## Reach assets that must survive the reconnect

| Asset | Count / detail |
|---|---|
| Contacts | 2 |
| Templates | Issue 01 v2 - projects never ship (SEND THIS ONE), Issue 01 - projects never ship |
| Draft campaigns | Issue 01 v2 - projects never ship (SEND THIS ONE), Issue 01 - projects never ship |
| Monthly quota used | 2 of 200 emails |

## After reconnecting — verify with

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 status
```

Contacts, templates and campaigns are profile-level, not domain-level, so they
should survive. Check the counts above against `status` and `campaigns` after.
