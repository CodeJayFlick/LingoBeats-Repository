// This file is for defining the authentication routes for LingoBeats

const router = require("express").Router();
const { login, signup } = require("../Controller/auth_controller.js");

// User logs in with password hash check and returns token
const path = require("path");
router.post("/login", login);
router.post("/signup", signup);

module.exports = router; // Exporting the route to be used in other files.