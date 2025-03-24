import React from "react";
import CropperContainer from "./CropperContainer";
import "./EditPage.css";

function EditPage({ image, crop, zoom, onCropChange, onZoomChange, onCropComplete, onSave, onCancel }) {
  return (
    <div className="edit-page">
      <CropperContainer
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
      />
      <div className="button-row">
        <button className="save-button" onClick={onSave}>Save</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default EditPage;