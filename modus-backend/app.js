// import package
const express = require('express');
const fs = require("fs");
const users = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));
const app = express();
const cors = require('cors')
app.use(cors());
const loginRouter = require("./routes/loginRoutes")
const dataRouter = require("./routes/dataRoutes")

app.use(express.json());

const csvFilePath = './data/data.csv';

// Check if the CSV file exists, and create it if it doesn't
if (!fs.existsSync(csvFilePath)) {
    console.log(csvFilePath,1)
    fs.writeFileSync(csvFilePath, '');
}

app.use('/api/users',loginRouter)
app.use('/api/data',dataRouter)

module.exports = app;