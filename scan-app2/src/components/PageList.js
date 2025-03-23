import React from "react";
import Page from "./Page";
import "./PageList.css";

function PageList({ pages, onDelete }) {
  return (
    <div className="page-list">
      {pages.map((page, index) => (
        <Page key={index} page={page} index={index} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PageList;