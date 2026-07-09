---
layout: layouts/article.njk
title: "How to Run a User Research Study"
date: 2026-07-08
author: Justin Aronstein
description: "AI made the diagnostic layer basically free, but it can't tell you how your customers feel. Here's how to run a user research study that gets the truth, step by step, with every quiet decision point that determines whether you walk away with insight or expensive noise."
---

<aside class="promo-callout">
  <p class="promo-callout__eyebrow">A promo for Throughline, the product we built</p>
  <p class="promo-callout__lead">I try to explain what we're working on in words below, but I think the 30 second video does a better job of it.</p>
  <figure class="promo-callout__video">
    <video controls preload="metadata" playsinline>
      <source src="/files/the-promise-vo.mp4" type="video/mp4">
      Your browser doesn't support embedded video. <a href="/files/the-promise-vo.mp4">Download the video</a>.
    </video>
  </figure>
  <p class="promo-callout__offer">If it's something you'd want to try, we'll set you up with a 30-day free trial.</p>
  <a class="promo-callout__cta" href="mailto:justin@mobile1st.com?subject=Throughline%2030-day%20trial">Email me at justin@mobile1st.com to start your free trial</a>
</aside>

---

## And now, to the blog.

*A step-by-step field guide — and every quiet decision point that determines whether you walk away with the truth or just expensive noise.*

---

You need to be running user research. Not "someday when we have bandwidth." Now.

Here's why I'm confident saying that, even though I don't know your business. In 2026, the diagnostic layer is basically free. AI can crawl your site and hand you a list of everything technically wrong with it — contrast failures, layout shifts, broken heuristics, missing labels. Your analytics can tell you *where* people fall off: which step of checkout leaks, which page has the ugly bounce rate, which plan card nobody clicks. Both of those things are real. Both are useful. Use them.

But neither of them can tell you the one thing that actually moves revenue: **how people feel about your product, and whether the way you explain it lands the way you think it does.**

Analytics tells you *that* someone left the pricing page. It will never tell you they left because they assumed the underlined feature names were clickable links, hovered, got nothing, and quietly decided the page felt broken. An AI audit will tell you your comparison matrix is "well-structured." It will never tell you that a customer did the add-on math in his head — "$15 plus $8 for call recording is $23, that's only ten bucks under Pro, might as well go Pro" — and talked himself into a different plan than the one you were steering him toward.

That information doesn't live in your codebase or your GA4. It lives inside a human's head. The only way to get it out is to talk to them.

And here's the part everyone racing to automate their way out of a conversation is missing: **in an AI world, talking to your customer is worth more, not less.** Everyone has the same audit tools now. Everyone can point Claude at a landing page. The heuristic checklist has been commoditized. What hasn't been commoditized is knowing — actually knowing, from their mouth — what your customer was afraid of, what almost stopped them, and what finally made them trust you enough to put in a credit card. That understanding is the last durable advantage, and it's the raw material for every relevant experience you'll ever build.

There's a second reason, and it's bigger. AI-human interaction is no longer a niche — it's becoming the interface. Your customers are already talking to chatbots, copilots, AI search, and agents inside your product and everywhere around it, and that behavior is only going one direction. Nobody has this figured out yet. How people actually feel about talking to an AI, when they trust its answer versus quietly route around it, where it delights them and where it makes them abandon — that is entirely uncharted, and it is precisely the kind of thing you can only learn by observing and researching real humans in the act. If you're going to build for AI-human interaction — and you are, whether you meant to or not — you have to study the interaction itself. We watched this happen in the Phone.com sessions: one participant said she'd sooner use the on-site chatbot than a general model like Gemini because she trusted it not to blend in everyone else's wrong information; another said he'd just "use AI to find out" what a feature meant rather than read the page. Those are AI-human interaction findings, and no amount of auditing your own site would surface them. The only way to build good AI experiences is to research how humans actually behave inside them.

