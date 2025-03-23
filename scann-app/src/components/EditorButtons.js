import React from "react";
import "./EditorButtons.css";

function EditorButtons({ onCrop, onCancel }) {
  return (
    <div className="editor-buttons">
      <button onClick={onCrop}>Crop</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditorButtons;