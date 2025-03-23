import React, { useRef, useEffect } from "react";

function NativeCameraCapture({ onCapture }) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onCapture(imageUrl);
    }
  };

  useEffect(() => {
    fileInputRef.current.click();
  }, []);

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
    </div>
  );
}

export default NativeCameraCapture;