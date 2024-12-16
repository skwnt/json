import React, { useState } from 'react';

const AuthenticationSystem = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),  // Ensure signupData contains username, email, password
      });
  
      if (!res.ok) {
        const message = await res.text();
        alert(message);
      } else {
        alert("Signup successful!");
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };
  

  // Handle Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),  // Send login data { username, password }
        });

        if (!res.ok) {
            // Handle non-200 responses (e.g., 401 for invalid credentials)
            const errorMessage = await res.text();
            alert(`Login failed: ${errorMessage}`);
        } else {
            // Assuming the backend returns a JSON with the user info
            const user = await res.json();
            alert(`Logged in as: ${user.username}`);
            // Optionally, you can store the user data in local storage or context
            // localStorage.setItem('user', JSON.stringify(user));
        }
    } catch (err) {
        console.error('Login error:', err);
        alert('An error occurred during login.');
    }
};


  return (
    <div>
      <h1>Authentication System</h1>

      {/* Signup Form */}
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signupData.username}
          onChange={handleSignupChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={handleSignupChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleSignupChange}
          required
        />
        <br />
        <button type="submit">Signup</button>
      </form>

      {/* Login Form */}
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleLoginChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AuthenticationSystem;
