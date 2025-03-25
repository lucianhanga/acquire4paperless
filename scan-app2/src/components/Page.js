import React from "react";
import { FaTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./Page.css";

function Page({ page, index, onDelete, onMoveUp, onMoveDown }) {
  return (
    <div className="page-item">
      <div className="page-number">Page {index + 1}</div>
      <img src={page} alt={`Page ${index + 1}`} />
      <div className="button-group">
        <button className="move-button" onClick={() => onMoveUp(index)}>
          <FaArrowUp />
        </button>
        <button className="move-button" onClick={() => onMoveDown(index)}>
          <FaArrowDown />
        </button>
        <button className="delete-button" onClick={() => onDelete(index)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default Page;