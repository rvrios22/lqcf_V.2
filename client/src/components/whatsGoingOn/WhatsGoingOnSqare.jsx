import React, { useEffect, useRef, useState } from "react";
import "../../css/whatsGoingOn.css";
import { Link } from "react-router-dom";

function WhatsGoingOnSqare({ src, title, desc, link, blob, loading, idx }) {
  const [imgHeight, setImgHeight] = useState(0);
  const [textStyle, setTextStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({
    objectFit: "cover",
    width: "100%",
    transform: "scale(1.1)",
    transition: "transform 250ms ease-in",
  });
  const tileRef = useRef(null);
  const textRef = useRef(null);

  const handleImgResize = () => {
    window.innerWidth > 499
      ? setImgHeight(window.innerHeight / 3)
      : setImgHeight(window.innerHeight / 4);
  };

  const handleAnimIn = () => {
    setTextStyle({
      transform: `translate(-50%)`,
      transition: "transform 250ms ease-out",
    });
    setImgStyle({
      transform: "scale(1)",
      transition: "transform 250ms ease-in",
    });
  };

  const handleAnimOut = () => {
    const heightDifference =
      tileRef.current.clientHeight - textRef.current.clientHeight;
    setTextStyle({
      transform: `translate(-50%, ${heightDifference}px)`,
      transition: "transform 500ms ease-out",
    });
    setImgStyle({
      transform: "scale(1.1)",
      transition: "transform 250ms ease-in",
    });
  };

  useEffect(() => {
    if (!textRef.current || !tileRef.current) return;

    const getHeightDifference = () => {
      const heightDifference =
        tileRef.current.clientHeight - textRef.current.clientHeight;
      setTextStyle({
        transform: `translate(-50%, ${heightDifference}px)`,
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
      <div
        className="tile-container"
        onMouseEnter={handleAnimIn}
        onMouseLeave={handleAnimOut}
      >
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
          style={imgStyle}
          alt={title}
          loading="lazy"
          height={!imgHeight ? window.innerHeight / 2 : imgHeight}
          onLoad={handleImgResize}
        />
        <div className="tile-text" ref={tileRef} style={textStyle}>
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
