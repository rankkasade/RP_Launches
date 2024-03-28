import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { DashboardsPage } from './pages/Dashboards.page';
import { LaunchesPage } from './pages/Launches.page';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardsPage: async ({ page }, use) => {
        await use(new DashboardsPage(page));
    },
    launchesPage: async ({ page }, use) => {
        await use(new LaunchesPage(page));
    },
});