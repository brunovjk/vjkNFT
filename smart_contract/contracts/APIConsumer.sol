// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract APIConsumer is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;

    mapping(bytes32 => string) public quote;
    mapping(bytes32 => bool) public exists;

    bytes32 private jobId;
    uint256 private fee;

    event RequestQuote(bytes32 indexed requestId, string quote);

    constructor(address linkToken, address linkOracle) {
        setChainlinkToken(linkToken);
        setChainlinkOracle(linkOracle);
        jobId = "7d80a6386ef543a3abb52817f6707e3b"; // ChainLink String job ID
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function requestQuoteData() public onlyOwner returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add("get", "https://api.kanye.rest/");

        req.add("path", "quote");

        int256 timesAmount = 1;
        req.addInt("times", timesAmount);

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, string memory _quote)
        public
        recordChainlinkFulfillment(_requestId)
    {
        quote[_requestId] = _quote;
        exists[_requestId] = true;
        emit RequestQuote(_requestId, _quote);
    }

    function withdrawLink() public onlyOwner returns (bool) {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        return link.transfer(msg.sender, link.balanceOf(address(this)));
    }
}
