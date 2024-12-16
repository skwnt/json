import React, { useState } from "react";

const Count = () => {

  const [count, setCount] = useState(0); // count starts at 0 

  return (

    <div style={{ height: "100vh", position: "relative" }}>
      <div> 
      <p>You clicked {count} times</p> 
      <button onClick={() => setCount(count + 1)}>Click Me</button> 
    </div>
    </div>
  );
};

export default Count;
