const logger = require('logger');
const nock = require('nock');
const chai = require('chai');
const { getTestServer } = require('./test-server');

const should = chai.should();

const requester = getTestServer();

describe('E2E test', () => {

    before(() => {

        // simulating gateway communications
        nock(process.env.CT_URL)
            .post('/v1', () => true)
            .reply(200, {
                status: 200,
                detail: 'Ok'
            });
    });

    /* Greeting Hi */
    it('Service Greeting Hi', async () => {
        let response = null;
        try {
            response = await requester.get('/api/v1/service/hi').send();
        } catch (e) {
            logger.error(e);
        }
        response.status.should.equal(200);
        response.body.should.have.property('greeting').and.equal('hi');
    });

    after(() => {
    });
});
