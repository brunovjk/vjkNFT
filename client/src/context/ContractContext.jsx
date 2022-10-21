import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { Buffer } from "buffer";
import BigNumber from "bignumber.js";
import { useAlert } from "react-alert";

export const ContractContext = React.createContext();
const { ethereum } = window;
const getvjkNFTContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(0);

  const vjkNFTContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return vjkNFTContract;
};

export const VjkNFTContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [refreshAfterMint, setRefreshAfterMint] = useState(false);
  const alert = useAlert();

  let Chance = require("chance");
  let chance = new Chance();

  // Generate a svg randomly
  chance.mixin({
    svg: function (options) {
      options = options || {};
      options.max_size = 20;
      options.lines = 12;
      options.circles = 12;
      options.triangles = 12;
      options.opacity = 0.3;
      options.background = chance.color();

      // Create a coordinate within an area bigger than the svg
      function point(min, max) {
        return chance.integer({ min: min || -10, max: max || 110 });
      }

      // Generate the actual svg
      // Docs: developer.mozilla.org/en-US/docs/Web/SVG/Element/line
      // viewBox use: stackoverflow.com/q/17498855
      let svg =
        '<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background-color:' +
        options.background +
        '">';
      for (let i = 0; i < options.lines; i++) {
        svg += '<line stroke="' + chance.color() + '" ';
        svg += 'stroke-width="' + point(1, 5) + '" ';
        svg += 'opacity="' + options.opacity + '" ';
        svg += 'x1="' + point() + '" y1="' + point() + '" ';
        svg += 'x2="' + point() + '" y2="' + point() + '" />';
      }
      for (let i = 0; i < options.circles; i++) {
        svg += '<circle cx="' + point() + '" ';
        svg += 'cy="' + point() + '" ';
        svg += 'r="' + point(1, options.max_size / 2) + '" ';
        svg += 'opacity="' + options.opacity + '" ';
        svg += 'fill="' + chance.color() + '"/>';
      }
      for (let i = 0; i < options.triangles; i++) {
        let s = options.max_size;
        svg += '<polygon fill="' + chance.color() + '" points="';
        let x = point();
        let y = point();
        svg += x + "," + y + " ";
        svg += x + point(-s, s) + "," + (y + point(-s, s)) + " ";
        svg += x + point(-s, s) + "," + (y + point(-s, s));
        svg += '" opacity="' + options.opacity + '" ';
        svg += "/>";
      }
      return svg + "</svg>";
    },
  });
  const chanceSvg = () => {
    let chanceSvg = `${chance.svg({})}`;
    let svgBase64 = "data:image/svg+xml;base64,";
    let svgEncoded64 = Buffer.from(chanceSvg).toString("base64");
    let svg = svgBase64 + svgEncoded64;

    return svg;
  };
  const chanceNameNFT = () => {
    let nameNFTFisrt = chance.first();
    let nameNFTNumber = chance.natural({ min: 1000, max: 9999 });
    let nameNFT = `${nameNFTFisrt} #${nameNFTNumber}`;

    return nameNFT;
  };
  const chanceDescriptionNFT = () => {
    let descriptionNameNFT = chance.name();
    let descriptionCountryNFT = chance.country({ full: true });
    let descriptionYearNFT = chance.natural({ min: 1000, max: 1999 });
    let descriptionGenderNFT = chance.pickone(["He", "She"]);
    let descriptionAnimalNFT = chance.animal();

    let descriptionNFT = `This work of art is made by ${descriptionNameNFT} from ${descriptionCountryNFT} in ${descriptionYearNFT}. ${descriptionGenderNFT} told us that this peace was inspired by ${descriptionAnimalNFT}.`;

    return descriptionNFT;
  };
  const formatTokenURI = () => {
    const nameNFT = chanceNameNFT();
    const descriptionNFT = chanceDescriptionNFT();
    // const uriBase = {
    //   Name: `${nameNFT}`,
    //   Description: `${descriptionNFT}`,
    // };
    // const uriBase64 = Buffer.from(JSON.stringify(uriBase)).toString("base64");

    return nameNFT, descriptionNFT;
  };
  const checkIfWalletisConnected = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install a Cryptocurrency Software Wallet");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllCollections();
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  const getAllCollections = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install a Cryptocurrency Software Wallet");
      const vjkNFTContract = getvjkNFTContract();
      const totalSupplyBigNumber = await vjkNFTContract.totalSupply();
      const totalSupply = BigNumber(totalSupplyBigNumber._hex).c[0];

      const collection = [];

      for (var i = 0; i < totalSupply; i++) {
        collection[i] = {
          tokenid: i,
          addresssender: await vjkNFTContract.ownerOf(i),
          uri: await vjkNFTContract.tokenURI(i),
        };
      }
      setCollections(collection);
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install a Cryptocurrency Software Wallet");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  const createVjkNFT = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install a Cryptocurrency Software Wallet");
      setIsLoading(true);

      const vjkNFTContract = getvjkNFTContract();

      const uri = formatTokenURI();
      const create_tx = await vjkNFTContract.safeMint(uri, {
        value: ethers.utils.parseEther("0.05"),
      });
      console.log(`Loading - ${create_tx.hash}`);
      await create_tx.wait(1);

      alert.success("You have minted your NFT with Success");
      setIsLoading(false);
      setRefreshAfterMint(true);
    } catch (error) {
      console.log(error);

      setIsLoading(false);

      alert.error(
        "No able to mint. Check if you send the right Mint price or reach the Max token per Wallet"
      );
      throw new Error(
        "No able to mint. Check if you send the right Mint price or reach the Max token per Wallet"
      );
    }
  };

  useEffect(() => {
    checkIfWalletisConnected();
    getAllCollections();
    setRefreshAfterMint(false);
  }, [currentAccount, refreshAfterMint]);

  return (
    <ContractContext.Provider
      value={{
        //States:
        currentAccount,
        isLoading,
        collections,
        //Functions:
        connectWallet,
        createVjkNFT,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
