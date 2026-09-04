<#
.SYNOPSIS
  Hostinger Reach status and campaign helper for aegeanpulse.com.

.DESCRIPTION
  Exists so nothing has to be pasted into the terminal as multiple lines.
  Pasting a multi-line block into Windows PowerShell 5.1 can corrupt lines
  mid-paste (long lines with quotes and @{} are the usual casualties), which
  silently leaves $h unset and every call comes back 401 Unauthorized.
  One file, one short command, no session state.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 status
  powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 dns
  powershell -ExecutionPolicy Bypass -File .\scripts\reach.ps1 stats
#>
[CmdletBinding()]
param(
    [ValidateSet('status', 'dns', 'contacts', 'campaigns', 'stats', 'draft')]
    [string]$Action = 'status',

    # draft only
    [string]$Html,
    [string]$Title,
    [string]$Subject,
    [string]$Preheader,
    [string]$From = 'marcus@aegeanpulse.com',
    [string]$FromName = 'Marcus at AegeanPulse'
)

$ErrorActionPreference = 'Stop'

$ProfileUuid = 'b3bd9869-f69b-11f0-9166-42010a7501e7'
$ApiBase     = 'https://developers.hostinger.com/api/reach/v1'

# --- token -----------------------------------------------------------------
# Read from .env.local (gitignored). Resolved relative to this script, so the
# working directory does not matter.
$envPath = Join-Path (Split-Path $PSScriptRoot -Parent) '.env.local'
if (-not (Test-Path $envPath)) {
    throw ".env.local not found at $envPath"
}
$line = Get-Content $envPath | Select-String '^HOSTINGER_API_TOKEN='
if (-not $line) {
    throw "HOSTINGER_API_TOKEN is not set in $envPath"
}
$token = (($line -split '=', 2)[1]).Trim().Trim('"')
if ([string]::IsNullOrWhiteSpace($token)) {
    throw "HOSTINGER_API_TOKEN in $envPath is empty"
}

$headers = @{ Authorization = "Bearer $token" }

function Invoke-Reach {
    param([string]$Path)
    try {
        Invoke-RestMethod -Uri "$ApiBase/profiles/$ProfileUuid/$Path" -Headers $headers
    } catch {
        $code = $null
        if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        if ($code -eq 401) {
            throw "401 Unauthorized - the API token was rejected. Rotate it in hPanel (API -> tokens) and update .env.local."
        }
        throw "Reach request failed ($Path): $($_.Exception.Message)"
    }
}

