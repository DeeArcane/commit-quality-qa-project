const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const TestData = require('../test-data/TestData.js');

test.describe('Core Flow Tests', () => {
    test('Login, add, edit, and delete product', async ({ page }) => {
        const login = new LoginPage(page);

        const addedProductName = `${TestData.AddProductData.productName}-${Date.now()}`;
        const editedProductName = `${TestData.EditProductData.productName}-${Date.now()}`;

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

            await page.getByTestId('product-textbox').fill(addedProductName);
            await page.getByTestId('price-textbox').fill(TestData.AddProductData.productPrice);
            await page.getByTestId('date-stocked').fill(TestData.AddProductData.productDate);
            await page.getByTestId('submit-form').click();

            await expect(page.getByText(addedProductName)).toBeVisible();
        });

        await test.step('Edit product in list', async () => {
            const productRow = page.locator('tr').filter({
                hasText: addedProductName
            });

            await productRow.getByTestId('edit-button').click();

            await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();

            await page.getByTestId('product-textbox').fill(editedProductName);
            await page.getByTestId('price-textbox').fill(TestData.EditProductData.productPrice);
            await page.getByTestId('date-stocked').fill(TestData.EditProductData.productDate);
            await page.getByTestId('submit-form').click();

            await expect(page.getByText(editedProductName)).toBeVisible();
        });

        await test.step('Delete product from list', async () => {
            const editedProductRow = page.locator('tr').filter({
                hasText: editedProductName
            });

            await editedProductRow.getByTestId('delete-button').click();

            await expect(page.getByText(editedProductName)).not.toBeVisible();
        });
    });
});

test.describe('Practice Page Tests', () => {
    test('Testing different types of website components', async ({ page }) => {
        await page.goto('https://commitquality.com/practice');

        await test.step('Verify practice page content', async () => {
            await expect(page.getByText('Note to User')).toBeVisible();
        });
    });
});