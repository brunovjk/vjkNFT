import React from "react";
import { Navbar } from "../components";
import {
  Box,
  Grid,
  Typography,
  Container,
  Link,
  CardMedia,
  Paper,
  Divider,
} from "@mui/material";
import { shortenAddress } from "../utils/shortenAddress";
import { contractAddress } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";

export default function NFTCard() {
  const { addresssender } = useLocation().state.addresssender;
  const { tokenid } = useLocation().state.tokenid;
  const { nameNFT } = useLocation().state.nameNFT;
  const { descriptionNFT } = useLocation().state.descriptionNFT;
  const { vjkNFT } = useLocation().state.vjkNFT;
  return (
    <>
      <Box component="div" className="gradient-bg-welcome">
        <Navbar />

        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item p={{ xs: 2, md: 8 }} xs={12} sm={5}>
              <Paper>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                  src={vjkNFT}
                  alt="vjkNFT"
                />
              </Paper>
            </Grid>
            <Grid item p={{ xs: 2, md: 8 }} xs={12} sm={5}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item>
                  <Link
                    href={`https://ropsten.etherscan.io/address/${contractAddress}`}
                    underline="none"
                    color="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography color="secondary" variant="subtile1">
                      vjkNFT
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Typography color="secondary" variant="h4">
                    {nameNFT}
                  </Typography>
                </Grid>
                <Grid item>
                  <Link
                    href={`https://ropsten.etherscan.io/address/${contractAddress}`}
                    underline="none"
                    color="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography color="secondary" variant="body1">
                      Owner: {shortenAddress(addresssender)}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Typography color="secondary" variant="h6">
                    Description
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="secondary" variant="body1">
                    {descriptionNFT}
                  </Typography>
                </Grid>
                <Grid item mt={2}>
                  <Typography color="secondary" variant="h4">
                    <FaEthereum size={28} /> 0.05
                  </Typography>
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
                      Details
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
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              Contract Address
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography color="primary" variant="body2">
                              {shortenAddress(contractAddress)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              Token ID
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              {tokenid}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              Token Standard
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              ERC-721
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              Blockchain
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography color="secondary" variant="body2">
                              Ropsten
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
