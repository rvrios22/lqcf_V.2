import React from "react";
import PersonMapper from "../components/personMapper/PersonMapper";
import elderData from "/public/mappingData/elderMap";

function Elders() {
  return (
    <div className="general-container">
      <h1 className="header">Meet Our Elders</h1>
      <PersonMapper data={elderData} />
    </div>
  );
}

export default Elders;
