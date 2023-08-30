import { useEffect } from "react";
import "./Modal.css";

const ModalHelp = ({ setModalOpen}) => {
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Help</div>
          <div className="body-text">
           
          </div>

          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalHelp;
