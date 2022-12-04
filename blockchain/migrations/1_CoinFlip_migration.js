const CoinFlip = artifacts.require("CoinFlip");

module.exports = function (deployer) {
  // deployer.deploy(CoinFlip, /* Chailink subscription ID */, { value: web3.utils.toWei("0.2", "ether") });
  deployer.deploy(CoinFlip, 7213, { value: web3.utils.toWei("0.2", "ether") });
};
