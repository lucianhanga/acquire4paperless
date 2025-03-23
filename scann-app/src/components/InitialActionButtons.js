import React from "react";
import { FaCamera, FaUpload } from "react-icons/fa";
import "./InitialActionButtons.css";

function InitialActionButtons({ onTakePicture, onLoadPicture }) {
  return (
    <div className="button-row">
      <button onClick={onTakePicture} title="Take Picture">
        <FaCamera />
      </button>
      <button onClick={onLoadPicture} title="Load Picture">
        <FaUpload />
      </button>
    </div>
  );
}

export default InitialActionButtons;