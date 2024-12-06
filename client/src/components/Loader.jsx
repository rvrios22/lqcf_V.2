import React, { useEffect, useRef } from "react";
import "../css/loader.css";

function Loader() {
  const circleContainer = useRef(null);
  const circles = useRef([]);

  let radius;
  let rotation;

  const setCircle = () => {
    circles.current.forEach((circle, idx) => {
      const value = `rotate(${
        idx * rotation
      }deg) translate(${radius}px) rotate(-${idx * rotation}deg)`;
      circle.style.transform = value;
    });
  };

  useEffect(() => {
    radius = circleContainer.current.offsetWidth / 2;
    rotation = 360 / circles.current.length;
    setCircle();
  }, []);
  return (
    <div className="loader-container">
      <div className="circle-container" ref={circleContainer}>
        {[...Array(8)].map((circle, idx) => (
          <div
            key={idx}
            className="circle"
            ref={(el) => (circles.current[idx] = el)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Loader;
