import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        alignItems="center"
        flexDirection={"column"}
    >
      <Typography style={{ fontSize: 20 }}>
        Erreur 404 il semblerait que cette page n'existe pas
      </Typography>
      <Link to={"/"}>
        <Typography>Retourner au menu</Typography>
      </Link>
    </Box>
  );
};

export default PageNotFound;
