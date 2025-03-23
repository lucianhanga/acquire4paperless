import React from "react";
import "./AcquirePage.css";

function AcquirePage({ onDiscard }) {
  return (
    <div className="acquire-page">
      <button className="discard-button" onClick={onDiscard}>Discard</button>
    </div>
  );
}

export default AcquirePage;