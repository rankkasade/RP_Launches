import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { DashboardsPage } from './pages/Dashboards.page';
import { LaunchesPage } from './pages/Launches.page';
import {DashboardDetailsPage} from "./pages/DashboardDetails.page";

const pageFactory = {
    loginPage: async ({ page }, use) => await use(new LoginPage(page, '')),
    dashboardsPage: async ({ page }, use) => await use(new DashboardsPage(page, '/ui/#hr_atm_project/dashboard')),
    launchesPage: async ({ page }, use) => await use(new LaunchesPage(page, '/ui/#hr_atm_project/launches/all')),
    dashboardDetailsPage:  async ({ page }, use) => await use(new DashboardDetailsPage(page, `/ui/#hr_atm_project/dashboard/`)),
}

const open = async ({ page }, use) => {
    const goTo = async ({ url }) => await page.goto(url);
    await use(goTo);
}

export const test = base.extend({
    ...pageFactory,
    open
});