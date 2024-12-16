// src/pages/Users.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        console.log('Fetched Users:', response.data); // Log users to console
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.id} - {user.username} - {user.email} - <Link to={`/user-albums/${user.id}`}>View Albums</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
