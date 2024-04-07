const axios = require('axios');

describe('RP Launches API Test with Authorization using Jest for Parallelization 3', () => {
    const projectName = 'hr_atm_project';
    let api;

    beforeAll(async () => {
        api = axios.create({
            baseURL: `${process.env.BASE_URL}/api/v1/`,
            headers: {
                'Authorization': `bearer ${process.env.TOKEN}`
            }
        });
    });
    test('Start Launch Analysis', async () => {
        const response = await api.post(`${projectName}/launch/analyze`, {
            "analyzeItemsMode": [
                "TO_INVESTIGATE"
            ],
            "analyzerMode": "ALL",
            "analyzerTypeName": "autoAnalyzer",
            "launchId": 131
        });
        expect(response.status).toEqual(200);
    });
});