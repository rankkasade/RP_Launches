const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Login test suite', () => {
    test('Perform login', async ({ open, loginPage, dashboardsPage }) => {
        await open(loginPage);
        await loginPage.performLogin('hanna', '123456');
        await expect(dashboardsPage.headerTitle).toBeVisible();
    })
});