const express = require('express');
const router = express.Router();  // This line was missing!
const authController = require('./authController');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  console.log('✅ Register endpoint hit!', req.body); // Debug log
  try {
    const { username, password } = req.body;
    const user = await authController.registerUser(username, password);
    res.status(201).json({ message: 'User registered!', user });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(400).json({ error: error.message });
  }
});
// Login route
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
      user 
    });
  } catch (error) {
    res.status(401).json({ 
      error: error.message || 'Login failed' 
    });
  }
});

module.exports = router;