require("dotenv").config({ path: "../.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

const API_KEY_ETH = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_ETH;
const API_RINKEBY = process.env.REACT_APP_INFURA_KEY_RINKEBY;
const API_KEY_GOERLI = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_GOERLI;
const API_KOVAN = process.env.REACT_APP_INFURA_KEY_KOVAN;
const API_KEY_POLYGON = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_POLYGON;
const API_KEY_MUMBAI = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_MUMBAI;
const API_KEY_BSC = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_BSC;
const API_KEY_BSCTESTNET = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_BSCTEST;

module.exports = {
  networks: {
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    ethereum_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_ETH}`),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `${API_RINKEBY}`),
      network_id: 4,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_GOERLI}`),
      network_id: 5, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KOVAN}`),
      network_id: 42,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    polygon_mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_MUMBAI}`),
      network_id: 80001,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygon_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_POLYGON}`),
      network_id: 137,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_BSCTESTNET}`),
      network_id: 97,
      confirmations: 2,
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_BSC}`),
      network_id: 56,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.7", // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        optimizer: {
          enabled: true,
          runs: 10000,
        },
      },
    },
  },
};
