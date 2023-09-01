import "./Modal.css";

const ModalHelp = ({ setModalOpen }) => {
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title"></div>
          <div className="body-text justify-text">
            <h5 className="instruction-title">Connecting to Sepolia Testnet on MetaMask:</h5>
            <p>Follow the instructions on <a className="link" href="https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask" target="_blank" rel="noopener noreferrer">this guide</a> to add Sepolia to your MetaMask wallet.</p>
            
            <h5 className="instruction-title">Getting Free SepoliaETH:</h5>
            <ol className="instruction-list">
              <li>Visit <a className="link" href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer">Sepolia Faucet</a></li>
              <li>Follow instructions to get free SepoliaETH.</li>
            </ol>

            <h5 className="instruction-title">Uploading a File:</h5>
            <ol className="instruction-list">
              <li>Click "Upload" and select the file you want to upload.</li>
              <li>Confirm payment in MetaMask.</li>
              <li>Wait for notification confirming upload is complete.</li>
              <li>File will appear in your collection.</li>
            </ol>

            <h5 className="instruction-title">Sharing Files:</h5>
            <ol className="instruction-list">
              <li>Click "Share" in the app.</li>
              <li>Enter the recipient's address and then click "OK".</li>
              <li>Recipient addresses will appear in a dropdown UI.</li>
            </ol>

            <h5 className="instruction-title">Accessing Shared Files:</h5>
            <ol className="instruction-list">
              <li>Enter the sharer's address in the field at the bottom.</li>
              <li>Click "Get Data".</li>
            </ol>

            <h5 className="instruction-title">Viewing Your Own Files:</h5>
            <ol className="instruction-list">
              <li>Remove any address from the field at the bottom.</li>
              <li>Click "Get Data".</li>
            </ol>

          </div>

          <div className="footer">
            <button className="button button-red"
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