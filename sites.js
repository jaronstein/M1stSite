// Two hosts build from this one repo (2026-11-12):
//   mobile1st.com    — the agency pages (home, about, quiz).
//   throughlinecr.ai — the content that moved (news, podcast, pdp-audit, links, feeds),
//                      served there by worker.js.
// Every absolute URL a template writes (canonical, og:url, JSON-LD) comes from
// `site.url`: src/_data/site.js sets MOBILE1ST for every page, and the moved
// directories override it with THROUGHLINE in their own *.11tydata.js.
module.exports = {
  MOBILE1ST: { brand: "mobile1st", url: "https://mobile1st.com", name: "Mobile1st" },
  THROUGHLINE: { brand: "throughline", url: "https://throughlinecr.ai", name: "Throughline CR" },
};
