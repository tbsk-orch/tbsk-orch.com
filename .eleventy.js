const prettier = require("prettier");
const yaml = require("js-yaml");
const { execSync } = require("child_process");

const passThroughPaths = ["src/js", "src/css", "src/images", "src/favicon.ico", "src/apple-touch-icon.png", "src/CNAME"];

module.exports = function (eleventyConfig) {
  for (const path of passThroughPaths) {
    eleventyConfig.addPassthroughCopy(path);
  }
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Add computed data to get file commit times
  eleventyConfig.addGlobalData("eleventyComputed", {
    lastModified: (data) => {
      try {
        // Get the actual input file path
        const inputPath = data.page.inputPath;
        if (inputPath) {
          // Get the last commit date for this file using Git
          const gitCommand = `git log -1 --format="%ad" --date=iso -- "${inputPath}"`;
          const result = execSync(gitCommand, { 
            encoding: 'utf-8', 
            cwd: process.cwd(),
            stdio: ['pipe', 'pipe', 'pipe']
          }).trim();
          
          if (result) {
            return new Date(result);
          }
        }
      } catch (error) {
        console.warn(`Could not get commit time for ${data.page.inputPath}:`, error.message);
      }
      // Fallback to page date if Git command fails
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
