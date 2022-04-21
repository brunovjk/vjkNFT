const main = async () => {
  const vjkNFT = await hre.ethers.getContractFactory("vjkNFT");
  const vjknft = await vjkNFT.deploy();

  await vjknft.deployed();

  console.log("Contract deployed to:", vjknft.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
