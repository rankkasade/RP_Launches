module.exports = {
    preset: 'jest-playwright-preset',
    maxConcurrency: 3,
    testMatch: ['<rootDir>/src/tests/**/*.j-test.js'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    setupFiles: ['./jest-setup.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    }
};