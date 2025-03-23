import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./Page.css";

function Page({ page, index, onDelete }) {
  return (
    <div className="page-item">
      <img src={page} alt={`Page ${index + 1}`} />
      <button className="delete-button" onClick={() => onDelete(index)}>
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default Page;