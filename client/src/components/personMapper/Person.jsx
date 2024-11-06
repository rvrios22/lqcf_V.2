import React, { useEffect, useState } from "react";
import "../../css/person-mapper.css";
import useElementInView from "../../hooks/useElementInView";

function Person({ name, bio, img, link }) {
  const [loading, setLoading] = useState(true);
  const [blobURL, setBlobURL] = useState("");
  const [imgWidth, setImgWidth] = useState(0);
  const [targetRef, isInView] = useElementInView();

  const fetchImg = async () => {
    const response = await fetch(link);
    const blob = await response.blob();
    setBlobURL(URL.createObjectURL(blob));
    setLoading(false);
    return URL.revokeObjectURL(blob);
  };

  const handleImgResize = () => {
    if (window.innerWidth * 0.9 > 630) return;
    setImgWidth(window.innerWidth * 0.9);
  };

  useEffect(() => {
    if (isInView && !blobURL) {
      fetchImg();
    }
  }, [isInView]);

  useEffect(() => {
    window.addEventListener("resize", handleImgResize);

    return () => window.removeEventListener("resize", handleImgResize);
  }, []);

  return (
    <div className="person-grid">
      <div className="person-image-container" ref={targetRef}>
        <div
          className={
            loading ? "loading-container blur" : "loading-container loaded"
          }
        ></div>
        <img
          src={loading ? img : blobURL}
          alt={name}
          className="person-image"
          width={window.innerWidth * 0.9}
        />
      </div>
      <div>
        <h2 className="sub-header">{name}</h2>
        <p className="general-text">{bio}</p>
      </div>
    </div>
  );
}

export default Person;
