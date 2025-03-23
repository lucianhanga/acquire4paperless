import React, { useState } from "react";
import jsPDF from "jspdf";
import PdfPreview from "./PdfPreview";
import "./GeneratePdfButton.css";

function GeneratePdfButton({ pictures, onPdfGenerated }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePdf = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pictures.forEach((picture, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      pdf.addImage(picture, "JPEG", 0, 0, 210, 297); // A4 size in mm
    });

    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
    onPdfGenerated(pdfUrl);
  };

  return (
    <button onClick={generatePdf} className="generate-pdf-button">
      Generate PDF
    </button>
  );
}

export default GeneratePdfButton;