const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('UI Journeys for Launches', () => {
    test.beforeEach(async ({ open, loginPage, launchesPage }) => {
        await open(loginPage);
        await loginPage.performLogin('hanna', '123456');
        await open(launchesPage);

    })

    test('User is able to see launches list sorted by most recent by default, and is able to resort them', async ({ launchesPage }) => {
     console.log(await launchesPage.launchesStartTime);
    })
});