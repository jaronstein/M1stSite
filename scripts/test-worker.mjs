// Routing test for worker.js: `node scripts/test-worker.mjs`.
// Loads worker.js with src/_redirects inlined (Node has no Text-module loader),
// a fake ASSETS binding and a fake origin fetch, then checks every host/path case
// the two-host setup depends on. Exits 1 on any failure.
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const redirects = readFileSync(join(root, "src/_redirects"), "utf8");
const src = readFileSync(join(root, "worker.js"), "utf8").replace(
  /^import redirectsText from "\.\/src\/_redirects";$/m,
  `const redirectsText = ${JSON.stringify(redirects)};`
);
if (!src.includes("const redirectsText")) throw new Error("worker.js import line changed; update this test");
const tmp = join(mkdtempSync(join(tmpdir(), "m1w-")), "worker.mjs");
writeFileSync(tmp, src);

let originCalls = 0;
globalThis.fetch = async (req) => {
  originCalls++;
  return new Response("origin:" + new URL(req.url).pathname, { status: 200 });
};
const { default: worker } = await import(pathToFileURL(tmp).href);
const ASSETS = { fetch: async (req) => {
  const path = new URL(req.url).pathname;
  return path.includes("missing") ? new Response("nope", { status: 404 }) : new Response("asset:" + path, { status: 200 });
} };

async function run(url, { method = "GET", flag = "1" } = {}) {
  const res = await worker.fetch(new Request(url, { method, redirect: "manual" }), { ASSETS, MOVE_REDIRECTS: flag });
  return { status: res.status, location: res.headers.get("Location"), body: res.status === 301 ? "" : await res.text() };
}

const cases = [
  // mobile1st.com, redirects ON
  ["https://mobile1st.com/news/the-message-match-gap/?utm_source=t", {}, { status: 301, location: "https://throughlinecr.ai/news/the-message-match-gap/?utm_source=t" }],
  ["https://mobile1st.com/news/b2b-segmentation-f8lc4/", {}, { status: 301, location: "https://throughlinecr.ai/news/most-valuable-customers/" }],
  ["https://mobile1st.com/news", {}, { status: 301, location: "https://throughlinecr.ai/news" }],
  ["https://mobile1st.com/podcast/some-episode/", {}, { status: 301, location: "https://throughlinecr.ai/podcast/some-episode/" }],
  ["https://mobile1st.com/pdp-audit/", {}, { status: 301, location: "https://throughlinecr.ai/pdp-audit/" }],
  ["https://mobile1st.com/links/", {}, { status: 301, location: "https://throughlinecr.ai/links/" }],
  ["https://mobile1st.com/files/pdp-audit-prompt.md", {}, { status: 301, location: "https://throughlinecr.ai/files/pdp-audit-prompt.md" }],
  ["https://mobile1st.com/feed.xml", {}, { status: 301, location: "https://throughlinecr.ai/feed.xml" }],
  ["https://mobile1st.com/video-sitemap.xml", {}, { status: 301, location: "https://throughlinecr.ai/video-sitemap.xml" }],
  ["https://mobile1st.com/llms-full.txt", {}, { status: 301, location: "https://throughlinecr.ai/llms-full.txt" }],
  ["https://www.mobile1st.com/news/x/", {}, { status: 301, location: "https://throughlinecr.ai/news/x/" }],
  // mobile1st.com pages that stay
  ["https://mobile1st.com/", {}, { status: 200, body: "asset:/" }],
  ["https://mobile1st.com/about/", {}, { status: 200, body: "asset:/about/" }],
  ["https://mobile1st.com/quiz/", {}, { status: 200, body: "asset:/quiz/" }],
  ["https://mobile1st.com/newsletter", {}, { status: 200, body: "asset:/newsletter" }],
  ["https://mobile1st.com/img/logo.png", {}, { status: 200, body: "asset:/img/logo.png" }],
  ["https://mobile1st.com/sitemap.xml", {}, { status: 200, body: "asset:/sitemap.xml" }],
  ["https://mobile1st.com/llms.txt", {}, { status: 200, body: "asset:/llms.txt" }],
  ["https://mobile1st.com/news/x/", { method: "POST" }, { status: 200, body: "asset:/news/x/" }],
  ["https://mobile1st.com/api/quiz-lead", {}, { status: 405 }],
  // mobile1st.com, redirects OFF (phase A): moved paths still served here
  ["https://mobile1st.com/news/the-message-match-gap/", { flag: "0" }, { status: 200, body: "asset:/news/the-message-match-gap/" }],
  ["https://mobile1st.com/links/", { flag: "" }, { status: 200, body: "asset:/links/" }],
  // throughlinecr.ai: moved + static served from the build
  ["https://throughlinecr.ai/news/the-message-match-gap/", {}, { status: 200, body: "asset:/news/the-message-match-gap/" }],
  ["https://throughlinecr.ai/news/sitemap.xml", {}, { status: 200, body: "asset:/news/sitemap.xml" }],
  ["https://throughlinecr.ai/podcast/", {}, { status: 200, body: "asset:/podcast/" }],
  ["https://throughlinecr.ai/links/", {}, { status: 200, body: "asset:/links/" }],
  ["https://throughlinecr.ai/feed.xml", {}, { status: 200, body: "asset:/feed.xml" }],
  ["https://throughlinecr.ai/img/og-throughline.png", {}, { status: 200, body: "asset:/img/og-throughline.png" }],
  ["https://throughlinecr.ai/css/style.css", {}, { status: 200, body: "asset:/css/style.css" }],
  ["https://throughlinecr.ai/news/b2b-segmentation-f8lc4/?a=1", {}, { status: 301, location: "https://throughlinecr.ai/news/most-valuable-customers/?a=1" }],
  ["https://throughlinecr.ai/img/missing.png", {}, { status: 200, body: "origin:/img/missing.png" }],
  ["https://throughlinecr.ai/news/missing/", {}, { status: 404 }],
  // throughlinecr.ai: anything else goes to the app
  ["https://throughlinecr.ai/newsletter", {}, { status: 200, body: "origin:/newsletter" }],
  ["https://throughlinecr.ai/", {}, { status: 200, body: "origin:/" }],
  ["https://throughlinecr.ai/report", {}, { status: 200, body: "origin:/report" }],
  ["https://throughlinecr.ai/api/quiz-lead", { method: "POST" }, { status: 200, body: "origin:/api/quiz-lead" }],
  ["https://throughlinecr.ai/sitemap.xml", {}, { status: 200, body: "origin:/sitemap.xml" }],
];

let failed = 0;
for (const [url, opts, want] of cases) {
  const got = await run(url, opts);
  const ok = Object.entries(want).every(([k, v]) => got[k] === v);
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${opts.method || "GET"} ${url} flag=${"flag" in opts ? opts.flag : "1"} -> ${got.status} ${got.location || got.body}`);
}
if (originCalls === 0) { console.log("FAIL origin was never called"); failed++; }
console.log(`${cases.length - failed}/${cases.length} passed`);
process.exit(failed ? 1 : 0);
