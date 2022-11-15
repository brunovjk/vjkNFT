import React, { useContext } from "react";
import {
  Container,
  Box,
  Grid,
  Link,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import Loader from "./Loader";

import { ContractContext } from "../context/ContractContext";
import { shortenAddress } from "../utils/shortenAddress";
import { MintingModal } from "./MintingModal";

const Welcome = () => {
  const {
    chainId,
    currentAccount,
    loadingMint,
    connectWallet,
    openMintModal,
    setOpenMintModal,
  } = useContext(ContractContext);
  const handleOpenMintModal = () => setOpenMintModal(true);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        p={2}
      >
        <Grid item>
          <Grid item>
            <Typography
              variant="h1"
              className="text-gradient"
              pt={5}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.125rem" },
                lineHeight: { xs: "2.25rem", sm: "1.2" },
              }}
            >
              vjkNFT is a
            </Typography>
            <Typography
              variant="h1"
              className="text-gradient"
              pb={2}
              sx={{
                fontSize: { xs: "1.875rem", sm: "3rem" },
                lineHeight: { xs: "2.25rem", sm: "1" },
              }}
            >
              Fully on-chain
              <br /> NFT͟ Collection
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h2"
              color="secondary"
              my={5}
              sx={{
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
              fontWeight="300"
            >
              This project it`s part of
              <Link
                target="_blank"
                rel="noopener"
                color="primary"
                underline="hover"
                href="http://brunovjk.com/"
              >
                {" "}
                brunovjk{" "}
              </Link>
              Portfolio <br /> Connect your Wallet to Goerli Testnet Network,
              <br />
              click _Mint and receive a NFT pseudo Random SVG Painting.
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
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
                      direction="row"
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
                        {chainId === 5
                          ? "Goerli Testnet"
                          : "Please switch to Goerli"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Paper
                  sx={{
                    width: { xs: "100%", md: "22rem" },
                    background: "rgb(39, 51, 89, 0.4)",
                    borderRadius: "16px",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    sx={{
                      width: { xs: "100%", md: "22rem" },
                    }}
                    p={1.8}
                  >
                    <Grid
                      item
                      mt={1.5}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                      }}
                    >
                      <Box mt={1}>
                        {loadingMint ? (
                          <Loader />
                        ) : currentAccount ? (
                          chainId === 5 ? (
                            <Button
                              onClick={handleOpenMintModal}
                              variant="outlined"
                              sx={{
                                width: "12rem",
                                height: "30px",
                              }}
                            >
                              _Mint
                            </Button>
                          ) : (
                            <Typography
                              color="secondary"
                              fontWeight="600"
                              sx={{
                                fontSize: "1.125rem",
                                lineHeight: "1.75rem",
                              }}
                            >
                              Please switch to Goerli
                            </Typography>
                          )
                        ) : (
                          <Button onClick={connectWallet}>
                            Connect Wallet
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MintingModal
        openMintModal={openMintModal}
        setOpenMintModal={setOpenMintModal}
      />
    </Container>
  );
};

export default Welcome;
