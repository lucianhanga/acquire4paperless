import React from "react";
import "./PictureList.css";

function PictureList({ pictures }) {
  return (
    <div className="picture-list">
      {pictures.map((picture, index) => (
        <img key={index} src={picture} alt={`Picture ${index + 1}`} className="picture-item" />
      ))}
    </div>
  );
}

export default PictureList;