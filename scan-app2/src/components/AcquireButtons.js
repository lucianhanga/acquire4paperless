import React from "react";
import "./AcquireButtons.css";

function AcquireButtons({ onAdd, onCancel, onEdit }) {
  return (
    <div className="button-row">
      <button className="add-button" onClick={onAdd}>Add to Doc</button>
      <button className="cancel-button" onClick={onCancel}>Abandon</button>
      <button className="edit-button" onClick={onEdit}>Edit Page</button>
    </div>
  );
}

export default AcquireButtons;