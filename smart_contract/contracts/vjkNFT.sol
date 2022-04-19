// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact brunovjk@brunovjk.com
contract vjkNFT is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public mintPrice = 0 ether;
    uint256 public maxSupply;
    mapping(address => uint) public mintedWallets;

    struct CollectionStruct {
        address sender;
        string tokenId;
        string uri;
    }

    constructor() payable ERC721("vjkNFT", "VJK") {
        maxSupply = 10000;
    }

    CollectionStruct[] collections;

    function setMaxSupply(uint256 _maxSupply) external onlyOwner{
        maxSupply = _maxSupply;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function safeMint(string memory uri) external payable {
        uint256 tokenId = _tokenIdCounter.current();

        require(mintedWallets[msg.sender] < 1, "exceeds max per wallet");
        require(msg.value == mintPrice, "wrong value");
        require(maxSupply > tokenId, "sold out");

        mintedWallets[msg.sender]++;
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);
        string memory baseURI = _baseURI();
        string memory _TokenURI = string(abi.encodePacked(baseURI, uri));
        _setTokenURI(tokenId, _TokenURI);

        collections.push(CollectionStruct(msg.sender, Strings.toString(tokenId), uri));
    }

    function getAllCollections() external view returns (CollectionStruct[] memory) {
        return collections;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

        // Internal Function

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
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