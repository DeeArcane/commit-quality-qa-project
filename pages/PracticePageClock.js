const { expect } = require('@playwright/test');

class PracticePageClock {
    constructor(page) {
        this.page = page;

        this.clockLink = page.getByTestId('practice-clock');

        this.clock = page.getByTestId('clock')
        this.timer = page.getByTestId('timer');
    }

    async expectPracticePageLoaded() {
        await this.clockLink.click();
        await expect(this.page).toHaveURL(/practice-clock/);
        await expect(this.clock).toBeVisible();
        await expect(this.timer).toBeVisible();
    }

    async expectClockUpdates() {
        const firstClockValue = await this.clock.textContent();

        await this.page.waitForTimeout(1100);

        const secondClockValue = await this.clock.textContent();

        expect(secondClockValue).not.toBe(firstClockValue);
    }

    async expectTimerRunsAutomatically() {
        const firstTimerValue = await this.timer.textContent();

        await this.page.waitForTimeout(1100);

        const secondTimerValue = await this.timer.textContent();

        expect(secondTimerValue).not.toBe(firstTimerValue);
    }

    async expectTimerFormatValid() {
        const timerText = await this.timer.textContent();

        expect(timerText).toMatch(/\d+/);
    }
}

module.exports = { PracticePageClock };