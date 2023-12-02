var express = require('express')
var mongoose = require('mongoose');
var user = require("./routes/user")
var emp = require("./routes/employee")
const bodyParser = require('body-parser');
const cors = require('cors');

const SERVER_PORT = 8089
var app = express()

app.use(cors());
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// DB connection
const DB_CONNECTION_STRING = "mongodb+srv://vercel-admin-user:Wh2ichcid3PmZQ5Y@cluster0.etztr7w.mongodb.net/F2023_comp3123?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
// Handle connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

app.use("/api/v1/user", user)
app.use("/api/v1/emp", emp)

app.use((req, res, next) => {
    console.log(`Application Middleware: ${req.method} - ${req.url}`)
    next()
})

app.route("/").get((req, res) => {
        res.send("<h1>Test</h1>")
})

// Error Handling level middleware
var errHandling = (err, req, res, next) => {
    console.log("Error middleware");
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({ // sent status in JSON
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}
app.use(errHandling)

app.listen(SERVER_PORT, () => {
    console.log("Server started")
})