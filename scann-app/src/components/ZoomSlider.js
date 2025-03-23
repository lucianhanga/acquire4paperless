import React from "react";
import "./ZoomSlider.css";

function ZoomSlider({ zoom, onZoomChange }) {
  return (
    <div className="zoom-slider">
      <input
        type="range"
        value={zoom}
        min="1"
        max="3"
        step="0.1"
        aria-labelledby="Zoom"
        onChange={(e) => onZoomChange(e.target.value)}
        className="zoom-range"
      />
    </div>
  );
}

export default ZoomSlider;