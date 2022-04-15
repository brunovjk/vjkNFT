import React, { useContext } from "react";
import { Navbar } from "../components";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Container,
  Link,
  Fab,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ContractContext } from "../context/ContractContext";

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box component="div" onClick={handleClick}>
        {children}
      </Box>
    </Zoom>
  );
}

export default function Tutorials(props) {
  const { currentAccount } = useContext(ContractContext);
  return (
    <>
      <Box
        component="div"
        className="gradient-bg-welcome"
        id="back-to-top-anchor"
      >
        <Navbar />
      </Box>
      <Container maxWidth="xl">
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={2}>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="stretch"
              sx={{ height: "100%" }}
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                  mt={{ xs: 0, md: 4 }}
                  p={2}
                >
                  <Grid item>
                    <Link
                      href="#GettingStarted"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="black">
                        Getting Started
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#RopstenTestnet"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="black">
                        Ropsten Testnet
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#WalletMetamask"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="black">
                        Metamask Wallet
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#WalletCoinbase"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="black">
                        Coinbase Wallet
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#WalletMyEther"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="black">
                        MyEther Wallet
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item my={{ xs: 3, md: 0 }}>
                <Divider
                  orientation="horizontal"
                  sx={{
                    display: { xs: "block", sm: "none" },
                  }}
                />
                <Divider
                  orientation="vertical"
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} p={{ xs: 1, md: 10 }}>
            <Box component="div">
              <Typography variant="h3" id="GettingStarted" mb={6}>
                Getting Started
              </Typography>
              <Typography variant="body1" mb={2}>
                Cryptocurrencies, such as Bitcoin and Ethereum, have established
                themselves as a recognized asset class with deep liquidity and a
                diverse investor base.
                <br /> However, unlike traditional assets like stocks and bonds,
                you can’t store your cryptocurrency assets on an online
                brokerage account.
                <br /> Instead, you need to store your digital assets in a
                dedicated cryptocurrency wallet.
                <br />
                Cryptocurrency Software Wallets enable crypto holders to
                securely store their digital currencies and tokens in one place.
              </Typography>
              <Typography variant="body1" mb={2}>
                In order to interact with our application you need a
                Cryptocurrency Software Wallets browser extension installed.
                <br />
                Here a list of most popular Cryptocurrency Software:
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://metamask.io/"
              >
                <Typography variant="body1" my={1}>
                  Metamask Wallet;
                </Typography>
              </Link>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://www.coinbase.com/wallet"
              >
                <Typography variant="body1" my={1}>
                  Coinbase Wallet;
                </Typography>
              </Link>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://www.myetherwallet.com/"
              >
                <Typography variant="body1" my={1} mb={6}>
                  MyEther Wallet.
                </Typography>
              </Link>
              <Divider />
              <Typography variant="h3" id="RopstenTestnet" my={6}>
                Ropsten Testnet
              </Typography>
              <Typography variant="body1" mb={4}>
                We deployed this project at Ropsten Ethereum, also known as
                “Ethereum Testnet”, are as the name implies, a testing network
                that runs the same protocol as Ethereum does and is used to
                testing purposes before deploying on the main network (Mainnet).
              </Typography>
              <Typography variant="body1" mb={2}>
                A faucet is where you can acquire free [testnet] ETH to use in
                our application. Below are some faucet links to get Ropsten
                ETHs:
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://faucet.metamask.io/"
              >
                <Typography variant="body1" my={1}>
                  https://faucet.metamask.io/
                </Typography>
              </Link>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://faucet.egorfine.com/"
              >
                <Typography variant="body1" my={1}>
                  https://faucet.egorfine.com/
                </Typography>
              </Link>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://faucet.dimensions.network/"
              >
                <Typography variant="body1" my={1} mb={6}>
                  https://faucet.dimensions.network/
                </Typography>
              </Link>

              <Divider />
              <Typography variant="h3" id="WalletMetamask" my={6}>
                Metamask Wallet
              </Typography>
              <Typography variant="body1" mb={3}>
                MetaMask is a global community of developers and designers
                dedicated to making the world a better place with blockchain
                technology. Their mission is to democratize access to the
                decentralized web, and through this mission, to transform the
                internet and world economy to one that empowers individuals
                through interactions based on consent, privacy, and free
                association.
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              >
                <Typography variant="body1" my={1} mb={6}>
                  Install MetaMask for your browser
                </Typography>
              </Link>
              <Divider />
              <Typography variant="h3" id="WalletCoinbase" my={6}>
                Coinbase Wallet
              </Typography>
              <Typography variant="body1" mb={3}>
                The financial institution for a digital asset future. Coinbase
                Institutional is the first choice for sophisticated investors
                and institutions that want to invest in digital assets
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad"
              >
                <Typography variant="body1" my={1} mb={6}>
                  Coinbase Wallet extension
                </Typography>
                <Divider />
              </Link>
              <Typography variant="h3" id="WalletMyEther" my={6}>
                MyEther Wallet
              </Typography>
              <Typography variant="body1" mb={3}>
                MEW (MyEtherWallet) is a free, client-side interface helping you
                interact with the Ethereum blockchain. Our easy-to-use,
                open-source platform allows you to generate wallets, interact
                with smart contracts, and so much more.{" "}
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://chrome.google.com/webstore/detail/mew-cx/nlbmnnijcnlegkjjpcfjclmcfggfefdm"
              >
                <Typography variant="body1" my={1} mb={6}>
                  MyEtherWallet extension
                </Typography>
              </Link>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <ScrollTop {...props}>
                {!currentAccount ? (
                  <Fab
                    color="primary"
                    size="small"
                    aria-label="scroll back to top"
                  >
                    <KeyboardArrowUpIcon color="secondary" />
                  </Fab>
                ) : (
                  <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top"
                  >
                    <KeyboardArrowUpIcon color="black" />
                  </Fab>
                )}
              </ScrollTop>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
