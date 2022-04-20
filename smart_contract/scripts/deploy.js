const main = async () => {
  const vjkNFT = await hre.ethers.getContractFactory("vjkNFT");
  const vjknft = await vjkNFT.deploy();

  await vjknft.deployed();

  console.log("Contract deployed to:", vjknft.address);

  const create_tx = await vjknft.safeMint("bbbbbb");
  console.log(`Loading - ${create_tx.hash}`);
  await create_tx.wait(1);
  // let create_tx = await vjknft.create("teste1", {
  //   gasLimit: 300000,
  // });
  // console.log(`Loading - ${create_tx.hash}`);

  // await create_tx.wait(1);

  console.log(`totalSupply: ${await vjknft.totalSupply}`);
  // const totalSupply = await vjknft.totalSupply;
  // const tokenId = totalSupply - 1;
  console.log(`Address Sender: ${await vjknft.ownerOf(0)}`);
  console.log(`Data: ${await vjknft.tokenURI(0)}`);
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
