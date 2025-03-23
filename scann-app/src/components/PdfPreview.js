import React, { useEffect, useRef } from "react";
import "./PdfPreview.css";

function PdfPreview({ pdfUrl, onSubmit, onDiscard }) {
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    const embedPdf = () => {
      const iframe = document.createElement("iframe");
      iframe.src = pdfUrl;
      iframe.width = "100%";
      iframe.height = "500px";
      iframe.style.border = "none";
      pdfContainerRef.current.innerHTML = "";
      pdfContainerRef.current.appendChild(iframe);
    };

    embedPdf();
  }, [pdfUrl]);

  return (
    <div className="pdf-preview">
      <div ref={pdfContainerRef} className="pdf-frame"></div>
      <div className="pdf-buttons">
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onDiscard}>Discard</button>
      </div>
    </div>
  );
}

export default PdfPreview;