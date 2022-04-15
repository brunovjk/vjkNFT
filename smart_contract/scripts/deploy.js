const main = async () => {
  const vjkNFT = await hre.ethers.getContractFactory("vjkNFT");
  const vjknft = await vjkNFT.deploy();

  await vjknft.deployed();

  console.log("Contract deployed to:", vjknft.address);
  // let create_tx = await vjknft.create("teste1", {
  //   gasLimit: 300000,
  // });
  // console.log(`Loading - ${create_tx.hash}`);

  // await create_tx.wait(1);

  // console.log(`You can view the NFT Data here: ${await vjknft.tokenURI(0)}`);
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
