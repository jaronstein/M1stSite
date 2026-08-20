---
layout: layouts/article.njk
title: "Mend The Gap: The Hierarchy of Message Match"
date: 2026-08-19
author: Justin Aronstein
description: "Message match isn't one thing you either do or don't. It's five things in a fixed order, and most teams are working on the rung that matters least."
og_image: "https://mobile1st.com/img/message-match-hierarchy.png"
inline_cta: personalization
---

Ask ten ecommerce teams whether they do message match and ten will say yes. Ask what they actually did and you'll hear the same answer: they put the ad's headline in the H1.

That definition has been circulating since about 2012, and it has done more damage than ignoring the idea entirely would have, because it's small enough to finish. You copy the headline into the hero, you tick the box, you move on, and you now believe the problem is solved. The visitor who clicked your ad is still confused, and you've lost the vocabulary to say why.

A click is a promise. Somebody watched fifteen seconds of your creative, believed a specific thing about what was on the other side, and paid you with their attention. The landing page either continues that promise or changes the subject. Headline-matching is one way to continue it, and not the most important one.

We've written twice before about the [message-match gap](/news/the-message-match-gap/) and about [scoring 21 DTC brands on it](/news/message-match-index/). Both pieces broke an ad into the promises it makes and asked whether the page carries each one. What neither said is that those promises are **ranked**, and that the ranking is the most useful thing about them.

Mind the gap.

## The ladder

![The Hierarchy of Message Match: five rungs, The Promise at the base, then The Offer, The Claim, The Terms and The Voice at the apex](/img/message-match-hierarchy.png)

Read it as a stack, not a list. Each rung only counts when everything under it is true. A page with perfect tonal continuity and no promise is not eighty percent of the way there. It's a page that sounds like your ad while selling something else, which is worse than a mismatch a visitor can name.

Rungs 4 and 5 each bundle several things, so don't try to add the ladder up. And the score is a ratio of what a given ad actually carries, so the denominator moves from ad to ad. There's no hundred-point total to reconcile.

The weights, per component, are these. Primary promise is worth 25. The offer is worth 20. A specific claim is worth 15. Everything left over — constraints, audience signal, CTA continuity, tone, proof — is worth 10.

Every team I talk to is sure their problem is trust. They want more reviews above the fold, another press logo bar, a bigger guarantee badge. Proof is worth 10. The promise is worth 25. The thing they're certain about is the thing that matters least, and I've never once had that conversation go smoothly.

These are the weights we run in production, and we audited them against 298 real ad-to-page messages to find out where the rubric was lying to us. It was. There was an entire class of message we couldn't represent, social proof and endorsements, and it had been getting force-fit into "specific claim" 45 times. So social proof became its own component with its own weight. That's what an audit is for.

Three brands, three rungs. Every score below comes from a live capture of the page on 19 August 2026.

## Rung 1: OLIPOP

<span class="mm-verdict mm-verdict--bad">Promise dropped</span>

<div class="mm-compare">
  <div>
    <p class="mm-compare__label">The ad</p>
    <div class="mm-compare__frame"><img src="/img/message-match-olipop-ad.jpg" alt="OLIPOP ad: an illustrated Blackberry Vanilla can sitting among vanilla blossoms and blackberries"></div>
  </div>
  <div>
    <p class="mm-compare__label">The page it links to</p>
    <div class="mm-compare__browser-bar"><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__url">drinkolipop.com</span></div>
    <div class="mm-compare__frame"><img src="/img/message-match-olipop-page.jpg" alt="OLIPOP homepage hero reading Real ingredients. Real refreshment. Real digestive health support."></div>
  </div>
</div>
<p class="mm-compare__caption">A returning fan-favorite flavor, landing on a homepage about digestive health. The word "back" appears nowhere.</p>

