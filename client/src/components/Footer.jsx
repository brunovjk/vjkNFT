import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";

import logo from "../images/logo.svg";
import { ContractContext } from "../context/ContractContext";

const Footer = () => {
  const { connectWallet, currentAccount } = useContext(ContractContext);

  return (
    <Box component="div" className="gradient-bg-footer">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        sx={{
          p: "3rem",
        }}
      >
        <Grid
          container
          direction={{ xs: "column", sm: "row " }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
        >
          <Grid item>
            <NavLink to="/">
              <Box
                component="img"
                sx={{
                  width: { xs: "8rem", md: "10rem" },
                  cursor: "pointer",
                }}
                src={logo}
                alt="logo"
              />
            </NavLink>
          </Grid>
          <Grid item>
            <Grid
              container
              direction={{ xs: "column", sm: "row " }}
              justifyContent={{ xs: "center", sm: "flex-end " }}
              alignItems="center"
              spacing={{ xs: 2, sm: 6 }}
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
                    variant="outlined"
                    sx={{
                      width: "12rem",
                      height: "30px",
                    }}
                    color="secondary"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: "1rem",
              }}
            >
              <Grid item>
                <Typography variant="caption" color="secondary">
                  Contact me
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  mt: "-0.5rem",
                }}
              >
                <Typography variant="caption" color="secondary">
                  brunovjk@brunovjk.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            pt: "1rem",
          }}
        >
          <Divider
            color="lightgray"
            sx={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="caption" color="secondary">
              @brunovjk 2022
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" color="secondary">
              All rights reserverd
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
