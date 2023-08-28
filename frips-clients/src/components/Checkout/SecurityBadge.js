import React from "react";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Box, Typography } from "@material-ui/core";

const SecurityBadge = () => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      marginRight={3}
    >
      <VerifiedUserIcon style={{ color: "#4AA05F", fontSize: 30 }} />
      <Typography style={{ fontSize: 16 }}>Paiement sécurisé</Typography>
    </Box>
  );
};

export default SecurityBadge;
