import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../images/logo.svg";
import { FaWallet } from "react-icons/fa";
import { ContractContext } from "../context/ContractContext";

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(ContractContext);
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{
        p: { xs: "1rem", md: "2rem" },
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <NavLink to="/">
            <Box
              component="img"
              sx={{
                width: { xs: "8rem", md: "12rem" },
                cursor: "pointer",
              }}
              src={logo}
              alt="logo"
            />
          </NavLink>
        </Box>
        <Box>
          <Grid
            container
            direction={{ xs: "column", sm: "row " }}
            justifyContent="flex-end"
            alignItems="center"
            spacing={{ xs: 1, sm: 6 }}
            p={{ xs: 1, sm: 0 }}
          >
            <Grid item>
              <NavLink to="/about" style={{ textDecoration: "none" }}>
                <Typography color="secondary" variant="subtitle2">
                  About
                </Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/interactions" style={{ textDecoration: "none" }}>
                <Typography color="secondary" variant="subtitle2">
                  Interactions
                </Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/tutorials" style={{ textDecoration: "none" }}>
                <Typography color="secondary" variant="subtitle2">
                  Tutorials
                </Typography>
              </NavLink>
            </Grid>
            {!currentAccount && (
              <Grid item>
                <Button
                  sx={{
                    display: { xs: "none", md: "block" },
                  }}
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>

                <IconButton
                  size="large"
                  aria-label="wallet"
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                  color="secondary"
                  onClick={connectWallet}
                >
                  <FaWallet />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
