import React from "react";
import "./PdfPreview.css";

function PdfPreview({ pdfUrl, onSubmit, onDiscard }) {
  return (
    <div className="pdf-preview">
      <iframe src={pdfUrl} className="pdf-frame" title="PDF Preview"></iframe>
      <div className="pdf-buttons">
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onDiscard}>Discard</button>
      </div>
    </div>
  );
}

export default PdfPreview;