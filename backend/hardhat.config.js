require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const private_key = process.env.PRIVATE_KEY || "";
const rcp_id = process.env.RCP_ID || "";
const etherscan = process.env.ETHERSCAN || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork : "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + rcp_id,
      accounts: [`0x${private_key}`],
      chainId: 5
    }
  },
  solidity: "0.8.20",
  etherscan: {
    apiKey: {
      goerli : etherscan
    }
  },
  gasReporter: {
    enabled: true
  }
};
