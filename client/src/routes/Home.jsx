import React from "react";
import PageHeader from "../components/PageHeader";
// import WhatsGoingOn from "../components/WhatsGoingOn";
function Home() {
  return (
    <>
      <PageHeader
        srcImg="./lqcfHome.avif"
        fetchImg="lqcfHome"
        headerText="La Quinta Christian Fellowship Church"
        imgAltText="La Quinta Christian Fellowship Church"
      />
      <p className="general-text">
        La Quinta Christian Fellowship Church is a non-denominational
        evangelical church committed to seeing redeemed, transformed individuals
        and community through the story of God's salvation. We gladly invite you
        to join us for Sunday morning worship service.
      </p>
      <p className="bible-text">
        Blessed be the God and Father of our Lord Jesus Christ, who has blessed
        us with every spiritual blessing in the heavenly places in Christ, just
        as He chose us in Him before the foundation of the world, that we would
        be holy and blameless before Him. In love He predestined us to adoption
        as sons through Jesus Christ to Himself, according to the kind intention
        of His will, to the praise of the glory of His grace, which He freely
        bestowed on us in the Beloved. <span className="citation">Ephesians 1:3-6</span>
      </p>
      {/* <WhatsGoingOn /> */}
    </>
  );
}

export default Home;
