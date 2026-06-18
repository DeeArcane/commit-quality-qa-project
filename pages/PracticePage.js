class PracticePage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://your-practice-site-url.com');
    }
}

module.exports = { PracticePage };