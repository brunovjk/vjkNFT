import React from "react";
import { Stack, CircularProgress, Typography } from "@mui/material";

export default function MintLoading({ title }) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h6">{title}</Typography>

      <CircularProgress />
    </Stack>
  );
}
