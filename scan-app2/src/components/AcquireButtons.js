import React from "react";
import "./AcquireButtons.css";

function AcquireButtons({ onAdd, onCancel, onEdit }) {
  return (
    <div className="button-row">
      <button className="add-button" onClick={onAdd}>Add</button>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
      <button className="edit-button" onClick={onEdit}>Edit</button>
    </div>
  );
}

export default AcquireButtons;