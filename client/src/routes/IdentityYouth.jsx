import React from "react";
import PageHeader from "../components/PageHeader";

function IdentityYouth() {
  return (
    <>
      <PageHeader
        srcImg="./youthGroupHeader.avif"
        fetchImg="youthGroupHeader"
        headerText="Identity Youth Group"
        imgAltText="Identity Youth Logo"
      />
      <p className="general-text">
        Our youth group meets wednesday nights during our wednesday night
        service after worship. The group is lead by our youth director Reina
        Rios and Pastor Mark Cook.
      </p>
      <h2 className="sub-header">Purpose Statement</h2>
      <p className="general-text">
        Identity youth exists to train up generations of youth to know Christ,
        to know who they are in Christ, and to proclaim Christ to all.
      </p>
      <h2 className="sub-header">Vision Statement</h2>
      <p className="general-text">
        To discover our true identity in Christ and God's will for our lives.
      </p>
      <p className="bible-text">
        For we are God's masterpiece. He has created us anew in Christ Jesus, so
        we can do the good things he planned for us long ago. {""}
        <span className="citation">Ephesians 2:10</span>
      </p>
    </>
  );
}

export default IdentityYouth;
