---
layout: layouts/article.njk
title: "How to start running tests today with the help of AI"
date: 2026-05-06
author: Justin Aronstein
description: "A step-by-step playbook for building an evidence-backed experimentation program using Claude, Microsoft Clarity, GA4, and customer voice — no agency required."
inline_cta: experimentation
---

*(Why I'm all in on personalization)*

---

Let's get the obvious out of the way.

AI is powerful. Genuinely, absurdly powerful. It can process more information, hold more variables, and make more connections than any human alive. That is not hype. That is just math.

But here is the thing nobody is saying: **AI is only as useful as the context you give it.**

Right now, you still have to be the one asking the right questions. You still have to bring the data. You still have to know enough to know what you're looking for.

That will probably change in the next few years. But today, the e-commerce manager who wins is the one who learns how to use AI as a thinking partner, not just a search engine.

This guide is for you if:

* You know you should be running experiments, but you don't know where to start
* You've thought about hiring an optimization agency, but the budget isn't there yet
* You suspect your product page is leaking revenue, but you can't prove it

You might actually not need an agency. You might just need Claude.

Here's exactly how I'd run an experimentation program if I were starting from scratch today.

---

## First, a quick framework you need to understand

Not all evidence is created equal.

At Mobile1st, we use something called the **Hierarchy of Insights**. [You can read the full breakdown here.](https://mobile1st.com/news/hierarchy-of-insights) The short version:

* **Heuristics** (expert opinion, best practices, research): useful, but the weakest signal
* **User Behavior Analysis** (scroll maps, click data, session recordings): stronger
* **User Research** (real conversations with real customers): stronger still
* **Experiment Results** (actual A/B test data from your site): the strongest signal of all

Most brands stop at heuristics. They read a blog post, make a change, and call it optimization.

The goal of this workflow is to stack all four layers, so when you launch an experiment, it's backed by evidence, not just instinct.

Let's build the stack.

---

## Step 1: Start with a heuristic audit

Before you touch your data, audit your pages against a research-backed framework.

I'd start with your **product detail page (PDP)**. Almost every single visitor who buys something will land on a PDP. Fix problems there first, then work up to category pages and your homepage.

I built a [22-tactic PDP audit](https://mobile1st.com/pdp-audit) sourced from Baymard Institute, Nielsen Norman Group, and Shopify platform data. You can use mine or build your own. The tactics are organized by impact tier (Very High, High, Medium, Low) so you know where to focus first.

Here's how to run it with Claude:

1. Open Claude. Paste in the audit framework.
2. Give it your product page URL (or screenshots).
3. Ask it to score the page across all 22 tactics.

You'll get a scorecard, a letter grade, and a ranked list of fixes. In about two minutes.

Will it catch everything? No. Heuristics never do. But it will surface the obvious problems fast. Missing in-scale imagery. No sticky add-to-cart on mobile. Shipping cost buried in the footer. The stuff that's clearly broken.

This is your starting list. Not your final list.

---

## Step 2: Layer in real user behavior

Heuristics tell you what *should* matter. Behavior data tells you what's *actually* happening on your specific site, with your specific customers.

If you haven't set up [Microsoft Clarity](https://clarity.microsoft.com) yet, do it today. It's free. It records sessions, generates heatmaps, and surfaces scroll depth and click data automatically.

Once you have it connected, hook up the Clarity MCP to Claude and start asking questions:

* "Where do visitors stop scrolling on this product page?"
* "What's the click rate on the Add to Cart button versus the image gallery?"
* "Are visitors rage-clicking anywhere on this page?"
* "What percentage of visitors see the reviews section?"

You're not looking for answers yet. You're looking for questions worth asking.

If 70% of your visitors never scroll past the hero image, your above-fold value prop is the problem. Not the upsell widget below the fold that you've been obsessing over. Behavior data keeps you honest.

---

## Step 3: Pull your GA4 event data

If you've got custom events set up in GA4, this is where things get interesting.

Hook up the GA4 MCP and ask Claude to help you find patterns in your event data:

* "What's the drop-off rate between product page views and add-to-cart events?"
* "Which traffic sources have the highest add-to-cart rate but the lowest purchase rate?"
* "Is there a difference in behavior between mobile and desktop visitors?"

Even with basic GA4 tracking, you'll start to see where the funnel breaks. That's the data you need.

If you don't have events set up yet, that's okay. Start simple. Add an `add_to_cart` event and a `purchase` event. Even those two will tell you a lot.

---

## Step 4: Bring in your customer voice

This is the step most brands skip. It's also the step that separates good experimentation programs from great ones.

Two sources of customer voice:

**Post-purchase reviews.** You have them. You're probably not mining them. Take your last 100 reviews, paste them into Claude, and ask: "What are the most common concerns customers had before purchasing? What almost stopped them from buying?"

The answers will surprise you. Customers will tell you exactly what objection your PDP failed to address.

**User research.** I know. Nobody has time. But even five 20-minute conversations with real customers per month will give you more signal than 10,000 rows of behavioral data. Ask them to walk you through how they shop your category. Record it. Bring the transcript to Claude.

AI cannot replace this. The nuance in a customer saying "I wasn't sure if it would fit my lifestyle" is not something a heatmap will ever show you. This is the part where you still have to be human.

---

## Step 5: Build your experiment roadmap

Now you have four layers of evidence. Time to put them together.

Take everything (your audit results, your behavior insights, your GA4 data, your customer voice) and bring it all into a single Claude conversation. Then ask:

> "Based on everything I've shared, build me a prioritized experimentation roadmap. Rank experiments by estimated revenue impact. Weight experiments higher if they're supported by multiple evidence sources, especially user research and behavior data."

You'll get a ranked list of experiments, each with a hypothesis and a rationale.

This is not a gut-feel list. This is evidence-backed prioritization. Every experiment on the list exists because multiple data sources pointed to the same problem.

That's the difference between optimization theater and a real program.

---

## Step 6: Write the code

"But Justin, I don't know how to code."

It's 2026. Anyone can write code.

Take your top hypothesis from Step 5. Bring it back to Claude with your page URL and say:

> "Here's my hypothesis: [paste it]. Please write the JavaScript and CSS to create this variation that I can use in my A/B testing software."

Most A/B testing platforms (Optimizely, VWO, Convert, AB Tasty, and the Google Optimize alternatives) all work essentially the same way. You paste custom code into a visual editor, set your traffic split, and launch.

Claude will write the code. You paste it in. You don't need to understand every line. You need to understand the hypothesis.

---

## Step 7: Launch and let it run

This part requires patience.

Do not look at the results for two weeks. I mean it. Statistical significance takes time, and peeking early is how you make bad decisions and convince yourself bad tests are good.

Set a minimum runtime of **two weeks**. Ideally three. Let it breathe.

---

## Step 8: Interpret the results

When the test is done, take a screenshot of your results dashboard and bring it to Claude.

Ask: "Here are my results. Was this statistically significant? What does this tell me about visitor behavior? Should I call a winner, extend the test, or kill it?"

Claude will walk you through the math and give you a clear recommendation.

---

## Step 9: Update your roadmap

Here's the part everyone misses.

Experiment results are not just wins or losses. They are information. Every test teaches you something about your customer.

Go back to your experiment roadmap. Share the results with Claude and say:

> "Here are the results from this experiment. Here are my previous hypotheses. Please re-rank my priority list based on what we learned."

Your roadmap should be a living document. Every experiment makes the next one smarter.

This is the compounding effect that agencies charge you a lot of money for. You're building institutional knowledge about your customer with every test you run.

---

## Step 10: Grab a coffee

Seriously.

You just ran an evidence-backed experiment, built on heuristic analysis, behavior data, GA4 events, and customer voice. You interpreted the results. You updated your roadmap.

That is an experimentation program.

Not a one-time optimization. Not a "we changed the button color and called it a day." A real, repeatable system.

You built it with a free AI tool and some patience.

---

## One more thing: what happens after your experiments start winning

Once you're running experiments and the data starts compounding, you'll hit a new question.

Your experiments are telling you what works on your site. But what about the traffic coming in from Meta ads? Those visitors don't arrive cold. They clicked something specific. They saw a specific message. And then they land on a generic page that has no idea what they just saw.

That gap between the ad and the page is where a lot of revenue disappears quietly.

It's called the relevance gap. And it's the next frontier after experimentation.

[Throughline](https://throughline.mobile1st.com) is how we solve it. It's a Shopify app that reads the Meta ad a visitor clicked and dynamically updates the landing page to match. Same product. Different headline, value prop, and imagery based on what brought them there.

If your experiments are working and your paid traffic still isn't converting the way it should, that's usually why.

Check it out at [throughline.mobile1st.com](https://throughline.mobile1st.com).
