const request = require('supertest');
const app = require('../../app');

describe('Test GET / launches', () => {
    test('it should response with 200 sucess', async() => {
        const response = await request(app).get('/launches');
        expect(response.status).toBe(200);
    })
})

describe('Test POST /launch', () => {
    const mission = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 8, 2028'
    }
    const missionNoDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f',
    }
    const missionWrongDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'Elephant'
    }
    
    test('It should respond with 201 created', async() => {
        const response = await request(app).post('/launches').send(mission).expect('Content-Type', /json/).expect(201);
        const requestDate = new Date(mission.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(missionNoDate);
    })
    test('It should catch missing required properties ', async() => {
        const response = await request(app).post('/launches').send(missionNoDate).expect('Content-Type', /json/).expect(400);
        expect(response.body).toStrictEqual({err: 'Missing a property' });
    });
    test('It should catch invalid dates', async() => {
        const response = await request(app).post('/launches').send(missionWrongDate).expect('Content-Type', /json/).expect(400);
        expect(response.body).toStrictEqual({err:'Not a valid date' });
    })
})