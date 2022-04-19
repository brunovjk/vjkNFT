// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";

/// @custom:security-contact brunovjk@brunovjk.com
contract vjkNFT is ERC721, ERC721URIStorage, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct CollectionStruct {
        address sender;
        string tokenId;
        string nameNFT;
        string descriptionNFT;
        string svg;
    }

    constructor() ERC721("vjkNFT", "VJK") {}

    CollectionStruct[] collections;

    function safeMint(string memory nameNFT, string memory descriptionNFT, string memory svg) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, formatTokenURI(nameNFT, descriptionNFT, svg, tokenId));
        collections.push(CollectionStruct(msg.sender, Strings.toString(tokenId), nameNFT, descriptionNFT, svg));

    }
    function getAllCollections() public view returns (CollectionStruct[] memory) {
        return collections;
    }
    function formatTokenURI(string memory nameNFT, string memory descriptionNFT, string memory svg, uint256 tokenId) internal pure returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"Name":"',nameNFT,'", "Description":"',descriptionNFT,'", "Painting":"',svg,'", "TokenId":"',Strings.toString(tokenId),'" }'
                            )
                        )
                    )
                )
            );
    }

    // The following functions are overrides required by Solidity.

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