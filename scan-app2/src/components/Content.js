import React, { useState, useContext } from "react";
import PageList from "./PageList";
import AcquirePage from "./AcquirePage";
import { PDFDocument, rgb } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import { ConfigContext } from "../context/ConfigContext";
import "./Content.css";

function Content({ setStatus }) {
  const { config } = useContext(ConfigContext);
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [image, setImage] = useState(null);
  const [pages, setPages] = useState([]);

  const handleAddPage = () => {
    setIsAcquiring(true);
  };

  const handleCancel = () => {
    setIsAcquiring(false);
    setImage(null); // Reset image when canceling
  };

  const handleDiscard = () => {
    setIsAcquiring(false);
    setImage(null); // Reset image when discarding
    setPages([]); // Clear the list of pictures
    setStatus("Ready"); // Reset status
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
    const img = new Image();
    img.src = imageUrl;
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
      const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // Compress to 70% quality
      setImage(compressedImage);
    };
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
          const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // Compress to 70% quality
          setImage(compressedImage);
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

  const handleSubmit = async () => {
    setStatus("PDF generation in progress...");
    const pdfDoc = await PDFDocument.create();
    const a4Width = 595.28; // A4 width in points (1/72 inch)
    const a4Height = 841.89; // A4 height in points (1/72 inch)

    for (const page of pages) {
      const img = new Image();
      img.src = page;
      await new Promise((resolve) => {
        img.onload = async () => {
          const pdfPage = pdfDoc.addPage([a4Width, a4Height]);
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

          const imgBytes = await fetch(page).then((res) => res.arrayBuffer());
          const pdfImg = await pdfDoc.embedJpg(imgBytes);
          pdfPage.drawImage(pdfImg, {
            x: offsetX,
            y: offsetY,
            width: drawWidth,
            height: drawHeight,
          });
          resolve();
        };
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfName = `${uuidv4()}.pdf`;

    setStatus("PDF generated. Upload in progress...");

    // Upload the PDF to Azure Storage
    const sasUrl = config.azureStorageUrl;

    if (sasUrl) {
      // Insert the filename before the SAS query string
      const baseUrl = sasUrl.substring(0, sasUrl.indexOf('?'));
      const sasToken = sasUrl.substring(sasUrl.indexOf('?'));
      const azureStorageUrl = `${baseUrl}/${pdfName}${sasToken}`;

      fetch(azureStorageUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'application/pdf'
        },
        body: pdfBlob
      })
        .then(response => {
          if (response.ok) {
            setStatus("PDF uploaded successfully.");
            console.log('Successfully uploaded PDF:', response);
          } else {
            response.text().then(text => {
              console.error('Upload failed:', response.status, text);
            });
            setStatus("Error uploading PDF.");
          }
        })
        .catch(error => {
          setStatus("Error uploading PDF.");
          console.error('Error uploading PDF:', error);
        });
    } else {
      setStatus("Azure Storage URL is not configured.");
      console.error('Azure Storage URL is not configured.');
    }
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
          <div className="PageList-container">
            <PageList pages={pages} onDelete={handleDelete} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} />
          </div>
          <div className="button-row">
            <button className="add-page-button" onClick={handleAddPage}>Add Page</button>
            <button className="submit-button" onClick={handleSubmit}>Submit Doc</button>
            <button className="discard-button" onClick={handleDiscard}>Discard Doc</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;