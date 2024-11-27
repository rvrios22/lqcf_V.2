import React, { useEffect, useState } from "react";
import "../../css/pdf-modal.css";

function PDF({ pdf }) {
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

  useEffect(() => {
    const pdfPath = pdf.pdfPath;
    const splitAfterPDFIdx = pdfPath.indexOf("/pdf");
    const splitAfterPDF = pdfPath.substring(splitAfterPDFIdx);
    setPDFDestination(splitAfterPDF);
  }, []);

  return (
    <div className="pdf-list-flex" key={pdf.id}>
      <div className="pdf-left-flex">
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
        <span onClick={openPDF} className="general-text">
          {pdf.title}
        </span>
      </div>
      <span className="general-text">{pdf.date || "N/A"}</span>
    </div>
  );
}

export default PDF;
