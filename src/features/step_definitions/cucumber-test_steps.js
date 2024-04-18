const axios = require('axios');
const assert = require('assert');
const { Given, When, Then, Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

let api;
let response;
let projectName;
let rpData;
const getRandomId = () => rpData.data.launchIds[Math.floor(Math.random() * rpData.data.launchIds.length)];

BeforeAll(() => {
    require('dotenv').config();
});

Before({tags: "@process-demo-data"}, async function() {
    rpData = await api.post(`demo/${projectName}/generate`, { createDashboard: false });
});

Given('I am authorized user with a project {string}', (project) => {
    projectName = project;
    api = axios.create({
        baseURL: `${process.env.BASE_URL}/api/v1/`,
        headers: {
            'Authorization': `bearer ${process.env.TOKEN}`
        }
    });
});

When('I get the list of all launches', async () => {
    response = await api.get(`${projectName}/launch`);
});

When('I compare two different launches', async function() {
    const randomId1 = getRandomId();
    let randomId2;
    do {
        randomId2 = getRandomId();
    } while(randomId2 === randomId1);
    response = await api.get(`${projectName}/launch/compare?ids=${randomId1},${randomId2}`);
});

When('I start launch analysis for launch number {int}', async (launchId) => {
    response = await api.post(`hr_atm_project/launch/analyze`, {
        "analyzeItemsMode": [
            "TO_INVESTIGATE"
        ],
        "analyzerMode": "ALL",
        "analyzerTypeName": "autoAnalyzer",
        "launchId": launchId
    });
});

Then('I should get a successful response', () => {
    assert.strictEqual(response.status, 200);
});

Then('response should be an array',  () => {
    assert.strictEqual(Array.isArray(response.data.content), true);
});

After({tags: "@process-demo-data"}, async function () {
    await api.delete(`${projectName}/launch`, { data: { ids: rpData.data.launchIds } });
});