import DocumentManagement from "./artifacts/contracts/DocumentManagement.sol/DocumentManagement.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Display from "./components/Display";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const isMetaMaskInstalled = typeof window.ethereum !== 'undefined';

  useEffect(() => {
    if (isMetaMaskInstalled) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const loadProvider = async () => {
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
      };

      loadProvider();
    } else {
      console.error("Metamask is not installed");
    }
  }, [isMetaMaskInstalled]);

  const getdata = async () => {
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (triggerFetch) {
      setTriggerFetch(false); 
    }
  }, [triggerFetch]);

  if (!isMetaMaskInstalled) {
    return (
      <div className="metamask-required">
        <div className="content-metamask">
        <h1>Please install 
          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 172 33">
                <path fill="#161616" d="M151.26 16.64c-.89-.58-1.86-1-2.78-1.52-.6-.33-1.24-.63-1.76-1.06-.88-.72-.7-2.15.22-2.77 1.33-.88 3.52-.39 3.76 1.41 0 .04.04.07.08.07h2c.05 0 .09-.04.07-.1a3.94 3.94 0 0 0-1.46-2.94 4.66 4.66 0 0 0-2.84-.97c-5.28 0-5.77 5.59-2.92 7.35.33.2 3.12 1.6 4.1 2.21 1 .61 1.3 1.73.88 2.6-.4.81-1.4 1.37-2.42 1.3-1.1-.06-1.96-.66-2.26-1.59-.05-.17-.08-.5-.08-.63a.09.09 0 0 0-.08-.08h-2.17c-.03 0-.07.04-.07.08 0 1.56.39 2.43 1.45 3.22 1 .75 2.1 1.07 3.22 1.07 2.97 0 4.5-1.68 4.8-3.41.28-1.7-.22-3.23-1.74-4.24Zm-94.2-7.59h-2.02a.09.09 0 0 0-.07.05l-1.78 5.86a.08.08 0 0 1-.16 0L51.25 9.1c-.01-.04-.04-.05-.08-.05h-3.31c-.04 0-.08.04-.08.07v14.96c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08V12.7c0-.09.13-.1.15-.02l1.8 5.9.13.4c0 .05.03.06.07.06h1.67c.04 0 .06-.03.07-.05l.13-.42 1.8-5.9c.02-.08.15-.06.15.03v11.37c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08V9.12c0-.03-.04-.07-.08-.07h-1.27Zm60.98 0a.09.09 0 0 0-.08.05l-1.78 5.86a.08.08 0 0 1-.16 0l-1.78-5.86c0-.04-.03-.05-.07-.05h-3.3c-.04 0-.08.04-.08.07v14.96c0 .04.04.08.08.08h2.17c.03 0 .07-.04.07-.08V12.7c0-.09.13-.1.16-.02l1.8 5.9.12.4c.02.05.04.06.08.06h1.66a.1.1 0 0 0 .08-.05l.13-.42 1.8-5.9c.02-.08.15-.06.15.03v11.37c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08V9.12c0-.03-.04-.07-.08-.07h-3.3Zm-27.99 0H79.8c-.03 0-.07.04-.07.07V11c0 .04.04.08.07.08h3.97v13c0 .05.04.09.07.09h2.17c.04 0 .08-.04.08-.08V11.07h3.96c.04 0 .08-.04.08-.08V9.12c0-.03-.02-.07-.08-.07Zm12.8 15.11h1.98c.05 0 .09-.06.07-.1l-4.08-15.01c0-.04-.03-.06-.07-.06H97.9a.09.09 0 0 0-.07.06l-4.08 15c-.02.05.02.1.07.1h1.98c.04 0 .06-.02.08-.05l1.18-4.36c.01-.04.04-.05.08-.05h4.36c.04 0 .07.02.08.05l1.18 4.36c.02.03.06.06.08.06Zm-5.18-6.61 1.58-5.85a.08.08 0 0 1 .16 0l1.58 5.85c.02.05-.02.1-.07.1h-3.17c-.06 0-.1-.05-.08-.1Zm38.85 6.61h1.98c.05 0 .09-.06.08-.1L134.5 9.04c-.02-.04-.04-.06-.08-.06h-2.83a.09.09 0 0 0-.08.06l-4.08 15c-.01.05.03.1.08.1h1.97c.04 0 .07-.02.08-.05l1.18-4.36c.02-.04.04-.05.08-.05h4.37c.03 0 .06.02.07.05l1.19 4.36c0 .03.04.06.07.06Zm-5.18-6.61 1.59-5.85a.08.08 0 0 1 .15 0l1.59 5.85c0 .05-.03.1-.08.1h-3.17c-.05 0-.1-.05-.08-.1Zm-64.12 4.39V17.3c0-.04.03-.08.07-.08h5.78c.04 0 .08-.04.08-.07v-1.87a.09.09 0 0 0-.08-.08H67.3c-.04 0-.07-.04-.07-.08v-3.96c0-.04.03-.08.07-.08h6.58c.04 0 .08-.04.08-.08V9.14a.09.09 0 0 0-.08-.08h-8.9a.09.09 0 0 0-.08.08v14.94c0 .04.04.08.08.08h9.17c.04 0 .08-.04.08-.08V22.1a.09.09 0 0 0-.08-.08h-6.86c-.04-.01-.06-.04-.06-.09Zm103.86 2.09-7.5-7.74a.08.08 0 0 1 0-.1l6.75-7a.07.07 0 0 0-.06-.13h-2.76c-.03 0-.04.01-.05.03l-5.73 5.93a.08.08 0 0 1-.13-.05V9.14a.09.09 0 0 0-.08-.08h-2.17a.09.09 0 0 0-.08.08v14.95c0 .04.04.08.08.08h2.17c.04 0 .08-.04.08-.08v-6.58c0-.07.09-.1.13-.05l6.5 6.68a.1.1 0 0 0 .04.03h2.77c.05-.01.1-.1.04-.14Z"></path><path fill="#E17726" stroke="#E17726" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m32.96 1-13.14 9.72 2.45-5.73L32.96 1Z"></path><path fill="#E27625" stroke="#E27625" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m2.66 1 13.02 9.8L13.35 5 2.66 1Zm25.57 22.53-3.5 5.34 7.49 2.06 2.14-7.28-6.13-.12Zm-26.96.12 2.13 7.28 7.47-2.06-3.48-5.34-6.12.12Z"></path><path fill="#E27625" stroke="#E27625" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m10.47 14.51-2.08 3.14 7.4.34-.24-7.97-5.08 4.5Zm14.68.01-5.16-4.6-.17 8.07 7.4-.34-2.07-3.13ZM10.87 28.87l4.49-2.16-3.86-3-.63 5.16Zm9.4-2.17 4.46 2.17-.6-5.17-3.86 3Z"></path><path fill="#D5BFB2" stroke="#D5BFB2" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m24.73 28.87-4.46-2.16.36 2.9-.04 1.23 4.14-1.97Zm-13.86 0 4.16 1.97-.03-1.23.36-2.9-4.49 2.16Z"></path><path fill="#233447" stroke="#233447" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m15.1 21.78-3.7-1.08 2.62-1.2 1.09 2.28Zm5.41 0 1.1-2.29 2.63 1.2-3.73 1.1Z"></path><path fill="#CC6228" stroke="#CC6228" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m10.87 28.87.65-5.34-4.13.12 3.48 5.22Zm13.23-5.34.63 5.34 3.5-5.22-4.13-.12Zm3.13-5.88-7.4.34.68 3.8 1.1-2.3 2.63 1.2 2.99-3.04ZM11.4 20.7l2.62-1.2 1.09 2.28.69-3.8-7.4-.33 3 3.05Z"></path><path fill="#E27525" stroke="#E27525" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m8.4 17.65 3.1 6.05-.1-3-3-3.05Zm15.84 3.05-.12 3 3.1-6.05-2.98 3.05Zm-8.44-2.71-.7 3.8.88 4.48.2-5.91-.38-2.37Zm4.02 0-.36 2.36.18 5.92.87-4.49-.69-3.8Z"></path><path fill="#F5841F" stroke="#F5841F" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m20.51 21.78-.87 4.49.63.44 3.85-3 .12-3.01-3.73 1.08ZM11.4 20.7l.1 3 3.86 3 .62-.43-.87-4.49-3.72-1.08Z"></path><path fill="#C0AC9D" stroke="#C0AC9D" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m20.6 30.84.03-1.23-.34-.28h-4.96l-.33.28.03 1.23-4.16-1.97 1.46 1.2 2.95 2.03h5.05l2.96-2.04 1.44-1.19-4.14 1.97Z"></path><path fill="#161616" stroke="#161616" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m20.27 26.7-.63-.43h-3.66l-.62.44-.36 2.9.33-.28h4.96l.34.28-.36-2.9Z"></path><path fill="#763E1A" stroke="#763E1A" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="M33.52 11.35 34.62 6l-1.66-5-12.7 9.4 4.89 4.11 6.9 2.01 1.52-1.77-.66-.48 1.05-.96-.8-.62 1.05-.8-.7-.54ZM1 5.99l1.12 5.36-.72.53 1.07.8-.8.63 1.04.96-.66.48 1.52 1.77 6.9-2 4.89-4.13L2.66 1 1 5.99Z"></path><path fill="#F5841F" stroke="#F5841F" stroke-linecap="round" stroke-linejoin="round" stroke-width=".25" d="m32.05 16.52-6.9-2 2.08 3.13-3.1 6.05 4.1-.05h6.13l-2.31-7.13Zm-21.58-2.01-6.9 2.01-2.3 7.13H7.4l4.1.05-3.1-6.05 2.08-3.14Zm9.35 3.48.45-7.6 2-5.4h-8.92l2 5.4.45 7.6.17 2.38v5.9h3.67l.02-5.9.16-2.38Z"></path>
            </svg>
          </a> 
           to use this application.</h1>
           </div>
           <h4 className="footer-sticky">
            Alexei Paul - Univ. "Ovidius" Constanța
           </h4>
      </div>
    );
  }

  return (
    <>
      <div className="App">
        <Nav
          account={account}
          provider={provider}
          contract={contract}
          onUploadSuccess={getdata}
        />
        <h1 style={{
            fontSize: "85px",
            lineHeight: "95px", 
            width: "100%",
            letterSpacing: "20px",
            marginLeft: "10px",
            marginTop: "-5px",
            fontFamily: "'Courier New', Courier, monospace",
            color: 'white', 
            background: 'linear-gradient(to right, #009FFD, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0px 3px 8px rgba(0,0,0,0.2)' 
            }}>
            TUo₿TiDM
        </h1>

        <h3 style={{ color: "lightgray", marginTop:"-30px" }}>The Use of Blockchain Technology in Document Management</h3>
        
        <Display
          contract={contract}
          account={account}
          triggerFetch={triggerFetch}
        ></Display>
      </div>
    </>
  );
}

export default App;
