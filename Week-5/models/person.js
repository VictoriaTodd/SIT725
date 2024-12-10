let client = require('../dbConnection');

let collection = client.db().collection('People');

function postPerson(person, callback) {
    collection.insertOne(person,callback);
}

function getAllPeople(callback) {
    collection.find({}).toArray(callback);
}

module.exports = {postPerson,getAllPeople}