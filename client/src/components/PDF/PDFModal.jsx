import React, { useEffect, useState } from "react";
import "../../css/pdf-modal.css";
import PDF from "../PDF/PDF";

function PDFModal({
  displayStudy,
  isMounted,
  setMounted,
  setShow,
  endAnimation,
}) {
  //this animation relies on two states for each component, isMounted and showDiv. Both are triggered to true onClick and on exit isMounted is set to false triggering outAnim. onAnimEnd showDiv is set to false and remove from DOM
  const [study, setStudy] = useState("");
  const [studies, setStudies] = useState([]);
  const [PDFData, setPDFData] = useState([]);

  const mountedStyle = {
    animation: "fadeIn 300ms",
  };

  const unmountStyle = {
    animation: "fadeOut 200ms",
    animationFillMode: "forwards",
  };

  const fetchStudies = async () => {
    try {
      const response = await fetch("/api/study");
      if (!response.ok) {
        console.error(
          `Something went wrong, ${Response.status}: ${Response.error}`
        );
        return;
      }
      const data = await response.json();

      const foundStudy = data.studies.find((study) => {
        return study.name === displayStudy;
      });
      setStudies(data.studies);
      setStudy(foundStudy.name);
    } catch (err) {
      console.error(`Something went wrong: ${err}}`);
    }
  };

  //fetchPDFs used to fetch from DB
  const fetchPDFs = async (study) => {
    if (!study) return;
    if (study === "Favorites") {
      console.log("fav");
      return;
    }
    try {
      const response = await fetch(`/api/pdfs/${study}`);
      if (!response.ok) {
        console.error(
          `Something went wrong, ${Response.status}: ${Response.error}`
        );
        return;
      }
      const data = await response.json();
      setPDFData(data.pdfs);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  };

  //fetchFavorites used to fetch pdfs in local storage
  const fetchFavorites = () => {};
  useEffect(() => {
    fetchStudies();
  }, []);

  useEffect(() => {
    fetchPDFs(study);
  }, [study]);

  return (
    <div
      className="fixed-container"
      style={isMounted ? mountedStyle : unmountStyle}
      onAnimationEnd={() => {
        endAnimation(isMounted, setShow);
      }}
    >
      <div className="pdf-modal-container">
        <div
          className="close-svg"
          onClick={() => {
            setMounted(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </div>

        <div className="header-row">
          <h2 className="sub-header">Title</h2>
          <select
            value={study || "Select A Study"}
            name="studies"
            id="studies"
            onChange={(e) => {
              setStudy(e.target.value);
              fetchPDFs(e.target.value);
            }}
          >
            {/* <option value="Favorites">Favorites</option> */}
            {studies.map((study, idx) => (
              <option value={study.name} key={study.id}>
                {study.name}
              </option>
            ))}
          </select>
          <h2 className="sub-header">Date</h2>
        </div>
        <div className="pdf-bottom">
          {PDFData.map((pdf, idx) => (
            <PDF key={pdf.id} pdf={pdf} PDFData={PDFData} setPDFData={setPDFData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PDFModal;
