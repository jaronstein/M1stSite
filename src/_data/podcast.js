// Fetches the podcast RSS feed at build time and returns structured episode data.
// Run `npm start` or `npm run build` to refresh.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const RSS_URL = 'https://feeds.castos.com/oz5z5';
const IMG_DIR = path.join(__dirname, '..', 'img', 'podcast');

const PLATFORMS = [
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/podcast/id1821016403' },
  { name: 'Spotify', url: 'https://open.spotify.com/show/5nJRi9PbWWU7BRUpqO9jJT' },
  { name: 'Pocket Casts', url: 'https://pca.st/0whl60tg' },
  { name: 'RSS Feed', url: 'https://feeds.castos.com/oz5z5' },
];

// Extract text content from an XML tag (handles CDATA with surrounding whitespace, and plain text).
function getText(xml, tag) {
  const t = tag.replace(/:/g, '\\:');

  // Try CDATA first — the RSS wraps most content in <![CDATA[...]]>
  const cdataRe = new RegExp(`<${t}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${t}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();

  // Fall back to plain text content
  const textRe = new RegExp(`<${t}[^>]*>([^<]*)</${t}>`, 'i');
  const textMatch = xml.match(textRe);
  return textMatch ? textMatch[1].trim() : '';
}

// Extract an attribute value from an XML tag.
function getAttr(xml, tag, attr) {
  const t = tag.replace(/:/g, '\\:');
  const re = new RegExp(`<${t}[^>]*\\b${attr}="([^"]*)"`, 'i');
  const m = xml.match(re);
  return m ? m[1] : '';
}

// Extract numeric Castos episode ID from the CDN URL.
// URL format: https://episodes.castos.com/{podcast_id}/{episode_id}/filename.ext
function getCastosEpisodeId(url) {
  const m = url.match(/episodes\.castos\.com\/[^/]+\/(\d+)\//);
  return m ? m[1] : null;
}

function slugFromUrl(url) {
  try {
    return new URL(url).pathname.split('/').filter(Boolean).pop() || '';
  } catch {
    return url.split('/').filter(Boolean).pop() || '';
  }
}

// Wrap bare URLs in the description HTML with anchor tags.
// Splits on existing <a>...</a> blocks so already-linked URLs aren't double-wrapped.
function linkify(html) {
  const parts = html.split(/(<a[\s\S]*?<\/a>)/i);
  return parts.map((part, i) => {
    if (i % 2 !== 0) return part; // inside an existing <a> tag — leave it alone
    return part.replace(/(https?:\/\/[^\s<"']+)/g, (url) => {
      // Strip invisible Unicode joiners and trailing punctuation that isn't part of the URL
      const clean = url.replace(/[\u2060\u200b\ufeff]+/g, '').replace(/[.,;:)]+$/, '');
      return `<a href="${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>`;
    });
  }).join('');
}

function slugFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toReadableDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function toIsoDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return '';
  }
}

// Download a remote image, resize to 400x400 WebP, and save locally.
// Returns the local URL path on success, or the original URL on failure.
async function optimizeImage(remoteUrl, slug) {
  const outPath = path.join(IMG_DIR, `${slug}.webp`);
  // Skip if already cached locally
  if (fs.existsSync(outPath)) return `/img/podcast/${slug}.webp`;
  try {
    const res = await fetch(remoteUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    await sharp(buffer)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outPath);
    console.log(`[podcast.js] Optimized image: ${slug}.webp`);
    return `/img/podcast/${slug}.webp`;
  } catch (err) {
    console.warn(`[podcast.js] Image optimization failed for ${slug}:`, err.message);
    return remoteUrl; // fall back to Castos CDN
  }
}

module.exports = async function () {
  try {
    const res = await fetch(RSS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    // Feed metadata lives before the first <item>
    const feedPart = xml.split(/<item>/i)[0];
    const feedImage = getAttr(feedPart, 'itunes:image', 'href');
    const feedTitle = getText(feedPart, 'title');
    const feedDescription = getText(feedPart, 'description');

    const itemChunks = xml.split(/<item>/i).slice(1);
    const totalEpisodes = itemChunks.length;

    const episodes = itemChunks
      .map((chunk, index) => {
        const item = chunk.split(/<\/item>/i)[0];

        const title = getText(item, 'title');
        const guid = getText(item, 'guid');
        // <link> contains the human-readable URL; <guid> is a Castos internal permalink
        const link = getText(item, 'link');
        const rawSlug = slugFromUrl(link) || slugFromUrl(guid);
        // Fall back to title-derived slug if rawSlug looks like a domain or bare number
        const slug = /^[\d]+$/.test(rawSlug) || rawSlug.includes('.') ? slugFromTitle(title) : rawSlug;
        const audioUrl = getAttr(item, 'enclosure', 'url');
        const audioType = getAttr(item, 'enclosure', 'type') || 'audio/mpeg';
        const duration = getText(item, 'itunes:duration');
        const episodeNum = parseInt(getText(item, 'itunes:episode')) || (totalEpisodes - index);
        const season = parseInt(getText(item, 'itunes:season')) || null;
        const pubDateStr = getText(item, 'pubDate');

        // Use content:encoded (rich HTML) when available, fall back to description
        const description = linkify(getText(item, 'content:encoded') || getText(item, 'description'));
        // Plain-text subtitle for cards/meta descriptions
        const plainDescription = getText(item, 'itunes:subtitle') || getText(item, 'description');
        const image = getAttr(item, 'itunes:image', 'href') || feedImage;
        const castosEpisodeId = getCastosEpisodeId(audioUrl);

        return {
          title,
          slug,
          guid,
          audioUrl,
          audioType,
          duration,
          episodeNum,
          season,
          pubDate: pubDateStr,
          date: toIsoDate(pubDateStr),
          readableDate: toReadableDate(pubDateStr),
          description,
          plainDescription,
          image,
          castosEpisodeId,
        };
      })
      .filter(ep => ep.slug && ep.title);

    // Download, resize, and self-host episode images as 400x400 WebP
    fs.mkdirSync(IMG_DIR, { recursive: true });
    await Promise.all(episodes.map(async (ep) => {
      if (ep.image) {
        ep.ogImage = ep.image; // preserve original full URL for OG tags / structured data
        ep.image = await optimizeImage(ep.image, ep.slug);
      }
    }));

    // Group episodes by season, newest season first
    const seasonMap = {};
    for (const ep of episodes) {
      const s = ep.season || 1;
      if (!seasonMap[s]) seasonMap[s] = [];
      seasonMap[s].push(ep);
    }
    const seasons = Object.keys(seasonMap)
      .map(Number)
      .sort((a, b) => b - a)
      .map(n => ({ number: n, episodes: seasonMap[n] }));

    return {
      episodes,
      seasons,
      metadata: {
        title: feedTitle || 'Checkin to Checkout',
        description: feedDescription,
        image: feedImage,
        platforms: PLATFORMS,
      },
    };
  } catch (err) {
    console.error('[podcast.js] Failed to fetch RSS feed:', err.message);
    return {
      episodes: [],
      metadata: {
        title: 'Checkin to Checkout',
        description: 'We tell the stories of e-commerce leaders.',
        image: '',
        platforms: PLATFORMS,
      },
    };
  }
};
