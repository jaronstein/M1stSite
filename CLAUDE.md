# Mobile1st Site — Claude Instructions

This is a static site built with Eleventy (11ty) v3. It deploys automatically to Cloudflare Pages when changes are pushed to the `main` branch on GitHub.

## Publishing

When the user says "publish," "push," or "go live," run:
```
git add -A
git commit -m "<short description of what changed>"
git push
```
Cloudflare will pick it up automatically. No other steps needed.

To preview locally before publishing:
```
npm start
```
Then open http://localhost:8080 in a browser.

## File Map

| What you want to change | File to edit |
|---|---|
| Homepage copy, sections, layout | `src/index.njk` |
| All styles, colors, fonts, spacing | `src/css/style.css` |
| Article template (header, footer, layout) | `src/_includes/layouts/article.njk` |
| CTA block at end of articles | `src/_includes/components/article-cta-end.njk` |
| Inline CTA inside articles | `src/_includes/components/article-cta-inline.njk` |
| Create a new article | Add a `.md` file to `src/news/` (see format below) |
| Images | `src/img/` |

**Do not edit** unless you know what you're doing:
- `src/_includes/base.njk` — global HTML shell
- `.eleventy.js` — build config
- `package.json` — dependencies

## Creating a New Article

Create a new file in `src/news/` named with lowercase words and hyphens, e.g. `src/news/my-article-title.md`.

Every article must start with this frontmatter block:

```
---
layout: layouts/article.njk
title: "Your Article Title Here"
date: 2026-01-01
author: Justin Aronstein
description: "One sentence that summarizes the article. Used in previews and SEO."
---

Article body starts here...
```

- `date` controls sort order on the news index — use the publish date
- `description` shows up in link previews and Google — make it a strong one-liner
- `podcast_episode_id` is optional — only add if there's a podcast episode
- `inline_cta` is optional — valid values are `experimentation` or leave it out

## Voice and Tone

Mobile1st writes like a direct, experienced practitioner — not an agency. Rules:

- **No em dashes.** Use a period, comma, colon, or parentheses instead.
- **No filler openers.** Don't start sentences with "In today's world," "It's no secret that," or "As a business..."
- **No bullet-point brain dumps.** If you're listing more than 4 things, ask whether some should be prose.
- **Be specific.** "12% increase in RPV" beats "significant improvement." Real numbers, real client names, real outcomes.
- **Write for the VP of E-Commerce.** They're smart, busy, skeptical of agencies, and have been burned before. Don't oversell. Let the work do the talking.
- **Short paragraphs.** 2-4 sentences max. White space is not wasted space.

## Design System

Colors (CSS custom properties):
- `--forest` — dark green, primary brand
- `--teal` — medium green, accents and links
- `--mint` — light green, backgrounds and badges
- `--accent` (#3ECFA0) — bright green, highlights and borders
- `--text-muted` — secondary text

The site uses a system font stack. A custom font (OH no Type Co) is planned but not yet wired in — `src/css/style.css` has a commented `@font-face` block ready to go once the font files are purchased and added to `src/fonts/`.

## Section Order (Homepage)

1. Hero + Logo Bar
2. Problems (`#problems`) — WHERE THE MONEY IS GOING
3. What We Do (`#what-we-do`) — WHAT WE DO
4. Process (`#process`) — HOW WE WORK
5. Results (`#results`) — WHAT THE DATA SAYS
6. Products (`#products`) — THE PRODUCTS
7. Fit (`#fit`) — IS THIS YOU?
8. Final CTA

## Git Tips

- Every change is saved in git history — nothing is ever truly lost
- If something breaks, say "revert the last change" and Claude will undo it
- If you're not sure about a change, ask Claude to preview it in the terminal first with `npm start`
