import { createTheme } from "@material-ui/core";
import "typeface-lobster";

export default createTheme({
  palette: {
    primary: {
      main: "#82A0C2",
    },
  },

  shadows: ["none"],

  typography: {
    fontFamily: ["Helvetica", "Lobster","Arial", "sans-serif"].join(","),
  },
});
