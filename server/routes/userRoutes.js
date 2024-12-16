const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUsers, login, addUser } = require('../db/userQueries');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users: ' + err.message);
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', req.body); // Add this line to log the request data
    try {
        const user = await login(username, password);
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        res.json(user); // Send back user info
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Error during login: ' + err.message);
    }
});
// Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if required fields are missing
    if (!username || !email || !password) {
        return res.status(400).send('Missing required fields');
    }

    // Check if the user already exists
    const existingUser = await getUsers(username); // You may need to implement this query in your db logic
    if (existingUser) {
        return res.status(400).send('Username already taken');
    }

    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Now save the user to the database (assuming you have a function to insert a new user)
        const newUser = await addUser(username, email, hashedPassword); // `addUser` should be a function in your DB logic

        // Return success
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user');
    }
});




module.exports = router;
