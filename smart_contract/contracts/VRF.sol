// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {GetURI} from "./libraries/GetURI.sol";

contract VRF is VRFV2WrapperConsumerBase, Ownable {
    using GetURI for string;
    event RequestSent(uint256 requestId, uint32 numWords);

    mapping(uint256 => uint256) public paid;
    mapping(uint256 => bool) public exists;
    mapping(uint256 => string) public svg;

    uint32 callbackGasLimit;
    uint16 requestConfirmations;
    uint32 numWords;
    address linkAddress;
    address wrapperAddress;

    event RequestSVG(uint256 indexed requestId, uint256[] _randomWords);

    constructor(
        uint32 _callbackGasLimit,
        uint16 _requestConfirmations,
        uint32 _numWords,
        address _linkAddress,
        address _wrapperAddress
    ) VRFV2WrapperConsumerBase(_linkAddress, _wrapperAddress) {
        callbackGasLimit = _callbackGasLimit;
        requestConfirmations = _requestConfirmations;
        numWords = _numWords;
        linkAddress = _linkAddress;
        wrapperAddress = _wrapperAddress;
    }

    function requestRandomWords()
        external
        onlyOwner
        returns (uint256 requestId)
    {
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        paid[requestId] = VRF_V2_WRAPPER.calculateRequestPrice(
            callbackGasLimit
        );
        emit RequestSent(requestId, numWords);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(paid[_requestId] > 0, "request not found");
        svg[_requestId] = GetURI.getURI(_randomWords);
        exists[_requestId] = true;
        emit RequestSVG(_requestId, _randomWords);
    }

    function withdrawLink() public onlyOwner returns (bool) {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        return link.transfer(msg.sender, link.balanceOf(address(this)));
    }
}
