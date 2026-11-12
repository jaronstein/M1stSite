// m1stsite Worker: serves this 11ty build on two hosts (2026-11-12).
//
//   mobile1st.com / www.mobile1st.com
//     The agency pages (home, about, quiz) are served from the build as before.
//     The content that moved (MOVED below) answers ONE 301 to the same path on
//     throughlinecr.ai, query kept, when the MOVE_REDIRECTS var is "1". Until then
//     it is still served here, so the switch can be flipped without a code change,
//     and turned off again the same way.
//
//   throughlinecr.ai
//     Only the routes in wrangler.jsonc reach this Worker; everything else on that
//     host is the Railway app. A moved path or a static dir is served from the build;
//     anything else that matches a route pattern by accident (throughlinecr.ai/news*
//     also matches /newsletter) is passed on to the origin, never answered with a 404.
//
// Old Squarespace slugs in src/_redirects are resolved here first, so a redirect
// from mobile1st.com goes straight to the final throughlinecr.ai URL in one hop.

import redirectsText from "./src/_redirects";

const CANONICAL = "https://throughlinecr.ai";
const THROUGHLINE_HOSTS = new Set(["throughlinecr.ai"]);

// A path is "under" an entry when it equals it or continues with "/"
// (so /news and /news/x match, /newsletter does not).
const MOVED = ["/news", "/podcast", "/pdp-audit", "/links", "/files"];
const MOVED_EXACT = new Set(["/feed.xml", "/video-sitemap.xml", "/llms-full.txt"]);
const STATIC = ["/img", "/css", "/js", "/fonts"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseRedirects(text) {
  const map = new Map();
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const [from, to] = line.split(/\s+/);
    if (from && to) map.set(from, to);
  }
  return map;
}

const SLUGS = parseRedirects(redirectsText);

function under(path, prefixes) {
  return prefixes.some((p) => path === p || path.startsWith(p + "/"));
}

export function isMoved(path) {
  return MOVED_EXACT.has(path) || under(path, MOVED);
}

export function isStatic(path) {
  return under(path, STATIC);
}

function redirect(location) {
  return new Response(null, { status: 301, headers: { Location: location } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const readOnly = request.method === "GET" || request.method === "HEAD";

    if (THROUGHLINE_HOSTS.has(url.hostname)) {
      if (isMoved(path) || isStatic(path)) {
        const slug = readOnly && SLUGS.get(path);
        if (slug) return redirect(CANONICAL + slug + url.search);
        return env.ASSETS.fetch(request);
      }
      return fetch(request); // the app (Railway) owns the rest of throughlinecr.ai
    }

    if (path === "/api/quiz-lead") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleQuizLead(request, env);
    }

    if (readOnly && env.MOVE_REDIRECTS === "1" && isMoved(path)) {
      const target = SLUGS.get(path) || path;
      return redirect(CANONICAL + target + url.search);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleQuizLead(request, env) {
  if (!env.BUTTONDOWN_API_KEY) {
    console.error("quiz-lead: BUTTONDOWN_API_KEY is not set");
    return json({ error: "Not configured" }, 503);
  }
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = typeof data.email === "string" ? data.email.trim() : "";
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const quizResult = typeof data.quizResult === "string" ? data.quizResult.trim() : "unknown";

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "A valid email is required" }, 400);
  }

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Token " + env.BUTTONDOWN_API_KEY },
    body: JSON.stringify({
      email_address: email,
      notes: "Name: " + name + "\nQuiz result: " + quizResult + "\nMessage: " + message,
      tags: ["quiz-lead", quizResult],
    }),
  });
  if (!res.ok) {
    console.error("Buttondown subscriber create failed:", res.status, await res.text());
    return json({ error: "Buttondown request failed" }, 502);
  }
  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
