import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ContractContext } from "../context/ContractContext";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Link,
  CardMedia,
  Stack,
  CircularProgress,
} from "@mui/material";
import { shortenAddress } from "../utils/shortenAddress";
import { VjkNFT_address } from "../utils/constants";
import { Buffer } from "buffer";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";

const { ethereum } = window;

const CollectionCard = ({ tokenid, addresssender, uri64, mintPrice }) => {
  const [uri, setUri] = useState({
    name: "Minting",
    description: "Interviewing",
    image: "Paiting",
  });

  useEffect(() => {
    const splitedURI = uri64?.split("data:application/json;base64,")[1];

    if (splitedURI !== undefined) {
      const decodeBase64Uri = JSON.parse(
        Buffer.from(splitedURI, "base64").toString("utf-8")
      );
      setUri(decodeBase64Uri);
    } else {
      setUri({
        name: "Framing",
        description: "Framing your paint",
        image:
          "https://media.istockphoto.com/id/917220700/vector/picture-frame-graphic-black-white-isolated-sketch-set-illustration-vector.jpg?s=612x612&w=0&k=20&c=LQLiD1y6nH_IIuM58L4fAi0G5s6_T3Y2X1Vr9hlolQc=",
      });
    }
  }, [uri64]);

  const price = ethers.utils.formatEther(mintPrice.toString());

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
              {uri.name}
            </Typography>
          </Grid>
          <Grid item my={2}>
            <NavLink
              to={linkTokenId}
              state={{
                addresssender: { addresssender },
                tokenid: { tokenid },
                price: { price },
                nameNFT: uri.name,
                descriptionNFT: uri.description,
                vjkNFT: uri.image,
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
                src={uri.image}
                alt={uri.image}
              />
            </NavLink>
          </Grid>
          <Grid item>
            <Link
              href={`https://goerli.etherscan.io/address/${addresssender}`}
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
                  href={`https://goerli.etherscan.io/token/${VjkNFT_address}`}
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
                  <FaEthereum size={14} /> {price}
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
  const { collections } = useContext(ContractContext);
  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item>
          {collections.length > 0 ? (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography align="center" variant="h4" color="secondary">
                Latest VjkNFTs minted
              </Typography>
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
            </Stack>
          ) : (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography align="center" variant="h4" color="secondary">
                Please wait, loading Latest VjkNFTs minted.
              </Typography>
              <CircularProgress />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Collections;
