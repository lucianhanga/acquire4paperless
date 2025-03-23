import React from "react";
import Page from "./Page";
import "./PageList.css";

function PageList({ pages, onDelete, onMoveUp, onMoveDown }) {
  return (
    <div className="page-list">
      {pages.map((page, index) => (
        <Page
          key={index}
          page={page}
          index={index}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      ))}
    </div>
  );
}

export default PageList;