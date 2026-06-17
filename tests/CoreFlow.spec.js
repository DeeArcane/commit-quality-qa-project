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

        await test.step('Add product to list', async () => {
            await page.getByTestId('navbar-addproduct').click();
            await expect(page.getByRole('heading', { name: 'Add Product' })).toBeVisible();
            await page.getByTestId('product-textbox').fill(TestData.AddProductData.productName);
            await page.getByTestId('price-textbox').fill(TestData.AddProductData.productPrice);
            await page.getByTestId('date-stocked').fill(TestData.AddProductData.productDate);
            await page.getByTestId('submit-form').click();

            await expect(page.getByText(TestData.AddProductData.productName)).toBeVisible();
        });
    });
});