import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { Base64 } from "js-base64";

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

  let Chance = require("chance");
  let chance = new Chance();

  // Generate a svg randomly
  chance.mixin({
    svg: function (options) {
      options = options || {};
      options.size = 12;
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

    let chanceSvgBase64Encoded = Base64.encode(chanceSvg);
    let baseURL = "data:image/svg+xml;base64,";
    let svg = baseURL + chanceSvgBase64Encoded;
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

    let descriptionNFT = `This work of art is made by ${descriptionNameNFT} from ${descriptionCountryNFT} in ${descriptionYearNFT}. ${descriptionGenderNFT} told us that this peace was expired in a ${descriptionAnimalNFT}.`;

    return descriptionNFT;
  };

  const checkIfWalletisConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

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
      if (!ethereum) return alert("Please install metamask");

      const vjkNFTContract = getvjkNFTContract();
      const availableCollections = await vjkNFTContract.getAllCollections();

      const structuredCollections = availableCollections.map(
        (vjkNFTContract) => ({
          addressSender: vjkNFTContract.sender,
          tokenId: vjkNFTContract.tokenId,
          nameNFT: vjkNFTContract.nameNFT,
          descriptionNFT: vjkNFTContract.descriptionNFT,
          vjkNFT: vjkNFTContract.svg,
        })
      );
      setCollections(structuredCollections);
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

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
      if (!ethereum) return alert("Please install metamask");
      setIsLoading(true);
      let nameNFT = chanceNameNFT();
      let descriptionNFT = chanceDescriptionNFT();
      let svg = chanceSvg();

      const vjkNFTContract = getvjkNFTContract();

      const create_tx = await vjkNFTContract.safeMint(
        `${nameNFT}`,
        `${descriptionNFT}`,
        `${svg}`
      );
      console.log(`Loading - ${create_tx.hash}`);
      await create_tx.wait(1);

      setIsLoading(false);
      setRefreshAfterMint(true);
    } catch (error) {
      console.log(error);

      setIsLoading(false);

      throw new Error("No ethereum object.");
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
