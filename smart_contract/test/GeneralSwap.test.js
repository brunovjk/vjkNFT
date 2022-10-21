const { expect } = require("chai");
const { ethers } = require("hardhat");

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const LINK_ADDRESS = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
const DECIMALS = 18;
const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const ercAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function deposit() public payable",
  "function approve(address spender, uint256 amount) returns (bool)",
];

describe("GeneralSwap", function () {
  it("Should provide a caller with more LINK than they started with after a swap", async function () {
    const accounts = await ethers.getSigners();
    const amountIn = ethers.utils.parseEther("1");

    /* Deploy the GeneralSwap contract */
    const generalSwapFactory = await ethers.getContractFactory("GeneralSwap");
    const generalSwap = await generalSwapFactory.deploy(SwapRouterAddress);
    await generalSwap.deployed();

    console.log(`GeneralSwap deployed at: ${generalSwap.address}`);

    /* Connect to weth9 and wrap some eth  */
    const valueToWrap = ethers.utils.parseEther("10");
    const WETH = new ethers.Contract(WETH_ADDRESS, ercAbi, accounts[0]);
    const balanceOfBeforeDeposit = await WETH.balanceOf(accounts[0].address);

    const deposit = await WETH.deposit({
      value: valueToWrap,
    });
    await deposit.wait();
    const balanceOfAfterDeposit = await WETH.balanceOf(accounts[0].address);

    console.log(
      `Wrapped: ${ethers.utils.formatEther(
        valueToWrap
      )} ETH, Balance: ${ethers.utils.formatEther(balanceOfAfterDeposit)} WETH`
    );

    expect(
      parseInt(ethers.utils.formatEther(balanceOfBeforeDeposit)) +
        parseInt(ethers.utils.formatEther(valueToWrap))
    ).to.equal(parseInt(ethers.utils.formatEther(balanceOfAfterDeposit)));

    /* Check Initial LINK Balance */
    const LINK = new ethers.Contract(LINK_ADDRESS, ercAbi, accounts[0]);

    const expandedInitialLINKBalance = await LINK.balanceOf(
      accounts[0].address
    );
    const InitialLINKBalance = Number(
      ethers.utils.formatUnits(expandedInitialLINKBalance, DECIMALS)
    );

    console.log(`Initial LINK Balance: ${InitialLINKBalance}`);

    /* Approve the swapper contract to spend weth9 for me */
    const approveWETH = await WETH.approve(
      generalSwap.address,
      ethers.utils.parseEther("2")
    );
    await approveWETH.wait();

    /* Execute the swap WETH to LINK */
    const swapWETHtoLINK = await generalSwap.swapExactInputSingle(
      amountIn,
      WETH_ADDRESS,
      LINK_ADDRESS,
      {
        gasLimit: 300000,
      }
    );
    swapWETHtoLINK.wait();
    console.log(`Swapped ${ethers.utils.formatEther(amountIn)} WETH to LINK`);

    /* Check LINK Balance After WETH to LINK */
    const expandedLINKBalanceAfterWETHtoLINK = await LINK.balanceOf(
      accounts[0].address
    );
    const LINKBalanceAfterWETHtoLINK = Number(
      ethers.utils.formatUnits(expandedLINKBalanceAfterWETHtoLINK, DECIMALS)
    );

    console.log(
      `LINK Balance After WETH to LINK: ${LINKBalanceAfterWETHtoLINK}`
    );

    /* Test that we now have more LINK than when we started */
    expect(LINKBalanceAfterWETHtoLINK).is.greaterThan(InitialLINKBalance);

    /* Approve the swapper contract to spend dai for me */
    const approveLINK = await LINK.approve(
      generalSwap.address,
      ethers.utils.parseEther("2")
    );
    await approveLINK.wait();

    /* Execute the swap LINK to WETH */
    const swapLINKtoWETH = await generalSwap.swapExactInputSingle(
      amountIn,
      LINK_ADDRESS,
      WETH_ADDRESS,
      {
        gasLimit: 300000,
      }
    );
    swapLINKtoWETH.wait();
    console.log(`Swapped ${ethers.utils.formatEther(amountIn)} LINK to WETH`);

    /* Check LINK Balance AfterLINK to WETH  */
    const expandedLINKBalanceAfterLINKtoWETH = await LINK.balanceOf(
      accounts[0].address
    );
    const LINKBalanceAfterLINKtoWETH = Number(
      ethers.utils.formatUnits(expandedLINKBalanceAfterLINKtoWETH, DECIMALS)
    );

    console.log(
      `LINK Balance After LINK to WETH: ${LINKBalanceAfterLINKtoWETH}`
    );

    /* Test that we now have more LINK than when we started */
    expect(LINKBalanceAfterLINKtoWETH).is.lessThan(LINKBalanceAfterWETHtoLINK);
  });
});
