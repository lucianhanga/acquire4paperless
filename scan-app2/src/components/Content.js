import React, { useState } from "react";
import PageList from "./PageList";
import AcquirePage from "./AcquirePage";
import "./Content.css";

function Content() {
  const [isAcquiring, setIsAcquiring] = useState(false);

  const handleAddPage = () => {
    setIsAcquiring(true);
  };

  const handleDiscard = () => {
    setIsAcquiring(false);
  };

  return (
    <div className="App-content">
      {isAcquiring ? (
        <AcquirePage onDiscard={handleDiscard} />
      ) : (
        <>
          <PageList />
          <div className="button-row">
            <button className="add-page-button" onClick={handleAddPage}>Add Page</button>
            <button className="submit-button">Submit</button>
            <button className="discard-button">Discard</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;