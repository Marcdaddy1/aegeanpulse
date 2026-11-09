---
title: "Write your AI agent's limits before you switch it on"
category: "Agents"
summary: "American Express and ServiceNow both shipped controls for AI agents in the same week, and neither led with what an agent can do. Here are the six questions a small business can answer on one page this afternoon."
date: "2026-10-23"
readingTime: 6
featured: false
image: "/images/articles/ai-agent-permissions-before-you-switch-it-on.webp"
imageAlt: "A printed one-page agent rulebook clipped to a clipboard, with a spending limit and a short list of actions that need a human"
draft: false
ctaHeading: "Not sure where your agent's limits should sit?"
ctaText: "Bring the job you're thinking of handing to an agent, and I'll help you decide what it should never be allowed to do."
skipTo:
  heading: "The one-page version for a small business"
  label: "Skip to the six questions"
bookBarFrom: "Why the limits have to be checked while it runs"
leadMagnet:
  title: "Get the agent rulebook (printable)"
  description: "The six questions on one page you print and fill in, plus a second page with the refund agent filled in. Free with the newsletter: practical AI guides for small businesses, no spam, unsubscribe anytime."
  file: "/downloads/agent-rulebook.pdf"
  label: "Download the rulebook (PDF)"
  pointer: "Get a blank copy to fill in, plus this example"
  preview: "/images/lead-magnets/agent-rulebook-page-1.jpg"
  successNote: "Page 2 has the refund agent filled in, so you can see what a finished one looks like."
  previewAlt: "Page 1 of the agent rulebook: six numbered questions with lines to write your answers on, and a three-item launch checklist"
---

Every pitch for an AI agent shows you the same thing: the agent doing something impressive on its own. It answers the customer, books the appointment, issues the refund. Nobody demos the agent being told no.

In the middle of October, two very large companies did exactly that. Within two days of each other, American Express and ServiceNow announced systems for AI agents, and neither one led with what an agent can do. Both led with what it isn't allowed to do. If the companies with the most to lose start there, the agent you're about to point at your inbox or your invoices deserves the same treatment.

## What American Express built

On 13 October, American Express introduced what it calls the Intent Intelligence Framework. It is aimed at a specific problem: an AI agent buying something on a customer's behalf that the customer never actually agreed to.

Before the agent buys anything, the system records what the customer asked for and the limits that came with it, such as which shop, the maximum budget and any product preferences. The customer confirms who they are and signs off on that record. The agent is then given a token that carries those limits, and it uses that token at checkout instead of the customer's real card number. If the agent strays outside what was agreed, American Express can stop the payment going through.

American Express says it hasn't yet seen a rise in disputes caused by agents buying things. That's worth noting honestly: it tells you the problem hasn't arrived at scale yet, not that this design has been proven to solve it.

## What ServiceNow built

Two days later, on 15 October, ServiceNow announced AI Passport. Where American Express is protecting shoppers, ServiceNow is protecting businesses from their own agents.

An AI Passport is a signed digital credential that records who an agent is and what it is allowed to do. The important part is when the check happens. Permissions aren't just set once at the start; they are checked while the agent is working.

ServiceNow's own demonstration made the point with refunds. A customer service agent was set up to handle refunds under £20. A £14 refund went straight through. A £30 refund was stopped mid-run, because it was over the limit that requires a person to review it. (The demo was in dollars: $25, $18 and $40. These are the rounded pound equivalents.)

ServiceNow also described the other half: pausing an agent, restricting it, and switching it off entirely by withdrawing its credentials, with the option to restore it later once the reason is written down. AI Passport isn't available yet; ServiceNow says it arrives later this quarter.

## The lesson is the order, not the products

You don't need either product. Most small businesses will never touch them. What's worth copying is the order these companies worked in.

Both decided the limits first and the abilities second. Most small-business AI projects run the other way round. The first question is "can it reply to my emails?" or "can it chase my invoices?", and the question of what it must never do gets asked after something has gone wrong.

That's not because owners are careless. It's because the demo that sells an agent is always the agent succeeding. Nobody books a call after watching an agent refuse to send an email.

## The one-page version for a small business

Everything in both announcements has a cheap manual equivalent. Before any agent goes live, write one page for it that answers six questions.

1. **What can it read?** Name the inbox, the folder, the spreadsheet. "Our email" is not an answer; "the support inbox, not the directors' inboxes" is.
2. **What can it change or send?** Drafting a reply and sending one are different permissions. So are reading an invoice and marking it paid.
3. **What can it spend or give away?** Put a number on it. A refund limit, a discount limit, a maximum order value. If the honest answer is "nothing", write that down too.
4. **What must it hand to a person?** This is your version of the £30 refund. Complaints, anything legal, any customer who asks for a human, anything over the limit.
5. **Who gets told?** When the agent hands something over, or does something unusual, a named person should hear about it the same day.
6. **How do you switch it off?** One person, one action, written down, and tested before launch rather than discovered during a bad afternoon.

Here's one filled in.

> Example: an online shop's refund agent
> **Can read:** the orders inbox and order history.
> **Can send:** refund confirmations only. Any other reply is a draft for the owner.
> **Can refund:** up to £25, on orders under 30 days old.
> **Hands to the owner:** anything larger or older.
> **Who's told:** the owner gets a daily summary.
> **Off switch:** anyone on the team can pause it from the dashboard.

That's six lines, one per question, and it covers most of what could go wrong.

## Why the limits have to be checked while it runs

The subtle part of ServiceNow's demo is that the £30 refund wasn't blocked when the agent was set up. It was blocked at the moment the agent tried to do it.

A limit that only exists in a setup screen is a hope. A limit the system checks every time the agent acts is a control. When you're choosing tools or a builder, ask which kind you're getting. If the answer is "the agent has been told not to", that's an instruction, not a limit, and instructions can be misread.

## What to do this week

If you already have an agent running, write its one-page scope today and compare it with what the agent can actually reach. The gap between the two is your risk.

If you're about to switch one on, write the page first. It takes an afternoon and costs nothing, and it will change which jobs you're comfortable handing over.

If you'd like a second pair of eyes, my Discovery package is a flat £499 and includes a risk, data and readiness assessment, so the limits get decided before anything is built.
