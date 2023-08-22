require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: process.env.API_URL,
      accounts: [process.env.PRIVATE_KEY]
      
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
