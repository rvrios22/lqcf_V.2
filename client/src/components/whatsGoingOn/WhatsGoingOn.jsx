import React, { useEffect, useState } from "react";
import data from "./whatsGoingOnData";
import WhatsGoingOnSqare from "./WhatsGoingOnSqare";

function WhatsGoingOn() {
  const [loading, setLoading] = useState(true);

  let newData;
  useEffect(() => {
    const fetchSquareImgs = async () => {
      try {
        const responses = await Promise.all(
          data.map((tile) => fetch(tile.fetch))
        );
        const imgBlobs = await Promise.all(responses.map((res) => res.blob()));
        const imgURLs = imgBlobs.map((blob) => {
          return URL.createObjectURL(blob)
        })
        data.forEach((tile, idx) => {
          tile.blob = imgURLs[idx]
        })

        setLoading(false)
        console.log(data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchSquareImgs();
  }, [loading]);

  return (
    <div className="whats-going-on-container">
      {data.map((tile, idx) => (
        <WhatsGoingOnSqare
          key={idx}
          src={tile.img}
          title={tile.title}
          desc={tile.desc}
          link={tile.link}
          blob={tile.blob}
          loading={loading}
        />
      ))}
    </div>
  );
}

export default WhatsGoingOn;
