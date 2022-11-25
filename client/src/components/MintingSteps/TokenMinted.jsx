import React from "react";
import { Stack, Typography, Link } from "@mui/material";

export default function TokenMinted({ tx_hash }) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Link
        href={`https://goerli.etherscan.io/tx/${tx_hash}`}
        underline="none"
        color="primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="h6">Token minted!</Typography>
      </Link>
      <Typography variant="body2" textAlign="center">
        You can close this window at any time, the creation of your art can no
        longer be stopped.
      </Typography>
    </Stack>
  );
}
