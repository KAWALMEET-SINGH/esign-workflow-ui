import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState('Preview');
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const uploadPdf = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/pdf/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json()
      alert("File Uploaded Successfully")
      console.log(data);
      setTag('Uploaded')
      setFileUrl(URL.createObjectURL(data.file));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {file && (
        <div className="pdf-container ">
          <h3>{tag}:</h3>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={fileUrl} />
          </Worker>
        </div>
      )}
      <button type="button" onClick={uploadPdf}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
