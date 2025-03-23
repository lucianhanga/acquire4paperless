import React, { useRef } from "react";

function NativeCameraCapture({ onCapture }) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onCapture(imageUrl);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button onClick={() => fileInputRef.current.click()}>Open Camera</button>
    </div>
  );
}

export default NativeCameraCapture;
