import React, { useEffect, useState } from "react";
import "../css/home.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("");
  const [imgSize, setImgSize] = useState({});

  const handleImgSize = (e) => {
    setImgSize({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  useEffect(() => {
    const fetchLanding = async () => {
      const response = await fetch("http://localhost:3001/home/lqcfHome.avif");
      const data = await response.blob();
      setImgSrc(URL.createObjectURL(data));
      setLoading(false);
      return () => URL.revokeObjectURL(imgSrc);
    };
    fetchLanding();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <div
        className={loading ? "blur-container blur" : "blur-container loaded"}
      ></div>
      <div className="landing-img-container">
        <img
          className="landing-img"
          src={!imgSrc ? "./lqcfHome.avif" : imgSrc}
          alt="La Quinta Christian Fellowship Church"
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <h1>La Quinta Christian Fellowship Church</h1>
      </div>
    </>
  );
}

export default Home;
