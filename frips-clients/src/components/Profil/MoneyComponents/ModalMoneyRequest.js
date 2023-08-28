import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/api";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: "pointer",
    fontSize: "1.8em",
  },
  BoxItem: (props) => ({
    "&:hover": {
      background: props.hoverColor,
    },
  }),
  Typography: {
    fontWeight: 500,
    fontSize: 18,
  },
  IconColor: {
    position: "absolute",
    right: 10,
  },
  Dialog: {
    overflow: "hidden",
    width: 600,
  },
  GridSytem: {
    display: "grid",
    padding: 1,
    overflow: "auto",
    gridTemplateColumns: "repeat(3,33%)",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },

  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    width: "60vh",
    margin: "auto",
    borderRadius: 6,
  },
}));

const displayStatusButton = (error, loading) => {
  if (!Boolean(error) && loading) {
    return <CircularProgress size={28} />;
  } else if (Boolean(error) && !loading) {
    return (
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 14, color: "black" }}>
          Oups il semblerait que vous ayez déjà soumis une demande
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 14, color: "black" }}>
          Confirmer
        </Typography>
      </Box>
    );
  }
};

const ModalMoneyRequest = ({ open, handleClickAway, IBAN }) => {
  const classes = useStyles();
  const [error, Seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    if (!Boolean(IBAN)) {
      history("/member/register/Seller");
    }
  }, [IBAN]);
  return (
    <Modal
      open={Boolean(open)}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-labelledby="simple-modal-price"
      aria-describedby="simple-modal-price"
    >
      <Box className={classes.BoxOneItem}>
        <Box display={"flex"} flexDirection="column" padding={3}>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            position={"relative"}
          >
            <Box display={"flex"} position="absolute" right={0}>
              <CloseIcon
                className={classes.pointer}
                onClick={handleClickAway}
              />
            </Box>
          </Box>
          <Box height={"5vh"} />
          <Typography style={{ fontSize: 18 }}>
            Le paiement prendra quelques jours
          </Typography>
          <Box height={"5vh"} />

          <Box display={"flex"} justifyContent="space-around">
            <Button
              variant="outlined"
              color="primary"
              disabled={error && !loading}
              style={{ fontSize: 13, maxWidth: "50%" }}
              onClick={async () => {
                try {
                  setLoading(true);
                  await axiosInstance.post(`/api/members/RequestPayment`);
                  setLoading(false);
                } catch (error) {
                  Seterror(error.response.data);
                  setLoading(false);
                }
              }}
            >
              {displayStatusButton(error, loading)}
            </Button>

            <Button
              style={{ backgroundColor: "rgba(242, 38, 19,0.5)", fontSize: 13 }}
              variant="outlined"
              onClick={handleClickAway}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalMoneyRequest;
