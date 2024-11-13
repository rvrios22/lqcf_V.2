import React from "react";
import studies from "../../public/mappingData/currentStudies";

function CurrentStudies() {
  return (
    <div className="general-container">
      {studies.map((study, idx) => (
        <div key={idx}>
          <h2 className="sub-header">{study.study}</h2>
          <p className="general-text">{study.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default CurrentStudies;
