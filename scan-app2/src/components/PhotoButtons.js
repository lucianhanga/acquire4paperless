import React from "react";
import "./PhotoButtons.css";

function PhotoButtons({ onTakePicture, onSelectPicture }) {
  return (
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
  );
}

export default PhotoButtons;