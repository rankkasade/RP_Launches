const { BasePage } = require('./Base.page');

export class LoginPage extends BasePage {
    get login() { return this.page.locator('input[name=\'login\']'); }

    get password() { return this.page.locator('input[name=\'password\']'); }

    get loginBtn() { return this.page.locator('button[type=\'submit\']'); }

    async performLogin(login, password) {
        await this.login.fill(login);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}