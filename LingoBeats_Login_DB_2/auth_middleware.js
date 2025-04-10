// This file will use a function to verify tokens to the authorization header
// provided by the client.

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({message: 'Access Denied: You provided no tokens!'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_TOKEN');
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Pass control through the authentication controller
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;