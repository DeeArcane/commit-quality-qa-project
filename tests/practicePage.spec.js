const { test } = require('@playwright/test');
const { PracticePageButton } = require('../pages/PracticePageButton');
const { PracticePageAccordion } = require('../pages/PracticePageAccordion');
const { PracticePageFileUpload } = require('../pages/PracticePageFileUpload');

test.describe('Practice Page Tests', () => {
    let practicePage;

    test.beforeEach(async ({ page }) => {
        practicePage = new PracticePageButton(page);

        await practicePage.goto();
        await practicePage.expectPracticePageLoaded();
    });
    test('Testing different types Buttons of website components', async ({ page }) => {

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

        await test.step('Verify link interactions work as expected', async () => {
            await practicePage.linkButton();
        });
    });
    test('Testing Accordion ', async ({ page }) => {
        const practicePageAccordion = new PracticePageAccordion(page);
        await practicePage.goto();

        await test.step('Accordion 1 content and functions work as expected', async () => {
            await practicePageAccordion.expectPracticePageLoaded();
            await practicePageAccordion.clickAccordion1();
            await practicePage.clickButton();
            await practicePageAccordion.unclickAccordion1();
        });

        await test.step('Accordion 2 content and functions work as expected', async () => {
            await practicePageAccordion.clickAccordion2();
            await practicePage.radioButton();
            await practicePageAccordion.unclickAccordion2();
        });

        await test.step('Accordion 3 content and functions work as expected', async () => {
            await practicePageAccordion.clickAccordion3();
            await practicePage.checkBox();
            await practicePageAccordion.unclickAccordion3();
        });
    });

    test('Practice File Upload Tests', async ({ page }) => {
        const practicePageFileUpload = new PracticePageFileUpload(page);
        await practicePage.goto();

        await test.step('Verify practice page content', async () => {
            await practicePageFileUpload.expectPracticePageLoaded();
        });

        await test.step('Verify file upload functionality', async () => {
            await practicePageFileUpload.uploadFile('test.txt');
            await practicePageFileUpload.verifyFileUploaded('test.txt');
            await practicePageFileUpload.submitFile();
        });
    });
});