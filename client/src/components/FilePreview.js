import React from "react";
import "./FilePreview.css";

const FilePreview = ({ file }) => {
  const getFileType = (fileType) => {
    const extension = fileType.split("/").pop();
    return extension;
  };

  const fileTypeIcon = getFileType(file.fileType);

  const renderIcon = (extension) => {
    switch (extension) {
      case "pdf":
        return <i className="fa fa-file-pdf-o" aria-hidden="true"></i>;
      case "doc":
      case "docx":
        return <i className="fa fa-file-word-o" aria-hidden="true"></i>;
      case "xls":
      case "xlsx":
        return <i className="fa fa-file-excel-o" aria-hidden="true"></i>;
      case "txt":
        return <i className="fa fa-file-text-o" aria-hidden="true"></i>;
      // add more cases for other file extensions as needed
      default:
        return <i className="fa fa-file-o" aria-hidden="true"></i>;  // generic file icon
    }
  };

  return (
    <a href={`https://gateway.pinata.cloud/ipfs/${file.hash}`} 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }} >
      <div className="file-preview">
      
        {["jpg", "jpeg", "png", "svg", "bmp"].includes(fileTypeIcon) ? (
          <img
            src={`https://gateway.pinata.cloud/ipfs/${file.hash}`}
            alt="file preview"
          />
        ) : (
          <div className="icon-container">
            {renderIcon(fileTypeIcon)}
          </div>
        )}
        <div className="file-info">
          <p>{file.fileName}</p>
          <p>{new Date(file.timestamp * 1000).toLocaleString()}</p>
        </div>
      </div>
    </a>
  );
};

export default FilePreview;