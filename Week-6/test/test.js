const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const controller = require('../controllers/controller');
const collection = require('../models/person');

// mock out the response 
const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

describe('Person Controller', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('postPerson', () => {
        it('should respond with statusCode 201 and success message when person is posted successfully', (done) => {
            const req = {
                body: { firstName: 'Zaphod', lastName: 'Beeblebrox', email: 'president@thegalaxy.com'}
            };
            const res = mockResponse();

            const mockResult = { id: 1, firstName: 'Zaphod', lastName: 'Beeblebrox', email: 'president@thegalaxy.com'};

            sinon.stub(collection, 'postPerson').callsFake((person, callback) => {
                callback(null, mockResult);
            });

            controller.postPerson(req, res);

            sinon.assert.calledWith(res.json, sinon.match({
                statusCode: 201,
                data: mockResult,
                message: 'success'
            }));

            done();
        });
    });

    describe('getAllPeople', () => {
        it('should respond with statusCode 200 and success message when people are retrieved successfully', (done) => {
            const req = {};
            const res = mockResponse();

            const mockResult = [
                { id: 1, firstName: 'Zaphod', lastName: 'Beeblebrox', email: 'president@thegalaxy.com'},
                { id: 2, firstName: 'Arthur', lastName: 'Dent', email: 'dent@arthurdent.co.uk' }
            ];

            sinon.stub(collection, 'getAllPeople').callsFake((callback) => {
                callback(null, mockResult);
            });

            controller.getAllPeople(req, res);

            sinon.assert.calledWith(res.json, sinon.match({
                statusCode: 200,
                data: mockResult,
                message: 'success'
            }));

            done();
        });
    });
});
