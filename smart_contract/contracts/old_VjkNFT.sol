// SPDX-License-Identifier: GPL-3.0
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/GetURI.sol";

contract VjkNFT is ERC721, ERC721URIStorage, VRFConsumerBaseV2, ConfirmedOwner {
    using GetURI for string;

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled;
        bool exists;
        uint256[] randomWords;
        string name;
        string description;
        string uri;
    }

    // mapping(address => uint) public mintedWallets;

    mapping(uint256 => RequestStatus) public s_requests;
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;

    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 keyHash =
        0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    // uint256 public mintPrice = 0.05 ether;
    // uint256 public maxSupply = 99;

    uint32 callbackGasLimit = 2400000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 23;

    constructor(uint64 subscriptionId)
        ERC721("vjkNFT", "VJK")
        VRFConsumerBaseV2(0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D
        );
        s_subscriptionId = subscriptionId;
    }

    function setTokenURI(uint256 _tokenId, string memory _uri) internal {
        _setTokenURI(_tokenId, _uri);
    }

    function safeMint(address _to, uint256 _tokenId) internal {
        _safeMint(_to, _tokenId);
    }

    // function setMintPrice(uint256 _mintPrice) external onlyOwner{
    //     mintPrice = _mintPrice;
    // }
    // function setMaxSupply(uint256 _maxSupply) external onlyOwner{
    //     maxSupply = _maxSupply;
    // }
    function withdraw() public payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function requestRandomWords(string memory _name, string memory _description)
        external
        returns (
            // payable
            uint256 requestId
        )
    {
        // require(mintedWallets[msg.sender] < 3, "exceeds max per wallet");
        // require(msg.value == mintPrice, "wrong value");
        // require(maxSupply > requestIds.length, "sold out");

        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false,
            name: _name,
            description: _description,
            uri: ""
        });
        requestIds.push(requestId);
        lastRequestId = requestId;

        safeMint(msg.sender, requestId);
        emit RequestSent(requestId, numWords);

        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        for (uint256 i = 0; i < numWords; i++) {
            _randomWords[i] = (_randomWords[i] % 100) + 1;
        }
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;

        s_requests[_requestId].uri = GetURI.getURI(
            _randomWords,
            s_requests[_requestId].name,
            s_requests[_requestId].description
        );
        setTokenURI(_requestId, s_requests[_requestId].uri);

        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(uint256 _requestId)
        external
        view
        returns (
            bool fulfilled,
            uint256[] memory randomWords,
            string memory name,
            string memory uri
        )
    {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (
            request.fulfilled,
            request.randomWords,
            request.name,
            request.uri
        );
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
