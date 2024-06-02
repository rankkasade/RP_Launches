import LoginPage from '../page-objects/pages/login.page';
import SideMenu from "../page-objects/components/side-menu.component";
import LaunchesPage from "../page-objects/pages/launches.page";


describe('Task 2 test suite', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.performLogin('hanna', '123456');
        SideMenu.elements.launchesIcon().click();
        cy.url().should('include', '/launches');
    });

    it('Launches list is sorted by most recent by default',   (done) => {
        //Extracting absolute timestamps
        LaunchesPage.elements.launchTimestamps().then(elems => {
            const sourceTimestamps = Array.from(elems).map(x => new Date(x.innerText));

            //Re-sorting absolute timestamps in descending (from newest to oldest) order
            const expectedSorting = [...sourceTimestamps].sort((a, b) => a.valueOf() + b.valueOf());

            //Verifying that initially extracted absoluter timestamps have the same order
            expect(expectedSorting).to.deep.equal(sourceTimestamps);
            done();
        })
    });

    it('Launches list is resorted from most recent to the earliest',   (done) => {
        //Re-sorting Launches
        LaunchesPage.elements.resortByTimestamps().click();

        //Extracting absolute timestamps
        LaunchesPage.elements.launchTimestamps().then(elems => {
            const sourceTimestamps = Array.from(elems).map(x => new Date(x.innerText));

            //Re-sorting absolute timestamps in ascending (from oldest to newest) order
            const expectedSorting = [...sourceTimestamps].sort((a, b) => a.valueOf() - b.valueOf());

            //Verifying that initially extracted absoluter timestamps have the same order
            expect(expectedSorting).to.deep.equal(sourceTimestamps);
            done();
        })
    });

    it('Each launch contains tests count data',   (done) => {
        //extracting all grid rows
        LaunchesPage.elements.launchGridRow().each(($row) => {
            const row = cy.wrap($row)

            //Verifying that each grid row always has Total data counter visible and has placeholders for all remaining data counters
            LaunchesPage.elements.totalCountData(row).should('be.visible');
            LaunchesPage.elements.passedCountData(row).should('exist');
            LaunchesPage.elements.failedCountData(row).should('exist');
            LaunchesPage.elements.skippedCountData(row).should('exist');
            LaunchesPage.elements.prodBugCountData(row).should('exist');
            LaunchesPage.elements.autoBugCountData(row).should('exist');
            LaunchesPage.elements.systemIssueCountData(row).should('exist');
            LaunchesPage.elements.toInvestigateCountData(row).should('exist');
            done();
        });
    });

    it('Several launches can be selected and compared',   () => {
        LaunchesPage.selectFirstLaunches();

        // Performing the actions for comparing selected rows
        LaunchesPage.elements.actionsDropdown().click();
        LaunchesPage.elements.compareOption().click();
        // Verifying that user can see comparison data
        LaunchesPage.elements.compareLaunchesPopup().should('be.visible');
        LaunchesPage.elements.compareLaunchesTooltip().should('be.visible')

    });

    it('Launches can be removed',   (done) => {
        // Extract to the checkbox to properly reuse them after extracting the id
        const selectedLaunchCheckbox = LaunchesPage.selectLaunchToRemove();

        // Extracting the root row element
        LaunchesPage.extractLaunchRowFromLaunchRef(selectedLaunchCheckbox).then(removedLaunchNumber => {
            const selectedLaunchId = removedLaunchNumber.data('id');

            // Performing the actions for removing the target row
            LaunchesPage.selectLaunchToRemove().click();
            LaunchesPage.elements.actionsDropdown().click();
            LaunchesPage.elements.deleteOption().click();
            LaunchesPage.elements.deleteLaunchPopup().should('be.visible');
            LaunchesPage.elements.deleteLaunchButton().click();
            LaunchesPage.elements.deleteLaunchPopup().should('not.exist');

            // Validate that row is gone after performing the necessary actions
            cy.get(`[data-id="${selectedLaunchId}"]`).should('not.exist').then(() => done());
        });
    });

    it('General Launch details can be viewed',   (done) => {
        LaunchesPage.elements.launchGridRow().eq(30).scrollIntoView().should('be.visible');
        const launchToNavigate = LaunchesPage.selectLaunchToNavigate();

        // Extracting the root row element
        LaunchesPage.extractLaunchNameFromLaunchRef(launchToNavigate).then(navigatedLaunchName => {
            const navigatedLaunchId = navigatedLaunchName.data('id');

            // Navigate to selected launch
            LaunchesPage.selectLaunchToNavigate().click();


            // Validate that details page for the selected launch opened
            cy.url().should('include', `/launches/all/${navigatedLaunchId}`).then(() => done());
        });
    });


});