And underneath all of it is the thing no model can do for you: **empathy.** Empathy is the core of research practice — not a soft add-on, the actual engine. It's the researcher's job to sit in another person's frustration, to feel the confusion of the underlined-link-that-isn't, to understand *why* a customer's trust broke and not just log *that* it did. AI can transcribe empathy's outputs; it cannot feel. And because meaningful, relevant, creative experiences — the ones that keep customers coming back — are built on genuinely understanding how people feel, UX research doesn't get automated away in an AI world. It becomes one of the few things that still has to be done by a human, for humans. That's not nostalgia. It's the whole reason the discipline survives.

So: talk to your customers. Here's how it's actually done.

Fair warning before you scroll. This is going to look simple. A few emails, a few calls, a spreadsheet of quotes. It is not simple. Every phase below contains a dozen forks, and the maddening thing about research is that the wrong fork doesn't announce itself — it quietly poisons everything downstream in a way you will not detect until you've shipped the wrong thing. I'll flag the forks as we go. To keep it concrete, I'll walk you through a study we recently ran on the Phone.com pricing page, start to finish.

---

## Step 0: Decide what you're answering — and how you'll answer it

Before you write a single email, you have to know what kind of question you have. Get this wrong and everything downstream is beautifully executed research aimed at the wrong target.

Two axes matter.

**Generative vs. evaluative.** Generative research asks *"what's going on here, what should we even build?"* Evaluative research asks *"here's a thing — does it work?"* You run these completely differently. Generative work is open, exploratory, and you shut up and listen. Evaluative work puts an artifact in front of someone and watches them struggle with it.

**Attitudinal vs. behavioral.** What people *say* and what people *do* are different data, and they routinely contradict each other. If you only ask people what they think, you'll get a tidy, confident, and frequently wrong story. The best studies capture both — ask about the experience, *then* watch them actually try to use the thing.

Our Phone.com study was deliberately a hybrid. The goal, in plain language: *understand what created enough confidence for a small business owner to trust Phone.com with their business and commit to a plan.* The first two-thirds of every session was attitudinal and generative — tell me the story of how you got here. The last third was evaluative and behavioral — here's the live pricing page, now show me what you'd actually do. One session, two modes, and the design of the whole thing flowed from that decision.

But knowing *what* you want to learn is only half of Step 0. The other half is choosing the *method* — and this is where a lot of otherwise-smart teams skip straight to "let's do some interviews" without asking whether interviews are even the right instrument for this intent. Moderated interviews, unmoderated usability tests, diary studies, surveys, card sorts, tree tests, contextual inquiry, A/B tests — each answers a different kind of question, and each one distorts the data in its own characteristic way. Method selection *is* research design. We chose moderated 1:1s for Phone.com specifically because we wanted the *why* behind a high-trust financial commitment, and only a live conversation lets you follow the thread when someone says something surprising. A survey would have given us scale and told us nothing about the moment a customer's confidence formed or broke.

And every method drags its own biases in the door. You don't get to avoid bias; you only get to know which ones you've signed up for and design against them. The big ones to name out loud:

- **Temporal bias.** Memory decays and, worse, it *reshapes* — people smooth a messy real experience into a clean story that never happened. It's the entire reason we required customers who'd signed up within the last 90 days. The further out you recruit, the more you're studying a reconstruction, not an experience.
- **Framing bias.** How you frame the study and each question changes the answer. Tell someone up front you're "improving the pricing page" and they'll dutifully find things wrong with the pricing page — even if their real problem was three steps later.
- **Question order bias.** Ask about price early and you've just told the participant that price is what matters here; every answer after that bends toward it. Sequence is a variable you're setting whether you think about it or not.
- **Social desirability bias.** People want to be liked by the friendly person on the call, so they soften criticism and inflate praise. Left undefused, it turns your whole study into flattery, and flattery is worthless data.

Different methods amplify different ones — an in-person session juices social desirability, a survey lets framing bias run wild with nobody there to catch the confusion, a diary study fights temporal bias but invites people to perform for the journal. Picking the method means picking your battles.

