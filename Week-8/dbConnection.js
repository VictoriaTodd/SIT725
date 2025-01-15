const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://host.docker.internal:27017/myDB";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;