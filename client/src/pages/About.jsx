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

export default function About(props) {
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
                    <Link href="#WhatIsIt" style={{ textDecoration: "none" }}>
                      <Typography variant="subtitle2" color="black">
                        What Is It?
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#WhyIsIt" style={{ textDecoration: "none" }}>
                      <Typography variant="subtitle2" color="black">
                        Why Is It?
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#ArtCollectorsconsiderations"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="black">
                        Art Collectors considerations
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
              <Typography variant="h3" id="WhatIsIt" mb={6}>
                What Is It?
              </Typography>
              <Typography variant="body1" mb={2}>
                vjkNFT is a dApp developed by Bruno Rocha. Our application
                consists of a Smart Contract and a React App to interact with
                the blockchain, where this contract is deployed.
              </Typography>
              <Typography variant="body1" mb={2}>
                Our Contract follows the Token Standard ERC721, with extensions:
                ERC721Enumerable, ERC721URIStorage. Responsible for recording
                data on the Blockchain, the contract contains this data together
                with the collector's address and a Token ID generated at the
                time of writing.
              </Typography>
              <Typography variant="body1" mb={2}>
                At mint step, our application generates an SVG painting and some
                characteristics for that frame, such as: Name, Author, Date,
                Place and Inspiration for the painting.
              </Typography>
              <Typography variant="body1" mb={2}>
                Our complete code, as well as the Design System can be seen
                through Github and Figma respectively:
              </Typography>

              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://github.com/brunovjk/vjkNFT/"
              >
                <Typography variant="body1" my={1}>
                  Github repository;
                </Typography>
              </Link>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://www.figma.com/file/DB8f3OTyHk1KplkRbrkGSC/vjkNFT"
              >
                <Typography variant="body1" my={1} mb={6}>
                  Figma Design System.
                </Typography>
              </Link>
              <Divider />
              <Typography variant="h3" id="WhyIsIt" my={6}>
                Why Is It?
              </Typography>
              <Typography variant="body1" mb={2}>
                This project is part of the brunovjk Portfolio. This application
                was created to demonstrate knowledge of interaction and creation
                on Blockchain.
              </Typography>
              <Typography variant="body1" mb={2}>
                To see the complete portfolio, visit:
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
                href="https://brunovjk.com/"
              >
                <Typography variant="body1" my={1}>
                  brunovjk.com
                </Typography>
              </Link>

              <Divider />
              <Typography variant="h3" id="ArtCollectorsconsiderations" my={6}>
                Art Collectors considerations
              </Typography>
              <Typography variant="body1" mt={2} mb={2}>
                Our collection follows some of the newest Good Practices and
                Safety standards. However, it is still a model application, in
                order to demonstrate the developer's skills. If you are thinking
                of purchasing one of our parts, go ahead, but we do not offer
                any warranty or insurance.
              </Typography>
              <Typography variant="body1" mb={2}>
                Please feel free to contact us (brunovjk@brunovjk.com) if you
                notice anything wrong or unsafe in our application.
              </Typography>
              <Typography variant="body1" mb={2}>
                Thank you for understanding.
              </Typography>
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
