const { BasePage } = require('./Base.page');

export class DashboardsPage extends BasePage {
    get headerTitle() { return this.page.getByTitle('All Dashboards'); }

    getDashboardByName(dashboardName) {
        return this.page.getByRole('link', { name: dashboardName });
    }

    async navigateToDashboardByName(dashboardName, dashboardDetailsPage) {
        const dashboardRef = await this.getDashboardByName(dashboardName);

        // Navigating
        await dashboardRef.click();

        // Get context from navigated page
        const pageUrl = await this.page.url();
        const pageSegments = pageUrl.split('/');

        // Set to the following page object the following metadata
        if (dashboardDetailsPage) {
            dashboardDetailsPage.setDashboardId(pageSegments[pageSegments.length - 1]);
        }
    }
}