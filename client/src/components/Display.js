import React, { useState, useEffect, useCallback } from "react";
import "./Display.css";
import FilePreview from "./FilePreview";

const Display = ({ contract, account, triggerFetch }) => {
  const [data, setData] = useState([]);
  const [addressInput, setAddressInput] = useState("");

  const fetchData = useCallback(async () => {  // <-- wrap the function with useCallback
    try {
      const targetAddress = addressInput || account;
      const dataArray = await contract.getFileList(targetAddress);
      const previews = dataArray.map((item, i) => (
        <FilePreview key={i} file={item} />
      ));
      setData(previews);
    } catch (e) {
      alert("An error occurred while retrieving data");
    }
  }, [addressInput, account, contract]);  // <-- dependencies of fetchData

  useEffect(() => {
    if (triggerFetch) {
      fetchData();
    }
  }, [triggerFetch, fetchData]);  // <-- add fetchData to dependency array

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account, fetchData]);  // <-- add fetchData to dependency array

  const handleAddressInputChange = (e) => {
    setAddressInput(e.target.value);
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
        value={addressInput}
        onChange={handleAddressInputChange}
      />
      <button className="center button" onClick={fetchData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
