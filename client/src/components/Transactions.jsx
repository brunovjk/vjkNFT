import React, { useContext } from "react";
import { ContractContext } from "../context/ContractContext";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Link,
  Chip,
  CardMedia,
} from "@mui/material";
import { shortenAddress } from "../utils/shortenAddress";

const CollectionCard = ({ addressSender, tokenId, vjkNFT, timestamp }) => {
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
          padding: "0.75rem",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          p={2}
        >
          <Grid item>
            <Link
              href={`https://ropsten.etherscan.io/address/${addressSender}`}
              underline="none"
              color="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography color="secondary" variant="subtitle2">
                Owner: {shortenAddress(addressSender)}
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://ropsten.etherscan.io/token/0xaf2D86429BCb819EB40C5E71959c8bE7b48c6808/"
              underline="none"
              color="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography color="secondary" variant="subtitle2">
                Token ID: {tokenId}
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            sx={{
              mt: "1rem",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                backgroundColor: "#fff",
                border: 0,
              }}
              src={vjkNFT}
              alt="vjkNFT"
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: "1rem",
            }}
          >
            <Chip label={timestamp} color="secondary" variant="outlined" />
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
              Latest Collections
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
