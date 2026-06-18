const { expect } = require('@playwright/test');

class PracticePage {
    constructor(page) {
        this.page = page;

        this.noteToUserText = page.getByText('Note to User');
        this.buttonsLink = page.getByTestId('practice-general')
        this.buttonsHeading = page.getByRole('heading', { name: 'Buttons', exact: true });

        this.basicClickButton = page.getByTestId('basic-click');
        this.basicClickButtonResult = page.getByText('Button clicked')
        this.doubleClickButton = page.getByTestId('double-click');
        this.doubleClickButtonResult = page.getByText('Button double clicked')
        this.rightClickButton = page.getByTestId('right-click');
        this.rightClickButtonResult = page.getByText('Button right mouse clicked')
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

    async clickButton() {
        await this.basicClickButton.click();
        await expect(this.basicClickButtonResult).toBeVisible();
        await this.doubleClickButton.dblclick();
        await expect(this.doubleClickButtonResult).toBeVisible();
        await this.rightClickButton.click({ button: 'right' });
        await expect(this.rightClickButtonResult).toBeVisible();

    }

}

module.exports = { PracticePage };