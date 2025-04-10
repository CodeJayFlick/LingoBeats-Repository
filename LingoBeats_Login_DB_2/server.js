const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
  }));
app.use(express.json());

// Routes
const authRoutes = require('./authRoutes');
app.use('/api/auth', authRoutes);
// Test MongoDB connection on startup
(async () => {
    try {
      const { connectToDB } = require('./db');
      await connectToDB();
    } catch (err) {
      console.error('❌ Failed to connect to MongoDB:', err.message);
      process.exit(1); // Crash the app if DB is critical
    }
  })();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001; // Change from 5173 to 3001 or another available port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});