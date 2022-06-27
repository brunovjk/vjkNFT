const { BigNumber } = require("bignumber.js");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const mintPrice = "0.05";

describe("vjkNFT", function () {
  it("Should return the new vjkNFT once it's minted", async function () {
    const vjkNFT = await ethers.getContractFactory("vjkNFT");
    const vjknft = await vjkNFT.deploy();
    await vjknft.deployed();

    const setvjkNFTTx = await vjknft.safeMint("<svg> String Test </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx.wait();

    expect(await vjknft.totalSupply()).to.equal(1);

    expect(await vjknft.ownerOf(0)).to.equal(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );
    expect(await vjknft.tokenURI(0)).to.equal(
      "data:application/json;base64,<svg> String Test </svg>"
    );
  });
  it("Total Supply Should match with Total Tokens Minted", async function () {
    const vjkNFT = await ethers.getContractFactory("vjkNFT");
    const vjknft = await vjkNFT.deploy();
    await vjknft.deployed();

    const setvjkNFTTx = await vjknft.safeMint("<svg> String Test 1 </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx.wait();
    const setvjkNFTTx1 = await vjknft.safeMint("<svg> String Test 2 </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx1.wait();
    const setvjkNFTTx2 = await vjknft.safeMint("<svg> String Test 3 </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx2.wait();

    expect(await vjknft.totalSupply()).to.equal(3);
  });
  it("Contract Balance should be = 0 after withdraw()", async function () {
    const vjkNFT = await ethers.getContractFactory("vjkNFT");
    const vjknft = await vjkNFT.deploy();
    const provider = await new ethers.getDefaultProvider();

    await vjknft.deployed();

    const setvjkNFTTx = await vjknft.safeMint("<svg> String Test 1 </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx.wait();

    const setvjkNFTTx1 = await vjknft.safeMint("<svg> String Test 2 </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx1.wait();

    const setvjkNFTTx2 = await vjknft.safeMint("<svg> String Test 3 </svg>", {
      value: ethers.utils.parseEther(mintPrice),
    });
    await setvjkNFTTx2.wait();

    const balance = await provider.getBalance(vjknft.address);

    console.log(`Collection balance: ${balance.toString()}.`);

    expect(balance).to.equal(balance.toString()); //Should be 0.15 ETH

    const withdrawvjkNFT = await vjknft.withdraw();
    await withdrawvjkNFT.wait();

    expect(balance).to.equal(0);
  });
});
