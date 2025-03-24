import React from "react";
import "./Preview.css";

function Preview({ image }) {
  return (
    <div className="image-preview">
      {image ? <img src={image} alt="Preview" /> : <div className="image-placeholder">No Image</div>}
    </div>
  );
}

export default Preview;