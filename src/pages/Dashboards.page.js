const { BasePage } = require('./Base.page');

export class DashboardsPage extends BasePage {
    get headerTitle() { return this.page.getByTitle('All Dashboards'); }
//TBD POM for Dashboards page as a Start page for a logged-in user in Report Portal
}