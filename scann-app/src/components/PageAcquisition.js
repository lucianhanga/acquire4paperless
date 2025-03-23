import React, { useRef, useState } from "react";
import NativeCameraCapture from "./NativeCameraCapture";
import "./PageAcquisition.css";

function PageAcquisition({ onConfirm }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleTakePicture = () => {
    setIsCameraOpen(true);
  };

  const handleLoadPicture = () => {
    fileInputRef.current.click();
  };

  const handleConfirmPicture = () => {
    if (image) {
      onConfirm(image);
      setImage(null);
    }
  };

  return (
    <div className="page-acquisition">
      {image ? (
        <img src={image} alt="Preview" className="image-preview" />
      ) : (
        <div className="image-placeholder">
          <p>Picture Preview</p>
        </div>
      )}
      <div className="button-row">
        <button onClick={handleTakePicture}>Take Picture</button>
        <button onClick={handleLoadPicture}>Load Picture</button>
        {image && <button onClick={handleConfirmPicture}>Confirm Picture</button>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
      {isCameraOpen && (
        <NativeCameraCapture
          onCapture={(capturedImage) => {
            setImage(capturedImage);
            setIsCameraOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PageAcquisition;