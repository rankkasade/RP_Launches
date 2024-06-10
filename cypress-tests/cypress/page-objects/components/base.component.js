class BaseComponent {
    constructor(rootSelector) {
        this.rootSelector = rootSelector;
    }

    get rootEl() {
        return cy.get(this.rootSelector);
    }
}
export default BaseComponent;