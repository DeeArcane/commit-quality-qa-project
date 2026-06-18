const { test } = require('@playwright/test');
const { PracticePage } = require('../pages/PracticePage');

test.describe('Practice Page Tests', () => {
    test('Testing different types of website components', async ({ page }) => {
        const practicePage = new PracticePage(page);

        await practicePage.goto();

        await test.step('Verify practice page content', async () => {
            await practicePage.expectPracticePageLoaded();
        });

        await test.step('Verify redirected to buttons practice page', async () => {
            await practicePage.goToButtonsPracticePage();
        });

        await test.step('Verify different button interactions work as expected', async () => {
            await practicePage.clickButton();
        });

        await test.step('Verify radio button interactions work as expected', async () => {
            await practicePage.radioButton();
        });

        await test.step('Verify dropdown interactions work as expected', async () => {
            await practicePage.dropdownButton();
        });

        await test.step('Verify checkbox interactions work as expected', async () => {
            await practicePage.checkBox();
        });
    });
});