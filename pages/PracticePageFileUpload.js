// pages/PracticePageFileUpload.js

const { expect } = require('@playwright/test');
const path = require('path');

class PracticePageFileUpload {
    constructor(page) {
        this.page = page;

        this.fileuploadLink = page.getByTestId('practice-file-upload');

        this.fileInput = page.getByTestId('file-input');
        this.fileNameDisplay = page.getByTestId('file-name-display');
        this.submitButton = page.getByRole('button', { name: 'Submit' })
    }

    async expectPracticePageLoaded() {
        await this.fileuploadLink.click();
        await expect(this.page).toHaveURL(/practice-file-upload/);
        await expect(this.fileInput).toBeVisible();
    }

    async uploadFile(fileName) {
        const filePath = path.join(__dirname, `../test-data/${fileName}`);
        await this.fileInput.setInputFiles(filePath);
    }

    async verifyFileUploaded(fileName) {
        const uploadedFileName = await this.fileInput.evaluate(input => input.files[0].name);
        expect(uploadedFileName).toBe(fileName);
    }

    async submitFile() {
        await this.submitButton.click();
    }

}
module.exports = { PracticePageFileUpload };