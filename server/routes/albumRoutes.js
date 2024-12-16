const express = require('express');
const router = express.Router();
const { getAlbums, getAlbumsByUserId } = require('../db/albumQueries');

// Get all albums
router.get('/', async (req, res) => {
  try {
    const results = await getAlbums();
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching albums');
  }
});

// Get albums by user ID
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log('Received userId:', userId); // Log the received userId

  try {
    const results = await getAlbumsByUserId(userId);
    console.log('Albums fetched for user:', results); // Log the fetched results
    res.json(results);
  } catch (err) {
    console.error('Error fetching albums for user:', err);
    res.status(500).send('Error fetching albums');
  }
});

module.exports = router;
