import LoginPage from '../page-objects/pages/login.page';
import DashboardsPage from "../page-objects/pages/dashboards.page";

describe('Login test suite', () => {
    it('Perform login', () => {
        LoginPage.visit();
        LoginPage.performLogin('hanna', '123456');

        DashboardsPage.getCurrentUrl();
        DashboardsPage.getHeaderTitle().should('be.visible');
    });
});