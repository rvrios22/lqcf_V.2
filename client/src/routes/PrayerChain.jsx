import React from "react";
import PageHeader from "../components/PageHeader";

function PrayerChain() {
  return (
    <>
      <PageHeader
        srcImg="./prayerChainHeader.avif"
        fetchImg="prayerChainHeader"
        headerText="Prayer Chain"
        imgAltText="Prayer Chain"
      />
      <p className="general-text">
        Our Prayer Chain ministry is led by Pastor Mark Cook. We meet the first
        Friday of each month at 7 PM in the Sanctuary to pray for the needs of
        those that have been submitted to us throughout the month. To join us in
        our prayer meetings please reach out to Pastor Cook to become part of
        the ministry.
      </p>
      <p className="bible-text">
        Praying always with all prayer and supplication in the Spirit, and
        watching thereunto with all perseverance and supplication for all saints {""}
        <span className="citation">Ephesians 6:18</span>
      </p>
    </>
  );
}

export default PrayerChain;
