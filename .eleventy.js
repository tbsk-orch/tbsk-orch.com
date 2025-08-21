const prettier = require("prettier");
const yaml = require("js-yaml");
const { execSync } = require("child_process");

const passThroughPaths = ["src/js", "src/css", "src/images", "src/favicon.ico", "src/apple-touch-icon.png", "src/CNAME"];

// Get git commit timestamp for a file
function getGitCommitTimestamp(filePath) {
  try {
    const output = execSync(`git log --format="%ci" -n 1 -- "${filePath}"`, { encoding: "utf8" });
    return output.trim() ? new Date(output.trim()) : new Date();
  } catch (error) {
    console.warn(`Could not get git timestamp for ${filePath}, using current date`);
    return new Date();
  }
}

module.exports = function (eleventyConfig) {
  for (const path of passThroughPaths) {
    eleventyConfig.addPassthroughCopy(path);
  }
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Add computed data for proper sitemap timestamps
  eleventyConfig.addGlobalData("eleventyComputed", {
    sitemapLastmod: (data) => {
      const inputPath = data.page.inputPath;

      // For concert.html, consider both concert.njk and upcoming.yaml
      if (inputPath.includes("concert.njk")) {
        const concertTime = getGitCommitTimestamp("src/concert.njk");
        const upcomingTime = getGitCommitTimestamp("src/_data/upcoming.yaml");
        return concertTime > upcomingTime ? concertTime : upcomingTime;
      }

      // For past.html, consider both past.njk and past.yaml
      if (inputPath.includes("past.njk")) {
        const pastTime = getGitCommitTimestamp("src/past.njk");
        const pastDataTime = getGitCommitTimestamp("src/_data/past.yaml");
        return pastTime > pastDataTime ? pastTime : pastDataTime;
      }

      // For all other pages, use their template file's commit timestamp
      const relativePath = inputPath.replace("./", "");
      return getGitCommitTimestamp(relativePath);
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
