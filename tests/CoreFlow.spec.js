const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const TestData = require('../test-data/TestData.js');

test.describe('Core Flow Tests', () => {
    test('Login, add, edit, and delete product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        const addedProductName = `${TestData.AddProductData.productName}-${Date.now()}`;
        const editedProductName = `${TestData.EditProductData.productName}-${Date.now()}`;

        await test.step('Login to the application', async () => {
            await loginPage.goto();

            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

            await loginPage.login(
                TestData.LoginData.email,
                TestData.LoginData.password
            );

            await expect(page.getByText('Logout')).toBeVisible();
        });

        await test.step('Add product to list', async () => {
            await productPage.addProduct(
                addedProductName,
                TestData.AddProductData.productPrice,
                TestData.AddProductData.productDate
            );

            await productPage.expectProductVisible(addedProductName);
        });

        await test.step('Edit product in list', async () => {
            await productPage.editProduct(
                addedProductName,
                editedProductName,
                TestData.EditProductData.productPrice,
                TestData.EditProductData.productDate
            );

            await productPage.expectProductVisible(editedProductName);
        });

        await test.step('Delete product from list', async () => {
            await productPage.deleteProduct(editedProductName);

            await productPage.expectProductNotVisible(editedProductName);
        });
    });
});