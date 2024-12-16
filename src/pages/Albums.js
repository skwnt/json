// src/pages/Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/albums')
      .then((response) => {
        console.log('Fetched Albums:', response.data); // Log albums to console
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  return (
    <div>
      <h1>Albums List</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.id} - {album.albName} - {album.albDescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
