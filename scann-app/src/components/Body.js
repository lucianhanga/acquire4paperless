import React, { useState } from "react";
import PageAcquisition from "./PageAcquisition";
import PictureList from "./PictureList";
import GeneratePdfButton from "./GeneratePdfButton";
import PdfPreview from "./PdfPreview";
import AddPageButton from "./AddPageButton";
import "./Body.css";

function Body() {
  const [isPageAcquisitionOpen, setIsPageAcquisitionOpen] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleConfirmPicture = (image) => {
    setPictures([...pictures, image]);
    setIsPageAcquisitionOpen(false);
  };

  const handlePdfGenerated = (url) => {
    setPdfUrl(url);
  };

  const handleDiscardPdf = () => {
    setPdfUrl(null);
  };

  const handleSubmitPdf = () => {
    // Do nothing for now
  };

  const handleDiscardPictures = () => {
    setPictures([]);
  };

  return (
    <div className="App-content">
      {pdfUrl ? (
        <PdfPreview pdfUrl={pdfUrl} onSubmit={handleSubmitPdf} onDiscard={handleDiscardPdf} />
      ) : (
        <>
          {!isPageAcquisitionOpen && (
            <AddPageButton onClick={() => setIsPageAcquisitionOpen(true)} />
          )}
          {isPageAcquisitionOpen && <PageAcquisition onConfirm={handleConfirmPicture} />}
          {!isPageAcquisitionOpen && <PictureList pictures={pictures} />}
          {!isPageAcquisitionOpen && (
            <GeneratePdfButton
              pictures={pictures}
              onPdfGenerated={handlePdfGenerated}
              onDiscard={handleDiscardPictures}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Body;