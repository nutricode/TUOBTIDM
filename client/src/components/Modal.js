import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract, account }) => {
  const [accessList, setAccessList] = useState([]);
  const [addressInput, setAddressInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const sharing = async () => {
    await contract.allow(addressInput);
    setModalOpen(false);
  };

  const unsharing = async () => {
    await contract.disallow(selectedAddress);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchAccessList = async () => {
      const list = await contract.shareAccess();
      setAccessList(list);
    };
    contract && fetchAccessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title" style={{fontSize: '26px'}}>Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            ></input>
          </div>
          <form id="myForm">
            <select
              id="selectNumber"
              className="modal-select"
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              {!selectedAddress && <option value="" disabled selected>People With Access</option>}
              {accessList.filter(access => access.access).map((access, index) => (
                <option key={index} value={access.user}>
                  {access.user}
                </option>
              ))}
            </select>
          </form>

          <div className="footer">
            <button
              className="button button-red"
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              className="button button-orange"
              onClick={() => unsharing()}
              disabled={!selectedAddress}
            >
              Unshare
            </button>
            <button
              className="button button-blue"
              onClick={() => sharing()}
              style={{marginRight: '0px'}}
              disabled={
                !addressInput.startsWith('0x') ||
                addressInput.length !== 42 ||
                addressInput.toLowerCase() === account.toLowerCase()
              }
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
