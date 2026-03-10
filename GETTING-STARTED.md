# Getting Started — Editing the Mobile1st Site

This guide will get you from zero to making live edits on the site. It takes about 15 minutes the first time.

---

## Step 1: Connect Claude to Cursor

1. Open Cursor
2. Press `Ctrl+Shift+J` (Windows) or `Cmd+Shift+J` (Mac) to open Settings
3. Click **Models** in the left sidebar
4. Under **API Keys**, find **Anthropic** and paste in your Claude API key
   - To get your key: go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
5. In the model selector at the top of any chat, choose **claude-sonnet-4-5** or the latest Claude model available

That's it — Claude is now powering Cursor's AI.

---

## Step 2: Connect GitHub to Cursor

1. In Cursor, open the **Source Control** panel — click the branching icon in the left sidebar (it looks like a little fork), or press `Ctrl+Shift+G`
2. Click **Sign in to GitHub** if prompted and follow the browser steps
3. Authorize Cursor when GitHub asks

---

## Step 3: Open the Site

1. In Cursor, go to **File → Open Folder**
2. If you've never worked on the site before, you need to clone it first:
   - Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac) to open the command palette
   - Type `Git: Clone` and press Enter
   - Paste this URL: `https://github.com/jaronstein/M1stSite.git`
   - Choose a folder on your computer to save it (e.g. your Desktop or Documents)
   - Click **Open** when Cursor asks if you want to open the cloned repo
3. Next time, just do **File → Open Folder** and find the folder you already cloned

---

## Step 4: Make Edits with Claude

Open the AI chat panel on the right side of Cursor (or press `Ctrl+L`). Type what you want in plain English. Some examples:

> "Change the hero headline to: Stop Guessing. Start Growing."

> "Write a new article about why most A/B tests fail, in our brand voice. Save it as a new file in src/news/."

> "Make the CTA button color darker green."

> "Update the PGA case study stats — change the conversion rate lift to 28%."

Claude knows the file structure and brand voice already. You don't need to tell it which file to edit — just describe what you want changed.

If you want to **see your changes before publishing**, type:
> "Run the site locally so I can preview it"

Then open http://localhost:8080 in your browser.

---

## Step 5: Publish

When you're happy with the changes, just tell Claude:

> "Publish"

Claude will commit the changes and push them to GitHub. The site will update on its own within a minute or two.

To verify it worked, check [cloudflare.com](https://dash.cloudflare.com) — you'll see a new deployment in progress under the M1stSite project.

---

## If Something Goes Wrong

Nothing is ever truly lost. Every change is saved in git history.

Tell Claude:
> "That broke something — undo the last change"

Or if you want to go back further:
> "Revert to how the homepage looked before my last three changes"

Claude can handle it.

---

## Quick Reference

| What you want to do | What to say to Claude |
|---|---|
| Edit homepage copy | "Change [section] to say [new text]" |
| Write a new article | "Write an article about [topic] and save it to src/news/" |
| Change a color or style | "Make the [element] [change]" |
| Add an image | "I'm adding a new image — here's what I want to do with it" |
| Publish changes | "Publish" |
| Undo something | "Undo the last change" |
| Preview before publishing | "Run the site locally" |
