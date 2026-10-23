---
title: "Write your AI agent's limits before you switch it on"
category: "Agents"
summary: "American Express and ServiceNow both shipped controls for AI agents in the same week, and neither led with what an agent can do. Here's the one-page version a small business can write this afternoon."
date: "2026-10-23"
readingTime: 6
featured: false
image: "/images/articles/ai-agent-permissions-before-you-switch-it-on.webp"
imageAlt: "A printed one-page agent rulebook clipped to a clipboard, with a spending limit and a short list of actions that need a human"
draft: false
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

ServiceNow's own demonstration made the point with refunds. A customer service agent was set up to handle refunds under $25. An $18 refund went straight through. A $40 refund was stopped mid-run, because it was over the limit that requires a person to review it.

ServiceNow also described the other half: pausing an agent, restricting it, and switching it off entirely by withdrawing its credentials, with the option to restore it later once the reason is written down. AI Passport isn't available yet; ServiceNow says it arrives later this quarter.

## The lesson is the order, not the products

You don't need either product. Most small businesses will never touch them. What's worth copying is the order these companies worked in.

Both decided the limits first and the abilities second. Most small-business AI projects run the other way round. The first question is "can it reply to my emails?" or "can it chase my invoices?", and the question of what it must never do gets asked after something has gone wrong.

That's not because owners are careless. It's because the demo that sells an agent is always the agent succeeding. Nobody books a call after watching an agent refuse to send an email.

## The one-page version for a small business

Everything in both announcements has a cheap manual equivalent. Before any agent goes live, write one page for it that answers six questions.

What can it read? Name the inbox, the folder, the spreadsheet. "Our email" is not an answer; "the support inbox, not the directors' inboxes" is.

What can it change or send? Drafting a reply and sending one are different permissions. So are reading an invoice and marking it paid.

What can it spend or give away? Put a number on it. A refund limit, a discount limit, a maximum order value. If the honest answer is "nothing", write that down too.

What must it hand to a person? This is your version of the $40 refund. Complaints, anything legal, any customer who asks for a human, anything over the limit.

Who gets told? When the agent hands something over, or does something unusual, a named person should hear about it the same day.

How do you switch it off? One person, one action, written down, and tested before launch rather than discovered during a bad afternoon.

Here's what that looks like for an online shop's refund agent: it can read the orders inbox and order history, it can issue refunds up to £25 on orders under 30 days old, anything larger or older goes to the owner, the owner gets a daily summary, and anyone on the team can pause it from the dashboard. That's five lines, and it covers most of what could go wrong.

## Why the limits have to be checked while it runs

The subtle part of ServiceNow's demo is that the $40 refund wasn't blocked when the agent was set up. It was blocked at the moment the agent tried to do it.

A limit that only exists in a setup screen is a hope. A limit the system checks every time the agent acts is a control. When you're choosing tools or a builder, ask which kind you're getting. If the answer is "the agent has been told not to", that's an instruction, not a limit, and instructions can be misread.

## What to do this week

If you already have an agent running, write its one-page scope today and compare it with what the agent can actually reach. The gap between the two is your risk.

If you're about to switch one on, write the page first. It takes an afternoon and costs nothing, and it will change which jobs you're comfortable handing over.

If you'd like a second pair of eyes, our Discovery package is a flat £499 and includes a risk, data and readiness assessment, so the limits get decided before anything is built. Book a free 20-minute call at cal.com/aegeanpulse/ai-strategy-consultation and bring the job you're thinking of handing to an agent.
