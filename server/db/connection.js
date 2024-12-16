const mysql = require('mysql2'); // Use mysql2 package for promise support

// Create a pool of connections (supports async/await)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promiseDb = db.promise(); // Return a promise-enabled db instance

module.exports = promiseDb; // Export the promise-enabled db instance
