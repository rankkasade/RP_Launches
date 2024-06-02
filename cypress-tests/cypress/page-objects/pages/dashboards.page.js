import BasePage from './base.page';

class DashboardsPage extends BasePage {
    constructor() {
        super('/ui/#hr_atm_project/dashboard');
    }

    elements = {
        headerTitle: () => cy.get('span[title="All Dashboards"]'),
    }

    getHeaderTitle() {
        return this.elements.headerTitle();
    }
}

export default new DashboardsPage();