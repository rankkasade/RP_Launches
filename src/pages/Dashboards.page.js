const { BasePage } = require('./Base.page');

export class DashboardsPage extends BasePage {
    url = '/ui/#hanna_personal/dashboard';

    get headerTitle() { return this.page.locator('span[title=\'All Dashboards\']'); }

//TBD POM for Dashboards page as a Start page for a logged-in user in Report Portal
}