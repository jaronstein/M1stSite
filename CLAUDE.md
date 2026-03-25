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

## Build & Deploy

| Command | What it does |
|---|---|
| `npm start` | Eleventy dev server at http://localhost:8080 with hot reload |
| `npm run build` | Production build to `_site/` |
| `npm run deploy` | Build + deploy to Cloudflare Pages via Wrangler |

Push to `main` on GitHub triggers an automatic Cloudflare Pages build. The Wrangler config (`wrangler.jsonc`) points at `_site/` as the assets directory.

A GitHub Actions workflow (`.github/workflows/rebuild-podcast.yml`) runs every Wednesday at 7 AM UTC, creating an empty commit to trigger a Cloudflare rebuild. This pulls the latest podcast episodes from the Castos RSS feed without any code changes.

## File Map

| What you want to change | File to edit |
|---|---|
| Homepage copy, sections, layout | `src/index.njk` |
| All styles, colors, fonts, spacing | `src/css/style.css` |
| Article template (header, footer, layout) | `src/_includes/layouts/article.njk` |
| Podcast episode template | `src/_includes/layouts/podcast-episode.njk` |
| CTA block at end of articles | `src/_includes/components/article-cta-end.njk` |
| Inline CTA inside articles | `src/_includes/components/article-cta-inline.njk` |
| Podcast platform links (Apple, Spotify, etc.) | `src/_includes/components/podcast-platforms.njk` |
| Create a new article | Add a `.md` file to `src/news/` (see format below) |
| Images | `src/img/` |
| Podcast RSS parser | `src/_data/podcast.js` |
| Podcast transcripts | `src/_data/transcripts/*.html` |
| Podcast listing page | `src/podcast/index.njk` |
| Podcast episode page generator | `src/podcast/episode.njk` |
| Quiz page | `src/quiz/index.njk` |
| Quiz logic and result routing | `src/js/quiz.js` |
| Navigation, modals, subscribe forms | `src/js/nav.js` |
| Article popup + inline CTA behavior | `src/js/article.js` |
| Cloudflare redirect rules | `src/_redirects` |
| Cloudflare custom headers | `src/_headers` |
| Atom/RSS feed | `src/feed.njk` |
| Sitemap | `src/sitemap.njk` |
| Weekly podcast rebuild automation | `.github/workflows/rebuild-podcast.yml` |

**Do not edit** unless you know what you're doing:
- `src/_includes/base.njk` — global HTML shell (includes nav, footer, booking modals, tracking scripts)
- `.eleventy.js` — build config (collections, filters, shortcodes)
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

### Required fields
- `layout` — always `layouts/article.njk`
- `title` — article headline
- `date` — controls sort order on the news index (use the publish date)
- `description` — shows up in link previews, Google, and the news index card

### Optional fields
- `author` — defaults to "Justin Aronstein" if omitted
- `podcast_episode_id` — numeric Castos episode ID. Embeds a Castos audio player at the top of the article.
- `inline_cta` — shows a contextual CTA inside the article body. Valid values: `offer`, `personalization`, `discovery`, `zero-party`, `experimentation`, `bi`
- `og_image` — custom Open Graph image URL. Falls back to `https://mobile1st.com/img/og-default.png`
- `linkedin_post_url` — adds a "Continue the conversation on LinkedIn" bar below the headline
- `linkedin_cta` — custom text for the LinkedIn bar (defaults to "Have a take on this?")
- `show_end_cta` — set to `false` to hide the end-of-article CTA block

## Podcast System

Podcast episodes are auto-generated at build time from the Castos RSS feed. No manual files needed for new episodes.

### How it works
1. `src/_data/podcast.js` fetches `https://feeds.castos.com/oz5z5` at build time
2. It parses each episode's metadata: title, slug, audio URL, duration, season, episode number, description, image, Castos episode ID
3. `src/podcast/episode.njk` uses Eleventy pagination to generate one page per episode at `/podcast/{slug}/`
4. `src/podcast/episode.11tydata.js` computes title, description, and OG image per episode
5. `src/podcast/index.njk` lists all episodes grouped by season (newest season first)

### Transcripts
- Stored as HTML files in `src/_data/transcripts/`, keyed by episode slug
- Loaded by `src/_data/podcastTranscripts.js`
- Displayed on the episode page if a matching transcript file exists
- To add a transcript: save an HTML file as `src/_data/transcripts/{episode-slug}.html`
- The one-time import script at `scripts/import-transcripts.js` can bulk-fetch transcripts from Castos episode pages

### Adding episodes
New episodes appear automatically when Castos publishes them and the site rebuilds. The weekly GitHub Actions workflow handles this. For an immediate update, push any commit to `main` or run the workflow manually.

## Quiz

