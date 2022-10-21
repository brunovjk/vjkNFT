import { Navbar, Welcome, Transactions } from "../components";
import { Box } from "@mui/material";
function Home() {
  return (
    <>
      <Box component="div" className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </Box>
      <Box
        component="div"
        className="gradient-bg-services"
        sx={{
          height: "250px",
        }}
      ></Box>
      <Box component="div" className="gradient-bg-transactions">
        <Transactions />
      </Box>
    </>
  );
}

export default Home;
