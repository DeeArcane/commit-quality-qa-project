class ProductPage {
    constructor(page) {
        this.page = page;

        this.addProductNav = page.getByTestId('navbar-addproduct');
        this.productTextbox = page.getByTestId('product-textbox');
        this.priceTextbox = page.getByTestId('price-textbox');
        this.dateStockedInput = page.getByTestId('date-stocked');
        this.submitButton = page.getByTestId('submit-form');
    }

    productRow(productName) {
        return this.page.locator('tr').filter({
            hasText: productName
        });
    }

    async goToAddProductPage() {
        await this.addProductNav.click();
        await expect(this.page.getByRole('heading', { name: 'Add Product' })).toBeVisible();
    }

    async addProduct(productName, productPrice, productDate) {
        await this.goToAddProductPage();

        await this.productTextbox.fill(productName);
        await this.priceTextbox.fill(productPrice);
        await this.dateStockedInput.fill(productDate);
        await this.submitButton.click();
    }

    async editProduct(currentProductName, newProductName, newProductPrice, newProductDate) {
        const row = this.productRow(currentProductName);

        await row.getByTestId('edit-button').click();

        await expect(this.page.getByRole('heading', { name: 'Edit' })).toBeVisible();

        await this.productTextbox.fill(newProductName);
        await this.priceTextbox.fill(newProductPrice);
        await this.dateStockedInput.fill(newProductDate);
        await this.submitButton.click();
    }

    async deleteProduct(productName) {
        const row = this.productRow(productName);

        await row.getByTestId('delete-button').click();
    }

    async expectProductVisible(productName) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async expectProductNotVisible(productName) {
        await expect(this.page.getByText(productName)).not.toBeVisible();
    }
}

module.exports = { ProductPage };