import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      py={2}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
