import React, { useEffect, useState } from "react";
import "../../css/pdf-modal.css";
import getDate from "../../helpers/getDate";

function PDF({ pdf, PDFData, setPDFData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [pdfDestination, setPDFDestination] = useState("");

  const storeToLocalStorage = () => {
    localStorage.setItem(pdf.title, JSON.stringify(pdf));
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem(pdf.title);
  };

  const handleSetFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      storeToLocalStorage();
    } else {
      removeFromLocalStorage();
    }
  };

  const openPDF = () => {
    window.open(`http://localhost:3001${pdfDestination}`, "_blank");
  };

  const deletePDF = async (pdf) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    const response = await fetch(
      `http://localhost:3001/api/pdfs/${pdf.id}`,
      options
    );
    if (!response.ok) {
      console.error("Something went wrong");
      return;
    }
    const data = await response.json();
    console.log(data);
    setPDFData((prevPDFData) =>
      prevPDFData.filter((item) => item.id !== pdf.id)
    );
  };

  useEffect(() => {
    const pdfPath = pdf.pdfPath;
    const splitAfterPDFIdx = pdfPath.indexOf("/pdf");
    const splitAfterPDF = pdfPath.substring(splitAfterPDFIdx);
    setPDFDestination(splitAfterPDF);
  }, []);

  return (
    <div className="pdf-list-flex" key={pdf.id}>
      <div className="pdf-left-flex" onClick={openPDF}>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill={isFavorite ? "black" : "none"}
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => {
            handleSetFavorite();
          }}
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.968 1.522 8.301L12 18.847l-7.458 4.728 1.522-8.301L0 9.306l8.332-1.151L12 .587z" />
        </svg> */}
        <span className="general-text">{pdf.title}</span>
      </div>
      <div className="pdf-right-flex">
        <span className="general-text">
          {pdf.date === null ? "N/A" : getDate(pdf.date)}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => {
            deletePDF(pdf);
          }}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  );
}

export default PDF;
