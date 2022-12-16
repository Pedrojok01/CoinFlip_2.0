<div align="center">
<h1><strong> CoinFlip - Double up your ETH! </strong></h1>

[![](https://img.shields.io/badge/Moralis%20Academy-Ethereum%20201-blue)](https://academy.moralis.io)
[![Stargazers](https://img.shields.io/github/stars/Pedrojok01/CoinFlip_2.0)](https://github.com/Pedrojok01/CoinFlip_2.0/stargazers)
[![Issues](https://img.shields.io/github/issues/Pedrojok01/CoinFlip_2.0)](https://github.com/Pedrojok01/CoinFlip_2.0/issues)
[![MIT License](https://img.shields.io/github/license/Pedrojok01/CoinFlip_2.0)](https://github.com/Pedrojok01/CoinFlip_2.0/blob/main/License)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black)](https://www.linkedin.com/in/pierre-e/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f7b73fb-c34d-4063-826b-dceae8a580a2/deploy-status)](https://app.netlify.com/sites/coinflip-double-up-your-eth/deploys)

</div>

### Updates

- 2022/07 - Switch to Chainlink VRF v2 & Update solidity compiler version to 0.8.7;
- 2022/12 - Switch to Goerli network v2 & upgrade all deps & Update solc to 0.8.16;

## Description

Decentralized application (Dapp), EVM compatible, built as a part of the programming course: Ethereum201 on [academy.moralis.com](https://academy.moralis.io).

Try it yourself: [coinflip-double-up-your-eth.netlify.app/](https://coinflip-double-up-your-eth.netlify.app/)

![Preview](./preview.gif)

## Built With

- [![React][react.js]][react-url]
- [![web3.js]][web3.js-url]
- [![solidity]][solidity-url]
- [![chainlink]][chainlink-url]
- [![truffle]][truffle-url]
- [![ganache]][ganache-url]

## Getting Started

### Prerequisites

Make sure you have the following ready:

- `yarn` installed
- [Truffle](https://www.trufflesuite.com/docs) installed globally via `npm install -g truffle` (developped on v5.4.17).
- Run a local blockchain via [Ganache](https://www.trufflesuite.com/docs/ganache/overview), or [Ganache-cli](https://github.com/trufflesuite/ganache-cli), or register on [Infura.io](https://infura.io/) to deploy on an Ethereum network.
- [MetaMask](https://metamask.io/) installed in your browser
- Cloned the repo via `git clone`

### Smart-Contracts Deployment

In your terminal, make sure you are in the `COINFLIP_2.0` repo, and type:

```sh
yarn install
```

To deploy your smart-contracts:

- Subscribe to Chainlink VRF v2 ( [Subscribtion to Chainlink VRF on Goerli](https://vrf.chain.link/goerli/new) ) ( [LINK Faucet](https://faucets.chain.link/) )
- Add your <b>subscription id</b> to the migration file: `blockchain/migrations/1_CoinFlip_migration.js`
- Run the command below to deploy to the network of your choice.

```sh
truffle migrate --network <<network name here>>
```

So for Goerli, type:

```sh
truffle migrate --network goerli
```

- Replace the contract address in `src/constants.js`
- Replace the abi file in `src/abis/coinFlip.js`
- Make sure to fund the contract with some ETH ( [Faucet for the Goerli network](https://goerlifaucet.org/) )

### Config & Client

Before each deploy, make sure to:

- Change the `COINFLIP_ADDRESS` in `/src/constants.js` to your deployed contracts address;
- Copy the new abi file into the `src/abis` folder if you've made any changes to the contracts;
- Enable/disable, and update the suitable networks in `truffle-config.js`;
- In the `blockchain/` repo, create a file called `.secret` and paste your mnemonic seed phrase inside; (<b>Make sure you add this file in your `.gitignore`!!!</b>)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Img Shields](https://shields.io)
- [Font Awesome](https://fontawesome.com)
- [Jazzicon](https://github.com/MetaMask/jazzicon)

## Use

You are now set to start your local server. Make sure you're still in `COINFLIP 2.0` and type:
`yarn start`

<br/>

<div align="center">
<h2># Enjoy!!!</h2>

### ⭐️ ... and don't forget to leave a star if you like it! ⭐️

</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[chainlink]: https://img.shields.io/badge/chainlink-375BD2?style=for-the-badge&logo=chainlink&logoColor=61DAFB
[chainlink-url]: https://chain.link/
[solidity]: https://img.shields.io/badge/Solidity-35495E?style=for-the-badge&logo=solidity&logoColor=4FC08D
[solidity-url]: https://soliditylang.org/
[truffle]: https://img.shields.io/badge/TRUFFLE-DD0031?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAA1lJREFUOI1Vk31M1AUYxz/3Iq9CwcXBTOUIDJocguFLCcEqJWCJ5ezoBd0K1+yPdJEDt9Jp/VHGpilzgEIOojOjUi9iFTtA8AAl7BY4cqwQFAM6uEyOg9+Pe/pHGX62Z3ueP77fZ/vueTQiAoBnykNJ4S56rzrjFuv1helpac/6bUiJDjItRTzeG/329ubOU19WHThWej3rdQvziMh85Wds2p8dnyydjU3SJSIXRaSi5Repd16RttFbUu1olQv1330k6ty8Zr6pKSuvM4dGSt9PzTIkImenJ+Xsoc9k3+Z8edG0UnamZ4nVZhPbQJ90tjuaHjDocXQdTAgIkyLLdlHuba6vrJY92wqkv7dP0qLj5bknUiSZYLE12+Vce6u0XXI0iAhaINpaWbXf5/ORuCoJFfACURERtLW0Ynosho/LjxEaGoIpdTUpcY/zZMQSjtfW5LhhCyNDw0e2rHtGMmNXSmnJhyIicnR2VKZFZG9evmQnrRVVUWQhR/YUS+bGLLks0qkfGRrOnp7yYDAa6bnyKyg+VmgDqZl1cficlXfyLKSZEti64w2WxZjobu+gqcbKu2dO4cK3SqsoyjJECA5ZzM0/B/m26gtydCFc+/dvKtRxTpz/mpNlx5kcHMZ2uo67t0dptJ0nclsuN1SXTtP/e+9MUUGhX5jBgKoqjI2N8XlVOYlPrWP3RD9zwGvhCawB9IAC/IyPhv8GOegfNaCZ8Xpv7tr66qNjt0cxRkXiGh9nZmaGDw4dYENeLnaEC+4BVFXBb5Efqm8OrVbL0YdWcLGy5kdEpK7+dK2kRkbLjhfy5M2cl+Tl9RmSGZconxbtE7fz2nx43gVBdnz/g2w0r3lfIyLJwNWi7YV0NLeSYE5EAFVRGBkaJjA4iKTVKSSZzUSEh3Nn6i49vznparvEw2Fhj2ju/UI58PZ7BW/hsLcQGx+PX4A/iKDMKrgnJpj2ePD5fGg0GgKDgjAYI4p1Ot1hjYjgGv+Hv/64fiY17WmLtbKa2rIKVFVhSfRyuH+yD/IN8AqARkS4M+nGkrGJlPVrPyks2l3sdk1gb2iku70D/SI9Op1uobgU2Ht/0AMEBAayPDYGe0NjifNy91fPb87daTAa0/39/ZeqcyrALaANOAk4F7r9DzIq4ym9+fzCAAAAAElFTkSuQmCC
[truffle-url]: https://trufflesuite.com/
[web3.js]: https://img.shields.io/badge/web3.js-4A4A55?style=for-the-badge&logo=web3.js&logoColor=FF3E00
[web3.js-url]: https://web3js.readthedocs.io/en/latest/
[ganache]: https://img.shields.io/badge/GANACHE-yellow?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAqVJREFUOI1t08trXVUUx/Hv2ufse8+57+Q+ElPSUCWtpdqBIFQ6ysSRgkJxpDix+gc4ETrsSOysIx/gg9aBUiwiOLCIoChGoRPB0kRtoA9jYnJz3+fcs/fqIPH2ov5Ge7D2h/1YSwBWL75M6hQbCMnY0x9kzLWqzx5aOvwWaNTZ3DiXDEeXHQGhAa+KCDx29gMMgADOK8lYiaw58fBC9Nli036u7d+Pub/XlyoFc6lUCL7OhZxyXvHKJAYgdYoRKTerwYXDLftLvRI+lwy6jDOPRxgnKXkbrFSL5odSbN42IvPuQDEAxcicOdKUtUZZXvcKw9SDBIjI/vlEcF5RFQo5ebVW8GtxzrwyAeZmo0+janMucSHZqI+oHlzsn+yvXTog85ArN0rlUvzuBKjFbpQmCUG5Rb65DCh+1DnYK/iki2YJ+foRbO0QLnP4cTKYAKs3k1Ej34PePQKjlBdPEi08jk/6uMEu+dYx4sUnILBke/fIetsgpBPg/Mdb+uX1lPmFHLa7Du116vUKheUVSo8+jcR1dG+DyvAm1mSE+YiZUgBACFApGD661uav3YytjufO1h+8cOo2T50+SXsQILs3ULH89KflkXlDtWh4/6v2A6BaNCRj5ZNvO4SB0Bt6dvrK0aVbzM8YaM1w8eoOH17b5cWVGk8ejbjyXecB4DxRGAgPzYYA1CsG75Uf1z23txN2uj2u/zZiYdZyazMlb4VaKbATAIin/gwjgrXwxWqXO9sZqkqjGuKckreCVyUwUpw8IvA8cHcayRzs9T2NSkCrFmIEbChstjN+XhsO4py8Ng1cBZaBNyetIxDnBJnqp/2Z4b10rMsivDMNAAyAN4DjwBX+m28UThvhbBjIXT0YKPM/hTeAM8AzwK/ABvASsAJ8/+/i+whWCI78GsrmAAAAAElFTkSuQmCC
[ganache-url]: https://trufflesuite.com/ganache/
