const { BigNumber } = require("bignumber.js");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SwapEthToLinkTestOnly", async function () {
  let accounts;

  let SwapEthToLinkContract;

  let mintPrice;

  beforeEach(async () => {
    await network.provider.send("evm_setIntervalMining", [5000]);

    accounts = await ethers.getSigners();

    mintPrice = ethers.utils.parseEther("1");
  });

  it("Should return the new SwapEthToLink Contract", async function () {
    const SwapEthToLinkFactory = await ethers.getContractFactory(
      "SwapEthToLink"
    );
    SwapEthToLinkContract = await SwapEthToLinkFactory.deploy();
    await SwapEthToLinkContract.deployed();

    console.log(
      "SwapEthToLink Contract Address:",
      SwapEthToLinkContract.address
    );
    expect(SwapEthToLinkContract.address);
  });

  it("Should proved a caller with more LINK than started", async function () {
    const swap = await SwapEthToLinkContract.swapAndDeposit({
      value: mintPrice,
    });
    const balanceOf = await PaintContract.balanceOf(accounts[0].address);
    console.log(swap);
    expect(balanceOf > 0);
  });
});
