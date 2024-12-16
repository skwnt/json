import React, { useState, useEffect } from "react";

function RandomJoke() {
  const [joke, setJoke] = useState(""); // State to store the joke

  useEffect(() => {
    // Fetch a joke when the component loads
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((data) => {
        setJoke(`${data.setup} - ${data.punchline}`); // Set the joke in state
      })
      .catch((error) => console.error("Error fetching joke:", error));
  }, []); // Empty array means this runs only when the component mounts

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Random Joke Generator</h1>
      {joke ? <p>{joke}</p> : <p>Loading a joke for you...</p>}
    </div>
  );
}

export default RandomJoke;
