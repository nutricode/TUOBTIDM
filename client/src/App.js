import DocumentManagement from "./artifacts/contracts/DocumentManagement.sol/DocumentManagement.json"; 
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./components/Upload";
import Display from "./components/Display";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x413B9fEf99aED766a4Cd06c9DFE098a6B59ae2C9"; // CONTRACT ADDRESS

        const contract = new ethers.Contract(
          contractAddress,
          DocumentManagement.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    loadProvider();
  }, []);

  // Define the missing getdata function
  const getdata = async () => {
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (triggerFetch) {
      setTriggerFetch(false); // Reset the trigger
    }
  }, [triggerFetch]);

  return (
    <>

      <div className="App">
        <Nav 
          account={account}
          provider={provider}
          contract={contract}
          onUploadSuccess={getdata}
        />
        <h1 style={{ color: "white" }}>The Use of Blockchain Technology in Document Management</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

       
        <Display
          contract={contract}
          account={account}
          triggerFetch={triggerFetch} // Pass the triggerFetch state
        ></Display>
      </div>
    </>
  );
}

export default App;
