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

  const resizeImageToA4 = (imageUrl, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const a4Width = 2480; // A4 width in pixels at 300 DPI
      const a4Height = 3508; // A4 height in pixels at 300 DPI
      canvas.width = a4Width;
      canvas.height = a4Height;

      // Fill the canvas with a white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate the aspect ratio and draw the image centered
      const imgAspectRatio = img.width / img.height;
      const a4AspectRatio = a4Width / a4Height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspectRatio > a4AspectRatio) {
        drawWidth = a4Width;
        drawHeight = a4Width / imgAspectRatio;
        offsetX = 0;
        offsetY = (a4Height - drawHeight) / 2;
      } else {
        drawHeight = a4Height;
        drawWidth = a4Height * imgAspectRatio;
        offsetX = (a4Width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      callback(canvas.toDataURL("image/jpeg", 1.0)); // Use maximum quality
    };
    img.src = imageUrl;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      resizeImageToA4(imageUrl, setImage);
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
            resizeImageToA4(capturedImage, setImage);
            setIsCameraOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PageAcquisition;