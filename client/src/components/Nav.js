import { useState} from "react";
import Modal from "./Modal";
import ModalHelp from "./ModalHelp";
import ModalAbout from "./ModalAbout";
import Upload from "./Upload";
import "./Nav.css";
import "../App.css";


const Nav = ({ contract, account, provider, onUploadSuccess }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalHelpOpen, setModalHelpOpen] = useState(false);
    const [modalAboutOpen, setModalAboutOpen] = useState(false);
    const [copied, setCopied] = useState(false);  
  
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);  
          setTimeout(() => setCopied(false), 2000); 
        })
        .catch((err) => {
          console.log('Unable to copy text to clipboard', err);
        });
    };
  
    return (
      <nav>
        <div className="nav-col-2">
          <img src={require('./Metamask-Logo.png')} alt="Metamask Logo" />
          <p 
            className={`${account ? "account-connected" : "account-not-connected"} account-style`} 
            onClick={() => copyToClipboard(account ? account : '')}
            style={{cursor: 'pointer'}}  
          >  
            Account : {account ? account : "Not connected"} 
          </p>
          {copied && <span>Copied!</span>}  
        </div>

            <div className="nav-col-3">
                <Upload
                    account={account}
                    provider={provider}
                    contract={contract}
                    onUploadSuccess={onUploadSuccess} // Pass the getdata function
                ></Upload>
                <button className="button button-blue" onClick={() => setModalHelpOpen(true)}>
                    Help
                </button>
                {modalHelpOpen && (
                <ModalHelp setModalOpen={setModalHelpOpen}></ModalHelp>
                )}
                <button className="button button-blue" onClick={() => setModalAboutOpen(true)}>
                    About
                </button>
                {modalAboutOpen && (
                <ModalAbout setModalOpen={setModalAboutOpen}></ModalAbout>
                )}
                <button className="button button-blue" onClick={() => setModalOpen(true)} 
                style={{ marginRight: "22px" }}>
                    Share
                </button>
                {modalOpen && (
                  <Modal setModalOpen={setModalOpen} contract={contract} account={account}></Modal>
                )}
            </div>

        </nav>
    )
}

export default Nav;
