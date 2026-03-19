// One-time script to import transcripts from the existing Castos episode pages.
// Run with: node scripts/import-transcripts.js
//
// Fetches each episode's Castos page, extracts the transcript, and saves it to
// src/_data/transcripts/{slug}.html — the podcast episode layout picks these up automatically.

const fs = require('fs');
const path = require('path');

const RSS_URL = 'https://feeds.castos.com/oz5z5';
const OUTPUT_DIR = path.join(__dirname, '../src/_data/transcripts');
const DELAY_MS = 800; // polite delay between requests

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Extract episode slugs from the RSS feed
async function getEpisodes() {
  console.log('Fetching RSS feed...');
  const res = await fetch(RSS_URL);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  const xml = await res.text();

  const itemChunks = xml.split(/<item>/i).slice(1);
  return itemChunks.map(chunk => {
    const item = chunk.split(/<\/item>/i)[0];

    // Extract title (CDATA or plain)
    const titleRe = /<title[^>]*>\s*(?:<!\[CDATA\[([\s\S]*?)\]\]>|([^<]*))\s*<\/title>/i;
    const titleM = item.match(titleRe);
    const title = titleM ? (titleM[1] || titleM[2] || '').trim() : '';

    // Extract slug from <link>
    const linkRe = /<link>([^<]*)<\/link>/i;
    const linkM = item.match(linkRe);
    const link = linkM ? linkM[1].trim() : '';
    const slug = link.split('/').filter(Boolean).pop() || '';

    return { title, slug, link };
  }).filter(ep => ep.slug && ep.title);
}

// Fetch a Castos episode page and extract the transcript text
async function fetchTranscript(url) {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const html = await res.text();

  const startTag = html.indexOf('id="transcript-body"');
  if (startTag === -1) return null;

  const openBracket = html.indexOf('>', startTag) + 1;
  const closeTag = html.indexOf('</div>', openBracket);
  if (closeTag === -1) return null;

  return html.slice(openBracket, closeTag).trim();
}

// Convert plain transcript text to clean HTML paragraphs
function textToHtml(text) {
  // Split on lines, group consecutive non-empty lines into paragraphs
  const lines = text.split('\n').map(l => l.trim());
  const paragraphs = [];
  let current = [];

  for (const line of lines) {
    if (line === '') {
      if (current.length) {
        paragraphs.push(current.join(' '));
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length) paragraphs.push(current.join(' '));

  return paragraphs
    .map(p => {
      // Highlight timestamps like [00:01:23]
      const withTimestamps = p.replace(
        /\[(\d{2}:\d{2}:\d{2})\]/g,
        '<span class="transcript-timestamp">[$1]</span>'
      );
      // Bold speaker labels like "Speaker A:" or "Justin:" or "Doug:"
      const withSpeakers = withTimestamps.replace(
        /^(.*?:)\s/,
        '<strong class="transcript-speaker">$1</strong> '
      );
      return `<p>${withSpeakers}</p>`;
    })
    .join('\n');
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const episodes = await getEpisodes();
  console.log(`Found ${episodes.length} episodes in RSS feed.\n`);

  let imported = 0;
  let skipped = 0;
  let missing = 0;

  for (const ep of episodes) {
    const outFile = path.join(OUTPUT_DIR, `${ep.slug}.html`);

    // Skip if already imported
    if (fs.existsSync(outFile)) {
      console.log(`  SKIP  ${ep.slug} (already exists)`);
      skipped++;
      continue;
    }

    const castosUrl = `https://podcast.mobile1st.com/episodes/${ep.slug}`;
    process.stdout.write(`  GET   ${ep.slug} ... `);

    try {
      const rawText = await fetchTranscript(castosUrl);

      if (!rawText) {
        console.log('no transcript found');
        missing++;
      } else {
        const html = textToHtml(rawText);
        fs.writeFileSync(outFile, html, 'utf8');
        console.log(`saved (${rawText.length.toLocaleString()} chars)`);
        imported++;
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      missing++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nDone. Imported: ${imported}  Skipped: ${skipped}  Missing/failed: ${missing}`);
  console.log(`Transcripts saved to: ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
