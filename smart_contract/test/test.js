const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("vjkNFT", function () {
  it("Should return the new vjkNFT once it's minted", async function () {
    const vjkNFT = await ethers.getContractFactory("vjkNFT");
    const vjknft = await vjkNFT.deploy();
    await vjknft.deployed();

    const setvjkNFTTx = await vjknft.safeMint("<svg> String Test </svg>");
    await setvjkNFTTx.wait();

    expect(await vjknft.totalSupply()).to.equal(1);

    expect(await vjknft.ownerOf(0)).to.equal(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );
    expect(await vjknft.tokenURI(0)).to.equal(
      "data:application/json;base64,<svg> String Test </svg>"
    );
  });
});
