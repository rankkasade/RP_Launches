const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('JS executors test suite', () => {
    test.beforeEach(async ({ open, loginPage }) => {
        await open(loginPage);
        await loginPage.performLogin('hanna', '123456');
    })

    test('Drag & drop', async ({ dashboardsPage, dashboardDetailsPage }) => {
        await dashboardsPage.navigateToDashboardByName('DEMO DASHBOARD', dashboardDetailsPage);

        console.log(await dashboardDetailsPage.selectFirstNativeWidgets());

        // await expect(dashboardDetailsPage.headerTitle).toBeVisible();
    })
});