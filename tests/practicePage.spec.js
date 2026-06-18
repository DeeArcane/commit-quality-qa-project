const { test, expect } = require('@playwright/test');
const { PracticePage } = require('../pages/PracticePage');

test.describe('Practice Page Tests', () => {
    test('Testing different types of website components', async ({ page }) => {
        const practicePage = new PracticePage(page);

        await practicePage.goto();

        await test.step('Verify practice page content', async () => {
            await expect(page.getByText('Note to User')).toBeVisible();
        });

        await test.step('Buttons', async () => {
            await page.getByRole('link', { name: /buttons/i }).click();
        });
    });
});