// Author Cody Franecki

/*
This file function as the "main" program to be executed within the LingoBeats project.
In this file, the file running the Schema and Database connections (index.js) and the
port connections to the login database (login_db.js) will be run on this program in sync
to be executed as the main point of entry into the LingoBeats server.
 */

const express = require("express");
const app = express();
const path = require("path");
const connectToDB = require("./Configuration/index.js");

// Middleware parsing the information the incoming requests from the json file
app.use(express.json)

connectToDB().then() => {
    console.log("Database has been connected!");

    // Utilizing the authentication and dashboard routes to be integrated to the MongoDB
    // Database Cluster
    app.use('/api/auth', require('./Routes/auth_routes.js'));
    app.use('/api/dashboard', require('./Routes/dashboard_routes.js'));

    // Starts the server to be executed in LingoBeats
    const PORT = process.env.PORT || 5173;
    app.listen(PORT, () => {
        console.log(`Server is running on Port: + ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to Database: ", error);
});

