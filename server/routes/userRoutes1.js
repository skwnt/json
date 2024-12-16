const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).send('Error registering user.');
        }
        res.status(201).send('User registered successfully.');
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('All fields are required.');
    }
    const query = 'SELECT * FROM user WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid username or password.');
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password.');
        }
        req.session.user = { id: user.id, username: user.username };
        res.send('Login successful.');
    });
});

// Logout Route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out.');
        }
        res.send('Logged out successfully.');
    });
});

// Profile Route
router.get('/profile', (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    const userId = req.session.user.id;
    const query = 'SELECT id, username, email FROM user WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching profile.');
        }
        res.send(results[0]);
    });
});

module.exports = router;
