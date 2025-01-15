let client = require('../dbConnection');

let defaultCollection = client.db().collection('People');

function postPerson(person, callback, collection = defaultCollection) {
    collection.insertOne(person,callback);
}

function getAllPeople(callback, collection = defaultCollection) {
    collection.find({}).toArray(callback);
}

module.exports = {postPerson,getAllPeople}