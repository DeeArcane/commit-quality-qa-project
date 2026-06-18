const { expect } = require('@playwright/test');

class PracticePage {
    constructor(page) {
        this.page = page;

        this.noteToUserText = page.getByText('Note to User');
        this.buttonsLink = page.getByRole('link', { name: /buttons/i });
        this.buttonsHeading = page.getByRole('heading', { name: 'Buttons', exact: true });
    }

    async goto() {
        await this.page.goto('https://commitquality.com/practice');
    }

    async expectPracticePageLoaded() {
        await expect(this.noteToUserText).toBeVisible();
    }

    async goToButtonsPracticePage() {
        await this.buttonsLink.click();

        await expect(this.page).toHaveURL(/practice-general-components/);
        await expect(this.buttonsHeading).toBeVisible();
    }
}

module.exports = { PracticePage };