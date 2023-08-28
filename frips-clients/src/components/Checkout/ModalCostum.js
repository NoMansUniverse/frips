import { Box, CircularProgress, Modal, Typography } from "@material-ui/core";
import React from "react";

const ModalCostum = ({ open, successed }) => {
  return (
    <Modal
      open={open}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      aria-labelledby="simple-modal-payment"
      aria-describedby="simple-modal-payment"
    >
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        <CircularProgress size={100} />
        <Typography style={{ fontSize: 20 }}>
          Transaction en cours de vérification
        </Typography>
        <Typography style={{ fontSize: 10 }}>veuillez patienter</Typography>
      </Box>
    </Modal>
  );
};

export default ModalCostum;
