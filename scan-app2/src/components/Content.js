import React, { useState } from "react";
import PageList from "./PageList";
import AcquirePage from "./AcquirePage";
import "./Content.css";

function Content() {
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [image, setImage] = useState(null);

  const handleAddPage = () => {
    setIsAcquiring(true);
  };

  const handleDiscard = () => {
    setIsAcquiring(false);
    setImage(null); // Reset image when discarding
  };

  const handleAdd = () => {
    // Handle add action
  };

  const handleEdit = () => {
    // Handle edit action
  };

  const handleTakePicture = () => {
    // Handle take picture action
  };

  const handleSelectPicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App-content">
      {isAcquiring ? (
        <AcquirePage
          onDiscard={handleDiscard}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onTakePicture={handleTakePicture}
          onSelectPicture={handleSelectPicture}
          image={image}
        />
      ) : (
        <>
          <PageList />
          <div className="button-row">
            <button className="add-page-button" onClick={handleAddPage}>Add Page</button>
            <button className="submit-button">Submit</button>
            <button className="discard-button">Discard</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;