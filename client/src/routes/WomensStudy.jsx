import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PDFModal from "../components/PDF/PDFModal";
import PDFUploadForm from "../components/PDF/PDFUploadForm";
import { useOutletContext } from "react-router-dom";
function WomensStudy() {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const { user } = useOutletContext();
  const endAnimation = (isMounted, setShow) => {
    if (!isMounted) setShow(false);
  };
  return (
    <>
      <PageHeader
        srcImg="./womensStudyHeader.avif"
        fetchImg="womensStudyHeader"
        headerText="Women's Study"
        imgAltText="Women's Study"
      />
      <h1 className="sub-header">Women's Study</h1>
      <img
        src="./womensStudySubHeader.avif"
        alt="Women's group"
        loading="lazy"
        className="centered-image"
      />
      <p className="general-text">
        Women joining together in the Word, fellowship, encouragement, and
        prayer; to glorify God and enjoy Him forever! The call of this ministry
        is to bring us women into union with Christ, through the Holy Spirit by
        the reading, studying, and discussion of Holy Scriptures. Each gathering
        we magnify God in His Holiness and come to a proper view and position of
        self, in comparison to Christ Jesus our Lord and Savior. We glorify God
        in each of these studies, while building confidence and familiarity in
        the Scriptures, as well as, empowering one another in prayer, and
        creating a strong sisterhood in Christ. Each aspect of the ministry
        helps to equip and build confidence in sharing the Gospel and prayer
        with those we encounter. <br></br>Bible studies are hosted in a casual
        environment at Jennifer's home, on the 2nd and 4th Friday of each month
        (any variations will be posted in the calendar) at 6:30 pm. Bring your
        Bibles and bring a treat or dish to share (if you can). Beverages,
        plates, and utensils are always provided. <br></br>Our current study is
        on Terms & Definitions. We are going through each block of terms that
        are broken up into: General Terms, Church Service Terms, Theological
        Terms, Commandment/Covenant Terms. The intent of this study is to grow
        in the knowledge of Heavenly Father, His Son Christ Jesus, and to be in
        fellowship with the Holy Spirit. Prayerfully, through each study we will
        have a better understanding of each of the terms, why they are
        important, where to find them in the Bible, and how to apply them to our
        daily worship and praise. Our previous study was in the Attributes of
        God. Each study is unique and created to be a stand-alone study, but
        pairs beautifully with the previous and upcoming studies. This allows
        the opportunity for ladies to join in when their schedule permits. To
        see a list of all of the outlines in this series click{" "}
        <span
          onClick={() => {
            setIsModalShowing(true);
            setIsModalMounted(true);
          }}
          className="underline"
        >
          here
        </span>
        . <br></br>
        Jennifer has a passion for learning and teaching Scripture, and a heart
        for encouraging and leading the women in this ministry. Please feel free
        to contact Jennifer at{" "}
        <a className="underline" href="tel:760-887-6523">
          760-887-6523
        </a>{" "}
        (call or text), or email:{" "}
        <a className="underline" href="mailto:jenniferclaire77@gmail.com">
          jenniferclaire77@gmail.com
        </a>
        with any questions about this ministry.
      </p>
      {isModalShowing && (
        <PDFModal
          displayStudy="Terms and Definitions"
          setShow={setIsModalShowing}
          isMounted={isModalMounted}
          setMounted={setIsModalMounted}
          endAnimation={endAnimation}
        />
      )}
      {user.admin && <PDFUploadForm />}
    </>
  );
}

export default WomensStudy;
