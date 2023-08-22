import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Upload.css';

const Upload = ({ contract, account, onUploadSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState('...');

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
      }, 500);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  const retrieveAndUploadFile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      handleSubmit(data);
    };
  };

  const handleSubmit = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const resFile = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: "722babd14c346ecc2db5",
          pinata_secret_api_key: "7907efdf7eaca262a8363ebcec7dc18544afe87553ffcbe863386d0c343a7d04",
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileHash = resFile.data.IpfsHash;
      const fileType = selectedFile.type;
      const fileName = selectedFile.name;

      const tx = await contract.addFile(fileHash, fileType, fileName);
      await tx.wait();

      // Automatically trigger the getdata function after successful upload.
      onUploadSuccess();
    } catch (e) {
      console.error('Error:', e);
      alert('Unable to upload file');
    }
    setIsLoading(false);
  };

  return (
      <div className="top">
        <form className="form">
          <label
            htmlFor="file-upload"
            className="choose"
            style={{
              pointerEvents: isLoading ? 'none' : 'auto',
              backgroundColor: isLoading ? '#ff9900' : '',  // Bitcoin orange when loading
              color: isLoading ? 'black' : '',  // Text color when loading
              minWidth: '250px',  // Minimum width to accommodate longest text
            }}
          >
            {isLoading ? `Uploading${dots}` : 'Upload File'}
          </label>
          <input
            disabled={isLoading || !account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveAndUploadFile}
            style={{
              pointerEvents: isLoading ? 'none' : 'auto',
              minWidth: '250px',  // Minimum width to accommodate longest text
            }}
          />
        </form>
      </div>


  );
};

export default Upload;
