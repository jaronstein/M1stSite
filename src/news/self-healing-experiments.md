---
layout: layouts/article.njk
title: "Why Doesn't Every A/B Testing Tool Tell You When Your Test Stopped Running?"
date: 2026-09-16
author: Justin Aronstein
description: "Most testing tools assume 100% of intended visitors actually saw the variant. On real client accounts, over half of serving selectors were pinned to something the page rotates on every publish."
---

We didn't set out to build an A/B testing platform. Throughline CR exists to fix landing pages: pull in your ad campaigns, rebuild the page to actually match what the ad promised, let you approve the change. The testing layer was a means to an end. We needed to prove our rebuilds worked, and setting that up by hand in an existing testing tool, for every ad, every day, while the underlying pages kept changing on us, wasn't realistic. So we built our own.

Along the way we ran into a problem that had nothing to do with statistics and everything to do with plumbing. Our changes kept silently breaking.

The idea wasn't wrong. The page had moved out from under it: a theme update rotated an element's ID, a new app changed how a section rendered, a developer pushed something unrelated to a totally different part of the site. Whatever the cause, the code we'd written to find an element and change it could no longer find what it was looking for. And nothing about that showed up anywhere. The test kept running, the dashboard kept showing a clean split, and zero percent of visitors were actually seeing the variant.

## Every tool assumes the variant keeps landing

Open any A/B testing platform and you'll see the same report: visitors, conversions, lift, confidence. What you won't see, anywhere, is the answer to a more basic question: of the people you intended to show this variant to, how many actually saw it?

That number is assumed to be 100%. It almost never is, and nothing tells you when it isn't.

Sites change constantly: a platform update, a new app installed, a developer's unrelated commit, a redesign of one section. Any of those can quietly sever the connection between the change you defined and the change actually rendering, and when it happens, the experiment doesn't fail loudly, it fails by going quiet. The test keeps collecting data, the data keeps looking normal, and everyone downstream (the analyst, the growth lead, the exec reading the readout) treats a null result as proof the idea didn't work. The honest answer is that nobody knows, because the test stopped serving three weeks ago.

We measured this on our own production traffic. Across a sample of live rebuilds, roughly a third of everything actually serving on real pages had lost the labels needed to tell which specific change was doing what, so our first attempt at a detector was flying blind on two-thirds of what mattered. Once we could see clearly, a separate check found that on a typical account, over half of all serving selectors were pinned to something the underlying page platform rotates on every publish. One theme republish, one afternoon, and a dozen live experiments go dark at once, with the reporting dashboard none the wiser.

That's the mechanism by which any client-side experiment can rot, on any platform, with any tool. We happened to be forced to look directly at it, because proving the change is real is the entire business.

## What we built instead

We built a health monitor into the testing layer itself: for every individual change inside a test, what fraction of intended visitors actually got it.

Every change we ship gets tagged. When it runs in a real visitor's browser, it reports back one of a few outcomes: applied cleanly, applied but late, found and then overwritten by something else on the page, or never found at all. We aggregate that per change, per test, continuously. If a change that should be reaching 95%+ of eligible visitors drops below a threshold, we know before anyone has to notice a strange-looking readout. The repair loop matches that logic: a first, deterministic pass that tries to re-locate the element using something sturdier than whatever broke, and only escalates to a full regeneration of the change if that fails. Retries are capped, so a permanently broken anchor doesn't burn effort every hour forever.

The part that actually took the work was refusing to let silence read as success. It would have been easy to ship a dashboard that shows 0% when there's no data and call it finished. We had to decide, explicitly, that no signal is not the same as no problem. A test with zero visitors this week and a test serving to zero percent of the visitors it has needs to render differently on the page, or the whole exercise is pointless.

## Why this isn't already standard

Most testing tools are built by people solving the statistics problem: sample size, significance, sequential testing, priors. That's genuinely hard, and it's worth solving. But it all assumes the treatment reached the person you meant to treat. Almost nobody instruments the boring layer underneath: did the DOM query still find the thing? Did the change apply before the visitor scrolled past it? Did some other script on the page overwrite it half a second later?

Testing vendors know pages change. What they haven't built is the machinery to check, for each individual change, whether it survived contact with a real page today. That's a different engineering problem than measuring whether a delta is statistically significant, and most tools were built to answer the second question.

We built it because we had no choice. If a client asks why conversion didn't move on a change we shipped, "the test ran cleanly" isn't an acceptable answer when the honest one is "the test stopped applying to anyone eleven days ago." The tool had to be able to tell on itself.

## How to build this into what you're doing

You don't need a testing platform to apply the idea. It generalizes to almost any system where you deploy something and then trust, rather than verify, that it kept working.

The first question to ask is whether something running and something working are actually the same thing in your system, because most monitoring treats them as identical when they aren't. A job that didn't throw an error gets marked healthy by default. That's an inference, not a measurement, and the fix is to build an independent check for the actual outcome you care about.

Then find the seam most likely to break without telling you, which usually isn't the one that's easiest to watch. For us that's a CSS selector reaching into someone else's DOM: the single most fragile point in the whole pipeline, and one that fails silently by design, since a missing element just does nothing rather than throwing. Your equivalent might be an API field a vendor can quietly remove, a config value someone forgets to set, or a scheduled job that's been logging "success" for weeks while its input sits empty.

Whatever you build, silence needs its own visible state. Zero isn't the same as unmeasured, and no errors isn't the same as healthy. A dashboard that can't tell "nothing happened because there's nothing to report" apart from "nothing happened because it's broken" will eventually get read the wrong way, at the worst possible time.

If you can fix drift before you alert on it, do that first and page a human second. Most breakage in a system like this has a mechanical fix, and burning someone's attention on a problem the system could have solved itself is a real cost: the next alert gets a little less trust. Just cap the retries. A self-healing loop with no ceiling on attempts is only a quieter way to waste resources on something it can never actually fix.

None of this is exotic, it's the same instinct behind health checks, synthetic monitoring, and canary deployments, pointed at a narrower and less glamorous claim: that the thing you shipped is still doing what you built it to do, today, for the person actually using it. Most tools stop at confirming the deploy went through. We only built ours because we couldn't afford the gap between that and the truth.
