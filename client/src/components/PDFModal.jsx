import React, { useEffect, useState } from "react";
import "../css/pdf-modal.css";

function PDFModal({ displayStudy }) {
  const [study, setStudy] = useState("");
  const [studies, setStudies] = useState([]);
  const [PDFData, setPDFData] = useState([]);

  const fetchStudies = async () => {
    try {
      const response = await fetch("http://localhost:3001/study");
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

  const fetchPDFs = async (study) => {
    if (!study) return;
    try {
      const response = await fetch(`http://localhost:3001/pdfs/${study}`);
      if (!response.ok) {
        console.error(
          `Something went wrong, ${Response.status}: ${Response.error}`
        );
        return;
      }
      const data = await response.json();
      console.log(data.pdfs);
      setPDFData(data.pdfs);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  };
  useEffect(() => {
    fetchStudies();
  }, []);

  useEffect(() => {
    fetchPDFs(study);
  }, [study]);

  return (
    <div className="pdf-modal-container">
      <div className="header-row">
        <h2 className="pdf-header">Title</h2>
        <select
          value={study || "Select A Study"}
          name="studies"
          id="studies"
          onChange={(e) => {
            setStudy(e.target.value);
          }}
        >
          {studies.map((study, idx) => (
            <option value={study.name} key={study.id}>
              {study.name}
            </option>
          ))}
        </select>
        <h2 className="pdf-header">Date</h2>
      </div>
      <div>
        {PDFData.map((pdf, idx) => (
          <div key={pdf.id}>{pdf.title}</div>
        ))}
      </div>
    </div>
  );
}

export default PDFModal;
