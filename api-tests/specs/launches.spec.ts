import {describe, test} from '@jest/globals';

import {addConfigToFetch, getBasePath, getLongRunningTimeout, getProjectName} from '../helpers/helpers';
import * as ReportPortalAPI from "../report-portal-api-swagger-autogenerated";


describe('Tests for RP Launches API', () => {
    let launchControllerApi: ReportPortalAPI.LaunchControllerApi;
    let demoDataControllerApi: ReportPortalAPI.DemoDataControllerApi;
    let demoDataRs: ReportPortalAPI.DemoDataRs;

    beforeAll(async () => {
        launchControllerApi = new ReportPortalAPI.LaunchControllerApi(undefined, getBasePath());
        demoDataControllerApi = new ReportPortalAPI.DemoDataControllerApi(undefined, getBasePath());

        demoDataRs = await demoDataControllerApi.generateUsingPOST({createDashboard: false}, getProjectName(), addConfigToFetch())
    }, getLongRunningTimeout());

    // GET positive query
    test('should have the right project launches', async () => {
        const data = await launchControllerApi.getAllLaunchNamesUsingGET(getProjectName(), undefined, addConfigToFetch());

        expect(data).toMatchSnapshot();
    });

    // GET negative query
    test('should handle the error in case of accessing to non-existing launch', async () => {
        const neLaunchId: string = 'non-existing-launch-id';
        const responsePromise = launchControllerApi.getLaunchUsingGET(neLaunchId, getProjectName(), addConfigToFetch());

        await expect(responsePromise).rejects.toMatchObject({
            status: 404,
            statusText: "Not Found",
            url: `${getBasePath()}/v1/${getProjectName()}/launch/${neLaunchId}`,
        });
    });

    // POST positive query
    test('should start launch analysis', async () => {
        const data = await launchControllerApi.startLaunchAnalyzerUsingPOST({
            analyzeItemsMode: [
                ReportPortalAPI.AnalyzeLaunchRQ.AnalyzeItemsModeEnum.TOINVESTIGATE
            ],
            analyzerMode: ReportPortalAPI.AnalyzeLaunchRQ.AnalyzerModeEnum.ALL,
            analyzerTypeName: ReportPortalAPI.AnalyzeLaunchRQ.AnalyzerTypeNameEnum.AutoAnalyzer,
            launchId: demoDataRs.launchIds[0]
        }, getProjectName(), addConfigToFetch());

        expect(data).toEqual({
            "message": `autoAnalyzer analysis for launch with ID='${demoDataRs.launchIds[0]}' started.`
        });
    });

    // POST negative query 1
    test('should handle error when analysis started for non-existing launch', async () => {
        const responsePromise = launchControllerApi.startLaunchAnalyzerUsingPOST({
            analyzeItemsMode: [
                ReportPortalAPI.AnalyzeLaunchRQ.AnalyzeItemsModeEnum.TOINVESTIGATE
            ],
            analyzerMode: ReportPortalAPI.AnalyzeLaunchRQ.AnalyzerModeEnum.ALL,
            analyzerTypeName: ReportPortalAPI.AnalyzeLaunchRQ.AnalyzerTypeNameEnum.AutoAnalyzer,
            launchId: 9183829382
        }, getProjectName(), addConfigToFetch());

        await expect(responsePromise).rejects.toMatchObject({
            status: 404,
            statusText: "Not Found",
            url: `${getBasePath()}/v1/${getProjectName()}/launch/analyze`,
        });
    });

    // POST negative query 2
    test('should handle error when bad request is sent', async () => {
        const responsePromise = launchControllerApi.startLaunchAnalyzerUsingPOST({
            analyzeItemsMode: [
                "BAD_PARAM" as unknown as ReportPortalAPI.AnalyzeLaunchRQ.AnalyzeItemsModeEnum
            ],
            analyzerMode: ReportPortalAPI.AnalyzeLaunchRQ.AnalyzerModeEnum.PREVIOUSLAUNCH,
            analyzerTypeName: ReportPortalAPI.AnalyzeLaunchRQ.AnalyzerTypeNameEnum.PatternAnalyzer,
            launchId: demoDataRs.launchIds[0]
        }, getProjectName(), addConfigToFetch());

        await expect(responsePromise).rejects.toMatchObject({
            status: 400,
            statusText: "Bad Request",
            url: `${getBasePath()}/v1/${getProjectName()}/launch/analyze`,
        });
    });

    // PUT positive query
    test('should change launch info', async () => {
        const result = await launchControllerApi.bulkUpdateUsingPUT({
            ids: [demoDataRs.launchIds[0], demoDataRs.launchIds[1]],
            attributes: [],
            description: {
                action: ReportPortalAPI.Description.ActionEnum.CREATE,
                comment: 'Test comment',
            }
        }, getProjectName(), addConfigToFetch());

        expect(result).toMatchSnapshot();
    });

    // PUT negative query 1
    test('should handle error when no launch id is sent', async () => {
        const responsePromise = launchControllerApi.bulkUpdateUsingPUT({
            ids: [],
            attributes: [],
            description: {
                action: ReportPortalAPI.Description.ActionEnum.CREATE,
                comment: 'Test comment',
            }
        }, getProjectName(), addConfigToFetch());

        await expect(responsePromise).rejects.toMatchObject({
            status: 400,
            statusText: "Bad Request",
            url: `${getBasePath()}/v1/${getProjectName()}/launch/info`,
        });
    });

    // PUT negative query 2
    test('should handle error when non existing project name is used', async () => {
        const responsePromise = launchControllerApi.bulkUpdateUsingPUT({
            ids: [1, 2],
            attributes: [],
            description: {
                action: ReportPortalAPI.Description.ActionEnum.CREATE,
                comment: 'Test comment',
            }
        }, 'getProjectName()', addConfigToFetch());

        await expect(responsePromise).rejects.toMatchObject({
            status: 404,
            statusText: "Not Found",
            url: `${getBasePath()}/v1/getProjectName()/launch/info`,
        });
    });

    // DELETE positive query
    test('should delete launch by id', async () => {
        const lastLaunchId = demoDataRs.launchIds[demoDataRs.launchIds.length - 1];
        const data = await launchControllerApi.deleteLaunchUsingDELETE(lastLaunchId, getProjectName(), addConfigToFetch());

        expect(data).toEqual({
            "message": `Launch with ID = '${lastLaunchId}' successfully deleted.`
        });
    });

    // DELETE negative query
    test('should handle error when non-existing launch is deleted', async () => {
        const responsePromise = launchControllerApi.deleteLaunchUsingDELETE(786438764, getProjectName(), addConfigToFetch());

        await expect(responsePromise).rejects.toMatchObject({
            status: 404,
            statusText: "Not Found",
            url: `${getBasePath()}/v1/${getProjectName()}/launch/786438764`,
        });
    });

    afterAll(async () => {
        await launchControllerApi.deleteLaunchesUsingDELETE({ids: demoDataRs.launchIds}, getProjectName(), addConfigToFetch())
    });
});