const { BigNumber } = require("bignumber.js");
const { ethers } = require("hardhat");

async function main() {
  // const vjkContract = await (
  //   await ethers.getContractFactory("VjkNFT")
  // ).deploy(3450);
  // await vjkContract.deployed();

  // console.log("vjkNFT Contract Address:", vjkContract.address);

  const vjkContract = await (
    await ethers.getContractFactory("VjkNFT")
  ).attach("0x1f3f1b8DC6A77Fb97c5af482Eb1890361361e8a5");

  /* Request Random Words */
  // await vjkContract.functions
  //   .requestRandomWords("Test Ufdfsdfsdfsdfsfdsfs", "string test", {
  //     gasLimit: 32000,
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const requestID = await vjkContract.lastRequestId(); // lastRequestId() requestIds()
  console.log("requestID:");
  console.log(requestID);

  const request = await vjkContract.getRequestStatus(requestID);
  console.log("request:");
  console.log(request);

  const ownerOf = await vjkContract.ownerOf(requestID);
  console.log("ownerOf:");
  console.log(ownerOf);

  const tokenURI = await vjkContract.tokenURI(requestID);
  console.log("tokenURI:");
  console.log(tokenURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
