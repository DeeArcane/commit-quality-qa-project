const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const TestData = require('../test-data/TestData.js');


test.describe('Core Flow Tests', () => {
    test('Login and add product to list', async ({ page }) => {
        const login = new LoginPage(page);
        //const product = new ProductPage(page);

        await test.step('Login to the application', async () => {
            await login.goto();
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
            await login.login(
                TestData.LoginData.email,
                TestData.LoginData.password
            );
            await expect(page.getByText('Logout')).toBeVisible();

        });
    });
});