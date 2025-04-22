const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const connectToDB = require('./Configuration/index.js');

let db; // Stores the connected database instance

// Initial controller to establish a connection with the router
const initController = (database) => {
    db = database;
};

// Controller for the Signup configuration
const signup = async (req, res) => {
    const { username, password } = req.body;

    // const db = await connectToDB();
    const userCollection = await db.collection('users');

    // Condition for checking if a user account has already been created
    const userExists = await userCollection.findOne({ username });
    if (userExists) {
        return res.status(400).send("User already exists");
    }

    const hashPass = await bcrypt.hash(password, 10);

    // When User is created, insert the account into a collection
    const newUser = { username, password: hashPass, createdAt: new Date() };
    await userCollections.insertOne(newUser);
    res.status(201).send(`Account Successfully Created: +  ${newUser}`);
};

// Login Controller
const login = async (req, res) => {
    const { username, password } = req.body;
    const userCollection = db.collection('users');

    // Searches for the user if the user already exists
    const user = await userCollection.findOne({ username });
    if (!user) {
        return res.status(400).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).send("Invalid Password, try again!");
    }

    // Access token that allows the user to login to Lingobeats
    access_token = jwt.sign({ userId: user._id }, 'SECRET_TOKEN', { expiresIn: '1h' });

    const sessionCollection = db.collection('sessions');
    await sessionCollection.insertOne({
        userId: user._id,
        token: access_token,
        expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.status(200).send("Successfully logged in", access_token);
};

module.exports = {initController, signup, login};

---------------------------------------------------------------------------Version 2:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const connectToDB = require('./Configuration/index.js');

let db; // Stores the connected database instance

// Initial controller to establish a connection with the router
const initController = (database) => {
    db = database;
};

// Controller for the Signup configuration
const signup = async (req, res) => {
    const { username, password } = req.body;

    // const db = await connectToDB();
    const userCollection = await db.collection('users');

    // Condition for checking if a user account has already been created
    const userExists = await userCollection.findOne({ username });
    if (userExists) {
        return res.status(400).send("User already exists");
    }

    const hashPass = await bcrypt.hash(password, 10);

    // When User is created, insert the account into a collection
    const newUser = { username, password: hashPass, createdAt: new Date() };
    await userCollections.insertOne(newUser);
    res.status(201).send(`Account Successfully Created: +  ${newUser}`);
};

// Login Controller
const login = async (req, res) => {
    const { username, password } = req.body;
    const userCollection = db.collection('users');

    // Searches for the user if the user already exists
    const user = await userCollection.findOne({ username });
    if (!user) {
        return res.status(400).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).send("Invalid Password, try again!");
    }

    // Access token that allows the user to login to Lingobeats
    access_token = jwt.sign({ userId: user._id }, 'SECRET_TOKEN', { expiresIn: '1h' });

    const sessionCollection = db.collection('sessions');
    await sessionCollection.insertOne({
        userId: user._id,
        token: access_token,
        expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.status(200).send("Successfully logged in", access_token);
};

module.exports = {initController, signup, login};