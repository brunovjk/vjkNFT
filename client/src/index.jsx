import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./assets/theme";
import "./index.css";
import App from "./App";
import { VjkNFTContractProvider } from "./context/ContractContext";

ReactDOM.render(
  <VjkNFTContractProvider>
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </VjkNFTContractProvider>,
  document.getElementById("root")
);