**Forks that shape everything after this:**
- Are you trying to *discover* a problem or *validate* a solution? (Different studies. Don't blend them by accident.)
- Do you want to know what people *believe*, what they *did*, or both?
- **Which method actually fits this intent** — and which biases does that method invite that you'll need to design against?
- What's the single sentence describing what you'll know at the end that you don't know now? If you can't write it, you're not ready to recruit.

---

## Step 1: Recruiting — the part that quietly kills most studies

Ask anyone who does this for a living where studies die, and they'll say recruiting. Not analysis, not moderation. Recruiting. It is unglamorous, it takes longer than you budgeted, and if you cut corners here nothing else matters, because you'll be interviewing the wrong people flawlessly.

The core question is: **who do you need to talk to, and how do you find enough of them without contaminating the sample?**

For Phone.com we wanted recent self-serve customers — people who'd been through the exact experience we were studying while it was still fresh. That single requirement generated a cascade of recruiting decisions. We reached out by email, offered an Amazon gift card in the $20–$50 range as a thank-you, and gave a one-click scheduling link. Then a follow-up to non-responders five to seven days later — because your first email will underperform and one nudge recovers a meaningful chunk of your sample.

Sounds mechanical. It isn't. Look at the decisions baked into that paragraph.

**Forks that shape everything after this:**
- **Incentive amount.** Too low and you get nobody, or worse, only people with nothing better to do. Too high and you attract professional study-takers who'll tell you whatever keeps the gift cards coming. The right number depends on how hard your segment is to reach and how much of their time you're asking for. A busy business owner is not a $10 conversation.
- **Recruit from your own customers or a panel?** Your customers give you real, relevant experience but they're biased toward people who *stayed*. Panels are faster but you're often paying for strangers pretending to fit your criteria.
- **Timing of the ask.** We required people who signed up *within the last 90 days.* Memory decays fast and it decays dishonestly — people don't forget, they *confabulate*, smoothing a messy real experience into a clean story that never happened. Ninety days is a judgment call balancing recall against sample size.
- **The follow-up.** One nudge, or three? Too few and your sample is tiny. Too many and you're annoying the exact people whose goodwill you need.

None of these has a "correct" answer written on a card somewhere. Each is a tradeoff, and each one silently tilts who ends up on your calls.

---

## Step 2: The screener — who you let in *is* your study

If recruiting is where studies die, the screener is where they get quietly compromised. A screener is the set of gate questions that decides who qualifies. It looks like a formality. It is actually the single highest-leverage document in the entire study, because **your findings can only ever be as good as the people you let into the room.**

Here's a taste of the logic we built into the Phone.com screener. Every one of these is a deliberate exclusion, and every exclusion is defensible for a specific reason:

- **"Who made the decision to sign up?"** If someone else at their company chose Phone.com, this person cannot tell you why the pricing page worked — they never evaluated it. They're disqualified. And a *joint* decision? We didn't auto-include or auto-exclude; we told the recruiter to use judgment and only continue if the person was actively involved in the evaluation. That's a human call, mid-screen, that a checkbox can't make.
- **"Did you sign up directly through the website?"** If they were set up by someone else, they didn't experience the flow we're studying. Out.
- **"How many people use your account?"** We capped it. A 40-seat deployment is a fundamentally different buyer than a solo operator, and mixing them muddies every theme.
- **A recruitment priority cascade.** Basic-plan customers were the primary target and got scheduled first. Only if we couldn't fill the Basic quota after two weeks would we open to Plus, and Pro was last. That ordering isn't bureaucracy — it's protecting the sample so the study answers the question we actually asked.

**Forks that shape everything after this:**
- Every criterion trades sample purity against how long recruiting takes. Tighten the screener and you get cleaner data more slowly; loosen it and you fill the calendar faster with people who blur your findings.
- **Watch for the participants who game the screener** — the ones who figure out which answer keeps them eligible and give it to you. A well-built screener disguises which answer is the "right" one.
- The prioritization logic is itself a design decision. Get the target segment wrong and you've run a perfect study about the wrong customer.

I want to be blunt about this one: most in-house teams write a three-question screener in ten minutes and wonder later why their findings feel mushy. It's because they let the wrong people in, and by the time you're staring at the transcripts, there is no undo.

---

## Step 3: The first three minutes — consent, framing, and defusing the bias you're about to introduce

You've got the right person on a Zoom call. Before you ask them anything of substance, the way you open the conversation determines the quality of every answer that follows. Most people wing this. You shouldn't.

A good intro script is doing several jobs at once, quietly:

- **Consent and recording, handled cleanly.** You explain the recording is internal-only, not for marketing, and you get a clear yes. Notice a subtle decision here: in our study, recording was *preferred but not required*. If someone declined, we still ran the session rather than lose a hard-won participant. That's a deliberate tradeoff — data richness vs. sample size — decided in advance so the moderator isn't improvising it live.
- **Lowering the stakes.** "Nothing you share today will affect your account or billing in any way." That single line removes a confound you might not have thought about: a customer who's worried that criticism will cost them will soften everything they say.
- **Killing social desirability bias before it starts.** The best framing we used: *"Honest reactions are more useful to us than positive ones. This is not a test."* People instinctively want to be nice to the friendly person on the call, and "nice" is worthless data. You have to actively give them permission to be negative, or they'll flatter your product straight into a bad decision.
- **Setting up the think-aloud.** You tell them, up front, that later you'll ask them to narrate their thoughts out loud — even the small or off-topic ones. Warming them into that habit early means they're actually good at it when it matters.

**Forks that shape everything after this:**
- How much do you tell them about what you're looking for? Too much and you've *primed* them — now they're hunting for the thing they think you want. Too little and they're disoriented. There's a narrow band of "just enough."
- Do you reveal that an agency, not Phone.com, is running the session? (We did — it subtly frees people to criticize the product without feeling like they're insulting you to your face.)
- Recording required or optional — and who decides in the moment if they hesitate?

---

## Step 4: The interview guide — how the questions are built, and why the order is everything

Now the actual questions. And here's where amateur research does the most damage, because writing questions *feels* like the easy part and it is the hardest.

The problem is that questions leak. A leading question — "Did you find the pricing page easy to use?" — hands the participant the answer you want and they'll take it, because it's the path of least resistance. You have to build questions that extract the real story without steering it.

Our Phone.com guide was structured as a funnel, wide to narrow, and the sequence was load-bearing:

1. **Context first.** *Tell me about your business.* Warm, easy, and it grounds everything that follows in who this person actually is.
2. **The trigger.** *What made you start looking for a phone system when you did? Was there a specific moment?* We're mining for the real event that kicked off the journey — not "I needed a phone" but the actual moment of pain. (For several participants it turned out to be wanting to separate business calls from personal ones. That's not a feature request; that's the emotional core of the purchase.)
3. **The decision process.** *Did you look at other options? What made you choose this one? What almost stopped you?* That last question — "what almost stopped you" — is gold. It surfaces the friction and the fear, the stuff that's invisible in analytics because those people either barely converted or bailed silently.
4. **The reveal, held until the end.** Only *now* do we show the live pricing page.

That ordering is not an accident, and it's the detail I'd most want you to steal: **we deliberately did not show anyone the pricing page until the final third of the session.** If you put the artifact in front of someone first, you've contaminated their whole story — everything they tell you afterward is shaped by staring at your design. By getting their unprompted journey *first* and the page reaction *second*, you get two clean datasets instead of one muddy one.

**Forks that shape everything after this:**
- **Open vs. closed questions.** Open questions get you stories; closed questions get you yes/no dead ends. Almost everything should be open.
- **Question order and priming.** Ask about price too early and you've told them price is what matters. Every early question frames the ones after it.
- **How hard do you probe?** "Tell me more about that" versus leading them somewhere. The line between good probing and putting words in their mouth is thin, and you cross it without noticing.
- **What you deliberately *don't* ask,** so you leave room for them to volunteer the thing you didn't know to look for.

---

## Step 5: The think-aloud — watching, not asking

The final section is a different skill entirely. You share your screen — or better, have *them* share theirs — put the real page in front of them, and ask them to narrate every thought while they use it. This is the behavioral half of the study, and it's the closest you'll get to watching the truth happen live.

The technique has a name and a pedigree — the think-aloud protocol comes out of decades of cognitive research on how to externalize what's happening in someone's head in real time. The discipline is this: you ask them to *do* something ("walk me through how you'd choose a plan if you were seeing this for the first time"), and then **you stay quiet and let them struggle.** The struggle is the data. Every instinct will scream at you to jump in and help. Don't. The moment they get stuck and don't know you're watching is the most valuable ten seconds of the entire study.

This is exactly the section that produced our sharpest findings on Phone.com — the ones no audit tool on earth would have surfaced:

- Multiple participants, independently, assumed the **underlined feature names were clickable links.** They tried to click. They tried to hover. Nothing happened, and the page briefly felt broken to them. No heuristic scanner flags "this text implies interactivity it doesn't have," because it's not a bug — it's a mismatch between the design's signal and a human's expectation. You only find it by watching a human expect the wrong thing.
- Participants did **add-on math out loud** — "Basic at $15, plus $8 for call recording, that's $23; Plus is $22.50, basically the same, so I'll just take Plus." That real-time mental arithmetic is the actual decision mechanism, and it was completely invisible in the funnel data.
- One returning customer narrated the exact moment his confidence *broke* — after signup, when an SMS setup required a carrier-registration step nobody had disclosed, and his personal and business numbers started "fighting each other." That's a retention risk hiding one step past the checkout event where every analytics dashboard stops looking.

**Forks that shape everything after this:**
- Do you give them a task ("choose a plan") or let them free-scroll first? (We did both — free scroll to capture first reactions, then a directed task.)
- How long do you let silence sit before you prompt? Too soon and you rescue them out of the finding; too late and they shut down.
- Their screen or yours? Theirs is more real but adds tech friction that can eat your session time.

---

## Step 6: Moderation — the invisible craft

Everything above is preparation. Moderation is the live performance, and it's where experience separates from enthusiasm. A good moderator is doing several things simultaneously, in real time, for thirty minutes: following the guide but knowing when to abandon it for a thread worth pulling; staying warm without being agreeable; hearing a throwaway comment and recognizing it as the most important thing said all session; and — hardest of all — keeping their own opinions, hopes, and body language completely out of it.

Your face is data to the participant. If you light up when they praise the design and flatten when they criticize it, you've trained them, mid-session, to praise. Neutrality is a skill, and it's exhausting.

There's no clean list for this one, because moderation is the part that genuinely doesn't reduce to a checklist. It's reps. It's the difference between a session that produces a quote you'll build a roadmap around and a session that produces forty minutes of politeness.

---

## Step 7: Synthesis — the discipline of not fooling yourself

You've run five interviews. You now have hours of transcript and a strong temptation to skim it, pull the three quotes that confirm what you already believed, and call it insight. That temptation is the enemy. Synthesis done right is a formal discipline designed to stop you from finding only what you went looking for.

The method is thematic coding, and the sequence matters:

1. **Raw data.** Every notable quote and observation, pulled verbatim, attributed to a participant. You work from their words, not your memory of their words.
2. **First-level codes — inductive, from the data up.** This is the non-negotiable rule and the one most people break: *codes come from what participants actually said, not from your hypotheses.* You are not checking boxes you drew in advance. You're letting the labels emerge from the transcripts. On Phone.com that produced codes like "pricing transparency as differentiator," "false interactivity signals," "add-on math narrows price gap," "social proof irrelevance." Some of those we expected. Several we did not — which is the entire point.
3. **Themes — patterns across people.** A code becomes a theme when it shows up across multiple participants. "Transparent self-serve pricing is the primary conversion driver." "Post-signup complexity is the primary retention risk — the pricing page isn't the problem, the setup after it is." That second one reframed the whole engagement: we came in to study a page and the data pointed a floor below it.

And then the piece of intellectual honesty that separates real research from theater: **directionality.** Every finding in our study was explicitly labeled *directional until confirmed across three or more participants.* Two people saying the same thing is a hypothesis, not a fact. We tracked what we *didn't* yet know in a running Open Questions list — is the post-signup SMS friction a pattern or just one person's bad week? Does outcome-framing land with less technically confident users? You state your uncertainty out loud instead of laundering two anecdotes into a confident recommendation.

**Forks that shape everything after this:**
- Code inductively (from the data) or deductively (against a pre-built framework)? Deductive is faster and will cheerfully confirm your existing beliefs. Inductive is slower and is the only way to be surprised.
- What's your bar for "this is a theme"? Set it too low and every stray comment becomes a mandate.
- How do you handle the finding that contradicts your favorite hypothesis? (You keep it. Especially that one.)
- How honestly do you represent sample size? Five interviews is directional. Anyone who hands you "customers want X" off five sessions with no caveat is selling you confidence they haven't earned.

---

## Where AI helps — and where it will confidently lie to you

Because this is 2026 and someone's already thinking it: *can't I just get AI to do all of this?*

Parts of it, genuinely yes, and you should. AI is excellent at transcription. It's a real accelerant on first-pass coding — feed it clean transcripts and it'll surface candidate codes fast. It can help screen recruits and draft your guide. It compresses the grunt work enormously.

Where I find it most valuable, though, is as a thinking partner *around* the work rather than a replacement for it. It's a genuinely good brainstorming collaborator for the craft decisions: give it your draft questions and it'll offer ten different ways to phrase the same thing so you can hear which one leads and which one opens. Ask it to reorder your guide and it'll surface a sequencing you hadn't considered. Prompt it to *"challenge my assumptions here"* or *"what am I not asking that I should be?"* and — when you explicitly invite the pushback — it's sharp at flagging the gap in your study design before you've spent your recruiting budget discovering it live. It's also excellent downstream: brainstorming which visualization actually fits a given shape of data, pressure-testing how to tell the story so the finding lands and doesn't drown, and — the one I lean on constantly — reframing the same insight for different stakeholders. The way you present a trust-breakdown finding to a design lead is not the way you present it to a CFO, and AI is a fast, tireless partner for working through that translation.

And then there's the line you cannot cross, which is the whole reason this article exists:

- **Synthetic users are not users.** The pitch that you can skip recruiting and just ask an AI to "role-play your customer" is seductive and wrong. A model will generate the *statistically average plausible answer* — the smooth, confabulated story — which is the exact thing real research exists to get *past*. It will never tell you it assumed the underlined text was clickable, because it never actually looked at your page with a human's expectations and got quietly annoyed.
- **AI summarization flattens the outlier,** and the outlier is frequently the finding. Ask a model to summarize five interviews and it'll regress toward the consensus. The single participant who narrated the exact moment his trust broke gets averaged into a bullet point and lost.
- **AI will hand your bias back to you, dressed as insight.** Prompt it toward the conclusion you want and it will oblige, fluently and with citations. It doesn't have the disinterested spine to tell you that your favorite hypothesis just died on the transcripts.

The honest framing: AI makes a skilled researcher dramatically faster. It does not make an unskilled one safe. It removes the labor, not the judgment — and this whole discipline *is* the judgment.

---

## So — should you run one yourself?

You now have the whole map. Define the question. Recruit the right humans without contaminating the pool. Build a screener that guards the sample. Open the session so people tell you the truth. Sequence questions that don't lead. Hold the artifact until the end. Shut up during the think-aloud. Moderate without leaking your own hopes. Code inductively so you're capable of being surprised. And label your confidence honestly instead of manufacturing it.

Every one of those steps has three to twelve forks in it. And here's the thing I most want you to sit with: **a wrong turn at any fork doesn't fail loudly.** It doesn't throw an error. It produces a clean-looking deck full of confident findings that happen to be about the wrong customer, or shaped by a leading question, or built on two anecdotes wearing the costume of a trend. You will not be able to tell from the output that it's wrong. You'll ship against it. You'll wonder why the winning test didn't win.

That's the real cost, and it's why this is a craft and not a checklist.

Can you run a user research study yourself? Absolutely. Should you run *the one your revenue decisions depend on* without someone who's made all these mistakes already? That's a different question — and now you know enough to answer it honestly.

If you'd rather not learn which fork was the wrong one after you've already shipped, that's what we do. We ran exactly this study for Phone.com, and we can run it for you — or sit alongside your team and make sure the forks get taken correctly the first time.

Either way: go talk to your customers. In a world where everyone has the same audit tools, the people who actually understand the human on the other side are the ones who win.
