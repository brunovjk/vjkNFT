import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import {
  VjkNFT_address,
  APIConsumer_address,
  VRF_address,
} from "../utils/constants";
import { contractABI, APIConsumer_ABI, VRF_ABI } from "../utils/abis";

import BigNumber from "bignumber.js";
import { useAlert } from "react-alert";

export const ContractContext = createContext();

const { ethereum } = window;

const provider = ethereum
  ? new ethers.providers.Web3Provider(ethereum, "any")
  : undefined;

const gasToMint = 1500000;
const priceToMint = "0.09625";

const getvjkNFTContract = () => {
  const vjkNFTContract = new ethers.Contract(
    VjkNFT_address,
    contractABI,
    provider.getSigner(0)
  );
  return vjkNFTContract;
};

export const VjkNFTContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [loadingMint, setLoadingMint] = useState(false);
  const [loadingApp, setLoadingApp] = useState(false);
  const [openMintModal, setOpenMintModal] = useState(false);
  const [chainId, setChainId] = useState(0);
  const [collections, setCollections] = useState([]);
  const alert = useAlert();

  const [mintSteps, setMintSteps] = useState({
    minting: false,
    interviewing: false,
    painting: false,
    creating: false,
    created: false,
    tx_hash: "",
  });

  const checkIfWalletisConnected = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install a Cryptocurrency Software Wallet");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  const checkChainId = async () => {
    try {
      if (!ethereum)
        return alert.error("Please install a Cryptocurrency Software Wallet");

      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId.length) {
        setChainId(parseInt(chainId, 16));
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
      // if (!ethereum)
      //   return alert.error("Please install a Cryptocurrency Software Wallet");
      const customHttpProvider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_GOERLI_RPC_URL
      );

      const vjkNFTContract = new ethers.Contract(
        VjkNFT_address,
        contractABI,
        customHttpProvider ?? provider
      );
      const totalSupplyBigNumber = await vjkNFTContract.totalSupply();
      const totalSupply = BigNumber(totalSupplyBigNumber._hex).c[0];

      const collection = [];

      for (var i = 0; i < totalSupply; i++) {
        collection[i] = {
          tokenid: i,
          addresssender: await vjkNFTContract.ownerOf(i),
          uri64: await vjkNFTContract.tokenURI(i),
          mintPrice: await vjkNFTContract.mintPrice(),
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
      const vjkNFTContract = getvjkNFTContract();
      // Create NFT
      const create_tx = await vjkNFTContract.mint(gasToMint, {
        value: ethers.utils.parseEther(priceToMint),
        gasLimit: gasToMint,
      });
      // Start create
      console.log(`Loading - ${create_tx.hash}`);
      setMintSteps({ ...mintSteps, minting: true });
      // NFT Minted, now wait or close
      await create_tx.wait(1);
      setMintSteps({
        ...mintSteps,
        minting: false,
        interviewing: true,
        tx_hash: `${create_tx.hash}`,
      });
      // Set alert, when quote exists

      // Set alert, when svg exists

      // TokenURI exists
    } catch (error) {
      console.log(error);
      setMintSteps({
        minting: false,
        interviewing: false,
        painting: false,
        creating: false,
        created: false,
        tx_hash: "",
      });
      setLoadingMint(false);
      setOpenMintModal(false);
      alert.error(
        "No able to mint. Check if you send the right Mint price or reach the Max token per Wallet"
      );
      throw new Error(
        "No able to mint. Check if you send the right Mint price or reach the Max token per Wallet"
      );
    }
  };

  useEffect(() => {
    if (ethereum) {
      ethereum.on("chainChanged", () => {
        setLoadingApp(true);
        checkChainId();
        setTimeout(() => {
          setLoadingApp(false);
        }, 500);
      });
      ethereum.on("accountsChanged", () => {
        setLoadingApp(true);
        checkIfWalletisConnected();
        setTimeout(() => {
          setLoadingApp(false);
        }, 500);
      });
      if (mintSteps.interviewing) {
        // Set alert, when quote exists
        const APIConsumer = new ethers.Contract(
          APIConsumer_address,
          APIConsumer_ABI,
          provider.getSigner(0)
        );
        APIConsumer.once("RequestQuote", async (res) => {
          console.log("RequestQuote event fired!", res);
          setMintSteps({
            ...mintSteps,
            interviewing: false,
            painting: true,
            tx_hash: res.toString(),
          });
        });
      } else if (mintSteps.painting) {
        // Set alert, when svg exists
        const VRF = new ethers.Contract(
          VRF_address,
          VRF_ABI,
          provider.getSigner(0)
        );
        VRF.once("RequestSVG", async (res) => {
          console.log("RequestSVG event fired!", res);
          setMintSteps({
            ...mintSteps,
            painting: false,
            creating: true,
            tx_hash: res.toString(),
          });
        });
      } else if (mintSteps.creating) {
        // TokenURI exists
        const vjkContract = new ethers.Contract(
          VjkNFT_address,
          contractABI,
          provider.getSigner(0)
        );
        vjkContract.once("Created", async (res) => {
          console.log("Created event fired!", res);
          setMintSteps({
            ...mintSteps,
            creating: false,
            created: true,
            tx_hash: res.toString(),
          });
        });
      } else if (mintSteps.created) {
        alert.success("We have Created your NFT with Success");
        setLoadingMint(false);
      }
    }
  });

  useEffect(() => {
    checkIfWalletisConnected();
    checkChainId();
    getAllCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount]);

  return (
    <ContractContext.Provider
      value={{
        //States:
        gasToMint,
        priceToMint,
        currentAccount,
        loadingMint,
        loadingApp,
        chainId,
        collections,
        mintSteps,
        openMintModal,
        //Functions:
        connectWallet,
        setOpenMintModal,
        createVjkNFT,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
