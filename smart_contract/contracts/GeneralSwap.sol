// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.4;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract GeneralSwap {
    ISwapRouter public immutable swapRouter;

    // For this we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapExactInputSingle(
        uint256 amountIn,
        address _token0,
        address _token1
    ) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(
            _token0,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(_token0, address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: _token0,
                tokenOut: _token1,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        amountOut = swapRouter.exactInputSingle(params);
        return amountOut;
    }

    // function swapExactOutputSingle(uint256 amountOut, address _token0, address _token1, uint256 amountInMaximum)
    //     external
    //     returns (uint256 amountIn)
    // {
    //     TransferHelper.safeTransferFrom(
    //         _token0,
    //         msg.sender,
    //         address(this),
    //         amountInMaximum
    //     );

    //     // In production, you should choose the maximum amount to spend based on oracles or other data sources to acheive a better swap.
    //     TransferHelper.safeApprove(
    //         _token0,
    //         address(swapRouter),
    //         amountInMaximum
    //     );

    //     ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
    //         .ExactOutputSingleParams({
    //             tokenIn: _token0,
    //             tokenOut: _token1,
    //             fee: poolFee,
    //             recipient: msg.sender,
    //             deadline: block.timestamp,
    //             amountOut: amountOut,
    //             amountInMaximum: amountInMaximum,
    //             sqrtPriceLimitX96: 0
    //         });

    //     amountIn = swapRouter.exactOutputSingle(params);

    //     if (amountIn < amountInMaximum) {
    //         TransferHelper.safeApprove(_token0, address(swapRouter), 0);
    //         TransferHelper.safeTransfer(
    //             _token0,
    //             msg.sender,
    //             amountInMaximum - amountIn
    //         );
    //     }
    // }
}
