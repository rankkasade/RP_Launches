const { BasePage } = require('./Base.page');

export class LoginPage extends BasePage {
    get login() { return this.page.getByPlaceholder('login' ); }

    get password() { return this.page.getByPlaceholder('password'); }

    get loginBtn() { return this.page.getByRole('button', { title: 'Login' }); }

    async performLogin(login, password) {
        await this.login.fill(login);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}