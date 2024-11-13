import React, { useEffect, useState, useRef } from "react";
import "../../css/person-mapper.css";
import useElementInView from "../../hooks/useElementInView";

function Person({ name, bio, img, link }) {
  const [loading, setLoading] = useState(true);
  const [blobURL, setBlobURL] = useState("");
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const imgRef = useRef(null);
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

  const calcImgHeight = () => {
    if (!imgRef.current) return;
    setImgHeight(imgRef.current.clientHeight);
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

  useEffect(() => {
    calcImgHeight();
    window.addEventListener("resize", calcImgHeight);

    return () => window.removeEventListener("resize", calcImgHeight);
  });

  return (
    <div className="person-grid">
      <div className="person-image-container" ref={targetRef}>
        <div
          className={
            loading ? "loading-container blur" : "loading-container loaded"
          }
        ></div>
        <img
          ref={imgRef}
          src={loading ? img : blobURL}
          alt={name}
          className="person-image"
          width={window.innerWidth * 0.9}
        />
        <h2 className="sub-header">{name}</h2>
      </div>
      <div style={window.innerWidth >= 699 ? { height: imgHeight, overflowY: 'scroll' } : {}}>
        <p className="general-text">{bio}</p>
      </div>
    </div>
  );
}

export default Person;
