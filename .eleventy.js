const prettier = require("prettier");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const passThroughPaths = ["src/js", "src/css", "src/images", "src/favicon.ico", "src/apple-touch-icon.png", "src/CNAME"];

module.exports = function (eleventyConfig) {
  for (const path of passThroughPaths) {
    eleventyConfig.addPassthroughCopy(path);
  }
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Add computed data to get file modification times
  eleventyConfig.addGlobalData("eleventyComputed", {
    lastModified: (data) => {
      try {
        // Get the actual input file path
        const inputPath = data.page.inputPath;
        if (inputPath) {
          // Get file stats and return modification time
          const stats = fs.statSync(inputPath);
          return stats.mtime;
        }
      } catch (error) {
        console.warn(`Could not get modification time for ${data.page.inputPath}:`, error.message);
      }
      // Fallback to page date if file stats unavailable
      return data.page.date;
    },
  });

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
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
