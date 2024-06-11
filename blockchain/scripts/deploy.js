const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");

const COORDINATOR = "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B";
const KEY_HASH = "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae";
const SUBSCRIPTION_ID = "90023263881803763343581073108012587128331564397665377431990473218154255361256";

async function main() {
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy(COORDINATOR, KEY_HASH, SUBSCRIPTION_ID, { value: ethers.parseEther("0.2") });
  await coinFlip.waitForDeployment();
  const coinFlipAddress = await coinFlip.getAddress();

  console.log("\n");
  console.log("CoinFlip deployed to: ", coinFlipAddress);
  console.log("\n");

  /** WAITING:
   ************/
  await coinFlip.deploymentTransaction()?.wait(2);

  // Get CoinFlip ABI
  const coinFlipABI = JSON.parse(fs.readFileSync("./artifacts/contracts/CoinFlip.sol/CoinFlip.json", "utf8"));
  const abi = JSON.stringify(coinFlipABI.abi);

  console.log("CoinFlip ABI:");
  console.log("\n");
  console.log(abi);
  console.log("\n");

  /** VERIFICATION:
   *****************/
  await hre.run("verify:verify", {
    address: coinFlipAddress,
    constructorArguments: [COORDINATOR, KEY_HASH, SUBSCRIPTION_ID],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
