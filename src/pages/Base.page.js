export class BasePage {
    url = '';

    page;

    constructor(page) {
        this.page = page;
    }
    async getUrl() { return this.page.url(); }

    async navigate() {
        await this.page.goto(this.url);
    }
}