# TAF for Report Portal: Launches Feature

**TAF (Test Automation Framework)** for **Report Portal** is a comprehensive suite leveraging powerful tools such as Playwright, Jest, Chai, Mocha, Winston and Allure to provide robust UI testing for Report Portal Launches Feature.

## Overview
TAF spans over three primary testing layers:
- **Core Level:** Encompassing configuration files for Playwright, Jest, and all the necessary dependencies
- **Business Level:** Using the Page Object Model, located in src/page_object directory
- **Test Level:** Consisting of test scenarios located in the src/tests directory

## Tools Used

- **Playwright:** Used for browser automation. Configured via `jest-playwright.config.js`.
- **Jest:** A powerful JavaScript testing framework used as the base for our testing suite. It's configured via `jest.config.js`.
- **Cucumber:** A tool for running automated tests written in plain language.
- **Chai:** A popular assertion library is used to verify our test results.
- **Mocha:** The test runner responsible for executing our tests and providing a report.
- **Allure for Jest:** A reporter used to generate a comprehensive and interactive report for our Jest tests.
- **Winston:** A robust logging library used for logging information about our tests.

## Directory Layout
```
- src
  - features
    - step_definitions
  - pages
  - tests
- Configuration files
```
## How to Run Tests

1. Run `npm install` to install all the necessary dependencies.
2. Run `npm test` to launch test execution with Playwright test runner.
3. Run `npm j-test` to launch test execution with Jest test runner.
4. Run `npm test-feature` to launch test execution with Cucumber test runner.
5. Run `npm api-tests` to launch test execution of API tests for Launches feature.


After running the tests, an Allure report can be generated using the command `allure generate --clean && allure open`. This will show a detailed report of all the test cases including the ones that failed with the error message.

Winston will create a log file in the root directory named `test-run.log`. This log file will contain details of each test case run.

## Disclaimer

The testing suite has been designed specifically for the Launches feature of the Report Portal. For any other features, the test cases may need further enhancements and modifications.