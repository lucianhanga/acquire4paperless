import React, { useState } from "react";
import PageAcquisition from "./components/PageAcquisition";
import PictureList from "./components/PictureList";
import GeneratePdfButton from "./components/GeneratePdfButton";
import "./App.css";

function App() {
  const [isPageAcquisitionOpen, setIsPageAcquisitionOpen] = useState(false);
  const [pictures, setPictures] = useState([]);

  const handleConfirmPicture = (image) => {
    setPictures([...pictures, image]);
    setIsPageAcquisitionOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Scanner for Paperless</h1>
        {!isPageAcquisitionOpen && (
          <button onClick={() => setIsPageAcquisitionOpen(true)}>Add Page</button>
        )}
        {isPageAcquisitionOpen && <PageAcquisition onConfirm={handleConfirmPicture} />}
        <PictureList pictures={pictures} />
        <GeneratePdfButton pictures={pictures} />
      </header>
    </div>
  );
}

export default App;
