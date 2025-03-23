import React, { useState } from "react";
import PageAcquisition from "./components/PageAcquisition";
import PictureList from "./components/PictureList";
import GeneratePdfButton from "./components/GeneratePdfButton";
import PdfPreview from "./components/PdfPreview";
import "./App.css";

function App() {
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
    setPictures([]);
  };

  const handleSubmitPdf = () => {
    // Do nothing for now
  };

  const handleDiscardPictures = () => {
    setPictures([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Scanner for Paperless</h1>
        {pdfUrl ? (
          <PdfPreview pdfUrl={pdfUrl} onSubmit={handleSubmitPdf} onDiscard={handleDiscardPdf} />
        ) : (
          <>
            {!isPageAcquisitionOpen && (
              <button onClick={() => setIsPageAcquisitionOpen(true)}>Add Page</button>
            )}
            {isPageAcquisitionOpen && <PageAcquisition onConfirm={handleConfirmPicture} />}
            <PictureList pictures={pictures} />
            <GeneratePdfButton
              pictures={pictures}
              onPdfGenerated={handlePdfGenerated}
              onDiscard={handleDiscardPictures}
            />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
