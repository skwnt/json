const bcrypt = require('bcrypt');
const db = require('./connection'); // Import the new mysql2 connection

// Get all users
const getUsers = async () => {
    try {
        const [results] = await db.execute('SELECT id, username, email FROM user');
        return results;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
};

// Login user
const login = async (username, password) => {
    try {
        const [results] = await db.execute('SELECT id, username, password FROM user WHERE username = ?', [username]);
        if (results.length === 0) {
            return false; // User not found
        }

        const user = results[0];
        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return false; // Password doesn't match
        }

        return {
            id: user.id,
            username: user.username,
        };
    } catch (err) {
        throw new Error('Error during login: ' + err.message);
    }
};

// Export the functions
module.exports = {
    getUsers,
    login,
};
