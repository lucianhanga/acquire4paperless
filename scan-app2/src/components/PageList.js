import React from "react";
import "./PageList.css";

function PageList({ pages }) {
  return (
    <div className="page-list">
      {pages.map((page, index) => (
        <div key={index} className="page-item">
          <img src={page} alt={`Page ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default PageList;