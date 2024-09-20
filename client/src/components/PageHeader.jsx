import React, { useState, useEffect } from "react";
import "../css/pageHeader.css";
function PageHeader({ srcImg, fetchImg, headerText, imgAltText }) {
  const [imgSrc, setImgSrc] = useState("");
  const [imgSize, setImgSize] = useState({ height: 0, width: 0 });
  const [loading, setLoading] = useState(true);
  const [wasImgFetched, setImgFetched] = useState(false);

  const fetchHeroImg = async () => {
    if (wasImgFetched) return;
    const response = await fetch(`http://localhost:3001/home/${fetchImg}.avif`);
    const data = await response.blob();
    setImgSrc(URL.createObjectURL(data));
    setLoading(false);
    setImgFetched(true);
    return () => URL.revokeObjectURL(imgSrc);
  };

  const handleImgResize = () => {
    setImgSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleImgResize);

    return () => window.removeEventListener("resize", handleImgResize);
  }, []);
  return (
    <>
      <div
        className={loading ? "blur-container blur" : "blur-container loaded"}
      ></div>
      <div className="header-img-container">
        <img
          className="header-img"
          src={!imgSrc ? srcImg : imgSrc}
          alt={imgAltText}
          width={!imgSize ? window.innerWidth : imgSize.width}
          height={!imgSize ? window.innerHeight : imgSize.height}
          onLoad={() => {
            fetchHeroImg();
            handleImgResize();
          }}
        />
        <h1 className={loading ? "hidden" : "slide-in"}>{headerText}</h1>
      </div>
    </>
  );
}

export default PageHeader;
