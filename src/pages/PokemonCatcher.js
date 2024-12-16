import React, { useState } from "react"; // A list of Pokémon to choose from 
const pokemons = ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Jigglypuff"]; 

function PokemonCatcher() { 
  const [caughtPokemon, setCaughtPokemon] = useState([]); // Keeps track of caught Pokémon 
  const [lastCaught, setLastCaught] = useState(""); // Tracks the last caught Pokémon 
  const catchPokemon = () => { 
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)]; 
    setCaughtPokemon([...caughtPokemon, randomPokemon]); // Add to the list 
    setLastCaught(randomPokemon); // Update the last caught 
    }; 
    
    return ( 
    <div style={{ textAlign: "center", marginTop: "20px" }}> 
      <h1>Pokémon Catcher</h1> 
      <button onClick={catchPokemon} style={{ backgroundColor: "yellow", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "18px", }} > Catch a Pokémon! </button> 
      <h2>{lastCaught ? `You caught a ${lastCaught}! 🎉` : "Catch your first Pokémon!"}</h2> 
      <h3>Total Pokémon caught: {caughtPokemon.length}</h3> 
      <ul> {caughtPokemon.map((pokemon, index) => ( 
        <li key={index}>{pokemon}</li> ))} 
      </ul> 
    </div> 
    ); 
}
        
export default PokemonCatcher;
