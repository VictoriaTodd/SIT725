const chai = require('chai');
const sinon = require('sinon');
const { expect, assert } = chai;

const express = require('express');
const request = require('supertest');

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
                body: { firstName: 'Zaphod', lastName: 'Beeblebrox', email: 'president@thegalaxy.com' }
            };
            const res = mockResponse();

            const mockResult = { id: 1, firstName: 'Zaphod', lastName: 'Beeblebrox', email: 'president@thegalaxy.com' };

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
                { id: 1, firstName: 'Zaphod', lastName: 'Beeblebrox', email: 'president@thegalaxy.com' },
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


const { postPerson, getAllPeople } = require('../models/person');
describe('Database Functions', () => {
    let mockCollection;

    beforeEach(() => {
        // mock out the database
        mockCollection = {
            insertOne: sinon.stub(),
            find: sinon.stub().returns({ toArray: sinon.stub() }),
        };
    });

    afterEach(() => {
        // restore sinon state
        sinon.restore();
    });

    describe('postPerson', () => {
        it('should call insertOne on the collection with the correct person', (done) => {
            const person = { name: 'John Doe', age: 30 };
            const callback = sinon.stub();

            postPerson(person, callback, mockCollection);

            sinon.assert.calledOnce(mockCollection.insertOne);
            sinon.assert.calledWith(mockCollection.insertOne, person, callback);
            done();
        });
    });

    describe('getAllPeople', () => {
        it('should call find and toArray on the collection', (done) => {
            const callback = sinon.stub();

            getAllPeople(callback, mockCollection);

            sinon.assert.calledOnce(mockCollection.find);
            sinon.assert.calledWith(mockCollection.find, {});

            const toArrayStub = mockCollection.find().toArray;
            sinon.assert.calledOnce(toArrayStub);
            sinon.assert.calledWith(toArrayStub, callback);

            done();
        });
    });
});

const createRouter = require('../routers/router');

describe('Router Tests', () => {
    let app;
    let mockController;

    beforeEach(() => {
        // mock out the controller
        mockController = {
            postPerson: sinon.stub(),
            getAllPeople: sinon.stub(),
        };

        // Create an xxpress app and use the router with mocked controller
        app = express();
        app.use(express.json());
        app.use('/api/people', createRouter(mockController));
    });

    it('should call postPerson on POST /api/people', async () => {
        mockController.postPerson.callsFake((req, res) => {
            res.status(201).send({ message: 'Person created' });
        });

        const response = await request(app)
            .post('/api/people')
            .send({ name: 'John Doe' });

        sinon.assert.calledOnce(mockController.postPerson);
        assert.equal(response.status, 201);
        assert.equal(response.body.message, 'Person created');
    });

    it('should call getAllPeople on GET /api/people', async () => {
        mockController.getAllPeople.callsFake((req, res) => {
            res.status(200).send([{ name: 'John Doe' }]);
        });

        const response = await request(app).get('/api/people');

        sinon.assert.calledOnce(mockController.getAllPeople);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal([{ name: 'John Doe' }]);
    });

    it('should handle errors in postPerson', async () => {
        mockController.postPerson.callsFake((req, res) => {
            res.status(500).send({ error: 'Internal Server Error' });
        });

        const response = await request(app)
            .post('/api/people')
            .send({ name: 'John Doe' });

        sinon.assert.calledOnce(mockController.postPerson);
        expect(response.status).to.equal(500);
        expect(response.body.error).to.equal('Internal Server Error');
    });

    it('should handle errors in getAllPeople', async () => {
        mockController.getAllPeople.callsFake((req, res) => {
            res.status(500).send({ error: 'Internal Server Error' });
        });

        const response = await request(app).get('/api/people');

        sinon.assert.calledOnce(mockController.getAllPeople);
        expect(response.status).to.equal(500);
        expect(response.body.error).to.equal('Internal Server Error');
    });
});

