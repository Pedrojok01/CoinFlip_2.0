const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deploy } = require("./deploy.js");

async function deployFixture() {
  const { owner, addr1, addr2, coinFlip, coinFlipAddress, coordinator, coordinatorAddress } = await deploy();

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

describe("CoinFlip Contract", function () {
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, coinFlip } = await loadFixture(deployFixture);
      expect(await coinFlip.owner()).to.equal(owner.address);
    });

    it("Should set the initial contract balance", async function () {
      const { coinFlip } = await loadFixture(deployFixture);
      expect(await coinFlip.getContractBalance()).to.equal(ethers.parseEther("0.2"));
    });
  });

  describe("Bet Function", function () {
    it("Should allow a user to place a bet", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await coinFlip.connect(addr1).bet(0, { value: ethers.parseEther("0.01") });
      const player = await coinFlip.playersByAddress(addr1.address);
      expect(player.betAmount).to.equal(ethers.parseEther("0.01"));
      expect(player.betOngoing).to.be.true;
    });

    it("Should revert if bet amount is below minimum", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await expect(
        coinFlip.connect(addr1).bet(0, { value: ethers.parseEther("0.0001") })
      ).to.be.revertedWithCustomError(coinFlip, "CoinFlip__InsuffisantAmount");
    });

    it("Should revert if bet amount is too big", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await expect(coinFlip.connect(addr1).bet(0, { value: ethers.parseEther("1") })).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__AmountTooBig"
      );
    });

    it("Should revert if bet choice is invalid", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await expect(coinFlip.connect(addr1).bet(2, { value: ethers.parseEther("0.01") })).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__InvalidBetChoice"
      );
    });

    it("Should revert if a bet is already ongoing", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await coinFlip.connect(addr1).bet(0, { value: ethers.parseEther("0.01") });
      await expect(coinFlip.connect(addr1).bet(0, { value: ethers.parseEther("0.01") })).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__BetAlreadyOngoing"
      );
    });
  });

  describe("Withdraw Function", function () {
    it("Should allow a user to withdraw their balance", async function () {
      const { coinFlip, coinFlipAddress, coordinator, addr1 } = await loadFixture(deployFixture);

      // Place a bet
      await coinFlip.connect(addr1).bet(1, { value: ethers.parseEther("0.01") });

      await coordinator.fulfillRandomWords(1, coinFlipAddress);

      const userBalance = await coinFlip.connect(addr1).getPlayerBalance();
      expect(userBalance).to.equal(ethers.parseEther("0.02"));

      await expect(() => coinFlip.connect(addr1).withdrawPlayerBalance()).to.changeEtherBalance(
        addr1,
        ethers.parseEther("0.02")
      );

      expect(await coinFlip.connect(addr1).getPlayerBalance()).to.equal(0);
    });

    it("Should revert if there are no funds to withdraw", async function () {
      const { coinFlip, addr2 } = await loadFixture(deployFixture);

      await expect(coinFlip.connect(addr2).withdrawPlayerBalance()).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__NoFundsToWithdraw"
      );
    });

    it("Should revert if a bet is ongoing", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await coinFlip.connect(addr1).bet(1, { value: ethers.parseEther("0.01") });

      await expect(coinFlip.connect(addr1).withdrawPlayerBalance()).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__BetOngoing"
      );
    });
  });

  describe("Deposit Function", function () {
    it("Should allow a user to deposit ETH", async function () {
      const { coinFlip, coinFlipAddress, addr1 } = await loadFixture(deployFixture);

      const depositAmount = ethers.parseEther("0.1");

      const contractBalanceBefore = await ethers.provider.getBalance(coinFlipAddress);

      await coinFlip.connect(addr1).deposit({ value: depositAmount });
      expect(await coinFlip.getContractBalance()).to.equal(depositAmount + contractBalanceBefore);
    });

    it("Should revert if deposit amount is zero", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await expect(coinFlip.connect(addr1).deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__InsuffisantAmount"
      );
    });
  });

  describe("Owner Functions", function () {
    it("Should allow the owner to withdraw contract balance", async function () {
      const { coinFlip, coinFlipAddress, owner } = await loadFixture(deployFixture);

      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      const contractBalanceBefore = await ethers.provider.getBalance(coinFlipAddress);

      // Withdraw contract balance
      await coinFlip.connect(owner).withdrawContractBalance();

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      const contractBalanceAfter = await ethers.provider.getBalance(coinFlipAddress);
      expect(contractBalanceAfter).to.equal(0);

      // Verify the owner's balance after withdrawing the contract balance
      expect(ownerBalanceAfter).to.be.closeTo(ownerBalanceBefore + contractBalanceBefore, ethers.parseEther("0.0001"));
    });

    it("Should revert if there are no funds to withdraw", async function () {
      const { coinFlip, owner } = await loadFixture(deployFixture);

      await coinFlip.connect(owner).withdrawContractBalance();
      await expect(coinFlip.connect(owner).withdrawContractBalance()).to.be.revertedWithCustomError(
        coinFlip,
        "CoinFlip__NoFundsToWithdraw"
      );
    });

    it("Should revert if not owner", async function () {
      const { coinFlip, addr1 } = await loadFixture(deployFixture);

      await expect(coinFlip.connect(addr1).withdrawContractBalance()).to.be.revertedWith("Only callable by owner");
    });
  });

  describe("Randomness Fulfillment", function () {
    it("Should handle randomness fulfillment correctly", async function () {
      const { coinFlip, coinFlipAddress, coordinator, addr1 } = await loadFixture(deployFixture);

      await coinFlip.connect(addr1).bet(0, { value: ethers.parseEther("0.01") });

      // Simulating fulfillment of random words
      await coordinator.fulfillRandomWords(1, coinFlipAddress);

      const player = await coinFlip.playersByAddress(addr1.address);
      expect(player.betOngoing).to.be.false;
    });
  });
});
