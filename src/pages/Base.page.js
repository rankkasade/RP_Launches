export class BasePage {
    url = '';
    page;

    constructor(page, url = '') {
        this.page = page;
        this.url = url;
    }
    async getUrl() { return this.page.url(); }
}