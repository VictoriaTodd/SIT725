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

// inset data to DB
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

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Receive form data from client side
app.post("/api/submit-form", (req, res) => {
    const { first_name, last_name, email } = req.body;

    console.log("Received form data:", { first_name, last_name, email });

    // Save data to MongoDB
    insertData(first_name, last_name, email)

    // Send a response back to the client
    res.status(200).json({ message: "Form submitted successfully", data: req.body });
});

const cardList = [
    {
        firstName: "Bob",
        lastName: "Robertson",
        email: "bob@roberston.com.au",
    },
    {
        firstName: "Robert",
        lastName: "Bobson",
        email: "rob@robsrus.com",
    }
]

app.get('/api/get-cards', (req, res) => {
    res.json({ statusCode: 200, data: cardList, message: "Success" })
})


app.listen(port, () => {
    console.log("App listening to: " + port)
})

