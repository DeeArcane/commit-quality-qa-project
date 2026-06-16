class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://commitquality.com/login');
    }

    async login(email, password) {
        await this.page.getByTestId('username-textbox').fill(email);
        await this.page.getByTestId('password-textbox').fill(password);
        await this.page.getByTestId('login-button').click();
    }
}

module.exports = { LoginPage };       