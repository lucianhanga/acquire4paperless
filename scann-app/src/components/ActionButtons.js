import React from "react";
import "./ActionButtons.css";

function ActionButtons({ image, onTakePicture, onLoadPicture, onConfirmPicture, onDiscardPicture }) {
  return (
    <div className="button-row">
      {!image && <button onClick={onTakePicture}>Take Picture</button>}
      {!image && <button onClick={onLoadPicture}>Load Picture</button>}
      {image && <button onClick={onConfirmPicture}>Confirm Picture</button>}
      {image && <button onClick={onDiscardPicture}>Discard Picture</button>}
    </div>
  );
}

export default ActionButtons;