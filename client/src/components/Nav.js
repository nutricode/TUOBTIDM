import { useState, useEffect } from "react";
import Modal from "./Modal";
import ModalHelp from "./ModalHelp";
import ModalAbout from "./ModalAbout";
import Upload from "./Upload";
import "./FilePreview.css";
import "../App.css";


const Nav = ({ contract, account, provider,onUploadSuccess }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalHelpOpen, setModalHelpOpen] = useState(false);
    const [modalAboutOpen, setModalAboutOpen] = useState(false);
    
    return (
        <nav>
            
            <div className="nav-col-2">
                <img src={require('./Metamask-Logo.png')} alt="Alexei Paul" />
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
                <button className="blue" onClick={() => setModalHelpOpen(true)}>
                    Help
                </button>
                {modalHelpOpen && (
                <ModalHelp setModalOpen={setModalHelpOpen}></ModalHelp>
                )}
                <button className="blue" onClick={() => setModalAboutOpen(true)}>
                    About
                </button>
                {modalAboutOpen && (
                <ModalAbout setModalOpen={setModalAboutOpen}></ModalAbout>
                )}
                <button className="blue" onClick={() => setModalOpen(true)}>
                    Share
                </button>
                {modalOpen && (
                <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
                )}
            </div>

        </nav>
    )
}

export default Nav;
