import React from "react";
import { Stack, Link, Typography } from "@mui/material";

export default function PaintMinted({ tx_hash }) {
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
        <Typography variant="h6">Paint minted!</Typography>
      </Link>
      <Typography variant="body2" textAlign="center">
        Phew, we're done with the ink. Now all that needs to be put together.
      </Typography>
    </Stack>
  );
}
