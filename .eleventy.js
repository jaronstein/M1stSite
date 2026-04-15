const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("autolink", (text) => {
    if (!text) return '';
    // Strip Unicode word-joiner characters Castos wraps around URLs
    text = text.replace(/\u2060/g, '');
    // Convert bare http/https URLs not already inside an href to clickable links
    return text.replace(
      /(?<!href=["'])https?:\/\/[^\s<>"]+/g,
      (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
  });

  eleventyConfig.addFilter("durationToSeconds", (duration) => {
    if (!duration) return null;
    const parts = duration.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return null;
  });

  eleventyConfig.addFilter("plaintext", (str) => {
    if (!str) return '';
    return str.replace(/<[^>]+>/g, '').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'");
  });

  const STOPWORDS = new Set([
    "a","an","the","and","or","but","in","on","at","to","for","of","with",
    "by","from","is","it","its","as","be","was","are","were","has","have",
    "had","do","does","did","not","this","that","these","those","your","our",
    "their","how","what","why","when","who","will","can","should","would",
    "could","if","we","you","they","he","she","i","my","me","us","them",
    "all","just","more","most","some","any","one","two","three","four","five",
    "no","so","up","out","about","than","then","there","here","now","get",
    "into","over","after","before","right","left","new","old","good","best",
  ]);

  function tokenize(text) {
    if (!text) return new Set();
    return new Set(
      text.toLowerCase()
        .replace(/<[^>]+>/g, " ")
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 3 && !STOPWORDS.has(w))
    );
  }

  eleventyConfig.addFilter("getRelatedEpisodes", (allEpisodes, currentSlug, limit = 3) => {
    if (!allEpisodes) return [];
    const current = allEpisodes.find(e => e.slug === currentSlug);
    if (!current) return allEpisodes.filter(e => e.slug !== currentSlug).slice(0, limit);

    const currentTokens = tokenize(
      (current.title || "") + " " + (current.plainDescription || "")
    );

    return allEpisodes
      .filter(e => e.slug !== currentSlug)
      .map(ep => {
        const epTokens = tokenize(
          (ep.title || "") + " " + (ep.plainDescription || "")
        );
        const overlap = [...currentTokens].filter(w => epTokens.has(w)).length;
        return { ep, score: overlap };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ ep }) => ep);
  });

  eleventyConfig.addFilter("getRelatedPosts", (allPosts, currentUrl, limit = 3) => {
    const current = allPosts.find(p => p.url === currentUrl);
    if (!current) return allPosts.filter(p => p.url !== currentUrl).slice(0, limit);

    const currentTokens = tokenize(
      (current.data.title || "") + " " + (current.data.description || "")
    );

    return allPosts
      .filter(p => p.url !== currentUrl)
      .map(post => {
        const postTokens = tokenize(
          (post.data.title || "") + " " + (post.data.description || "")
        );
        const overlap = [...currentTokens].filter(w => postTokens.has(w)).length;
        return { post, score: overlap };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => post);
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  });

  eleventyConfig.addShortcode("inlineCSS", function () {
    const raw = fs.readFileSync(path.join(__dirname, "src/css/style.css"), "utf8");
    return new CleanCSS({}).minify(raw).styles;
  });

  eleventyConfig.addShortcode("inlineJS", function (file) {
    return fs.readFileSync(path.join(__dirname, "src/js", file), "utf8");
  });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/news/*.md").reverse()
  );

  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
