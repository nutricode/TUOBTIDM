import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [accessList, setAccessList] = useState([]);

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const unsharing = async () => {
    const select = document.querySelector("#selectNumber");
    const address = select.value;
    await contract.disallow(address);
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
          <div className="title"  style={{fontSize: '26px'}}>Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber" className="modal-select">
              <option className="address">People With Access</option>
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
            >
              Unshare
            </button>
            <button className="button button-blue" onClick={() => sharing()} style={{marginRight: '0px'}}>
              Share
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
