'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var context;

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

    it('verifies /sensors successful response', async () => {
        let event = {
            path: '/sensors',
            queryStringParameters: {
                device: 'test',
            }
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
    });

    it('verifies /ingest successful response', async () => {
        let event = {
            path: '/ingest',
            body: JSON.stringify({
                some: "data",
                withArray: [1,2,3,4],
                andMore: {
                    complex: 'stuff',
                    right: true
                }
            })
        };
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });
});
