import React, { useState } from "react";
import PageList from "./PageList";
import AcquirePage from "./AcquirePage";
import jsPDF from "jspdf";
import "./Content.css";

function Content() {
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [image, setImage] = useState(null);
  const [pages, setPages] = useState([]);

  const handleAddPage = () => {
    setIsAcquiring(true);
  };

  const handleCancel = () => {
    setImage(null); // Reset image when canceling
  };

  const handleDiscard = () => {
    setIsAcquiring(false);
    setImage(null); // Reset image when discarding
    setPages([]); // Clear the list of pictures
  };

  const handleAdd = () => {
    if (image) {
      setPages([...pages, image]);
      setIsAcquiring(false);
      setImage(null); // Reset image after adding
    }
  };

  const handleEdit = () => {
    // Handle edit action
  };

  const handleTakePicture = (imageUrl) => {
    setImage(imageUrl);
  };

  const handleSelectPicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const a4Width = 2480; // A4 width in pixels at 300 DPI
          const a4Height = 3508; // A4 height in pixels at 300 DPI
          canvas.width = a4Width;
          canvas.height = a4Height;

          // Fill the canvas with a white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Calculate the aspect ratio and draw the image centered
          const imgAspectRatio = img.width / img.height;
          const a4AspectRatio = a4Width / a4Height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (imgAspectRatio > a4AspectRatio) {
            drawWidth = a4Width;
            drawHeight = a4Width / imgAspectRatio;
            offsetX = 0;
            offsetY = (a4Height - drawHeight) / 2;
          } else {
            drawHeight = a4Height;
            drawWidth = a4Height * imgAspectRatio;
            offsetX = (a4Width - drawWidth) / 2;
            offsetY = 0;
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          setImage(canvas.toDataURL("image/jpeg", 1.0)); // Use maximum quality
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newPages = [...pages];
      [newPages[index], newPages[index - 1]] = [newPages[index - 1], newPages[index]];
      setPages(newPages);
    }
  };

  const handleMoveDown = (index) => {
    if (index < pages.length - 1) {
      const newPages = [...pages];
      [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
      setPages(newPages);
    }
  };

  const handleSubmit = () => {
    const pdf = new jsPDF('portrait', 'pt', 'a4');
    pages.forEach((page, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      const img = new Image();
      img.src = page;
      pdf.addImage(img, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    });
    pdf.save('document.pdf');
  };

  return (
    <div className="App-content">
      {isAcquiring ? (
        <AcquirePage
          onCancel={handleCancel}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onTakePicture={handleTakePicture}
          onSelectPicture={handleSelectPicture}
          image={image}
        />
      ) : (
        <>
          <PageList pages={pages} onDelete={handleDelete} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} />
          <div className="button-row">
            <button className="add-page-button" onClick={handleAddPage}>Add Page</button>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            <button className="discard-button" onClick={handleDiscard}>Discard</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;