OLIPOP started running this ad on 1 May, headlined *Flavor in full bloom*. Blackberry Vanilla is back after years away. The creative earns that headline literally: an illustrated can sitting in vanilla blossoms and blackberries, purple and cream, closer to a botanical print than a soda ad. If you're an OLIPOP drinker who remembers that flavor, this is a reunion, and every part of the ad plays it that way.

The click landed on the homepage, whose hero reads "Real ingredients. Real refreshment. Real digestive health support."

The promise scored **8 out of 25**. Blackberry Vanilla is on the page, purchasable, sitting in a product grid alongside twenty other flavors. The claim that it was gone for years scored a flat **0 out of 15**: nowhere does the page acknowledge that it went away, that it came back, or that anyone missed it. The audience signal, the returning fan the ad is speaking to, scored **4 out of 10**.

The page does carry a "Limited" badge, and it's on Pineapple Paradise. Scarcity framing exists on that page. It just isn't pointed at the flavor the ad is about.

The ad sold a reunion in vanilla blossoms. The page sold fiber.

This is the most common failure I see and the least discussed, because it doesn't look like a mistake in a spreadsheet. The traffic arrived. The product was available for purchase. Every dashboard says this worked.

## Rung 2: Magic Spoon

<span class="mm-verdict mm-verdict--bad">Offer dropped</span>

<div class="mm-compare">
  <div>
    <p class="mm-compare__label">The ad</p>
    <div class="mm-compare__frame"><img src="/img/message-match-magicspoon-ad.jpg" alt="Magic Spoon ad: a still from a talking-head video, a man at a kitchen counter"></div>
  </div>
  <div>
    <p class="mm-compare__label">The page it links to</p>
    <div class="mm-compare__browser-bar"><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__url">magicspoon.com/…/custom-mixed-bundle-6-box</span></div>
    <div class="mm-compare__frame"><img src="/img/message-match-magicspoon-page.jpg" alt="Magic Spoon bundle builder page showing a subscription discount, with no promo code anywhere"></div>
  </div>
</div>
<p class="mm-compare__caption">The ad's whole headline is a promo code. The page has never heard of it, and offers a subscription discount instead.</p>

Magic Spoon has been running this ad since 30 April, and its headline is the offer: *Code TREATSVIP to save*. Five dollars off any order, ten dollars off orders over sixty-three.

The landing page did not mention the code when we captured it, nearly four months later. Not five dollars off, not ten dollars off, not the sixty-three dollar threshold. It offered a subscription discount and a free bowl set.

Offer: **0 out of 20**. Offer constraint: **0 out of 10**.

Notice what the creative shows, too: a man at a kitchen counter. No product, no text, no code. The offer lives entirely in the ad's copy, which is worth remembering the next time someone audits message match by looking at the images.

I like this example because you can feel it without knowing anything about optimization. Your visitor is standing at the register holding a coupon, and the store has never heard of it. Whatever they do next, they're doing it while quietly downgrading their estimate of how much attention you pay.

Rung 2 is also the cheapest rung on the ladder to hold. Nobody has to rebuild a hero to put a promo code on a page. It fails constantly anyway, because the ad was made by the team running the promotion and the page was made by the team running the site, and the promotion has an end date nobody told the page about.

## Rung 3: Hiya Health

<span class="mm-verdict mm-verdict--bad">Claims dropped</span>

<div class="mm-compare">
  <div>
    <p class="mm-compare__label">The page it links to</p>
    <div class="mm-compare__browser-bar"><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__url">hiyahealth.com/products/kids-daily-probiotic</span></div>
    <div class="mm-compare__frame"><img src="/img/message-match-hiya-page.jpg" alt="Hiya Health Kids Daily Probiotic product page"></div>
  </div>
</div>
<p class="mm-compare__caption">One ad for four products, landing on one of them. The ad's creative is no longer retrievable — it stopped running, and Meta keeps no inactive ads for this page — so its wording is quoted below verbatim.</p>

I'll print the whole readout for this one so you can check our work. Hiya ran this ad from 17 March, and its copy covers the product line:

