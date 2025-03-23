import React from "react";
import "./ImagePreview.css";

function ImagePreview({ image }) {
  return (
    <div className="image-preview">
      {image ? <img src={image} alt="Preview" /> : <div className="image-placeholder">No Image</div>}
    </div>
  );
}

export default ImagePreview;