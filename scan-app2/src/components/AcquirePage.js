import React, { useState } from "react";
import PhotoButtons from "./PhotoButtons";
import AcquireButtons from "./AcquireButtons";
import NativeCameraCapture from "./NativeCameraCapture";
import Preview from "./Preview";
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
      <Preview image={image} />
      <PhotoButtons onTakePicture={handleTakePictureClick} onSelectPicture={onSelectPicture} />
      <AcquireButtons onAdd={onAdd} onDiscard={onDiscard} onEdit={onEdit} />
      {isCapturing && <NativeCameraCapture onCapture={handleCapture} />}
    </div>
  );
}

export default AcquirePage;