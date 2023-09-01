import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const stopSharing = async () => {
    const select = document.querySelector("#selectNumber");
    const selectedAddress = select.options[select.selectedIndex].value;
    await contract.disallow(selectedAddress);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title"   style={{fontSize: '26px'}} >Share with</div>
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
            </select>
          </form>
          <div className="footer">
            <button 
              className="button button-red"
              onClick={() => setModalOpen(false)}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button className="button button-orange" onClick={stopSharing}>
              Revoke
            </button>
            <button className="button button-blue" onClick={sharing} style={{marginRight: '0px'}} >
              Share
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
