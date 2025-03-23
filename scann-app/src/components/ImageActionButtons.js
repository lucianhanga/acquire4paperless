import React from "react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import "./ImageActionButtons.css";

function ImageActionButtons({ onConfirmPicture, onDiscardPicture, onEditPicture }) {
  return (
    <div className="button-row">
      <button onClick={onConfirmPicture} title="Confirm Picture" className="confirm-button">
        <FaCheck />
      </button>
      <button onClick={onDiscardPicture} title="Discard Picture" className="discard-button">
        <FaTimes />
      </button>
      <button onClick={onEditPicture} title="Edit Picture">
        <FaEdit />
      </button>
    </div>
  );
}

export default ImageActionButtons;