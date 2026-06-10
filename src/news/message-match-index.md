---
layout: layouts/article.njk
title: "We Scored 21 Top DTC Brands on Message Match. The Average Was 62/100."
date: 2026-06-10
author: Justin Aronstein
description: "We pulled live Meta ads from 21 of the best-known DTC brands and scored how well each landing page keeps the ad's promises. The average was 62 out of 100, and nine brands scored below 60."
inline_cta: experimentation
---

You can have a great ad and a great landing page and still lose the click in the half-second between them.

That half-second is where the visitor asks one question: *"Is this what I was just promised?"* When the answer is no (the discount code vanished, the claim isn't repeated, the page sells to everyone instead of the person the ad targeted), they bounce. Not because anything was bad. Because the **message broke**.

We call the discipline of keeping that promise **message match**, and we [built a scoring rubric for it](/news/the-post-click-audit-nobody-runs/). Then we pointed it at 21 of the best-known DTC brands in America and published the results as the [Message Match Index](https://throughline.mobile1st.com/index).

The average score was **62 out of 100**. Nine of the twenty-one scored below 60. The promises these brands spend millions putting in front of people are, on average, only about 60% kept by the pages those people land on.

## How we scored each brand

Everything in the index comes from public data, the same two things every shopper sees:

1. **The ads.** We pulled each brand's live Meta ads straight from the [Meta Ad Library](https://www.facebook.com/ads/library/): up to five active ads per brand, exactly as they're running today.
2. **The landing pages.** We followed each ad's destination link and captured the page the way a first-time visitor lands on it.

Then our scoring engine does something deliberately strict: it reads the ad first, *extracts every commitment the ad makes*, and only then looks at the page. The page is scored **blinded**, with no idea whose page it is or how it's "supposed" to do. Each commitment becomes a scored component:

| Component | The question it asks | Weight |
|---|---|---|
| **Primary promise** | Does the page hero deliver the specific benefit the ad led with? | 25 |
| **Offer / incentive** | Is the ad's offer visible with matching terms? | 20 |
| **Specific claim** | Are the numbers, features, or comparisons in the ad confirmed on the page? | 15 |
| **Offer constraint** | Is the ad's urgency, deadline, or redemption mechanic reinforced near the offer? | 10 |
| **Audience signal** | Does the page confirm the visitor is in the right place *for them*? | 10 |
| **CTA continuity** | Does the page's primary action match the action the ad invited? | 10 |
| **Tone / brand voice** | Does the page sound like the same brand as the ad? | 10 |
| **Trust signal** | Is the social proof or authority the ad leaned on confirmed on the page? | 10 |

Not every ad commits to every component (an ad with no discount can't fail on "offer"), so each ad is scored only on the promises it actually makes. The overall score is the share of promised points the page delivers, 0 to 100. Anything earning 70% or less of its possible points on a component is flagged as a **gap**.

Two details make the rubric hard to game.

**The creative outweighs the caption.** A claim that only lives in body copy the visitor may never read counts for a fraction of a claim carried by the image or video itself. If your video promises "30-day results" out loud, the page is on the hook for it.

**Video and image claims count.** We transcribe spoken claims in video ads and read text printed on image creatives, so brands don't get credit for pages that match the caption but ignore what the creative actually says.

A brand's index score is the average across its scored ads. Each brand's page on the index shows the full component-by-component breakdown for its richest ad, including the rationale for every point lost.

## What we found

**The spread is enormous.** Quince leads at **85**. Fabletics sits at **37**. The median is 64. Six brands, including household names like Rothy's, OLIPOP, and Fabletics, scored below 50. Great advertising and great message match are clearly different skills.

**The thing brands do best: the button.** CTA continuity scored **92%** across every ad we graded. If the ad says "Shop now," the page almost always lets you shop. The mechanical part of the funnel is solved.

**The thing brands do worst: everything they said *before* the button.**

**Offer constraints delivered at just 43%.** The urgency mechanics ads lean on (deadlines, code-at-checkout instructions, minimum-spend tiers) usually evaporate on the page. Magic Spoon's ad offered *"$5 off any order, or $10 off orders $63+ with code TREATSVIP"*; the landing page showed a subscription discount and a free bowl set instead. A completely different deal. Vuori's ad told visitors to *apply the code emailed to you at checkout*; the page contained no code, no email mechanic, no mention of the offer at all.

**Primary promises delivered at 58%.** The single benefit the ad led with is barely half-kept. Mejuri ran an ad promising *"guaranteed compliments wherever you go"*; the landing page is a standard product page with zero aspirational copy. The emotional hook that won the click is abandoned at the door.

**Audience signals broke for 16 of 21 brands.** Ads that call out *who the product is for* ("parents of young children," "for serious home cooks") usually land on pages that sell to everyone.

**Specific claims went missing constantly (16 of 21 brands).** Jones Road's ad says *free from sulfates, parabens, and phthalates*; the page never mentions any of the three. Hiya ran ads for a greens powder with *"55 whole-food ingredients"* that pointed at... a probiotic product page where no greens powder exists.

**The deeper pattern: ad-page pairing, not page quality.** The most brutal scores came from ads pointed at the *wrong* page: a sleep-product ad landing on a probiotic PDP, a tiered-discount ad landing on a subscription pitch. The page is fine. The match is broken. This is an org-chart problem. The media team ships ads, the site team ships pages, and nobody owns the half-second between them.

*(Methodology honesty: 28 brands went into the run; 7 were excluded for data-quality reasons, including destination links that were bot-blocked or Meta-owned, a landing page that hangs automated browsers, a page that serves visitors a full-screen cookie wall, and four brands whose public Ad Library lookups returned a different advertiser than the brand itself. Every exclusion is documented, and no brand was scored on data we couldn't stand behind.)*

## Why this matters for your CAC

Every gap the rubric finds is a place where money you already spent on the click gets thrown away by the page. If your ads promise something your page doesn't repeat, you're paying full price for half a message. Message match isn't a branding nicety. It's the cheapest conversion lever most teams haven't touched, because it sits *between* two teams and neither owns it.

## See where you'd rank

The same engine that built the index runs as a free, self-serve analysis. Give it your Facebook page and you'll get your live ads, your landing pages, your score, and the exact components where your message breaks, in about two minutes.

**[Run your free message match analysis →](https://throughline.mobile1st.com/demo)**

---

*Methodology notes: ads sourced from the public Meta Ad Library on June 10, 2026; landing pages captured at scoring time; scoring performed by Throughline's blinded component rubric (no human adjustment). Scores are a point-in-time snapshot and will be refreshed as campaigns change. Brands shown are not customers and did not participate; all creative shown is their own public advertising.*
