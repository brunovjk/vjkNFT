import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function MintStepper({ activeStep }) {
  return (
    <Box sx={{ marginRight: 2 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {Array.from(Array(4).keys()).map((index) => (
          <Step key={index}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
