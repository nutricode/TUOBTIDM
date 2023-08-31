import React, { useState, useEffect, useCallback } from "react";
import "./Display.css";
import FilePreview from "./FilePreview";

const Display = ({ contract, account, triggerFetch }) => {
  const [data, setData] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [addressInputTemp, setAddressInputTemp] = useState("");

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
    setAddressInputTemp(e.target.value);
  };
  const handleAddressInputChangeSubmit = (e) => {
    setAddressInput(addressInputTemp);
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
        value={addressInputTemp}
        onChange={handleAddressInputChange}
      />
      <button className="blue" onClick={handleAddressInputChangeSubmit}>
        Get Data
      </button>
    </>
  );
};

export default Display;
