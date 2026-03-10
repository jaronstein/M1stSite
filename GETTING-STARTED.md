# Getting Started — Editing the Mobile1st Site

This guide will get you from zero to making live edits on the site. It takes about 15 minutes the first time.

You'll be using **Claude Code** — an extension inside Cursor that can edit files, run the site locally, and publish to GitHub all by itself. You just tell it what you want in plain English.

---

## Step 1: Install Claude Code in Cursor

1. Open Cursor
2. Click the **Extensions** icon in the left sidebar (it looks like four squares), or press `Ctrl+Shift+X`
3. Search for **Claude Code**
4. Click **Install**
5. Once installed, a Claude icon will appear in the left sidebar

---

## Step 2: Connect Your Claude Account

1. Click the Claude icon in the left sidebar to open Claude Code
2. It will prompt you to sign in or enter an API key
3. To get your API key: go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
4. Paste the key in and hit Enter

Claude Code is now active. Ignore Cursor's built-in AI chat — you won't need it.

---

## Step 3: Connect GitHub to Cursor

1. Open the **Source Control** panel — click the branching icon in the left sidebar, or press `Ctrl+Shift+G`
2. Click **Sign in to GitHub** if prompted and follow the browser steps
3. Authorize Cursor when GitHub asks

---

## Step 4: Open the Site

1. In Cursor, go to **File → Open Folder**
2. If you've never worked on the site before, clone it first:
   - Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
   - Type `Git: Clone` and press Enter
   - Paste this URL: `https://github.com/jaronstein/M1stSite.git`
   - Choose a folder on your computer (e.g. Desktop or Documents)
   - Click **Open** when Cursor asks
3. Next time, just do **File → Open Folder** and select the folder you already cloned

---

## Step 5: Make Edits with Claude

Click the Claude icon in the sidebar to open Claude Code. Type what you want in plain English. Some examples:

> "Change the hero headline to: Stop Guessing. Start Growing."

> "Write a new article about why most A/B tests fail, in our brand voice. Save it as a new file in src/news/."

> "Make the CTA button color darker green."

> "Update the PGA case study stats — change the conversion rate lift to 28%."

Claude knows the file structure and brand voice already. You don't need to tell it which file to edit — just describe what you want.

To **preview your changes before publishing**:
> "Run the site locally so I can preview it"

Then open http://localhost:8080 in your browser. Claude handles starting the server.

---

## Step 6: Publish

When you're happy, just tell Claude:

> "Publish"

Claude will commit the changes and push them to GitHub. The site updates on its own within a minute or two.

To confirm it worked, check [dash.cloudflare.com](https://dash.cloudflare.com) — you'll see a new deployment in progress under the M1stSite project.

---

## If Something Goes Wrong

Nothing is ever truly lost. Every change is saved in history.

> "That broke something — undo the last change"

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
| Publish | "Publish" |
| Undo something | "Undo the last change" |
| Preview before publishing | "Run the site locally" |
