'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var context = {
    test: true
};

describe('Carl API', function () {
    it('verifies /sites successful response', async () => {
        let event = {
            path: '/sites'
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
    });

    it('verifies /sites successful single response', async () => {
        let event = {
            path: '/sites',
            queryStringParameters: {site: '007'}
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });

    it('verifies /devices successful response', async () => {
        let event = {
            path: '/devices',
            queryStringParameters: {
                site: 'test',
            }
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
    });

    it('verifies /devices successful single response', async () => {
        let event = {
            path: '/devices',
            queryStringParameters: {
                site: '007',
                device: '007-001'
            }
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });

    it('verifies /sensors successful response', async () => {
        let event = {
            path: '/sensors',
            queryStringParameters: {
                device: '007-001',
            }
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
    });

    it('verifies /sensors successful single response', async () => {
        let event = {
            path: '/sensors',
            queryStringParameters: {
                device: '007-001',
                sensor: '007-001-001'
            }
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });

    it('verifies /ingest successful response', async () => {
        let event = {
            path: '/ingest',
            body: JSON.stringify([
                {'path': 'udtConnectionPoint.System.Parameter.NameOfStation', 'value': 'PumpControl'},
                {'path': 'udtConnectionPoint.System.Parameter.NumberOfPumps', 'value': 4},
                {'path': 'udtConnectionPoint.System.Parameter.NumberOfStages', 'value': 2}
            ])
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });
});
