//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

interface Contract is IERC20 {
    function deposit() external payable;

    function withdraw(uint256) external;
}

contract Swaper {
    ISwapRouter public immutable swapRouter;
    address public WETH9;
    address public LINK;
    uint24 public feeTier;

    constructor(
        ISwapRouter _swapRouter,
        address _WETH9,
        address _LINK,
        uint24 _feeTier
    ) {
        swapRouter = _swapRouter;
        WETH9 = _WETH9;
        LINK = _LINK;
        feeTier = _feeTier;
    }

    function swapAndDeposit() public payable returns (bool success) {
        uint256 amountIn = msg.value;
        // Transfer the specified amount of WETH9 to this contract.
        Contract(WETH9).deposit{value: amountIn}();
        // Approve the router to spend WETH9.
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);
        // Create the params that will be used to execute the swap
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: WETH9,
                tokenOut: LINK,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        // The call to `exactInputSingle` executes the swap.
        uint256 amountOut = swapRouter.exactInputSingle(params);
        if (amountOut != 0) {
            return true;
        } else {
            return false;
        }
    }

    function swapAndWithdraw() public payable returns (bool success) {
        // Approve the router to spend LINK.
        TransferHelper.safeApprove(
            LINK,
            address(swapRouter),
            Contract(LINK).balanceOf(msg.sender)
        );
        // Create the params that will be used to execute the swap
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: LINK,
                tokenOut: WETH9,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: Contract(LINK).balanceOf(msg.sender),
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        // The call to `exactInputSingle` executes the swap.
        uint256 amountOut = swapRouter.exactInputSingle(params);

        if (amountOut != 0) {
            return true;
        } else {
            return false;
        }
    }
}
