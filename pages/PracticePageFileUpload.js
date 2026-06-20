// pages/PracticePageFileUpload.js

const { expect } = require('@playwright/test');
const path = require('path');

class PracticePageFileUpload {
    constructor(page) {
        this.page = page;

        this.fileInput = page.locator('input[type="file"]');

        // Update these locators based on the actual page text
        this.uploadedFileName = page.getByText('sample-upload.txt');
        this.heading = page.getByRole('heading', { name: /file upload/i });
    }

    async goto() {
        await this.page.goto('https://commitquality.com/practice-file-upload');
    }

    async expectFileUploadPageLoaded() {
        await expect(this.heading).toBeVisible();
        await expect(this.fileInput).toBeVisible();
    }

    async uploadSampleFile() {
        const filePath = path.join(__dirname, '..', 'tests', 'fixtures', 'sample-upload.txt');

        await this.fileInput.setInputFiles(filePath);
    }

    async expectUploadedFileVisible() {
        await expect(this.uploadedFileName).toBeVisible();
    }
}

module.exports = { PracticePageFileUpload };