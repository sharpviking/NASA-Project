const request = require('supertest');
const app = require('../../app');
const {
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo');


describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });
    afterAll(async () => {
        await mongoDisconnect
    })
    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);

        })
    });


    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'SKYROOT Enterprise',
            rocket: 'FALCON 1729-C',
            target: 'kepler-62 f',
            launchDate: 'November 26,2027',
        }


        const launchDataWithoutDate = {
            mission: 'SKYROOT Enterprise',
            rocket: 'FALCON 1729-C',
            target: 'kepler-62 f',

        };


        const launchDataWithInvaliDate = {
            mission: 'SKYROOT Enterprise',
            rocket: 'FALCON 1729-C',
            target: 'kepler-62 f',
            launchDate: 'xander',
        }


        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);


            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);


            expect(response.body).toMatchObject(launchDataWithoutDate);

        });

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);


            expect(response.body).toStrictEqual({
                error: 'Missing required launch Property',
            })
        });

        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvaliDate)
                .expect('Content-Type', /json/)
                .expect(400);


            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            })
        });
    })
});

