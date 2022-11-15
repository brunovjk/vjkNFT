import React, { useState, useEffect, useContext } from "react";
import { Stack, Box, Modal, Paper } from "@mui/material";
import { ContractContext } from "../context/ContractContext";
import {
  MintStepper,
  MintButton,
  MintLoading,
  TokenMinted,
  QuoteMinted,
  PaintMinted,
  ShowNFT,
} from "./MintingSteps";

const style = {
  paper: {
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function MintingModal({ openMintModal, setOpenMintModal }) {
  const { mintSteps } = useContext(ContractContext);
  const handleClose = () => setOpenMintModal(false);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (mintSteps.minting) {
      setTabValue(1);
    } else if (mintSteps.interviewing) {
      setTabValue(2);
      setTimeout(() => {
        setTabValue(3);
      }, 3000);
    } else if (mintSteps.painting) {
      setTabValue(4);
      setTimeout(() => {
        setTabValue(5);
      }, 3000);
    } else if (mintSteps.creating) {
      setTabValue(6);
      setTimeout(() => {
        setTabValue(7);
      }, 3000);
    } else if (mintSteps.created) {
      setTabValue(8);
    } else {
      setTabValue(0);
    }
  }, [mintSteps]);

  return (
    <div>
      <Modal
        open={openMintModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style.paper}>
          <MintStepper activeStep={Math.floor(tabValue / 2)} />
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: 220, sm: 280 },
                height: 280,
              }}
            >
              <TabPanel value={tabValue} index={0}>
                <MintButton />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <MintLoading title="Minting token..." />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <TokenMinted hash={mintSteps.tx_hash} />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <MintLoading title="Interviewing Kanye..." />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <QuoteMinted hash={mintSteps.tx_hash} />
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <MintLoading title="Painting..." />
              </TabPanel>
              <TabPanel value={tabValue} index={6}>
                <PaintMinted hash={mintSteps.tx_hash} />
              </TabPanel>
              <TabPanel value={tabValue} index={7}>
                <MintLoading title="Putting it all together..." />
              </TabPanel>
              <TabPanel value={tabValue} index={8}>
                <ShowNFT />
              </TabPanel>
            </Paper>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}
