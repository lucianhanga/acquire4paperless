import React from "react";
import Cropper from "react-easy-crop";
import "./CropperContainer.css";

function CropperContainer({ image, crop, zoom, aspect, onCropChange, onZoomChange, onCropComplete }) {
  return (
    <div className="cropper-container">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
        showGrid={true}
        restrictPosition={false}
      />
    </div>
  );
}

export default CropperContainer;