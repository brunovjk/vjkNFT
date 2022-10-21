import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function Alert(props) {
  const { severity, title, message } = props;
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}
