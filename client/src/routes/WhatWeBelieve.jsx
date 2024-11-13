import React from "react";
import beliefs from "../../public/mappingData/whatWeBelieve";

function WhatWeBelieve() {
  return (
    <div className="general-container">
      {beliefs.map((item, idx) => (
        <div key={idx}>
          <h2 className="sub-header">{item.title}</h2>
          <p className="general-text">{item.statement}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default WhatWeBelieve;
