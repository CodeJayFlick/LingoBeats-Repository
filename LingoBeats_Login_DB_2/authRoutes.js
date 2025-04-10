const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('./authController');
const { ObjectId } = require('mongodb');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      username: decoded.username
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authController.registerUser(username, password);
    
    const token = jwt.sign(
      { userId: user.userId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      username: user.username
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authController.loginUser(username, password);
    
    const token = jwt.sign(
      { userId: user.userId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      username: user.username
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/verify', authMiddleware, (req, res) => {
  res.json({ 
    username: req.user.username,
    userId: req.user.userId
  });
});

module.exports = router;