const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // User routes
const albumRoutes = require('./routes/albumRoutes'); // Album routes
const { sessionStore } = require('./db/connection');


const app = express();

// CORS Configuration
app.use(cors({ 
  origin: 'http://localhost:3000', // React front-end running here
  credentials: true // Allow cookies to be sent with requests
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Routes
app.use('/users', userRoutes);       // User-related routes
app.use('/albums', albumRoutes);    // Album-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
