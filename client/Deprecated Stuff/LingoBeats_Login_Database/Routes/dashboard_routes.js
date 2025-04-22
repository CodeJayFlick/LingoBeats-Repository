/*
This file will send the user to the dashboard section of LingoBeats
after username and hashed password credentials checks out and given access tokens
to the site.
 */

const express = require('express');
const app = express();
const router = express.Router();

const authMiddleware = require('../Middleware/auth_middleware.js');

// Protect the route in order to access the Dashboard
router.get('./dashboard', authMiddleware, (req, res) => {
    res.status(200).json({
        message: `Welcome to the LingoBeats Dashboard!, User: ${req.user.userId}!`,
    });
});

module.exports = router;