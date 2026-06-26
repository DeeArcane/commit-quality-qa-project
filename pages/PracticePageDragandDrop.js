const { expect } = require('@playwright/test');

class PracticePageDragAndDrop {
    constructor(page) {
        this.page = page;

        this.dragAndDroplink = page.getByTestId('practice-drag-drop');
        this.dragItem = page.getByTestId('small-box');
        this.dropZone = page.getByTestId('large-box');
        this.successMessage = page.getByText('success!');
    }


    async expectPracticePageLoaded() {
        await this.dragAndDroplink.click();
        await expect(this.page).toHaveURL(/practice-drag-and-drop/);
        await expect(this.dragItem).toBeVisible();
        await expect(this.dropZone).toBeVisible();
    }

    async dragItemToDropZone() {
        await this.dragItem.dragTo(this.dropZone);
    }

    async expectItemDroppedSuccessfully() {
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = { PracticePageDragAndDrop };