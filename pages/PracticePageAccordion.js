const { expect } = require('@playwright/test');

class PracticePageAccordion {
    constructor(page) {
        this.page = page;

        this.accordionLink = page.getByTestId('practice-accordions');
        this.accordion1 = page.getByRole('button', { name: 'Accordion 1' });
        this.accordion1Content = page.getByTestId('basic-click');
        this.accordion2 = page.getByRole('button', { name: 'Accordion 2' });
        this.accordion2Content = page.getByText('Radio button', { exact: true })
        this.accordion3 = page.getByRole('button', { name: 'Accordion 3' });
        this.accordion3Content = page.getByText('Checkbox 1');

    }


    async expectPracticePageLoaded() {
        await this.accordionLink.click();
        await expect(this.page).toHaveURL('https://commitquality.com/practice-accordions');
    }

    async clickAccordion1() {
        await this.accordion1.click();
        await expect(this.accordion1Content).toBeVisible();
    }

    async unclickAccordion1() {
        await this.accordion1.click();
        await expect(this.accordion1Content).not.toBeVisible();
    }

    async clickAccordion2() {
        await this.accordion2.click();
        await expect(this.accordion2Content).toBeVisible();
    }

    async unclickAccordion2() {
        await this.accordion2.click();
        await expect(this.accordion2Content).not.toBeVisible();
    }

    async clickAccordion3() {
        await this.accordion3.click();
        await expect(this.accordion3Content).toBeVisible();
    }

    async unclickAccordion3() {
        await this.accordion3.click();
        await expect(this.accordion3Content).not.toBeVisible();
    }
}

module.exports = { PracticePageAccordion };