# CoinFlip - Double up your ETH!

[![](https://img.shields.io/badge/Moralis%20Academy-Ethereum%20201-blue)](https://academy.moralis.io)
[![Stargazers](https://img.shields.io/github/stars/Pedrojok01/CoinFlip_2.0)](https://github.com/Pedrojok01/CoinFlip_2.0/stargazers)
[![Issues](https://img.shields.io/github/issues/Pedrojok01/CoinFlip_2.0)](https://github.com/Pedrojok01/CoinFlip_2.0/issues)
[![MIT License](https://img.shields.io/github/license/Pedrojok01/CoinFlip_2.0)](https://github.com/Pedrojok01/CoinFlip_2.0/blob/main/License)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black)](https://www.linkedin.com/in/pierre-e/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f7b73fb-c34d-4063-826b-dceae8a580a2/deploy-status)](https://app.netlify.com/sites/coinflip-double-up-your-eth/deploys)
[![Donate with Bitcoin](https://en.cryptobadges.io/badge/micro/37wP5rdaFgtHrEQ44M5Tntyeb9nChd8jC4)](https://en.cryptobadges.io/donate/37wP5rdaFgtHrEQ44M5Tntyeb9nChd8jC4)

## Updates

2022/07 - Switch to Chainlink VRF v2 & Update solidity compiler version to 0.8.7;

## Description

Dapp built on the Ethereum Network as a part of the programming course: Ethereum201 on [academy.moralis.com](https://academy.moralis.io).

Try it yourself: [coinflip-double-up-your-eth.netlify.app/](https://coinflip-double-up-your-eth.netlify.app/)

![Preview](./Preview.png)

Decentralized application built with Truffle/Infura and React for the Ethereum Network, and part of the programming course: Ethereum201 on [academy.moralis.com](https://academy.moralis.io).

## Installation

Make sure you have the following ready:

- `yarn` installed
- [Truffle](https://www.trufflesuite.com/docs) installed globally via `npm install -g truffle` (developped on v5.3.2).
- Run a local blockchain via [Ganache](https://www.trufflesuite.com/docs/ganache/overview), or [Ganache-cli](https://github.com/trufflesuite/ganache-cli), or register on [Infura.io](https://infura.io/) to deploy on an Ethereum network.
- [MetaMask](https://metamask.io/) installed in your browser
- Cloned the repo via `git clone`

## Development

### Contracts

In your terminal, go to the COINFLIP 2.0 repo and type:
`yarn install`

To deploy your smart-contracts:

- Run `truffle migrate --network <<network name here>>` to deploy to the network of your choice. So for Rinkeby, type `truffle migrate --reset --network rinkeby`
- Replace the contract address in `client/constants`
- Replace the abi file in `client/abis/coinFlip.json`
- Make sure to fund the contract with some ETH ([Faucet for the Rinkeby network](https://rinkebyfaucet.com)
- Make sure to subscribe to Chainlink VRF v2 ([Subscribtion for the Rinkeby network](https://vrf.chain.link/rinkeby) ([LINK Faucet for subscribtion on the Rinkeby network](https://faucets.chain.link/rinkeby)

### Client & Config

On each deploy, make sure to:

- Change the `COINFLIP_ADDRESS` in `/client/constants.js` to your deployed contracts address
- Copy the new abi file into `/abis` folder
- Enable/disable, and update the suitable networks in `truffle-config.js`
- Get your mnemonic seed phrase add it to `blockchain/.secret`

## Use

You are now set to start your local server. Make sure you're still in `COINFLIP 2.0` and type:
`yarn start`

If you like it, a donation is always welcome!<br/>
[![Donate with Bitcoin](https://en.cryptobadges.io/badge/big/37wP5rdaFgtHrEQ44M5Tntyeb9nChd8jC4)](https://en.cryptobadges.io/donate/37wP5rdaFgtHrEQ44M5Tntyeb9nChd8jC4)
