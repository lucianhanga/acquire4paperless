import React from "react";
import "./PictureList.css";

function PictureList({ pictures }) {
  return (
    <div className="picture-list">
      {pictures.map((picture, index) => (
        <div key={index} className="picture-item-container">
          <img src={picture} alt={`Picture ${index + 1}`} className="picture-item" />
        </div>
      ))}
    </div>
  );
}

export default PictureList;