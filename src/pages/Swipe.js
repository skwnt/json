import React, { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Slide = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { color: "#FEA900", label: "Home Page" },
    { color: "#B3DC4A", label: "About Page" },
    { color: "#6AC0FF", label: "Contact Page" },
  ];

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Tabs */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "0px", // Ensures the tabs appear as a single row
          zIndex: 10,
        }}
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              flex: 1, // Ensures tabs stretch equally
              height: "50px", // Adjust tab height
              padding: "10px",
              border: "none",
              outline: "none",
              backgroundColor: activeIndex === index ? slide.color : "#eee", // Active tab color
              color: activeIndex === index ? "#fff" : "#666", // Text color
              fontWeight: activeIndex === index ? "bold" : "normal",
              fontSize: "1rem",
              transition: "background-color 0.3s, color 0.3s", // Smooth transition
              cursor: "pointer",
            }}
          >
            {slide.label.split(" ")[0]} {/* Display only the first word */}
          </button>
        ))}
      </div>

      {/* Slider */}
      <AwesomeSlider
        selected={activeIndex}
        onTransitionEnd={(event) => setActiveIndex(event.currentIndex)}
        style={{ marginTop: "50px" }} // Push slider below tabs
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundColor: slide.color,
              height: "calc(100vh - 50px)", // Adjust for tab height
              display: "flex",
              width: "90vw",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "2rem",
            }}
          >
            <h1>{slide.label}</h1>
          </div>
        ))}
      </AwesomeSlider>
    </div>
  );
};

export default Slide;
