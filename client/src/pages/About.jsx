import { Navbar } from "../components";
import { Box } from "@mui/material";

export default function About() {
  return (
    <>
      <Box component="div" className="gradient-bg-welcome">
        <Navbar />
      </Box>
      <Box component="div">About</Box>
    </>
  );
}
