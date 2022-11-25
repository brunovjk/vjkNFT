// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";

import {AutomationRegistryInterface, State, Config} from "@chainlink/contracts/src/v0.8/interfaces/AutomationRegistryInterface1_2.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {KeeperRegistrarInterface} from "./interfaces/KeeperRegistrarInterface.sol";
import {ISwaper} from "./interfaces/ISwaper.sol";
import {IAPIConsumer} from "./interfaces/IAPIConsumer.sol";
import {IVRF} from "./interfaces/IVRF.sol";

/// @custom:security-contact brunovjk@brunovjk.com
contract VjkNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using Strings for string;

    Counters.Counter private _tokenIdCounter;

    struct ID {
        string tokenName;
        uint256 tokenID;
        bytes32 quoteID;
        uint256 svgID;
    }

    mapping(address => ID[]) public IDbyAddres;
    mapping(address => uint256) public mintedPerWallet;
    mapping(uint256 => uint256) public tokenToUpkeepID;

    uint256 public mintPrice;
    uint256 public maxPerWallet;
    uint256 public maxSupply;
    uint256 public totalSupply;

    uint96 private apiConsumerLinkAmount;
    uint96 private vrfLinkAmount;
    uint96 private automateLinkAmount;

    LinkTokenInterface private immutable link;
    ISwaper private immutable swaper;
    IAPIConsumer private immutable apiConsumer;
    IVRF private immutable vrf;
    address private immutable registrar;
    AutomationRegistryInterface private immutable registry;
    bytes4 registerSig = KeeperRegistrarInterface.register.selector;

    event Created(uint256 indexed tokenID);

    constructor(
        IAPIConsumer _apiConsumer,
        IVRF _vrf,
        ISwaper _swaper,
        LinkTokenInterface _link,
        address _registrar,
        AutomationRegistryInterface _registry,
        uint96 _apiConsumerLinkAmount,
        uint96 _vrfLinkAmount,
        uint96 _automateLinkAmount
    ) ERC721("VjkNFT", "VJK") {
        apiConsumer = _apiConsumer;
        vrf = _vrf;
        swaper = _swaper;

        link = _link;
        registrar = _registrar;
        registry = _registry;

        mintPrice = 0.08625 ether; // 86250000000000000 wei
        maxPerWallet = 3;
        maxSupply = 9999;

        apiConsumerLinkAmount = _apiConsumerLinkAmount;
        vrfLinkAmount = _vrfLinkAmount;
        automateLinkAmount = _automateLinkAmount;
    }

    modifier requiredToCreate() {
        require(msg.value == mintPrice, "wrong value");
        require(
            mintedPerWallet[msg.sender] < maxPerWallet,
            "exceeds max per wallet"
        );
        require(maxSupply > _tokenIdCounter.current(), "sold out");
        _;
    }

    function contractLinkBalance()
        public
        view
        onlyOwner
        returns (uint256 balance)
    {
        balance = link.balanceOf(address(this));
    }

    function withdrawLink() public onlyOwner {
        require(apiConsumer.withdrawLink(), "Unable to withdraw APIConsumer");
        require(vrf.withdrawLink(), "Unable to withdraw VRF");
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    function createUri(ID memory _ID)
        internal
        view
        returns (string memory uri)
    {
        uri = string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            _ID.tokenName,
                            '","description":"',
                            apiConsumer.quote(_ID.quoteID),
                            '","external_url":"vjknft.brunovjk.com/',
                            Strings.toString(_ID.tokenID),
                            '","image":"',
                            vrf.svg(_ID.svgID),
                            '"}'
                        )
                    )
                )
            )
        );
    }

    function createNewToken() internal returns (ID memory _ID) {
        require(
            link.transfer(address(apiConsumer), apiConsumerLinkAmount),
            "not able to fund apiConsumer"
        );
        require(
            link.transfer(address(vrf), vrfLinkAmount),
            "not able to fund vrf"
        );

        _ID = ID(
            string(
                abi.encodePacked(
                    "VJK",
                    Strings.toString(_tokenIdCounter.current())
                )
            ),
            _tokenIdCounter.current(),
            apiConsumer.requestQuoteData(),
            vrf.requestRandomWords()
        );
        _tokenIdCounter.increment();
        totalSupply++;

        mintedPerWallet[msg.sender]++;
        IDbyAddres[msg.sender].push(_ID);

        _safeMint(msg.sender, _ID.tokenID);

        return _ID;
    }

    function mint(uint32 gasLimit) external payable requiredToCreate {
        require(
            swaper.swapAndDeposit{value: msg.value}(), //Swap ETH amountIn to LINK maxAmountOut
            "not able to fund Paint"
        );

        ID memory _ID = createNewToken();
        (State memory state, Config memory _c, address[] memory _k) = registry
            .getState();
        uint256 oldNonce = state.nonce;
        bytes memory checkData = abi.encode(_ID);
        bytes memory payload = abi.encode(
            _ID.tokenName,
            "0x",
            address(this),
            gasLimit,
            address(msg.sender),
            checkData,
            automateLinkAmount,
            0,
            address(this)
        );

        link.transferAndCall(
            registrar,
            automateLinkAmount,
            bytes.concat(registerSig, payload)
        );
        (state, _c, _k) = registry.getState();
        uint256 newNonce = state.nonce;
        if (newNonce == oldNonce + 1) {
            uint256 upkeepID = uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        address(registry),
                        uint32(oldNonce)
                    )
                )
            );
            tokenToUpkeepID[_ID.tokenID] = upkeepID;
        } else {
            revert("auto-approve disabled");
        }
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
        returns (bool upkeepNeeded, bytes memory performData)
    {
        ID memory _ID = abi.decode(checkData, (ID));
        upkeepNeeded = (apiConsumer.exists(_ID.quoteID) &&
            vrf.exists(_ID.svgID));
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external {
        ID memory _ID = abi.decode(performData, (ID));

        if (apiConsumer.exists(_ID.quoteID) && vrf.exists(_ID.svgID)) {
            _setTokenURI(_ID.tokenID, createUri(_ID));
            emit Created(_ID.tokenID);
        }
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
