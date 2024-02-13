import { useState, DragEvent, ReactElement, useRef } from "react";
import "./DragDropFile.css";

function DragDropFile(): ReactElement {
  const [pdfs, setPdfs] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(pdfs);

  function handleDropOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    if (event.dataTransfer.items) {
      setPdfs(event.dataTransfer.files);
    }
    console.log(event);
  }

  function handleUpload() {
    //..e
    console.log("No Upload code present");
  }

  if (pdfs)
    return (
      <div>
        <ul>
          {Array.from(pdfs).map((pdf, index) => (
            <li key={index}>
              {pdf.name} {Math.floor(Number(pdf.size) / 1024)} Kb
            </li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setPdfs(null)}>Cancel</button>
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
            onChange={(event) => setPdfs(event.target.files)}
            hidden
            ref={inputRef}
          />
          <button onClick={() => inputRef.current?.click()}>Select Pdf</button>
        </div>
      )}
      {pdfs && <h1>Hello</h1>}
    </div>
  );
}

export default DragDropFile;
