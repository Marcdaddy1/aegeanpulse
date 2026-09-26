---
title: "Why AI hasn't made your build quote cheaper"
category: "Small Business"
summary: "AI can write code now, so why hasn't the price of building software collapsed? A new benchmark shows exactly where coding agents fall down — and it's where the real cost of a project lives."
date: "2026-09-26"
readingTime: 6
featured: false
image: "/images/articles/why-ai-hasnt-made-your-build-quote-cheaper.webp"
imageAlt: "A laptop showing a tidy booking form beside a notebook crammed with hand-written edge cases"
draft: false
---

If you've asked anyone to build software for you this year, you've probably had the same thought at some point: AI writes the code now, so why is this quote the size it is? It's a fair question. The demos are genuinely impressive. You can describe an app in a paragraph and watch a working screen appear a minute later.

A research benchmark published on 16 September gives the clearest answer yet, and it isn't the one either side of the argument usually reaches for. AI coding agents aren't useless, and they aren't about to replace the people who build software. They're very good at one specific part of the job and surprisingly poor at another. The cost of a project lives almost entirely in the second part.

## What the test actually measured

The benchmark is called ProgramDistill (arXiv 2609.18805). Most coding tests hand an AI agent a clear written specification and check whether it follows it. This one does something closer to real life: it gives the agent a working web application and asks it to work out how that application behaves, then rebuild the missing pieces.

That matters because it's what a real brief looks like. When you ask someone to build you a booking system, you don't hand over a precise technical spec. You describe how you want it to work, often by pointing at something that already exists. The builder has to infer the rest.

The researchers built 4,063 tasks from 1,975 verified behaviours across 26 real applications, and tested nine leading coding agents against them. When asked to rebuild whole applications, two of the leading agents, GPT-6 Astra and Claude Opus 5, completed 49.2% and 28.8% of the workflows respectively. That is state-of-the-art technology, completing somewhere between a quarter and a half of the job.

## The finding that matters is the drop-off

The headline scores aren't the interesting part. What happens as the job gets deeper is.

The researchers also tested partial reconstruction: take a working application, remove part of it, and ask the agent to put it back. They varied how much had to be restored, on a scale from one to eight. At the shallow end, the two agents succeeded 100% and 96% of the time. At the deep end, those figures fell to 64% and 32%.

Read that carefully, because it's the whole story. Put back a small piece of a working system and AI is nearly flawless. Ask it to restore a larger, more interconnected part and its success rate falls away steeply, in one case by two thirds.

## What that looks like on a real project

Take a booking form for a small service business. Ask an AI agent to build it and you'll have something that looks finished in twenty minutes: a calendar, a list of time slots, a confirmation screen. That part is now genuinely cheap, and anyone who tells you otherwise is overcharging.

Now ask what happens when two customers book the same slot at the same moment. When someone cancels an hour before and wants a refund. When a customer in another timezone books what they think is 9am. When somebody doesn't turn up and you want to charge a no-show fee. When the booking needs to land in your calendar, your invoicing and your customer records at once, and one of those systems is briefly unavailable.

None of that shows up in the demo. All of it shows up in your first busy week. And every one of those cases depends on several parts of the system agreeing with each other — which is exactly the kind of work the benchmark found agents struggle to hold together.

The screen got cheap. What happens behind it didn't.

## Why this matters for what you pay

If you're comparing quotes, this changes what you should be looking for.

A quote priced by the number of screens or pages was already a rough measure. It's now actively misleading, because AI has made screens nearly free while leaving the hard part untouched. A builder who prices by screen will either underquote the difficult job and cut corners to survive it, or overcharge for simple work.

The better question to ask any builder is what happens when things go wrong. How does the system handle the double booking, the failed payment, the half-finished order? A good answer to that question is worth more than a low number at the bottom of the page.

This is why we price our Builder package as one complete workflow rather than a list of features. A workflow isn't finished when the screens exist. It's finished when it survives the busy week, the awkward customer and the system that goes down at the wrong moment. That's the part you're paying for, and the part AI hasn't made cheap.

## Where AI genuinely does save you money

None of this is an argument against using AI to build. It's an argument for using it where it's strong.

Scaffolding the first working version of something is dramatically faster than it was two years ago. So is converting data from one format to another, writing the tests that check whether things work, drafting the first attempt at connecting two systems, and producing the repetitive code that used to eat days. A builder who isn't using AI for those jobs is costing you money.

The saving is real. It's just concentrated at the start of a project, on the parts that were never the expensive bit. What it hasn't touched is the judgement about how a system should behave when reality doesn't match the demo.

## What to do with this

When you get a quote for an AI-assisted build, don't ask why it isn't cheaper now that AI writes code. Ask the builder to walk you through what happens when something goes wrong. The answer tells you whether they've priced the easy part or the whole job.

And if you're not yet sure what's worth building at all, start there instead. Our Discovery package is a flat £499 and ends with a prioritised plan rather than a proposal — including the option of not building anything yet. Book a free 20-minute call at cal.com/aegeanpulse/ai-strategy-consultation and we'll give you a straight answer on whether your idea is a twenty-minute build or a three-week one.
