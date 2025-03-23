import React from "react";
import "./AcquirePage.css";

function AcquirePage({ onDiscard, onAdd, onEdit, onTakePicture, onSelectPicture, image }) {
  return (
    <div className="acquire-page">
      <div className="image-preview">
        {image ? <img src={image} alt="Preview" /> : <div className="image-placeholder">No Image</div>}
      </div>
      <div className="button-row">
        <button className="take-picture-button" onClick={onTakePicture}>Take Picture</button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="select-picture-input"
          onChange={onSelectPicture}
        />
        <label htmlFor="select-picture-input" className="select-picture-button">
          Select Picture
        </label>
      </div>
      <div className="button-row">
        <button className="add-button" onClick={onAdd}>Add</button>
        <button className="discard-button" onClick={onDiscard}>Discard</button>
        <button className="edit-button" onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
}

export default AcquirePage;