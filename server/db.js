const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let client;

async function connectToDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('LingoBeatsCluster'); // Explicit database name
    await db.command({ ping: 1 }); // Test connection
    console.log('✅ Connected to MongoDB - LingoBeatsCluster database');
    
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connectToDB };