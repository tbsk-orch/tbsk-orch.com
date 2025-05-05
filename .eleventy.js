const prettier = require("prettier");

const passThroughPaths = ["src/js", "src/css", "src/images", "src/favicon.ico", "src/apple-touch-icon.png", "src/CNAME"];

module.exports = function (eleventyConfig) {
  for (const path of passThroughPaths) {
    eleventyConfig.addPassthroughCopy(path);
  }

  // https://bnijenhuis.nl/notes/adding-prettier-in-eleventy-using-transforms/
  eleventyConfig.addTransform("prettier", async (content, outputPath) => {
    if (outputPath?.endsWith(".html")) {
      return prettier.format(content, {
        parser: "html",
        printWidth: 500,
        tabWidth: 2,
        endOfLine: "lf",
        useTabs: false,
      });
    }
    return content;
  });
  return {
    dir: {
      input: "src",
      includes: "../_includes",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
