const { BigNumber } = require("bignumber.js");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const LINK_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //Goerli

const ercAbi = ["function balanceOf(address owner) view returns (uint256)"];

describe("Paint Test", async function () {
  let accounts;

  let VjkNFTContract;
  let SwapEthToLinkContract;
  let APIConsumerContract;

  let PaintContract;

  let mintPrice;

  beforeEach(async () => {
    await network.provider.send("evm_setIntervalMining", [5000]);

    accounts = await ethers.getSigners();

    mintPrice = ethers.utils.parseEther("1");
  });

  it("Should return the new VjkNFT Contract", async function () {
    const VjkNFTFactory = await ethers.getContractFactory("VjkNFT");
    VjkNFTContract = await VjkNFTFactory.deploy();
    await VjkNFTContract.deployed();

    console.log("VjkNFT Contract Address:", VjkNFTContract.address);
    expect(VjkNFTContract.address);
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

  it("Should return the new APIConsumer Contract", async function () {
    const APIConsumerFactory = await ethers.getContractFactory("APIConsumer");
    APIConsumerContract = await APIConsumerFactory.deploy();
    await APIConsumerContract.deployed();

    console.log("APIConsumer Contract Address:", APIConsumerContract.address);
    expect(APIConsumerContract.address);
  });

  it("Should return the new Paint Contract", async function () {
    const PaintFactory = await ethers.getContractFactory("Paint");
    PaintContract = await PaintFactory.deploy(
      VjkNFTContract.address,
      SwapEthToLinkContract.address,
      APIConsumerContract.address
    );
    await PaintContract.deployed();

    console.log("Paint Contract Address:", PaintContract.address);
    expect(PaintContract.address);
  });
});
