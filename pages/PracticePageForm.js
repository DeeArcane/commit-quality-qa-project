const { expect } = require('@playwright/test');
class PracticePageForm {
    constructor(page) {
        this.page = page;

        this.formLink = page.getByTestId('practice-contact-form');

        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.optionInput = page.getByTestId('query-type');
        this.dateInput = page.getByTestId('dob');
        this.checkboxInput = page.getByTestId('practice-checkbox');

        this.submitButton = page.getByTestId('submit-button');

    }

    async expectPracticePageLoaded() {
        await this.formLink.click();
        await expect(this.page).toHaveURL(/practice-contact-form/);
        await expect(this.page.getByText('Contact Us')).toBeVisible();
    }

    async fillForm(name, email, option, date) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.optionInput.selectOption(option);
        await this.dateInput.fill(date);
        await this.checkboxInput.check();

    }

    async submitForm() {
        await this.submitButton.click();
    }



}

module.exports = { PracticePageForm };