The quiz at `/quiz/` is a 5-question interactive form that recommends a Mobile1st product based on the visitor's answers.

- **Page**: `src/quiz/index.njk`
- **Logic**: `src/js/quiz.js` (307 lines)
- **Questions**: annual revenue, traffic source, biggest challenge, experimentation maturity, e-commerce platform
- **Results**: 6 product types (A-F) plus a "mixed signals" result (G) and an under-$1M disqualifier
- **APIs**: Web3Forms (email to data@mobile1st.com), Buttondown (newsletter + CRM tagging), Zaraz (analytics events)

## JavaScript Files

All JS lives in `src/js/` and is either inlined by Eleventy or loaded via `<script>` tags.

| File | What it does |
|---|---|
| `nav.js` | Hamburger menu toggle, booking modal (Google Calendar iframe), podcast guest modal, newsletter subscribe forms (Buttondown API) |
| `article.js` | Newsletter popup overlay (triggers at 50% scroll, respects localStorage dismissal), inline CTA reveal via Intersection Observer |
| `quiz.js` | Full quiz state machine: question navigation, answer selection, result calculation, email capture, Buttondown CRM tagging, Web3Forms contact form, Zaraz analytics events |

## Eleventy Config Reference

The `.eleventy.js` file defines:

**Collection:**
- `posts` — all `.md` files in `src/news/`, reversed (newest first)

**Custom filters:**
- `currentYear` — returns the current year (used in footer copyright)
- `htmlDateString` — converts a Date to `YYYY-MM-DD`
- `readableDate` — formats as "Month DD, YYYY"
- `autolink` — converts bare URLs to clickable links (strips Castos Unicode word-joiner characters)
- `durationToSeconds` — converts `HH:MM:SS` to integer seconds (used in podcast schema markup)

**Shortcodes:**
- `inlineCSS` — reads `src/css/style.css`, minifies it with CleanCSS, and inlines it in `<head>`
- `inlineJS(file)` — reads a JS file from `src/js/` and inlines it

**Passthrough copies:** `_redirects`, `_headers`, `robots.txt`, `llms.txt`, `css/`, `fonts/`, `img/`, `js/`

**Template engine:** Markdown files use Nunjucks (`markdownTemplateEngine: "njk"`)

## Redirects

`src/_redirects` contains Cloudflare Pages redirect rules (301s). When you rename an article slug, add a line:
```
/news/old-slug/ /news/new-slug/ 301
```

## Third-Party Integrations

| Service | Purpose | Where it's configured |
|---|---|---|
| Castos | Podcast hosting + RSS feed | `src/_data/podcast.js` (feed URL) |
| Cloudflare Pages | Hosting + auto-deploy | `wrangler.jsonc`, `src/_redirects`, `src/_headers` |
| Buttondown | Newsletter + CRM tagging | `src/js/nav.js` (subscribe forms), `src/js/quiz.js` (quiz lead tagging) |
| Web3Forms | Form email delivery (to data@mobile1st.com) | `src/js/quiz.js` (contact form) |
| Zaraz | Analytics event tracking | `src/js/quiz.js` (quiz events) |
| Leadfeeder | B2B visitor identification | `src/_includes/base.njk` (tracking script) |
| RB2B | B2B visitor identification | `src/_includes/base.njk` (tracking script) |
| Google Calendar | Booking modals | `src/_includes/base.njk` (two iframe modals: booking + podcast guest) |

## Voice and Tone

Mobile1st writes like a direct, experienced practitioner — not an agency. Rules:

- **No em dashes.** Use a period, comma, colon, or parentheses instead.
- **No filler openers.** Don't start sentences with "In today's world," "It's no secret that," or "As a business..."
- **No bullet-point brain dumps.** If you're listing more than 4 things, ask whether some should be prose.
- **Be specific.** "12% increase in RPV" beats "significant improvement." Real numbers, real client names, real outcomes.
- **Write for the VP of E-Commerce.** They're smart, busy, skeptical of agencies, and have been burned before. Don't oversell. Let the work do the talking.
- **Short paragraphs.** 2-4 sentences max. White space is not wasted space.

## Design System

Colors (CSS custom properties defined in `src/css/style.css`):
- `--forest` (#17362D) — dark green, primary brand
- `--teal` (#13644D) — medium green, accents and links
- `--mint` (#EAF6F2) — light green, backgrounds and badges
- `--accent` (#3ECFA0) — bright green, highlights and borders
- `--text-muted` — secondary text

Typography:
- **Body font**: Poppins (self-hosted, 4 weights: 400, 500, 600, 700 in `src/fonts/`)
- **Display font**: Obviously (OH no Type Co) is planned but not yet wired in. A commented `@font-face` block in `src/css/style.css` is ready once the font files are purchased and added to `src/fonts/`.

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
