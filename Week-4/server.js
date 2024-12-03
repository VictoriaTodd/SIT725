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
const addTwoNumber = (n1, n2) => {
    return n1 + n2;
}
app.get("/addTwoNumbers", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

const subtractTwoNumber = (n1, n2) => {
    return n1 - n2;
}
app.get("/subtractTwoNumbers", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = subtractTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

const multiplyTwoNumber = (n1, n2) => {
    return n1 * n2;
}
app.get("/multiplyTwoNumbers", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = multiplyTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

const divideTwoNumber = (n1, n2) => {
    return n1 / n2;
}
app.get("/divideTwoNumbers", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = divideTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

async function insertData(first_name, last_name, email) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("people");

        const person = { firstName: first_name, lastName: last_name, email: email }

        // Insert the data
        const result = await collection.insertOne(person);
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

app.post("/api/submit-form", (req, res) => {
    const { first_name, last_name, email } = req.body;

    console.log("Received form data:", { first_name, last_name, email });

    // Save data to MongoDB

    insertData(first_name, last_name, email)

    // Send a response back to the client
    res.status(200).json({ message: "Form submitted successfully", data: req.body });
});

app.listen(port, () => {
    console.log("App listening to: " + port)
})

