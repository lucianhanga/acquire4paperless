import React from "react";
import "./AddPageButton.css";

function AddPageButton({ onClick }) {
  return (
    <button onClick={onClick} className="add-page-button">
      Add Page
    </button>
  );
}

export default AddPageButton;