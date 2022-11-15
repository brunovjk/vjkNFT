// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

interface IVRF {
    function requestRandomWords() external returns (uint256 requestId);

    function exists(uint256) external view returns (bool);

    function svg(uint256) external view returns (string memory);

    function withdrawLink() external returns (bool);
}
