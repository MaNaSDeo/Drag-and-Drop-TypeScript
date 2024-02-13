import { useState, DragEvent, ReactElement, useRef } from "react";
import "./DragDropFile.css";

type PdfFiles = {
  file: File;
  id: number;
  size: number;
};

function DragDropFile(): ReactElement {
  const [pdfs, setPdfs] = useState<PdfFiles[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(pdfs);

  function handleDropOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    if (event.dataTransfer.items) {
      const files = Array.from(event.dataTransfer.files);
      const pdfFiles = files
        .filter((file) => file.type === "application/pdf")
        .map((file, index) => ({ file, id: index, size: file.size }));
      setPdfs(pdfFiles);
    }
    console.log(event);
  }

  function handleUpload() {
    //..e
    console.log("No Upload code present");
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const pdfFiles = files
        .filter((file) => file.type === "application/pdf")
        .map((file, index) => ({ file, id: index, size: file.size })); // Updated line
      setPdfs(pdfFiles);
    }
  }

  if (pdfs?.length)
    return (
      <div>
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index}>
              {pdf.file.name} {Math.floor(Number(pdf.size) / 1024)} Kb
            </li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setPdfs([])}>Cancel</button>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    );

  return (
    <div className="container">
      {!pdfs && (
        <div
          className="dropzone"
          onDragOver={handleDropOver}
          onDrop={handleDrop}
        >
          <h1>Drag and Drop Files to Upload</h1>
          <h1>Or</h1>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            hidden
            ref={inputRef}
          />
          <button onClick={() => inputRef.current?.click()}>Select Pdf</button>
        </div>
      )}
      {/* {pdfs && <h1>Hello</h1>} */}
    </div>
  );
}

export default DragDropFile;
