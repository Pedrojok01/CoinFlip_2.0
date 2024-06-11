const { ethers } = require("hardhat");

const KEY_HASH = "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae";
const SUBSCRIPTION_ID = "1";

async function deploy() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  // Deploy mock VRF coordinator contract:
  const Coordinator = await ethers.getContractFactory("VRFCoordinatorMock");
  const coordinator = await Coordinator.deploy();
  await coordinator.waitForDeployment();
  const coordinatorAddress = await coordinator.getAddress();

  // Deploy CoinFlip contract:
  const CoinFlip = await ethers.getContractFactory("CoinFlipHelper");
  const coinFlip = await CoinFlip.deploy(coordinatorAddress, KEY_HASH, SUBSCRIPTION_ID, {
    value: ethers.parseEther("0.2"),
  });
  await coinFlip.waitForDeployment();
  const coinFlipAddress = await coinFlip.getAddress();

  console.log("CoinFlip deployed to:", coinFlipAddress);

  return {
    owner,
    addr1,
    addr2,
    coinFlip,
    coinFlipAddress,
    coordinator,
    coordinatorAddress,
  };
}

module.exports = { deploy };
