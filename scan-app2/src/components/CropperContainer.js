import React from "react";
import Cropper from "react-easy-crop";
import "./CropperContainer.css";

function CropperContainer({ image, crop, zoom, onCropChange, onZoomChange, onCropComplete }) {
  return (
    <div className="cropper-container">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={210 / 297} // A4 aspect ratio
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
        showGrid={true}
        restrictPosition={false}
        minZoom={0.3}
        maxZoom={3}
      />
    </div>
  );
}

export default CropperContainer;