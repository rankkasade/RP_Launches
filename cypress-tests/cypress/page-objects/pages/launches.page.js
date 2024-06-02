import BasePage from './base.page';

class LaunchesPage extends BasePage {
    constructor() {
        super('/ui/#hr_atm_project/launches/all');
    }

    elements = {
        resortByTimestamps: () => cy.get('.gridHeader__grid-header--KArbb div:nth-child(3) .headerCell__arrow--wDdko'),
        launchTimestamps: () => cy.get('.absRelTime__absolute-time--BNmQc').then($elements => $elements.toArray()),
        launchGridRow: () => cy.get('.gridRow__grid-row--X9wIq'),
        launchNameLink: () => cy.get('.launchSuiteGrid__name-col--rSvdG .itemInfo__name--Nz97v > span').then($elements => $elements.toArray()),
        totalCountData: (row) => row.get('.launchSuiteGrid__total-col--_LYaT'),
        passedCountData: (row) => row.get('.launchSuiteGrid__passed-col--qT6Ay'),
        failedCountData: (row) => row.get('.launchSuiteGrid__failed-col--dDt4e'),
        skippedCountData: (row) => row.get('.launchSuiteGrid__skipped-col--Wx2XJ'),
        prodBugCountData: (row) => row.get('.launchSuiteGrid__pb-col--QoQdW'),
        autoBugCountData: (row) => row.get('.launchSuiteGrid__ab-col--cmhGC'),
        systemIssueCountData: (row) => row.get('.launchSuiteGrid__si-col--yM7Bg'),
        toInvestigateCountData: (row) => row.get('.launchSuiteGrid__ti-col--qV5Sv'),
        launchCheckboxes: () => cy.get('.checkboxCell__checkbox-cell--zLBGx .checkIcon__square--Exwkc').then($elements => $elements.toArray()),
        actionsDropdown: () => cy.get('.actionPanel__action-button--dcl1L > div'),
        compareOption: () => cy.get('.actionPanel__action-buttons--Owmhz > div:nth-child(2) .ghostMenuButton__menu--xPeTl > div:nth-child(3)'),
        deleteOption: () => cy.get('.actionPanel__action-buttons--Owmhz > div:nth-child(2) .ghostMenuButton__menu--xPeTl > div:nth-child(6)'),
        compareLaunchesPopup: () => cy.get('.modalLayout__scrolling-content--z2e1T > div > div:nth-child(1) > span > div'),
        deleteLaunchPopup: () => cy.get('.modalLayout__scrolling-content--z2e1T > div > div:nth-child(1) > span > div'),
        deleteLaunchButton: () => cy.get('.modalLayout__scrolling-content--z2e1T .modalFooter__buttons-block--Bplno > div:nth-child(2) > button'),
        compareLaunchesTooltip: () => cy.get('.modalLayout__scrolling-content--z2e1T .modalContent__modal-content--xbIue > div > div > div > div'),

    }

    selectFirstLaunches = () => {
        this.elements.launchCheckboxes().first().click();
        this.elements.launchCheckboxes().eq(1).click();
    };

    selectLaunchToRemove = () => {
        return this.elements.launchCheckboxes().eq(4);
    };

    selectLaunchToNavigate = () => {
        return this.elements.launchNameLink().eq(15);
    };

    extractLaunchNameFromLaunchRef = (navigatedElementRef) => {
        if (!navigatedElementRef) {
            return null;
        }
        return navigatedElementRef.parent().parent().parent().parent().parent().parent().parent();

    };


    extractLaunchRowFromLaunchRef = (removedElementRef) => {
        if (!removedElementRef) {
            return null;
        }
        return removedElementRef.parent().parent().parent().parent();
    };


}

export default new LaunchesPage();