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

        this.radioButton1 = page.getByTestId('option1')
        this.radioButton1Result = page.getByText('Option1 Clicked')
        this.radioButton2 = page.getByTestId('option2')
        this.radioButton2Result = page.getByText('Option2 Clicked')

        this.dropdown = page.getByRole('combobox')
        this.dropdownResult = page.getByText('Option 1')
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

    async radioButton() {
        await this.radioButton1.click();
        await expect(this.radioButton1Result).toBeVisible();
        await this.radioButton2.click();
        await expect(this.radioButton1Result).not.toBeVisible();
        await expect(this.radioButton2Result).toBeVisible();
    }

    async dropdownButton() {
        await this.dropdown.selectOption('option1');
        await expect(this.dropdown).toHaveValue('option1');

    }

}

module.exports = { PracticePage };