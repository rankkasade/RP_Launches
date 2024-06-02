const { BasePage } = require('./Base.page');

export class DashboardDetailsPage extends BasePage {
    dashboardId = '';
    dashboardUrl = ''

    async getUrl() { return this.page.url(); }

    setDashboardId(dashboardId) {
        this.dashboardId = dashboardId;
        this.dashboardUrl = this.url + dashboardId;
    }

    async selectFirstNativeWidgets() {
        return await this.page.evaluate(selector => document.querySelector(selector) , '.react-draggable');
    }

}