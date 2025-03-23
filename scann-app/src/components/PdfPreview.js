import React, { useEffect, useRef } from "react";
import PDFObject from "pdfobject";
import "./PdfPreview.css";

function PdfPreview({ pdfUrl, onSubmit, onDiscard }) {
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    PDFObject.embed(pdfUrl, pdfContainerRef.current, {
      fallbackLink: `<p>This browser does not support inline PDFs. Please <a href="${pdfUrl}" download>download the PDF</a> to view it.</p>`,
    });
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