const axios = require('axios');

describe('RP Launches API Test with Authorization using Jest for Parallelization 1', () => {
    const projectName = 'hr_atm_project';
    let api;
    let rpData;

    beforeAll(async () => {
        api = axios.create({
            baseURL: `${process.env.BASE_URL}/api/v1/`,
            headers: {
                'Authorization': `bearer ${process.env.TOKEN}`
            }
        });

        rpData = await api.post(`demo/${projectName}/generate`, { createDashboard: false });
    });

    test('Get List of All Launches', async () => {
        const response = await api.get(`${projectName}/launch`);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.data.content)).toBe(true);
    });

    afterAll(async () => {
        await api.delete(`${projectName}/launch`, { data: { ids: rpData.data.launchIds } });
    });
});