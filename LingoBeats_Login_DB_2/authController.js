const bcrypt = require('bcrypt');
const { connectToDB } = require('./db');

async function registerUser(username, password) {
  try {
    console.log('[DEBUG] Attempting to register user:', username); // Debug log

    // Validate input
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const db = await connectToDB();
    const usersCollection = db.collection('users');

    console.log('[DEBUG] Checking for existing user...'); // Debug log
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    console.log('[DEBUG] Hashing password...'); // Debug log
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    console.log('[DEBUG] Inserting new user...'); // Debug log
    const result = await usersCollection.insertOne(newUser);

    console.log('[DEBUG] User registered successfully'); // Debug log
    return {
      userId: result.insertedId,
      username
    };
  } catch (error) {
    console.error('[ERROR] Registration failed:', error.message); // Detailed error log
    throw error; // Re-throw for route handling
  }
}

async function loginUser(username, password) {
  try {
    console.log('[DEBUG] Attempting login for user:', username); // Debug log

    const db = await connectToDB();
    const usersCollection = db.collection('users');

    console.log('[DEBUG] Finding user in DB...'); // Debug log
    const user = await usersCollection.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    console.log('[DEBUG] Comparing passwords...'); // Debug log
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    console.log('[DEBUG] Login successful'); // Debug log
    return {
      userId: user._id,
      username: user.username
    };
  } catch (error) {
    console.error('[ERROR] Login failed:', error.message); // Detailed error log
    throw error; // Re-throw for route handling
  }
}

module.exports = {
  registerUser,
  loginUser
};