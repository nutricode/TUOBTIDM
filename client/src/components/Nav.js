import { useState, useEffect } from "react";
import Modal from "./Modal";
import ModalHelp from "./ModalHelp";
import ModalAbout from "./ModalAbout";
import Upload from "./Upload";
import "./FilePreview.css";


const Nav = ({ contract, account, provider,onUploadSuccess }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalHelpOpen, setModalHelpOpen] = useState(false);
    const [modalAboutOpen, setModalAboutOpen] = useState(false);
    
    return (
        <nav>
            <div class="nav-col-1">
                <button className="share" onClick={() => setModalOpen(true)}>
                    Share
                </button>
                {modalOpen && (
                <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
                )}
            </div>
                
            <div class="nav-col-2">
                <p style={{ color: account ? "#32CD32" : "red"  }}>  
                    Account : {account ? account : "Not connected"} 
                </p>
            </div>

            <div class="nav-col-3">
                <Upload
                    account={account}
                    provider={provider}
                    contract={contract}
                    onUploadSuccess={onUploadSuccess} // Pass the getdata function
                ></Upload>
                <button className="btn" onClick={() => setModalHelpOpen(true)}>
                    Help
                </button>
                {modalHelpOpen && (
                <ModalHelp setModalOpen={setModalHelpOpen}></ModalHelp>
                )}
                <button className="btn" onClick={() => setModalAboutOpen(true)}>
                    About
                </button>
                {modalAboutOpen && (
                <ModalAbout setModalOpen={setModalAboutOpen}></ModalAbout>
                )}
            </div>

        </nav>
    )
}

export default Nav;
