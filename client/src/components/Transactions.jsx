import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContractContext } from "../context/ContractContext";
import { Box, Grid, Paper, Typography, Link, CardMedia } from "@mui/material";
import { shortenAddress } from "../utils/shortenAddress";
import { contractAddress } from "../utils/constants";
import { Buffer } from "buffer";
import { FaEthereum } from "react-icons/fa";

const CollectionCard = ({ tokenid, addresssender, uri }) => {
  const splitedURI = uri.split("data:application/json;base64,")[1];
  const decodeBase64Uri = JSON.parse(
    Buffer.from(splitedURI, "base64").toString("utf-8")
  );
  const nameNFT = decodeBase64Uri.Name;
  const descriptionNFT = decodeBase64Uri.Description;
  const vjkNFT = decodeBase64Uri.Painting;

  const linkTokenId = `/${tokenid}`;

  return (
    <Box
      m={4}
      sx={{
        width: { xs: "250px", md: "280px" },
      }}
    >
      <Paper
        sx={{
          background: "rgb(39, 51, 89, 0.4)",
          padding: "1rem",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography color="secondary" variant="h5">
              {nameNFT}
            </Typography>
          </Grid>
          <Grid item my={2}>
            <NavLink
              to={linkTokenId}
              state={{
                addresssender: { addresssender },
                tokenid: { tokenid },
                nameNFT: { nameNFT },
                descriptionNFT: { descriptionNFT },
                vjkNFT: { vjkNFT },
              }}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  border: 0,
                  cursor: "pointer",
                }}
                src={vjkNFT}
                alt="vjkNFT"
              />
            </NavLink>
          </Grid>
          <Grid item>
            <Link
              href={`https://ropsten.etherscan.io/address/${addresssender}`}
              underline="none"
              color="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography color="secondary" variant="body2">
                Owner: {shortenAddress(addresssender)}
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            sx={{
              width: "100%",
            }}
            my={1}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link
                  href={`https://ropsten.etherscan.io/token/${contractAddress}`}
                  underline="none"
                  color="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography color="secondary" variant="subtitle2">
                    Token ID: {tokenid}
                  </Typography>
                </Link>
              </Grid>
              <Grid item mr={1}>
                <Typography color="secondary" variant="subtitle1">
                  <FaEthereum size={14} /> 0.05
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
const Collections = () => {
  const { currentAccount, collections } = useContext(ContractContext);
  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item>
          {!currentAccount ? (
            <Typography align="center" variant="h4" color="secondary">
              Please Connect to your Wallet to see the Latest Collections
            </Typography>
          ) : (
            <Typography align="center" variant="h4" color="secondary">
              Latest vjkNFTs minted
            </Typography>
          )}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={10}
        >
          {collections
            .slice(0, 12)
            .reverse()
            .map((collection, i) => (
              <CollectionCard key={i} {...collection} />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Collections;
