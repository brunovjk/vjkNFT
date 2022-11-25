import React from "react";
import { Stack, Typography, Button, Link } from "@mui/material";

export default function ShowNFT() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="h6" color="primary">
        Congratulations!
      </Typography>
      <Typography variant="body2" textAlign="center">
        You've just created a unique NFT, maybe we still need some time to get
        your painting on the frame. But don't worry, if you already have our{" "}
        <Link
          target="_blank"
          rel="noopener"
          href="/tutorials#AddYourToken"
          style={{ textDecoration: "none" }}
        >
          token added
        </Link>{" "}
        to your wallet, you can already can check yous IDs.
      </Typography>

      <Button onClick={() => window.location.reload(false)}>Refresh</Button>
    </Stack>
  );
}
