/*
Author: Cody Franecki
Date of Revision: April 4th, 2025
Description: This is a configuration file to connect to the MongoDB compass with
the node.js Application.
 */

require('dotenv').config();
const uri = process.env.MONGODB_URI; // Processes connection string to the database cluster
const { MongoClient } = require('mongodb'); // MongoDB client Instance
const bcrypt = require('bcrypt'); // Module for integrating encryption to password usage

// Creates a new MongoClient
const client = new MongoClient(uri);

let dbInstance = null; // Caches the original connection instance to MongoDBAtlas, making sure not to take up all new data.

// Connect to the MongoDB database
async function connectToDB() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        return client.db("LingoBeatsCluster"); // Returns the database
        return dbInstance;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

// Function that creates a schema of a user
async function userSchemaCollection(db) {
    try {
        await db.createCollection("users", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["username", "password", "createdAt"],
                    properties: {
                        username: {
                            bsonType: "string",
                            description: "Username must be a string",
                        },
                        password: {
                            bsonType: "string",
                            pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
                            minlength: 8,
                            description: "Password must be at least 8 characters long",
                        },
                        createdAt: {
                            bsonType: "date",
                            description: "Must be a date and is required",
                        }
                    }
                }
            }
        });
        console.log("User Schema Collection has been created");
    } catch (error) {
        if(error.codename == "NamespaceExists") {
            console.log("User collection already exists");
        } else {
            console.log("Users collection error: " + error.message);
        }
    }
}

async function sessionSchemaCollection(db) {
    try {
        await db.createCollection("sessions", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["userID", "access_token", "expires_in"],
                    properties: {
                        userID: {
                            bsonType: "string",
                            description: "User ID must be a string"
                        },
                        access_token: {
                            bsonType: "string",
                            description: "Access token must be a string"
                        },
                        expires_in: {
                            bsonType: "date",
                            description: "Expiration must be a date"
                        }
                    }
                }
            }
        });
        console.log("Session Schema Collection has been created");
    } catch (error) {
        if (error.codeName === "NamespaceExists") {
            console.log("Session collection already exists");
        } else {
            console.error(`Session collection error: ${error}`);
        }
    }
}

// Function to test the logic of connecting while following requirements
// to create the account for the database.
async function newUser(username, password) {
    if (!username || !password) {
        console.log("Invalid username or password");
        return;
    }

    try {
        const db = await connectToDB();
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (isPasswordValid) {
                console.log("Login Successful! Welcome to LingoBeats!");
            } else {
                console.log("Incorrect password, please try again!");
            }
        } else {
            // Hash password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username: username,
                password: hashedPassword,
                createdAt: new Date(),
            };

            const newUserCreated = await usersCollection.insertOne(newUser);
            if (newUserCreated.insertedId) {
                console.log("Account created successfully! Welcome to MongoDB");
            } else {
                console.log("Failed to create a new user.");
            }
        }
    } catch (err) {
        console.error("Database error:", err);
    }
}

// Tests user creation, This was used originally test how to add a test user into the
// the database.
/*newUser("testuser", "Password123")
    .then(() => console.log("Execution completed"))
    .catch(err => console.error("Execution error:", err));*/

module.exports = connectToDB;
