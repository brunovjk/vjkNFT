import { ethers } from "ethers";
import {
  link_oracle_address,
  link_token_address,
  wrapper_address,
  weth_token_address,
  swaper_router_address,
  chainlink_registrar_address,
  chainlink_registry_address,
} from "../address";

async function main() {
  // Deploy APIConsumer:
  const APIConsumerFactory = await ethers.getContractFactory("APIConsumer");
  const APIConsumer = await APIConsumerFactory.deploy(
    link_oracle_address.goerli,
    link_token_address.goerli
  );
  await APIConsumer.deployed();
  console.log(`APIConsumer address: ${APIConsumer.address}`);

  // Deploy VRF
  const VRFFactory = await ethers.getContractFactory("VRF");
  const VRF = await VRFFactory.deploy(
    888888, // _CALLBACKGASLIMIT
    3, // _REQUESTCONFIRMATIONS
    4, // _NUMWORDS
    wrapper_address.goerli,
    link_token_address.goerli
  );
  await VRF.deployed();
  console.log(`VRF address: ${VRF.address}`);

  // Deploy Swaper
  const SwaperFactory = await ethers.getContractFactory("Swaper");
  const Swaper = await SwaperFactory.deploy(
    swaper_router_address.goerli,
    link_token_address.goerli,
    weth_token_address.goerli,
    3000 // _FEETIER
  );
  await Swaper.deployed();
  console.log(`Swaper address: ${Swaper.address}`);

  // Deploy VjkNFT
  const VjkNFTFactory = await ethers.getContractFactory("VjkNFT");
  const VjkNFT = await VjkNFTFactory.deploy(
    APIConsumer.address,
    VRF.address,
    Swaper.address,
    link_token_address.goerli,
    chainlink_registrar_address.goerli,
    chainlink_registry_address,
    10000000000000000000, // _APICONSUMERLINKAMOUNT
    20000000000000000000, // _VRFLINKAMOUNT
    20000000000000000000 // _AUTOMATELINKAMOUNT
  );
  await VjkNFT.deployed();
  console.log(`VjkNFT address: ${VjkNFT.address}`);

  // Transfer ownership
  await APIConsumer.transferOwnership(VjkNFT.address);
  await VRF.transferOwnership(VjkNFT.address);
  await Swaper.transferOwnership(VjkNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
