# TBSK管弦楽団 Website (tbsk-orch.com)

TBSK管弦楽団 is a Japanese amateur orchestra website built with 11ty (Eleventy) static site generator. The site provides information about the orchestra, upcoming/past concerts, member recruitment, and performance videos.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Essential Setup Commands
Run these commands in exact order for any fresh clone:

```bash
# Verify Node.js is available (requires Node.js 18+)
node --version

# Install dependencies using Yarn (REQUIRED - do not use npm)
yarn install

# Build the site (very fast ~1 second)
yarn build

# Verify linting passes
yarn lint-check
```

**CRITICAL**: Always use `yarn` commands, never `npm`. The repository is configured for Yarn package management.

### Development Server
```bash
# Start development server with hot reload
yarn start
# Serves on http://localhost:8080/
# Auto-reloads on file changes
# Build time: ~1 second - very fast, no timeout concerns
```

### Build and Test Commands
```bash
# Production build (output to dist/)
yarn build
# Build time: ~1 second - FAST, no cancellation risk

# Check code formatting
yarn lint-check  
# Runtime: ~0.6 seconds

# Auto-fix formatting issues
yarn lint
# Runtime: ~1 second - fixes and formats all .js, .css, .njk files
```

**TIMING EXPECTATIONS**: All commands are very fast (1-9 seconds). No special timeout handling required.

## Validation Requirements

### Always Complete These Steps After Changes:
1. **Build validation**: `yarn build` - must complete without errors
2. **Lint validation**: `yarn lint-check` - must pass without formatting issues  
3. **Development server test**: `yarn start` and manually verify pages load at http://localhost:8080/
4. **Manual navigation test**: Click through key pages (homepage, 当団について, 今後の演奏会) to verify layout and functionality

### Manual Testing Scenarios:
After any code changes, ALWAYS verify these scenarios work:

1. **Homepage loads correctly**: Navigate to http://localhost:8080/ and verify:
   - TBSK logo displays
   - Navigation menu functions
   - News/announcements are visible
   - Social media links work

2. **Navigation works**: Test main menu links:
   - ホーム (index.html) 
   - 当団について (shokai.html)
   - 今後の演奏会 (concert.html)
   - 団員募集 (boshu.html)

3. **Responsive design**: Verify page layout adapts on different screen sizes

### Pre-commit Checklist:
- [ ] `yarn build` completes successfully
- [ ] `yarn lint-check` passes without errors
- [ ] Development server loads without console errors
- [ ] Manual navigation test completed

## Repository Structure

### Key Directories:
```
src/                 # Source files
├── _data/          # YAML data files (concerts, site config)
├── _includes/      # Nunjucks templates and partials
├── css/            # Stylesheets
├── images/         # Static images
├── js/             # JavaScript files (minimal - only adrs.js)
└── *.njk           # Page templates

dist/               # Built output (auto-generated)
.eleventy.js        # 11ty configuration
package.json        # Dependencies and scripts
```

### Important Files:
- **Content updates**: Edit YAML files in `src/_data/` (upcoming.yaml, past.yaml, site.yaml)
- **Page templates**: Nunjucks files in `src/` (index.njk, shokai.njk, etc.)
- **Styling**: `src/css/common.css` (main stylesheet)
- **Layouts**: `src/_includes/layouts/base.njk` (main page template)
- **Build config**: `.eleventy.js` (11ty configuration)

### Data Files (Frequently Modified):
- `src/_data/upcoming.yaml` - Future concert information
- `src/_data/past.yaml` - Historical concert data  
- `src/_data/site.yaml` - Site-wide configuration (URL, etc.)

## Content Management

### Adding New Concerts:
1. Edit `src/_data/upcoming.yaml` for future concerts
2. Move completed concerts from `upcoming.yaml` to `src/_data/past.yaml`  
3. Always test with `yarn start` to verify data displays correctly

### Updating Site Content:
- News/announcements: Edit `src/index.njk`
- About page: Edit `src/shokai.njk`
- Member recruitment: Edit `src/boshu.njk`
- FAQ/Contact: Edit `src/fanq.njk`

## CI/CD Pipeline

### GitHub Actions (.github/workflows/):
- **main.yml**: PR validation (linting + link checking)
- **deploy-gh-pages.yml**: Deployment to GitHub Pages on master branch

### Before Submitting PRs:
```bash
# ALWAYS run these before creating a PR
yarn lint-check    # Must pass
yarn build         # Must complete successfully
```

**The CI will fail if linting does not pass.** Always run `yarn lint` to auto-fix formatting issues.

## Common Tasks Reference

### Repository Root Contents:
```
.eleventy.js      # 11ty build configuration
.github/          # GitHub Actions workflows
.gitignore        # Ignores node_modules, dist/
README.md         # Repository documentation (in Japanese)
package.json      # Dependencies and scripts
src/              # Source files
yarn.lock         # Yarn dependency lock file
```

### Package.json Scripts:
```json
{
  "scripts": {
    "start": "eleventy --serve",    # Development server
    "build": "eleventy",            # Production build  
    "lint": "prettier --write ...", # Auto-fix formatting
    "lint-check": "prettier --check ..." # Check formatting
  }
}
```

### Technology Stack:
- **Static Site Generator**: 11ty (Eleventy) v2.0.0
- **Template Engine**: Nunjucks (.njk files)
- **Package Manager**: Yarn (required)
- **Linting**: Prettier for code formatting
- **Deployment**: GitHub Pages via GitHub Actions
- **Development**: Hot-reload development server

## Troubleshooting

### Common Issues:
1. **Build fails**: Check for syntax errors in Nunjucks templates or YAML data files
2. **Lint failures**: Run `yarn lint` to auto-fix, then `yarn lint-check` to verify
3. **Dev server won't start**: Ensure port 8080 is available, restart if needed
4. **Missing dependencies**: Run `yarn install` (never use `npm install`)

### Emergency Commands:
```bash
# Clean rebuild
rm -rf node_modules dist/
yarn install
yarn build

# Reset development server  
# Stop current server, then:
yarn start
```

**Remember**: This is a simple, fast-building static site. Build and test operations complete in seconds, making rapid iteration easy.