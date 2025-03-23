import React, { useRef, useState } from "react";
import NativeCameraCapture from "./NativeCameraCapture";
import ImagePreview from "./ImagePreview";
import ActionButtons from "./ActionButtons";
import ImageEditor from "./ImageEditor";
import "./PageAcquisition.css";

function PageAcquisition({ onConfirm }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDiscardPicture = () => {
    setImage(null);
  };

  const handleEditPicture = () => {
    setIsEditing(true);
  };

  const handleCropComplete = (croppedImage) => {
    setImage(croppedImage);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="page-acquisition">
      {!isEditing && <ImagePreview image={image} />}
      {!isEditing && (
        <ActionButtons
          image={image}
          onTakePicture={handleTakePicture}
          onLoadPicture={handleLoadPicture}
          onConfirmPicture={handleConfirmPicture}
          onDiscardPicture={handleDiscardPicture}
          onEditPicture={handleEditPicture}
        />
      )}
      {isEditing && (
        <ImageEditor
          image={image}
          onCropComplete={handleCropComplete}
          onCancel={handleCancelEdit}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
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