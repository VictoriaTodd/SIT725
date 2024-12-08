// database
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://localhost:27017/";

var express = require("express")
const bodyParser = require("body-parser");
var app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3000;

// insert data to DB
async function insertData(first_name, last_name, email) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("people");

        // package data
        const person = { firstName: first_name, lastName: last_name, email: email }

        // Insert the data
        const result = await collection.insertOne(person);
        console.log(`Item inserted with ID`, result.insertedId);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// retrieve data from DB
async function retrieveData() {
    const client = new MongoClient(uri);

    try {
        const database = client.db('myDB');
        const people = database.collection('people');
        // retrieve all records from DB and return as array
        const results = await people.find().toArray();
        return results;
    } catch (err) {
        console.error("Error retrieving data:", err);
        throw err;
    } finally {
        await client.close();
    }
}

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Receive form data from client side
app.post("/api/submit-form", (req, res) => {
    const { first_name, last_name, email } = req.body;

    // Save data to MongoDB
    insertData(first_name, last_name, email)

    // Send a response back to the client
    res.status(200).json({ message: "Form submitted successfully", data: req.body });
});

// Send card data to client side
app.get('/api/get-cards', async (req, res) => {
    try {
        const cardList = await retrieveData();
        res.json({ statusCode: 200, data: cardList, message: "Success" });
    } catch (error) {
        console.error("Error in /api/get-cards:", error);
        res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log("App listening to: " + port)
})