> Multivitamin: 15+ essential vitamins and minerals for complete nutrition
>
> Probiotics: Nurture their gut health and strengthen their immune system
>
> Bedtime Essentials: Support restful sleep without melatonin

The click landed on the Kids Daily Probiotic page.

| Rung | Score | On the page |
|---|---|---|
| 1 · promise | 10/25 | One probiotic product page, not the whole line |
| 3 · claim | 5/15 | "15+ vitamins," mid-page, about the multivitamin |
| 3 · claim | **0/15** | Greens powder's 55 ingredients: absent |
| 3 · claim | 11/15 | No sugar, no gummy additives, non-GMO: above fold |
| 3 · claim | **0/15** | Sleep without melatonin: absent |
| 3 · claim | 15/15 | Pediatrician-backed, delivered fresh: carried |
| 4 · audience | 9/10 | Parents of kids two to twelve, throughout |
| 5 · proof | 6/10 | 6,861 reviews; the ad claims hundreds of thousands |
| 5 · CTA | 10/10 | "Try Now" / "Add To Cart" matches "Shop now" |

Overall: 51.

Two flat zeros, both of them absences. A parent who clicked that ad because their kid won't sleep arrives on a probiotic page, and the word melatonin never appears.

Look at what the page does well, though, because it's the more useful lesson. Three components score 11 or better. The page is good. It's answering a different ad.

The fix isn't subtle either. If one ad sets up four products, either the ad points somewhere that holds four products or the page answers all four. Picking one and hoping is a coin flip you're paying Meta to run.

## The message that never arrived

Not every message in an ad reaches a human being. A claim spoken out loud in a video reaches them. A claim printed across the creative reaches them. A claim sitting in the fourth line of Instagram body copy, under a "See more" fold, in a feed being thumbed at speed, does not.

So we floor text-only components to a fifth of their weight. You can watch it happen in the data: a specific claim carried by the creative is worth 15, and the same claim living only in text is worth 3. That has happened to 41 real claims in our corpus. A primary promise drops from 25 to 5. An offer drops from 20 to 4.

Which means you have been auditing the wrong artifact. Your ad copy document is not your ad. Nobody read it. If you want the list of messages your page has to answer, open the ad, watch the video with the sound on, and write down what it claims out loud and what it shows on screen. That list is shorter than your copy doc and it's the only one that binds.

Here's what that exercise turns up.

<div class="mm-compare">
  <div>
    <p class="mm-compare__label">The ad</p>
    <div class="mm-compare__frame"><img src="/img/message-match-cuts-ad.jpg" alt="Cuts video ad: a man holding up the Icon Cropped Pant"></div>
  </div>
  <div>
    <p class="mm-compare__label">The page it links to</p>
    <div class="mm-compare__browser-bar"><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__dot"></span><span class="mm-compare__url">cutsclothing.com/products/icon-pull-on-pant</span></div>
    <div class="mm-compare__frame"><img src="/img/message-match-cuts-page.jpg" alt="Cuts Icon Pull-On Pant product page"></div>
  </div>
</div>
<p class="mm-compare__caption">The urgency in this ad is spoken, not written. It exists in no copy document, so nothing on the page answers it.</p>

Cuts runs a video ad for a pant, and the last thing the presenter says is *better grab them now before they sell out going into spring*. That's a scarcity claim and a seasonal deadline, and it exists nowhere except in the audio. It isn't in the ad's text, so it isn't in any copy doc, so nobody put it on the page. The page has no stock counter, no low-stock notice, no seasonal availability, nothing. That component scored **1 out of 10**.

When we first scored that ad from its text alone, the urgency claim wasn't in the list at all, because as far as the text was concerned it was never made. Transcribing the audio didn't change the page's overall score. It changed which rungs were failing.

## Said, but buried

A message can also fail to arrive by being on the page in a place nobody who clicked that ad will reach.

