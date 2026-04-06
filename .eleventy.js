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
