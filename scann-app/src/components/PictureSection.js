import React from "react";
import PictureList from "./PictureList";
import GeneratePdfButton from "./GeneratePdfButton";

function PictureSection({ pictures, onPdfGenerated, onDiscardPictures }) {
  return (
    <>
      <PictureList pictures={pictures} />
      <GeneratePdfButton
        pictures={pictures}
        onPdfGenerated={onPdfGenerated}
        onDiscard={onDiscardPictures}
      />
    </>
  );
}

export default PictureSection;