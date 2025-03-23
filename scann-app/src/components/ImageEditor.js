import React, { useState, useCallback } from "react";
import getCroppedImg from "./cropImage";
import CropperContainer from "./CropperContainer";
import ZoomSlider from "./ZoomSlider";
import EditorButtons from "./EditorButtons";
import "./ImageEditor.css";

function ImageEditor({ image, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <div className="image-editor">
      <CropperContainer
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1.414} // A4 aspect ratio
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropCompleteCallback}
      />
      <ZoomSlider zoom={zoom} onZoomChange={onZoomChange} />
      <EditorButtons onCrop={handleCrop} onCancel={onCancel} />
    </div>
  );
}

export default ImageEditor;