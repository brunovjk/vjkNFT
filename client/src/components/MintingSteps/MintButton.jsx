import React, { useContext } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { ethers } from "ethers";

import { ContractContext } from "../../context/ContractContext";

export default function MintButton() {
  const { createVjkNFT, gasToMint, priceToMint } = useContext(ContractContext);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h6">Mint your Art</Typography>
      <Typography variant="body2" textAlign="center">
        Mint price: {priceToMint}
        <br />
        Min gas used: {ethers.utils.formatUnits(gasToMint, 9)}
      </Typography>
      <Button onClick={createVjkNFT}>_mint</Button>
    </Stack>
  );
}
