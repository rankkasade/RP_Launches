module.exports = {
    preset: 'jest-playwright-preset',
    maxConcurrency: 3,
    testMatch: ['<rootDir>/src/tests/**/*.j-test.js'],
    reporters: ["jest-allure"],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    }
};