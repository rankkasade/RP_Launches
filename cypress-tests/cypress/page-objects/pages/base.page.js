class BasePage {
    constructor(url = '') {
        this.url = url;
    }

    visit() {
        cy.visit(this.url);
    }

    getCurrentUrl() {
        return cy.url().should('include', this.url);
    }
}

export default BasePage;