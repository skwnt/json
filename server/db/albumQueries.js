const db = require('./connection'); // Import the promise-enabled db instance

// Get all albums
const getAlbums = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM album'); // Use async/await with db.query
    return rows;
  } catch (err) {
    console.error('Error fetching albums:', err);
    throw err; // Propagate the error
  }
};

// Get albums by user ID
const getAlbumsByUserId = async (userId) => {
  try {
    const [rows] = await db.query('SELECT * FROM album WHERE fk_user_id = ?', [userId]);
    return rows;
  } catch (err) {
    console.error('Error fetching albums by userId:', err);
    throw err; // Propagate the error
  }
};

module.exports = {
  getAlbums,
  getAlbumsByUserId
};
