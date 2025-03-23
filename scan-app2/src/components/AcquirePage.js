import React from "react";
import PhotoButtons from "./PhotoButtons";
import AcquireButtons from "./AcquireButtons";
import "./AcquirePage.css";

function AcquirePage({ onDiscard, onAdd, onEdit, onTakePicture, onSelectPicture, image }) {
  return (
    <div className="acquire-page">
      <div className="image-preview">
        {image ? <img src={image} alt="Preview" /> : <div className="image-placeholder">No Image</div>}
      </div>
      <PhotoButtons onTakePicture={onTakePicture} onSelectPicture={onSelectPicture} />
      <AcquireButtons onAdd={onAdd} onDiscard={onDiscard} onEdit={onEdit} />
    </div>
  );
}

export default AcquirePage;