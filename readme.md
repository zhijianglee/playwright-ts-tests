# Playwright TS Tests

## Getting Started

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Run tests: `npx playwright test`

## Configuration

To configure the tests, edit the `playwright.config.ts` file. This file contains settings for browsers, test directories, and other options.

For secrets and sensitive data, create a `secrets.json` file based on the template provided in `secrets.template.json`. This file should contain your sensitive data and be added to `.gitignore` to avoid committing secrets.

## Running the test

To execute API tests
```
npx playwright test --project=api
```

To execute UI tests
```
npx playwright test --project=ui
```

To execute both
```
npx playwright test --project=ui --project=api
```

## Note
API tests are running using mocked server https://github.com/typicode/json-server as https://jsonplaceholder.typicode.com/ doesn't reflect data that has been posted. 

Follow the instructios specified in https://github.com/typicode/json-server

For the posts array in db.json, please use the below schema

```
{
      "userId": 1,
      "id": "2",
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
}
```