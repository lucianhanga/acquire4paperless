import React, { useState } from "react";
import PhotoButtons from "./PhotoButtons";
import AcquireButtons from "./AcquireButtons";
import NativeCameraCapture from "./NativeCameraCapture";
import "./AcquirePage.css";

function AcquirePage({ onDiscard, onAdd, onEdit, onTakePicture, onSelectPicture, image }) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = (imageUrl) => {
    onTakePicture(imageUrl);
    setIsCapturing(false);
  };

  const handleTakePictureClick = () => {
    setIsCapturing(true);
  };

  return (
    <div className="acquire-page">
      <div className="image-preview">
        {image ? <img src={image} alt="Preview" /> : <div className="image-placeholder">No Image</div>}
      </div>
      <PhotoButtons onTakePicture={handleTakePictureClick} onSelectPicture={onSelectPicture} />
      <AcquireButtons onAdd={onAdd} onDiscard={onDiscard} onEdit={onEdit} />
      {isCapturing && <NativeCameraCapture onCapture={handleCapture} />}
    </div>
  );
}

export default AcquirePage;