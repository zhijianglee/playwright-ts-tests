# Playwright TS Tests

## Getting Started

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Run tests: `npx playwright test`

## Configuration

To configure the tests, edit the `playwright.config.ts` file. This file contains settings for browsers, test directories, and other options.

For secrets and sensitive data, create a `secrets.json` file based on the template provided in `secrets.template.json`. This file should contain your sensitive data and be added to `.gitignore` to avoid committing secrets.