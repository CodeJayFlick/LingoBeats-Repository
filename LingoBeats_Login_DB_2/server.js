const express = require("express");
const app = express();
const path = ("path")

/*
// Middleware to parse any incoming json requests
app.use(express.json())

// Utilizing the authentication and dashboard routes to be integrated to the MongoDB
// Database Cluster
app.use('/api/auth', require('./Routes/auth_routes.js'));
app.use('/api/dashboard', require('./Routes/dashboard_routes.js'));
*/

/*
app.listen(27017, () => {
    console.log("Port connected");
});
*/

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});]