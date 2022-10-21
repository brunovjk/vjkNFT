import React, { useContext, useState } from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { ContractContext } from "../context/ContractContext";

import { contractABI, contractAddress } from "../utils/constants";
import { shortenAddress } from "../utils/shortenAddress";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { useAlert } from "react-alert";

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

export default function Interactions() {
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setContractSymbol] = useState("");
  const [contractOwner, setContractOwner] = useState("");
  const [contractMintPrice, setContractMintPrice] = useState("");
  const [contractTotalSupply, setContractTotalSupply] = useState("");
  // const [tokenIdBurn, setTokenIdBurn] = useState("");
  const [tokenIdOwnerOf, setTokenIdOwnerOf] = useState("");
  const [ownerOf, setOwnerOf] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  // const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  // const [BurnedSuccess, setBurnedSuccess] = useState(false);
  const [addressMintedWallets, setAddressMintedWallets] = useState("");
  const [addressBalanceOf, setAddressBalanceOf] = useState("");
  // const [indexTokenIdByIndex, setIndexTokenIdByIndex] = useState("");
  // const [indexTokenOwnerByIndex, setIndexTokenOwnerByIndex] = useState("");
  // const [addressTokenOwnerByIndex, setAddressTokenOwnerByIndex] = useState("");
  const [mintedWallets, setMintedWallets] = useState("");
  const [balanceOf, setBalanceOf] = useState("");
  // const [tokenIdByIndex, setTokenIdByIndex] = useState("");
  // const [tokenOwnerByIndex, setTokenOwnerByIndex] = useState("");
  const alert = useAlert();

  const [tokenIdtokenURI, setTokenIdtokenURI] = useState("");

  const { currentAccount, isLoading, connectWallet, createVjkNFT } =
    useContext(ContractContext);

  // const getWithdraw = async () => {
  //   setWithdrawSuccess(false);
  //   try {
  //     const vjkNFTContract = getvjkNFTContract();
  //     const withdraw_tx = await vjkNFTContract.withdraw();
  //     await withdraw_tx.wait(1);

  //     setWithdrawSuccess(true);
  //   } catch (error) {
  //     console.log(error);

  //     alert.error("You are connect with a Not Owner Account.");
  //     throw new Error("You are connect with a Not Owner Account.");
  //   }
  // };
  const getContractName = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const name_tx = await vjkNFTContract.name();
      setContractName(name_tx);
    } catch (error) {
      console.log(error);
      alert.error("There's no valid Contract");
      throw new Error("There's no valid Contract");
    }
  };
  const getContractSymbol = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const symbol_tx = await vjkNFTContract.symbol();
      setContractSymbol(symbol_tx);
    } catch (error) {
      console.log(error);
      alert.error("There's no valid Contract");
      throw new Error("There's no valid Contract");
    }
  };
  const getContractOwner = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const owner_tx = await vjkNFTContract.owner();
      setContractOwner(owner_tx);
    } catch (error) {
      console.log(error);
      alert.error("There's no valid Contract");
      throw new Error("There's no valid Contract");
    }
  };
  const getContractMintPrice = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const mintpriceBigNumber = await vjkNFTContract.mintPrice();
      const mintpriceWei = BigNumber(mintpriceBigNumber._hex).c[0];
      const mintprice_tx = mintpriceWei / 10000;
      setContractMintPrice(mintprice_tx);
    } catch (error) {
      console.log(error);
      alert.error("There's no valid Contract");
      throw new Error("There's no valid Contract");
    }
  };
  const getContractTotalSupply = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const totalSupplyBigNumber = await vjkNFTContract.totalSupply();
      const totalSupply = BigNumber(totalSupplyBigNumber._hex).c[0];
      setContractTotalSupply(totalSupply);
    } catch (error) {
      console.log(error);
      alert.error("There's no valid Contract");
      throw new Error("There's no valid Contract");
    }
  };
  // const getBurn = async () => {
  //   setBurnedSuccess(false);
  //   try {
  //     const vjkNFTContract = getvjkNFTContract();
  //     const burn_tx = await vjkNFTContract.burn(tokenIdBurn);
  //     await burn_tx.wait(1);
  //     setBurnedSuccess(true);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object.");
  //   }
  // };
  const getOwnerOf = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const ownerOf_tx = await vjkNFTContract.ownerOf(tokenIdOwnerOf);
      setOwnerOf(ownerOf_tx);
    } catch (error) {
      console.log(error);
      alert.error("You need a valid TokenID to query the Owner");
      throw new Error("You need a valid TokenID to query the Owner");
    }
  };
  const getTokenURI = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const tokenURI_tx = await vjkNFTContract.tokenURI(tokenIdtokenURI);
      setTokenURI(tokenURI_tx);
    } catch (error) {
      console.log(error);
      alert.error("You need a valid TokenID to query the TokenURI");
      throw new Error("You need a valid TokenID to query the TokenURI");
    }
  };
  const getMintedWallets = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const mintedWalletsBigNumber = await vjkNFTContract.mintedWallets(
        addressMintedWallets
      );
      const mintedWallets_tx = BigNumber(mintedWalletsBigNumber._hex).c[0];

      setMintedWallets(`${mintedWallets_tx}`);
    } catch (error) {
      console.log(error);
      alert.error("You need a valid Address to query the Minted Wallets");
      throw new Error("You need a valid Address to query the Minted Wallets");
    }
  };
  const getBalanceOf = async () => {
    try {
      const vjkNFTContract = getvjkNFTContract();
      const balanceOfBigNumber = await vjkNFTContract.balanceOf(
        addressBalanceOf
      );

      const balanceOf_tx = BigNumber(balanceOfBigNumber._hex).c[0];

      setBalanceOf(`${balanceOf_tx}`);
    } catch (error) {
      console.log(error);
      alert.error("You need a valid Address to query the Balance Of");
      throw new Error("You need a valid Address to query the Balance Of");
    }
  };
  // const getTokenIdByIndex = async () => {
  //   try {
  //     const vjkNFTContract = getvjkNFTContract();
  //     const tokenIdByIndexBigNumber = await vjkNFTContract.tokenByIndex(
  //       indexTokenIdByIndex
  //     );

  //     const tokenIdByIndex_tx = BigNumber(tokenIdByIndexBigNumber._hex).c[0];

  //     setTokenIdByIndex(tokenIdByIndex_tx);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object.");
  //   }
  // };
  // const getTokenOwnerByIndex = async () => {
  //   try {
  //     const vjkNFTContract = getvjkNFTContract();
  //     const tokenOwnerByIndex = await vjkNFTContract.tokenOfOwnerByIndex(
  //       addressTokenOwnerByIndex,
  //       indexTokenOwnerByIndex
  //     );

  //     const tokenOwnerByIndex_tx = BigNumber(tokenOwnerByIndex._hex).c[0];

  //     setTokenOwnerByIndex(tokenOwnerByIndex_tx);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object.");
  //   }
  // };

  return (
    <Box component="div" className="gradient-bg-welcome">
      <Navbar />

      <Container maxWidth="xl">
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-evenly"
          alignItems="flex-start"
          p={2}
          spacing={{ xs: 6, sm: 0 }}
        >
          <Grid item xs={12} sm={5}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Box my={5}>
                  <Paper
                    sx={{
                      height: "10rem",
                      width: { xs: "16rem", md: "18rem" },
                    }}
                    className="eth-card white-glassmorphism"
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      sx={{
                        height: "10rem",
                        width: { xs: "16rem", md: "18rem" },
                      }}
                      p={2}
                    >
                      <Grid
                        container
                        item
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{
                          flexGrow: 1,
                        }}
                      >
                        <Grid item>
                          <Box
                            sx={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              border: 1,
                              borderColor: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <SiEthereum fontSize={21} color="white" />
                          </Box>
                        </Grid>
                        <Grid item>
                          <BsInfoCircle fontSize={17} color="white" />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          color="secondary"
                          fontWeight="300"
                          sx={{
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                          }}
                        >
                          {!currentAccount ? (
                            <>Address</>
                          ) : (
                            <>{shortenAddress(currentAccount)}</>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          color="secondary"
                          fontWeight="600"
                          sx={{
                            fontSize: "1.125rem",
                            lineHeight: "1.75rem",
                          }}
                          mt={1}
                        >
                          Ropsten Testnet
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
              <Grid item mt={2}>
                <Paper
                  sx={{
                    backgroundColor: "#273359",
                    padding: "16px",
                    width: { xs: "80vw", sm: "360px" },
                  }}
                >
                  <Typography color="secondary" variant="subtitle1">
                    Contract informations
                  </Typography>
                  <Divider
                    color="white"
                    sx={{
                      my: "8px",
                    }}
                  />
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={0.5}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Typography color="secondary" variant="body2">
                            Name
                          </Typography>
                        </Grid>
                        <Grid item>
                          {!currentAccount ? (
                            <Typography color="secondary" variant="body2">
                              -
                            </Typography>
                          ) : (
                            <Typography color="secondary" variant="body2">
                              vjkNFT
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Typography color="secondary" variant="body2">
                            Contract Address
                          </Typography>
                        </Grid>
                        <Grid item>
                          {!currentAccount ? (
                            <Typography color="secondary" variant="body2">
                              -
                            </Typography>
                          ) : (
                            <Typography color="primary" variant="body2">
                              {shortenAddress(contractAddress)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Typography color="secondary" variant="body2">
                            Token Standard
                          </Typography>
                        </Grid>
                        <Grid item>
                          {!currentAccount ? (
                            <Typography color="secondary" variant="body2">
                              -
                            </Typography>
                          ) : (
                            <Typography color="secondary" variant="body2">
                              ERC-721
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Typography color="secondary" variant="body2">
                            Blockchain
                          </Typography>
                        </Grid>
                        <Grid item>
                          {!currentAccount ? (
                            <Typography color="secondary" variant="body2">
                              -
                            </Typography>
                          ) : (
                            <Typography color="secondary" variant="body2">
                              Ropsten
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper
              sx={{
                background: "rgb(39, 51, 89, 0.4)",
                borderRadius: "16px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                {!currentAccount ? (
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    p={2}
                  >
                    <Grid item>
                      <Typography align="center" variant="h6" color="secondary">
                        Please Connect to your Wallet to interact with the
                        Contract
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={connectWallet}>Connect Wallet</Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    p={2}
                  >
                    {/* <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getWithdraw} fullWidth={true}>
                            withdraw
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          {!withdrawSuccess ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {withdrawSuccess}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid> */}
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getContractName} fullWidth={true}>
                            name
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <Typography color="secondary">
                            {contractName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getContractSymbol} fullWidth={true}>
                            symbol
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <Typography color="secondary">
                            {contractSymbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getContractOwner} fullWidth={true}>
                            owner
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          {!contractOwner ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {shortenAddress(contractOwner)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button
                            onClick={getContractMintPrice}
                            fullWidth={true}
                          >
                            mintPrice
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          {!contractMintPrice ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {contractMintPrice} ETH
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button
                            onClick={getContractTotalSupply}
                            fullWidth={true}
                          >
                            totalsupply
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <Typography color="secondary">
                            {contractTotalSupply}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button
                            onClick={createVjkNFT}
                            variant="outlined"
                            fullWidth={true}
                          >
                            _Mint
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{
                            height: "72px",
                          }}
                        >
                          {!isLoading ? <></> : <Loader />}
                        </Grid>
                        <Grid item xs={4}></Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getBurn} fullWidth={true}>
                            Burn
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            onChange={(e) => setTokenIdBurn(e.target.value)}
                            color="secondary"
                            label="tokenId"
                          >
                            Burn
                          </TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!BurnedSuccess ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              Burned Successfully
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid> */}
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getOwnerOf} fullWidth={true}>
                            ownerOf
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            color="secondary"
                            onChange={(e) => setTokenIdOwnerOf(e.target.value)}
                            label="tokenId"
                          ></TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!ownerOf ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {shortenAddress(ownerOf)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getBalanceOf} fullWidth={true}>
                            balanceOf
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            onChange={(e) =>
                              setAddressBalanceOf(e.target.value)
                            }
                            color="secondary"
                            label="address"
                          ></TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!balanceOf ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {balanceOf}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getTokenURI} fullWidth={true}>
                            TokenURI
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            color="secondary"
                            onChange={(e) => setTokenIdtokenURI(e.target.value)}
                            label="tokenId"
                          ></TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!tokenURI ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {shortenAddress(tokenURI)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getMintedWallets} fullWidth={true}>
                            MintedWallets
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            onChange={(e) =>
                              setAddressMintedWallets(e.target.value)
                            }
                            color="secondary"
                            label="address"
                          ></TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!mintedWallets ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {mintedWallets}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button onClick={getTokenIdByIndex} fullWidth={true}>
                            TokenByIndex
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            onChange={(e) =>
                              setIndexTokenIdByIndex(e.target.value)
                            }
                            color="secondary"
                            label="index"
                          ></TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!tokenIdByIndex ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {shortenAddress(tokenIdByIndex)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={4}>
                          <Button
                            onClick={getTokenOwnerByIndex}
                            fullWidth={true}
                          >
                            TokenOwnerByIndex
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            onChange={(e) =>
                              setAddressTokenOwnerByIndex(e.target.value)
                            }
                            color="secondary"
                            label="index"
                          ></TextField>
                          <TextField
                            onChange={(e) =>
                              setIndexTokenOwnerByIndex(e.target.value)
                            }
                            color="secondary"
                            label="index"
                          ></TextField>
                        </Grid>
                        <Grid item xs={4}>
                          {!tokenOwnerByIndex ? (
                            <Typography color="secondary"></Typography>
                          ) : (
                            <Typography color="secondary">
                              {shortenAddress(tokenOwnerByIndex)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid> */}
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
