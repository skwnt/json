import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';

const UserAlbums = () => {
  const { userId } = useParams(); // Get userId from the route parameter
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/albums/user/${userId}`)
      .then((response) => {
        console.log('Fetched User Albums:', response.data); // Log albums to console

        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user albums:', error);
      });
  }, [userId]);

  return (
    <div>
      <h1>User {userId}'s Albums</h1>
      {albums.length > 0 ? (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.id} - {album.albName} - {album.albDescription}
            </li>
          ))}
        </ul>
      ) : (
        <p>This user does not have any albums yet.</p> // Show this if no albums
      )}
    </div>
  );
};

export default UserAlbums;