import React from "react";
import "./ImagePreview.css";

function ImagePreview({ image }) {
  return (
    <div>
      {image ? (
        <img src={image} alt="Preview" className="image-preview" />
      ) : (
        <div className="image-placeholder">
          <p>Picture Preview</p>
        </div>
      )}
    </div>
  );
}

export default ImagePreview;