// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

interface IAPIConsumer {
    function requestQuoteData() external returns (bytes32 requestId);

    function quote(bytes32 requestId) external view returns (string memory);

    function exists(bytes32 requestId) external view returns (bool);

    function withdrawLink() external returns (bool);
}