switch ($Action) {

    'status' {
        $lim = Invoke-Reach 'limits'
        $dns = Invoke-Reach 'domains/dns-status'
        $dom = Invoke-Reach 'domains'
        $con = Invoke-Reach 'contacts?per_page=1'

        # subscribers_limit (the list cap) lives on the order, not the profile.
        $order = Invoke-RestMethod -Uri "$ApiBase/profiles" -Headers $headers
        $SubscriberCap = $order[0].limits.subscribers_limit

        Write-Host ''
        Write-Host '  Reach - aegeanpulse.com' -ForegroundColor Cyan
        Write-Host '  ----------------------------------------------'

        # List size comes from the contacts endpoint. limits.recipients is a
        # MONTHLY quota of people emailed, not the size of the list - they are
        # different numbers and conflating them reports 0 subscribers.
        $listSize  = $con.meta.total
        $sendsLeft = if ($listSize -gt 0) {
            [math]::Min(
                [math]::Floor($lim.emails.remaining / $listSize),
                [math]::Floor($lim.recipients.remaining / $listSize)
            )
        } else { '-' }

        Write-Host ("  sending domain : {0} ({1})" -f $dom.domain, $dom.status)
        Write-Host ("  subscribers    : {0} of {1} (list cap)" -f $listSize, $SubscriberCap)
        Write-Host ("  emails left    : {0} of {1} this month" -f $lim.emails.remaining, $lim.emails.limit)
        Write-Host ("  recipients left: {0} of {1} this month" -f $lim.recipients.remaining, $lim.recipients.limit)
        Write-Host ("  sends left     : {0} at the current list size" -f $sendsLeft)
        Write-Host ("  period ends    : {0}" -f $lim.period_end)

        foreach ($k in 'mx', 'spf', 'dkim', 'dmarc') {
            $ok = [bool]($dns.$k.actual)
            $colour = if ($ok) { 'Green' } else { 'Red' }
            Write-Host ("  {0,-15}: {1}" -f $k.ToUpper(), $(if ($ok) { 'OK' } else { 'MISSING' })) -ForegroundColor $colour
        }

        # The list cap is what silently breaks signups - warn before it bites.
        $slotsLeft = $SubscriberCap - $listSize
        if ($slotsLeft -le 10) {
            Write-Host ''
            Write-Host ("  WARNING: only {0} subscriber slots left. New signups will start failing." -f $slotsLeft) -ForegroundColor Yellow
        }
        Write-Host ''
    }

    'dns' {
        $dns = Invoke-Reach 'domains/dns-status'
        foreach ($k in 'mx', 'spf', 'dkim', 'dmarc') {
            $actual = $dns.$k.actual
            Write-Host ("{0,-6}: {1}" -f $k.ToUpper(), $(if ($actual) { 'OK' } else { 'MISSING' }))
            foreach ($r in $actual) { Write-Host ("        {0}" -f $r.value) }
            if (-not $actual) {
                foreach ($r in $dns.$k.suggested) {
                    Write-Host ("        add {0} {1} -> {2}" -f $r.type, $r.name, $r.value) -ForegroundColor Yellow
                }
            }
        }
    }

    'contacts' {
        $c = Invoke-Reach 'contacts?per_page=100'
        Write-Host ("total: {0}" -f $c.meta.total)
        $c.data | Select-Object email, subscription_status, subscribed_at | Format-Table -AutoSize
    }

    'campaigns' {
        $c = Invoke-Reach 'campaigns?per_page=25'
        if ($c.meta.total -eq 0) { Write-Host 'No campaigns yet.'; break }
        $c.data | Select-Object title, subject, status, created_at | Format-Table -AutoSize
    }

    'draft' {
        # Creates the template and the draft campaign. Deliberately stops
        # there: the API cannot set an audience or send, so the last step is
        # always a human opening the draft in reach.hostinger.com.
        foreach ($req in 'Html', 'Title', 'Subject') {
            if (-not $PSBoundParameters.ContainsKey($req)) { throw "-$req is required for 'draft'" }
        }
        if (-not (Test-Path $Html)) { throw "HTML file not found: $Html" }

        $body = @{
            title            = $Title
            template_content = (Get-Content $Html -Raw)
        } | ConvertTo-Json -Depth 4

        $tpl = Invoke-RestMethod -Method Post -Uri "$ApiBase/profiles/$ProfileUuid/templates" `
            -Headers $headers -ContentType 'application/json' -Body $body
        Write-Host ("template created: {0}" -f $tpl.uuid) -ForegroundColor Green

        $meta = @{ source = 'api' }
        if ($Preheader) { $meta.preheader = $Preheader }

        $body = @{
            sender_name   = $FromName
            sender_email  = $From
            title         = $Title
            subject       = $Subject
            template_uuid = $tpl.uuid
            metadata      = $meta
        } | ConvertTo-Json -Depth 4

        $camp = Invoke-RestMethod -Method Post -Uri "$ApiBase/profiles/$ProfileUuid/campaigns" `
            -Headers $headers -ContentType 'application/json' -Body $body
        Write-Host ("draft campaign created: {0}" -f $camp.uuid) -ForegroundColor Green
        Write-Host ''
        Write-Host '  Next: open reach.hostinger.com, pick the audience, send.' -ForegroundColor Cyan
    }

    'stats' {
        $c = Invoke-Reach 'campaigns?status=publish&per_page=25'
        if ($c.meta.total -eq 0) { Write-Host 'No sent campaigns yet.'; break }
        foreach ($camp in $c.data) {
            $s = Invoke-Reach "campaigns/$($camp.uuid)/statistics"
            Write-Host ''
            Write-Host ("  {0}" -f $camp.title) -ForegroundColor Cyan
            $s | Format-List
        }
    }
}
