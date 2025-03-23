import React from "react";
import jsPDF from "jspdf";
import "./GeneratePdfButton.css";

function GeneratePdfButton({ pictures }) {
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

    pdf.save("document.pdf");
  };

  return (
    <button onClick={generatePdf} className="generate-pdf-button">
      Generate PDF
    </button>
  );
}

export default GeneratePdfButton;