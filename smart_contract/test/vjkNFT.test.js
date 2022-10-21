const { BigNumber } = require("bignumber.js");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //Mainnet
const LINK_ADDRESS = "0x514910771AF9Ca656af840dff83E8264EcF986CA"; //Mainnet
const VRF_Coordinator_Address = "0x271682DEB8C4E0901D1a1550aD2e64D568E69909"; //Mainnet
const Key_Hash =
  "0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef"; //Mainnet

// const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; //Goerli
// const LINK_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //Goerli
// const VRF_Coordinator_Address = "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d"; //Goerli
// const Key_Hash = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15"; //Goerli

const DECIMALS = 18;

const ercAbi = [
  "function lastRequestId() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "function deposit() public payable",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function requestRandomWords() external returns (uint256 requestId)",
  "function getRequestStatus(uint256 requestId) external returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)",
];

describe("vjkNFT", async function () {
  let mintPrice;
  let accounts;
  let valueToWrap;
  let amountIn;
  let amountInLink;
  let LINK;
  let WETH;
  let vjkContract;

  beforeEach(async () => {
    mintPrice = "0.05";
    accounts = await ethers.getSigners();
    valueToWrap = ethers.utils.parseEther("3"); //Should be bigger than amountIn, since we pay the rest of the transaction with WETH
    amountIn = ethers.utils.parseEther("2");
    amountInLink = ethers.utils.parseEther("30");

    LINK = new ethers.Contract(LINK_ADDRESS, ercAbi, accounts[0]);
    WETH = new ethers.Contract(WETH_ADDRESS, ercAbi, accounts[0]);
  });

  it("Should return the new vjkNFT Contract", async function () {
    const vjkNFT = await ethers.getContractFactory("VjkNFT");
    const vjknft = await vjkNFT.deploy(3450);
    await vjknft.deployed();

    vjkContract = vjknft;
    console.log("vjkNFT Contract Address:", vjkContract.address);
  });
  // it("Should provide a caller with more LINK than they started with after a swap", async function () {
  //   /* Deploy the GeneralSwap contract */
  //   const generalSwapFactory = await ethers.getContractFactory("GeneralSwap");
  //   const generalSwap = await generalSwapFactory.deploy(SwapRouterAddress);
  //   await generalSwap.deployed();

  //   console.log(`GeneralSwap deployed at: ${generalSwap.address}`);

  //   /* Connect to weth9 and wrap some eth  */
  //   const balanceOfBeforeDeposit = await WETH.balanceOf(accounts[0].address);

  //   const deposit = await WETH.deposit({
  //     value: valueToWrap,
  //   });
  //   await deposit.wait(1);
  //   const balanceOfAfterDeposit = await WETH.balanceOf(accounts[0].address);

  //   console.log(
  //     `Wrapped: ${ethers.utils.formatEther(
  //       valueToWrap
  //     )} ETH, Balance: ${ethers.utils.formatEther(balanceOfAfterDeposit)} WETH`
  //   );

  //   expect(
  //     parseInt(ethers.utils.formatEther(balanceOfBeforeDeposit)) +
  //       parseInt(ethers.utils.formatEther(valueToWrap))
  //   ).to.equal(parseInt(ethers.utils.formatEther(balanceOfAfterDeposit)));

  //   /* Check Initial LINK Balance */
  //   const expandedInitialLINKBalance = await LINK.balanceOf(
  //     accounts[0].address
  //   );
  //   const InitialLINKBalance = Number(
  //     ethers.utils.formatUnits(expandedInitialLINKBalance, DECIMALS)
  //   );

  //   console.log(`Initial LINK Balance: ${InitialLINKBalance}`);

  //   /* Approve the swapper contract to spend weth9 for me */
  //   const approveWETH = await WETH.approve(generalSwap.address, amountIn);
  //   await approveWETH.wait(1);

  //   /* Execute the swap WETH to LINK */
  //   const swapWETHtoLINK = await generalSwap.swapExactInputSingle(
  //     amountIn,
  //     WETH_ADDRESS,
  //     LINK_ADDRESS,
  //     {
  //       gasLimit: 300000,
  //     }
  //   );
  //   swapWETHtoLINK.wait(1);
  //   console.log(`Swapped ${ethers.utils.formatEther(amountIn)} WETH to LINK`);

  //   /* Check LINK Balance After WETH to LINK */
  //   const expandedLINKBalanceAfterWETHtoLINK = await LINK.balanceOf(
  //     accounts[0].address
  //   );
  //   const LINKBalanceAfterWETHtoLINK = Number(
  //     ethers.utils.formatUnits(expandedLINKBalanceAfterWETHtoLINK, DECIMALS)
  //   );

  //   console.log(
  //     `LINK Balance After WETH to LINK: ${LINKBalanceAfterWETHtoLINK}`
  //   );

  //   /* Test that we now have more LINK than when we started */
  //   expect(LINKBalanceAfterWETHtoLINK).is.greaterThan(InitialLINKBalance);
  // });
  // it("Fund the vjkNFT Contract with LINK", async function () {
  //   /* Check LINK Balance before fund */
  //   const contractInitialLINKBalance = await LINK.balanceOf(
  //     vjkContract.address
  //   );
  //   const contractInitialLINKBalanceNumber = Number(
  //     ethers.utils.formatUnits(contractInitialLINKBalance, DECIMALS)
  //   );
  //   console.log(
  //     `Contract LINK Balance before Fund: ${contractInitialLINKBalanceNumber} LINK`
  //   );

  //   /* Approve the  contract to spend LINK for me */
  //   const approveLINK = await LINK.approve(vjkContract.address, amountInLink);
  //   await approveLINK.wait(1);

  //   /* Fund contract */
  //   const transfer = await LINK.transfer(vjkContract.address, amountInLink);
  //   await transfer.wait(1);
  //   console.log(`Funded with ${ethers.utils.formatEther(amountInLink)} LINK`);

  //   /* Check Contract LINK Balance after Fund*/
  //   const ContractLINKBalanceAfterTranfer = await LINK.balanceOf(
  //     vjkContract.address
  //   );
  //   const ContractLINKBalanceAfterTranferNumber = Number(
  //     ethers.utils.formatUnits(ContractLINKBalanceAfterTranfer, DECIMALS)
  //   );
  //   console.log(
  //     `Contract LINK Balance after Fund: ${ContractLINKBalanceAfterTranferNumber} LINK`
  //   );
  //   expect(ContractLINKBalanceAfterTranferNumber).is.greaterThan(
  //     contractInitialLINKBalanceNumber
  //   );
  // });
  // it("Get Random Words", async function () {
  //   // vjkContract = await (
  //   //   await ethers.getContractFactory("vjkNFT")
  //   // ).attach("0x4DAf17c8142A483B2E2348f56ae0F2cFDAe22ceE");

  //   /* Check Contract LINK Balance */
  //   const contractLINKBalance = await LINK.balanceOf(vjkContract.address);
  //   const contractLINKBalanceNumber = Number(
  //     ethers.utils.formatUnits(contractLINKBalance, DECIMALS)
  //   );
  //   console.log(`Contract LINK Balance: ${contractLINKBalanceNumber} LINK`);
  //   // console.log(vjkContract);

  //   /* Request Random Words */
  //   await vjkContract.requestRandomWords("fds", "fsdfsdfs", {
  //     value: ethers.utils.parseEther(mintPrice),
  //     gasLimit: 30000000,
  //   });

  //   // const lastRequestId = await vjkContract.lastRequestId();
  //   // console.log("lastRequestId:");
  //   // console.log(lastRequestId);

  //   // const request = await vjkContract.getRequestStatus(lastRequestId);
  //   // console.log("request:");
  //   // console.log(request);
  // });
});
