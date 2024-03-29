import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { DashboardsPage } from './pages/Dashboards.page';
import { LaunchesPage } from './pages/Launches.page';

const pageFactory = {
    loginPage: async ({ page }, use) => await use(new LoginPage(page, '')),
    dashboardsPage: async ({ page }, use) => await use(new DashboardsPage(page, '/ui/#hanna_personal/dashboard')),
    launchesPage: async ({ page }, use) => await use(new LaunchesPage(page, '/ui/#hanna_personal/launches/all'))
}

const open = async ({ page }, use) => {
    const goTo = async ({ url }) => await page.goto(url);
    await use(goTo);
}

export const test = base.extend({
    ...pageFactory,
    open
});

// export const test = base.extend({
//     open: async ({ page }, use) => {
//         const goTo = async ({ url }) => await page.goto(url);
//         await use(goTo);
//     },
//     loginPage: async ({ page }, use) => {
//         await use(new LoginPage(page));
//     },
//     dashboardsPage: async ({ page }, use) => {
//         await use(new DashboardsPage(page));
//     },
//     launchesPage: async ({ page }, use) => {
//         await use(new LaunchesPage(page));
//     },
// });