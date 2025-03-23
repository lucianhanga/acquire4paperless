import React, { useState } from "react";
import PageAcquisition from "./PageAcquisition";
import PdfPreview from "./PdfPreview";
import PictureSection from "./PictureSection";
import AddPageSection from "./AddPageSection";
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

  const renderPdfPreview = () => (
    <PdfPreview pdfUrl={pdfUrl} onSubmit={handleSubmitPdf} onDiscard={handleDiscardPdf} />
  );

  const renderPageAcquisition = () => (
    <PageAcquisition onConfirm={handleConfirmPicture} />
  );

  const renderPictureSection = () => (
    <PictureSection
      pictures={pictures}
      onPdfGenerated={handlePdfGenerated}
      onDiscardPictures={handleDiscardPictures}
    />
  );

  const renderAddPageSection = () => (
    <AddPageSection onAddPage={() => setIsPageAcquisitionOpen(true)} />
  );

  return (
    <div className="App-content">
      {pdfUrl ? (
        renderPdfPreview()
      ) : (
        <>
          {!isPageAcquisitionOpen && renderAddPageSection()}
          {isPageAcquisitionOpen && renderPageAcquisition()}
          {!isPageAcquisitionOpen && renderPictureSection()}
        </>
      )}
    </div>
  );
}

export default Body;