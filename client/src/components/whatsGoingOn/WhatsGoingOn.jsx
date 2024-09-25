import React, { useEffect, useRef, useState } from "react";
import data from "./whatsGoingOnData";
import WhatsGoingOnSqare from "./WhatsGoingOnSqare";
import useElementInView from "../../hooks/useElementInView";

function WhatsGoingOn() {
  const [loading, setLoading] = useState(true);
  const [targetRef, isInView] = useElementInView({
    rootMargin: "-10px",
    threshold: 0.75,
  });

  const fetchSquareImgs = async () => {
    try {
      const responses = await Promise.all(
        data.map((tile) => fetch(tile.fetch))
      );
      const imgBlobs = await Promise.all(responses.map((res) => res.blob()));
      const imgURLs = imgBlobs.map((blob) => {
        return URL.createObjectURL(blob);
      });
      data.forEach((tile, idx) => {
        tile.blob = imgURLs[idx];
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isInView || !loading) return;
    fetchSquareImgs();
  }, [isInView]);

  return (
    <div className="whats-going-on-container" ref={targetRef}>
      {data.map((tile, idx) => (
        <WhatsGoingOnSqare
          key={idx}
          src={tile.img}
          title={tile.title}
          desc={tile.desc}
          link={tile.link}
          blob={tile.blob}
          loading={loading}
          idx={idx}
        />
      ))}
    </div>
  );
}

export default WhatsGoingOn;
