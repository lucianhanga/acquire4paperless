import React from "react";
import "./AcquireButtons.css";

function AcquireButtons({ onAdd, onDiscard, onEdit }) {
  return (
    <div className="button-row">
      <button className="add-button" onClick={onAdd}>Add</button>
      <button className="discard-button" onClick={onDiscard}>Discard</button>
      <button className="edit-button" onClick={onEdit}>Edit</button>
    </div>
  );
}

export default AcquireButtons;