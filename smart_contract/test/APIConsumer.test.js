const { BigNumber } = require("bignumber.js");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const LINK_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //Goerli

const ercAbi = ["function balanceOf(address owner) view returns (uint256)"];

describe("APIConsumer Test", async function () {
  let accounts;
  let LINK;

  let APIConsumerContract;
  let SwapEthToLinkContract;

  let fundAPIConsumerContract;

  beforeEach(async () => {
    await network.provider.send("evm_setIntervalMining", [5000]);

    accounts = await ethers.getSigners();
    LINK = new ethers.Contract(LINK_ADDRESS, ercAbi, accounts[0]);

    fundAPIConsumerContract = ethers.utils.parseEther("2");
  });

  it("Should return the new APIConsumer Contract", async function () {
    const APIConsumerFactory = await ethers.getContractFactory("APIConsumer");
    APIConsumerContract = await APIConsumerFactory.deploy();
    await APIConsumerContract.deployed();

    console.log("APIConsumer Contract Address:", APIConsumerContract.address);
    expect(APIConsumerContract.address);
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
  it("Should Swap ETH to Link and Fund APIConsumer Contract", async function () {
    const APIConsumerContractLinkBalanceNumber = await LINK.balanceOf(
      accounts[0]
    );
    const APIConsumerContractLinkBalance = Number(
      ethers.utils.formatUnits(APIConsumerContractLinkBalanceNumber, DECIMALS)
    );
    console.log(
      `LINK Balance After Swap/Depoist: ${APIConsumerContractLinkBalance}`
    );
    expect(APIConsumerContractLinkBalance > 0);
  });
});
