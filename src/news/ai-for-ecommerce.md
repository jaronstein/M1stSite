---
layout: layouts/article.njk
title: "How E-commerce Directors Should Actually Be Using AI Right Now"
date: 2026-02-26
author: Justin Aronstein
description: "Three practical ways e-commerce directors should actually be using AI right now — without building custom software or managing technical debt."
podcast_episode_id: 2372729
inline_cta: experimentation
---

  If you spend more than five minutes on LinkedIn right now, you’re being bombarded by tech bros and AI evangelists telling you that you need to become a full-stack developer overnight. They want you spinning up Claude Code, deploying custom apps, and fully automating your e-commerce operations.

Let me  just say **That is a terrible idea.**

If you are an E-commerce Director at a company doing $3M to $100M, you should not be building custom software that your team will have to maintain forever. Code rots. APIs change. You are not a CTO managing technical debt; your job is to drive revenue.

*But*, pretending AI doesn't exist is a fast track to irrelevance. At our digital product growth agency, we use AI relentlessly to run better on-site experiments and make our clients money.

So, I wanted to write a vulnerable, "working document" of where I *actually* think e-commerce leaders should be deploying AI right now to get shit done.

### 1. Creative for the "Andromeda" Era of Meta
As we all know, targeting is dead. Creative is the new bidding. But unless you’re sitting on a massive enterprise budget, none of us have the creative teams required to keep up with the velocity Meta demands.

There are a ton of tools emerging to help close this gap. Google just launched **Pomelli** (currently in Labs), and it's built for exactly this. You feed it your brand DNA and your current product photos, and it spits out a barrage of creative ready to be tested on Meta.

This area is evolving fast, but here are a few other tools to add to your arsenal:

- **Photoroom:** Absolute magic for bulk-removing backgrounds and placing your SKUs into high-end, AI-generated lifestyle scenes.

- **Pencil (by Brandtech):** Generates predictive ad creatives based on what actually works for your specific sector.

- **Midjourney:** Still the undisputed king for raw, high-fidelity lifestyle image generation if you learn how to prompt it right.

<div id="inline-cta-anchor"></div>

### 2. Advanced Data Analysis (The "Python" Trick)
GA4 is fine for the basics; knowing how people find you or what pages they visit. You should definitely be using the AI tools built into GA4 to quickly confirm hypotheses (if your tracking is actually set up right, which is a whole other rant).

But what happens when you export data from your CRM or ERP and it’s a million lines deep?

Trying to paste massive datasets into ChatGPT and watching it crash, or trying to do complex row-by-row calculations in Excel until your computer catches fire.

Don’t use AI to do the analysis. Ask AI to write a *Python script* to do the analysis for you.

Here is a concrete example from my own desk: I had a file with a million order rows (with addresses) and another file with 80 physical store locations. We needed to geocode the orders, calculate the distance between every single order and the closest store, and map it on a graph.

I dropped those files into Cursor (Claude Code works too) and asked it to build the script. After a little back-and-forth clarification, I had the Python code in 20 minutes. Funny enough, the script took longer to run (2-3 hours) than it took me to "write" the code.

Before you panic and say, *"I don't know Python, I could never do that,"* listen to me: Let the AI guide you. It will feel intimidating the first time you open a terminal. But once you see that graph pop out, it is incredibly addicting.







### 3. Creating "Version Zero" for Your Devs & Designers
One of the hardest bottlenecks in development is simply explaining to developers or designers the exact change you want to make. We've all been in that meeting where you draw a wireframe on a napkin, say "make it look like this," and pray they understand.

Stop explaining. Start showing. Depending on the size of the change, here is your toolkit:

- **For Quick Visual Tweaks:** Use Chrome DevTools AI. Right-click the element you want to change, hit "Inspect," and open the AI Assistant. It will look like terrifying HTML, but you just literally tell the AI what you want changed. It will rewrite the page locally just for you. You can even copy the new CSS/HTML to give your devs. It doesn't need to be pixel-perfect; it just needs to say, *"Hey, this is exactly what I mean."*

- **For Advanced Features:** Use **Cursor**. Tell it you want to make changes to a specific page. It will download the necessary HTML/CSS and you can describe the exact interactive changes you want to test. It takes a bit longer, but it's perfect for complex UI shifts.

- **For Brand New Pages:** Use **v0** (by Vercel). If you are building a landing page from scratch to test a new offer, you can prompt v0 to build a pixel-perfect, fully coded UI in seconds. They look incredible and can serve as the ultimate "Version Zero" wireframe.

These are just a few ways I'm using AI every day to cut through the noise, skip the endless meetings, and actually launch experiments that drive revenue. If you're wondering how to structure the experiments themselves, our [Data-Driven Experimentation](https://mobile1st.com/#products) program is where the rubber meets the road. (If you want to read more of our rants on digital product growth, check out our all our [insights](/news).).

**What did I miss? What else should E-com Directors be doing in the trenches?**

If I got something wrong, send me a message on [LinkedIn](https://www.linkedin.com/in/justinaronstein/).
