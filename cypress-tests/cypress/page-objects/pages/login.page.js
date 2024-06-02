import BasePage from './base.page';

class LoginPage extends BasePage {
    constructor() {
        super('ui/#login');
    }

    elements = {
        loginInput: () => cy.get('input[placeholder="Login"]'),
        passwordInput: () => cy.get('input[placeholder="Password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
    }

    enterLogin(login) {
        this.elements.loginInput().type(login);
    }

    enterPassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickLoginButton() {
        this.elements.loginButton().click();
    }

    performLogin(login, password) {
        this.enterLogin(login);
        this.enterPassword(password);
        this.clickLoginButton();
    }
}

export default new LoginPage();