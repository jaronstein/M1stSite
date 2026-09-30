---
layout: layouts/article.njk
title: "Your 20% Off Ad Lands on a Page Where Two Products Are 20% Off"
date: 2026-09-30T12:00:00
author: Justin Aronstein
description: "When a sale ad lands on a category page with full-price products in the first rows, shoppers assume the ad was bait, and a year of Meta ad data shows how much that gap costs."
---

A shopper sees an ad for up to 20% off appliances. She's been meaning to replace the dishwasher, so she taps it. The page loads: the appliance category, 48 products in a grid, sorted the way the merchandising team sorted it last quarter. The first row is full price. So is the second. She scrolls a little, sees nothing marked down, decides the ad was bait, and leaves.

The ad was true. There were qualifying products on that page. Two of them, in row six.

When I was at LivingDirect, before Build.com bought us, we fought this constantly. The design team would make a great sale banner for a real promotion, and the banner would point at a page where only some of the products applied. Keeping the two in sync was close to impossible. The sale changed on marketing's calendar, the grid got re-sorted on the site team's, and the page drifted away from what the banner said.

Nobody was careless. The creative team owns the banner, the site team owns the page, and merchandising owns the sort order. Each group did good work, and the shopper still landed on a page that made the ad look dishonest. I've since seen the same thing on retailer sites, distributor sites, and DTC brands with fifteen products. The bigger the catalog, the worse it gets.

## "Up to" is a promise about the first screen

Retailers run compliance checks on sale claims. Is there a minimum number of qualifying products? Is the discount real? Those checks are good. None of them ask where the qualifying products appear on the page.

"Up to 20% off" is technically true if one product on page three qualifies. For the shopper it's only true if she sees it in the first few seconds, because she clicked expecting the thing you told her about. When the first screen shows full-price dishwashers, she assumes you misled her. She doesn't go looking for row six. You paid for that click and the page wasted it.

## Why nobody fixes it

The category page serves more than the sale ad. It gets organic search traffic, email traffic, and returning customers who never saw the promotion. Re-sorting it for the sale changes it for all of them, and the merchant who owns the page has good reasons to say no.

Timing makes it worse. Promotions are planned weeks ahead and change often, while category pages get updated on the site team's schedule. By the time someone files a ticket to move the sale products up, the sale is half over.

And the gap between the banner and the page belongs to no one. The banner team thinks the page is the site team's job, the site team thinks the promotion is marketing's job, and it stays broken.

## Let the page rearrange itself for the click

The fix is letting the page respond to where the visitor came from. A better ad won't do it, and neither will a new landing page for every promotion.

When someone clicks the 20% off ad, the products that are 20% off belong in the first row, badged so she can tell at a glance they match what she clicked. The headline should say what the ad said. The rest of the page stays as it is, and anyone who didn't click that ad sees the page exactly the way the merchant built it. The merchant keeps their page, and the site team never gets a ticket.

## Why the first screen matters this much

We looked at a year of Meta product-extension ads for three of our clients. These are the ads that show a row of products under the main image, so a shopper can tap a specific product instead of the ad itself. The two paths land on different pages. Tapping a product lands on that product. Tapping the ad lands wherever the ad points.

For a golf apparel brand, shoppers who tapped a product converted at 5.8%. Shoppers who tapped the ad converted at 2.1%. For a men's apparel brand the gap was wider: 14.2% against 2.3%. Order values were the same on both paths, so the difference was entirely whether people bought. The third client sells one hero product, and there the product row didn't help, which makes sense: when there's only one thing to buy, every page already shows it.

Same ads, same audiences, same days. The shoppers who landed on exactly what they tapped bought roughly three to six times as often. That's the size of the gap a sale ad opens when its first screen shows the wrong products.

## How Throughline closes it

We built Throughline for this problem. It starts by reading the ad the way a shopper would: the headline, the body copy, the text on the image, and what's said in the video. From that it pulls out what the ad promised, such as the discount, the products it showed, and who it was talking to.

Then it reads the landing page and scores how well the page delivers each of those promises. A sale ad that lands on a full-price first row scores low on the offer. The changes it proposes go after the promises the page misses and leave the rest alone. On a product grid that usually means moving the products the ad featured or discounted into the first row, badging them so they match the ad, and putting the ad's own headline above the grid. The copy comes from the ad. Throughline doesn't write new claims, so a merchant never finds a promise on their page that marketing didn't already approve.

A person on your team approves every change before it goes live. Once it's live, the change reaches only visitors whose click carries that ad's ID. Someone arriving from search, email, or a bookmark sees the page the merchant built. Nothing in your site's code changes, so there's no ticket for the site team. A single line of script on the page asks our edge server whether this visitor came from an ad with an approved change, and applies it if so.

Pages change underneath you, which was the part we could never keep up with at LivingDirect. Throughline rechecks every live change against the real page every hour. When the site team re-sorts the grid or ships a new layout, the change is repaired, or flagged for review if it can't be.

When Throughline mends the gaps between the ad and the landing page, we increase conversion rate and RPV by over 25%. Reach out to see what Throughline CR can do for you.

