module.exports = {
    preset: 'jest-playwright-preset',
    testMatch: ["./src/tests/**.api.js"],
    reporters: ["jest-allure"]
};