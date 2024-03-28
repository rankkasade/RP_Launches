const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('', () => {
    test('Perform login', async ({ loginPage, dashboardsPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('hanna', '123456');

        await expect(dashboardsPage.headerTitle).toBeVisible();
    });
});