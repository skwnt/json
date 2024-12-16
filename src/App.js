// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Swipe from './pages/Swipe';
import Count from './pages/Count';
import RandomJoke from './pages/RandomJoke';
import PokemonCatcher from './pages/PokemonCatcher';
import Games from './pages/Games';

const App = () => {

  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav>
          <ul>
          <li>
              <Link to="/swipe">Swipe</Link>
            </li>
            <li>
              <Link to="/count">Count</Link>
            </li>
            <li>
              <Link to="/random-joke">Random Joke</Link>
            </li>
            <li>
              <Link to="/pokemon-catcher">Pokemon Catcher</Link>
            </li>
            <li>
              <Link to="/games">Games</Link>
            </li>
          </ul>
        </nav>
       
        {/* Define Routes */}
        <Routes>
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/count" element={<Count />} />
          <Route path="/random-joke" element={<RandomJoke />} />
          <Route path="/pokemon-catcher" element={<PokemonCatcher />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
