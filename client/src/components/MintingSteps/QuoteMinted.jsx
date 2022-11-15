import React from "react";
import { Stack, Link, Typography } from "@mui/material";

export default function QuoteMinted({ tx_hash }) {
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
        <Typography variant="h6">Quote minted!</Typography>
      </Link>
      <Typography variant="body2" textAlign="center">
        We're done with the interview with West. Now let's start painting.
      </Typography>
    </Stack>
  );
}
