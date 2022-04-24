import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#a3b3ff",
      main: "#2c58cb",
      dark: "#000097",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
    },
    additional: {
      main: "#273359",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          height: "40px",
          borderRadius: "20px",
          paddingRight: "24px",
          paddingLeft: "24px",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "40px",
          color: "#fff",
          borderRadius: "16px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgb(255,255,255,0.3)",
          fontSize: "12px",
          lineHeight: "12px",
          fontWeight: "300",
          verticalAlign: "middle",
        },
      },
    },
  },
});
