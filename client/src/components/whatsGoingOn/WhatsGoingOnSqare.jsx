import React, { useEffect, useRef, useState } from "react";
import "../../css/whatsGoingOn.css";
import { Link } from "react-router-dom";

function WhatsGoingOnSqare({ src, title, desc, link, blob, loading, idx }) {
  const [imgHeight, setImgHeight] = useState(0);
  const [style, setStyle] = useState({});
  const tileRef = useRef(null);
  const textRef = useRef(null);

  const handleImgResize = () => {
    window.innerWidth > 499
      ? setImgHeight(window.innerHeight / 3)
      : setImgHeight(window.innerHeight / 4);
  };

  const handleTextUp = () => {
    setStyle({
      transform: `translate(-50%)`,
      transition: "transform 250ms ease-out",
    });
  };

  const handleTextDown = () => {
    const heightDifference =
      tileRef.current.clientHeight - textRef.current.clientHeight;
    setStyle({
      transform: `translate(-50%, ${heightDifference}px)`,
      transition: "transform 500ms ease-out",
    });
  };

  useEffect(() => {
    if (!textRef.current || !tileRef.current) return;

    const getHeightDifference = () => {
      const heightDifference =
        tileRef.current.clientHeight - textRef.current.clientHeight;
      setStyle({
        transform: `translate(-50%, ${heightDifference}px)`,
        transition: "transform 500ms ease-out",
      });
    };
    getHeightDifference();

    window.addEventListener("resize", getHeightDifference);

    return () => window.removeEventListener("resize", getHeightDifference);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleImgResize);

    return () => window.removeEventListener("resize", handleImgResize);
  }, []);
  return (
    <Link to={link}>
      <div className="tile-container">
        <div
          className={
            loading
              ? "tile-loading-container blur"
              : `tile-loading-container loaded tile-${idx}`
          }
        ></div>
        <img
          className="tile-img"
          src={loading ? `${src}.avif` : blob}
          alt={title}
          loading="lazy"
          height={!imgHeight ? window.innerHeight / 2 : imgHeight}
          onLoad={handleImgResize}
          onMouseEnter={handleTextUp}
          onMouseLeave={handleTextDown}
        />
        <div className="tile-text" ref={tileRef} style={style}>
          <h3 className="sub-header" ref={textRef}>
            {title}
          </h3>
          <p className="general-text">{desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default WhatsGoingOnSqare;
