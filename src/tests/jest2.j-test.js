const axios = require('axios');

describe('RP Launches API Test with Authorization using Jest for Parallelization 2', () => {
    const projectName = 'hr_atm_project';
    let api;
    let rpData;
    const getRandomId = () => rpData.data.launchIds[Math.floor(Math.random() * rpData.data.launchIds.length)];

    beforeAll(async () => {
        api = axios.create({
            baseURL: `${process.env.BASE_URL}/api/v1/`,
            headers: {
                'Authorization': `bearer ${process.env.TOKEN}`
            }
        });

        rpData = await api.post(`demo/${projectName}/generate`, { createDashboard: false });
    });

      test('Compare Launches', async () => {
        const randomId1 = getRandomId();
        let randomId2;
        do {
            randomId2 = getRandomId();
        } while(randomId2 === randomId1);
        const response = await api.get(`${projectName}/launch/compare?ids=${randomId1},${randomId2}`);
        expect(response.status).toEqual(200);
    });

    afterAll(async () => {
        await api.delete(`${projectName}/launch`, { data: { ids: rpData.data.launchIds } });
    });
});