Take that same Cuts ad. Its case for the product is a fabric called Enduratech, and in the video the presenter says it looks like denim but is better. On the product page, that claim scored **9 out of 15**. Enduratech is named, mid-page, next to badges for four-way stretch and softness and a fibre breakdown of 52% poly, 38% cotton, 10% spandex. The comparison the ad actually makes, that this replaces your jeans, is not there.

Hiya's fifteen essential vitamins: **5 out of 15**. Present, in a mid-page comparison table, describing a product that isn't the one you landed on.

Both are technically covered. If you sent either page to the brand team and asked whether they mention it, they'd point at it and be right, and the visitor still wouldn't have seen it.

Which gives a message two ways to fail to arrive. It was never said, or it was said where the arriving visitor won't get to it. Both produce a person who came for one specific thing and now has to hunt for evidence that they're in the right place. Most of them don't hunt.

This is why "we already say that on the page" isn't a defense. Position is part of the claim.

## Where to actually start

Severity and sequence are different questions, and the ladder only answers the first.

The promise is worth 25, and fixing it usually means rebuilding a hero, which means design time and somebody's sign-off. CTA continuity is worth 10 and takes an afternoon. So the first thing you fix is often not the most damaging thing, which is fine as long as you know which one you did. Rank by weight over effort, ship the cheap ones this week, and don't let three quick top-rung wins convince you the base is sound.

While we're on the subject of being careful with numbers: we have a test showing a 31% conversion lift. It rests on twenty-five conversions in total, with a p-value of 0.49, and at that page's traffic it would take years to reach statistical power. That's a coin flip with a nice number attached. I'm not going to show it to you as a result, and you shouldn't accept one shaped like it from anybody else.

## What mending it looks like

A golf equipment brand, scored on the same rubric. The ad promises premium equipment from a legendary player's line, designed specifically for women golfers, and it lands on a partnership page.

| Rung | Before | After |
|---|---|---|
| 1 · promise | 12/25 | 24/25 |
| 3 · claim | 7/15 | 14/15 |
| 4 · terms | 4/10 | 8/10 |
| 5 · voice | 7/10 | 8/10 |

54 to 90, with every gap the diagnosis identified closed.

That's a scored rebuild, not a served one. The page moved from telling a general partnership story to answering the specific promise that ad made to a specific woman who clicked it. Whether it produces revenue is a question I'll answer when a test of ours actually reaches power.

## Mend the gap

We scored this ladder by hand for two years before we automated it. The automation is called Throughline. It reads your ads, video and creative included, works out which messages your landing page misses, and rebuilds the page to close them.

If you want to see where your own pages sit on the ladder, [email me your five highest-spend ads](mailto:justin@mobile1st.com?subject=Score%20my%20ads%20on%20the%20message%20match%20ladder) and I'll send back the readout, rung by rung, with the gaps named. You can also see how the biggest DTC brands rank on the [Message Match Index](https://throughline.mobile1st.com/index).

## How these were scored

Every number here comes from one scoring pass per ad-page pair, run on 19 August 2026. Each ad's messages were extracted from its creative, copy and CTA, then a page captured live that day was scored against them, component by component, blind — the scorer is never told whether a page is an original or a rebuild.

Ad start dates are the Ad Library's, and the gaps described here had all been in place for months by the time we captured the pages: Cuts since January, Hiya since March, Magic Spoon and OLIPOP since the end of April. Whether those ads are still in rotation today we don't know, and it doesn't change what the pairs show.

The Cuts ad's audio was transcribed and scored, which is where the spoken urgency claim comes from. One limitation: the Magic Spoon ad also carries video, and its file is no longer retrievable, so that pair was scored on text and imagery alone. A spoken claim would not appear in its component list, which can only understate its gaps, never invent one. Its two flat zeros are an absent promo code, which no amount of audio would put on the page. Hiya's ad, the one whose full scorecard is printed above, is static, so nothing was missed there.
