import React, { useState } from "react";
import PhotoButtons from "./PhotoButtons";
import AcquireButtons from "./AcquireButtons";
import NativeCameraCapture from "./NativeCameraCapture";
import Preview from "./Preview";
import EditPage from "./EditPage";
import "./AcquirePage.css";

function AcquirePage({ onCancel, onAdd, onEdit, onTakePicture, onSelectPicture, image }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCapture = (imageUrl) => {
    onTakePicture(imageUrl);
    setIsCapturing(false);
  };

  const handleTakePictureClick = () => {
    setIsCapturing(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveCrop = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Fill the canvas with a white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedImage = canvas.toDataURL("image/jpeg", 1.0);
      onTakePicture(croppedImage);
      setIsEditing(false);
    };
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsCapturing(false);
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="acquire-page">
      {!isEditing ? (
        <>
          <Preview image={image} />
          <PhotoButtons onTakePicture={handleTakePictureClick} onSelectPicture={onSelectPicture} />
          <AcquireButtons onAdd={onAdd} onCancel={handleCancel} onEdit={handleEditClick} disableEdit={!image} disableCancel={!image} />
          {isCapturing && <NativeCameraCapture onCapture={handleCapture} />}
        </>
      ) : (
        <EditPage
          image={image}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
          onSave={handleSaveCrop}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default AcquirePage;