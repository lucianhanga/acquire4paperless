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
        minZoom={0.3}
        maxZoom={3}
        zoomSpeed={0.1} // Finer zoom pace
      />
    </div>
  );
}

export default CropperContainer;