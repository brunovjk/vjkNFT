# VjkNFT

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge)

<img src="https://i.ibb.co/QXWDHb0/vjknft-dapp-hero-section.png" alt="VjkNFT dapp Hero section">

> VjkNFT dApp Hero Section.

### 💻 Technologies involved

- React
- Solidity
- OpenZeppelin
- ChainLink
- UniSwap

## 🚀 Automatic NFTs Generator

Our program consists of a group of smart contracts, which automatically interact with a single smart contrast: `VjkNFT.sol`, and a react application to interact with this contract:

- `Swaper.sol` Contract responsible for swapping ETH for ChainLink token. All automation of our software is done using tools supported by ChainLink Labs. Before starting any process, we need ChainLink Token.
- `APIConsumer.sol` Contract responsible for interviewing Kenny West, and returning us an epic quote, hehe.
- `VRF.sol` Contract responsible for requesting some random numbers using ChainLink VRF, with those numbers, the same contract creates a unique SVG.
- `VjkNFT.sol` Main contract responsible for automating the entire process and storing the entire collection of NFTs and profits after creating them.

## ☕ Using VjkNFT

To interact with our application and create a unique NFT go to:
[vjknft.brunovjk.com](https://vjknft.brunovjk.com/).

You can also clone this repository, change contracts in `smart_contracts` folder.

You can use our `client` application and interact with contracts already deployed on Goerli testnet.

## Process

Our application consists of a button to create a new NFT and a section to show all the NFT created in this collection.
However, several steps are followed automatically during creation:

1º: Require before start to generate nft, swap the amount paid by the user in ETH to ChainLink Token, using `Swaper.sol`. After Fund `APIConsumer.sol` and `VRF.sol`.

2º: Request KennyWestAPI quote through a ChainLink API call, get the `quoteID`. Request one single SVG via ChainLink VRF, get the `svgID`. Mint one `tokenID` with those IDs.

3º: Create a `upkeepID` by `tokenID` and finish to mint. Now the user have paid ChainLink and have they set of ID to proove it.

4º: ChainLink will keep checking `APIConsumer.sol` and `VRF.sol` if quote and svg exists.

5º: When both contracts finish creating `quote` and `svg`, our ChainLinkUpKeep will set the tokenURI (link this information with our `tokenID`). And after that, cancel upkeep to not spend more ChainLink Token, and send the remaining amount to `VjkNFT.sol`.

6º: All the ChainLink Token remaining (profit), can be checked `contractLinkBalance()` and withdrawn `withdrawLink()`.

Our dapp will guide you through the whole process.

### Adjustments and improvements

The project is still under development and the next updates will focus on the following tasks:

- [x] Contracts - Fully Automated
- [ ] Transactions - Gas Optimization

## 📫 Contributing to VjkNFT

To contribute to VjkNFT, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<message_commit>'`
4. Push to the original branch: `git push origin VjkNFT / <local>`
5. Create the pull request.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

Alternatively, see the GitHub documentation at [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 📝 License

This project is under license. See the [LICENSE](LICENSE.md) file for more details.

[⬆ Back to top](#VjkNFT)<br>
