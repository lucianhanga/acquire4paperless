import React from "react";
import AddPageButton from "./AddPageButton";

function AddPageSection({ onAddPage }) {
  return <AddPageButton onClick={onAddPage} />;
}

export default AddPageSection;