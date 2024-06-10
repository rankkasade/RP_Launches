import BaseComponent from './base.component';

class SideMenu extends BaseComponent {
    constructor() {
        super('.layout__sidebar-container--x8Do');
    }

    elements = {
        dashboardIcon: () => cy.get('a[href="#hr_atm_project/dashboard"]'),
        launchesIcon: () => cy.get('a[href="#hr_atm_project/launches"]'),
    }
}

export default new SideMenu();