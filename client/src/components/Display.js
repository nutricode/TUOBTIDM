import React, { useState, useEffect, useCallback } from "react";
import "./Display.css";
import FilePreview from "./FilePreview";

const Display = ({ contract, account, triggerFetch }) => {
  const [data, setData] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [addressInputTemp, setAddressInputTemp] = useState("");

  const fetchData = useCallback(async () => {  
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
  }, [addressInput, account, contract]);  


  useEffect(() => {
    if (triggerFetch) {
      fetchData();
    }
  }, [triggerFetch, fetchData]); 

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account, fetchData]); 

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
      <button className="button button-blue" onClick={handleAddressInputChangeSubmit} style={{marginRight: "0"}}> 
        Get Data
      </button>
    </>
  );
};

export default Display;
