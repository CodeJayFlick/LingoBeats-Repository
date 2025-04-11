const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('./authController');
const { ObjectId } = require('mongodb');
const { connectToDB } = require('./db');

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
router.get('/user/scores', authMiddleware, async (req, res) => {
  try {
    const db = await connectToDB();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { quizzes: 1 } }
    );

    if (!user?.quizzes) {
      return res.status(404).json({ error: "No quizzes found" });
    }

    // Convert MongoDB number formats to plain numbers
    const normalizedQuizzes = user.quizzes.map(quiz => ({
      ...quiz,
      scores: quiz.scores.map(score => {
        if (typeof score === 'object' && ('$numberInt' in score || '$numberLong' in score)) {
          return parseInt(score.$numberInt || score.$numberLong);
        }
        return score;
      })
    }));

    res.json(normalizedQuizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

module.exports = router;