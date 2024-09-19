import React, { useEffect, useState } from "react";
import "../../css/whatsGoingOn.css";
import { Link } from "react-router-dom";

function WhatsGoingOnSqare({ src, title, desc, link, blob, loading }) {
  const [imgHeight, setImgHeight] = useState(0);
  const handleImgResize = () => {
    window.innerWidth > 499
      ? setImgHeight(window.innerHeight / 3)
      : setImgHeight(window.innerHeight / 2);
  };
  useEffect(() => {
    window.addEventListener("resize", handleImgResize);

    return () => window.removeEventListener("resize", handleImgResize);
  }, []);
  return (
    <Link to={link}>
      <div className="tile-container">
        <div className={loading ? "tile-loading-container blur" : "tile-loading-container loaded"}></div>
        <img
          className="tile-img"
          src={loading ? `${src}.avif` : blob}
          alt={title}
          loading="lazy"
          height={!imgHeight ? window.innerHeight / 2 : imgHeight}
          onLoad={handleImgResize}
          // width={window.innerWidth / 2}
        />
        <div className="tile-text">
          <h3 className="sub-header">{title}</h3>
          <p className="general-text">{desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default WhatsGoingOnSqare;
