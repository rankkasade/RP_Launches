// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    ["jest-html-reporter", { outputPath: "./report/test-report.html" }],
    ["github-actions", { silent: false }],
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js?$": "ts-jest",
  },
};
