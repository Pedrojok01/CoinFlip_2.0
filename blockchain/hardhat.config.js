require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-verify");
require("solidity-coverage");

const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY ?? "";

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
    },
  },
  networks: {
    main: {
      url: `${process.env.RPC_URL_ETH}`,
      accounts: [privateKey],
      chainId: 1,
    },
    sepolia: {
      url: `${process.env.RPC_URL_SEPOLIA}`,
      accounts: [privateKey],
      chainId: 11155111,
    },
    // Polygon networks
    polygon: {
      url: `${process.env.RPC_URL_POLYGON}`,
      accounts: [privateKey],
      chainId: 137,
    },
    mumbai: {
      url: `${process.env.RPC_URL_POLYGON_MUMBAI}`,
      accounts: [privateKey],
      chainId: 80001,
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
  },
  contractSizer: {
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // docgen: {
  //   path: "./docs",
  //   clear: true,
  //   runOnCompile: true,
  // },
};
