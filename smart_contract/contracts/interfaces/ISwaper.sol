// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

interface ISwaper {
    function swapAndDeposit() external payable returns (bool success);

    function swapAndWithdraw() external payable returns (bool success);
}
