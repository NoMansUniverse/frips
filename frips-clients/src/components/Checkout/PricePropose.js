import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { sendMessage } from "../../actions";
import axiosInstance from "../../api/api";



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
    width: 400,
    margin: "auto",
    borderRadius: 6,
  },
}));

const loadingSendProposition = (succeed, loading) => {
  if (loading) {
    return <CircularProgress size={28} />;
  }
  if (succeed === 1) {
    return <DoneIcon />;
  }
  if (succeed === 2) {
    return (
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 14, color: "black" }}>
          Oups il semblerait que vous ayez déjà soumis une offre
        </Typography>
      </Box>
    );
  } else {
    return <Typography style={{ fontSize: 14 }}>Faire une offre</Typography>;
  }
};

const displayColor = (succeed, loading) => {
  if (succeed === 0) {
    return "#82A0C2";
  }
  if (succeed === 1) {
    return "green";
  }
  if (succeed === 2) {
    return "red";
  }
};

const PricePropose = ({
  item,
  anchorEl,
  imageSender,
  Profile,
  Pseudo,
  userId,
  id_Receiver,
  chat_id,
  error,
  itemId,
  handleClickAway,
  itemPrice,
  socket,
}) => {
  const classes = useStyles();
  const [Price, setPrice] = useState("");
  const [succeed, SetSucceed] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const sendProposition = async (Price, idItem) => {
    try {
      setLoading(true);
      const succeed = await axiosInstance.post("/api/items/proposition", {
        Price: Price,
        idItem: idItem,
      });

      if (succeed) {
        SetSucceed(1);
        setLoading(false);

        setTimeout(() => {
          handleClickAway();
        }, 2000);
      }
    } catch (error) {
      setLoading(false);

      SetSucceed(2);
      setTimeout(() => {
        handleClickAway();
      }, 4000);
    }
  };

  return (
    <Modal
      open={anchorEl}
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
        <Box display={"flex"} flexDirection="column" padding={2}>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            position={"relative"}
          >
            <Typography style={{ fontSize: 18 }}>Faire une offre</Typography>
            <Box display={"flex"} position="absolute" right={0}>
              <CloseIcon
                className={classes.pointer}
                onClick={handleClickAway}
              />
            </Box>
          </Box>
          <Box height={10} />

          <TextField
            placeholder={`${itemPrice} CHF`}
            value={Price}
            disabled={succeed === 2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {Price ? "CHF" : null}
                </InputAdornment>
              ),
              max: 10,
              style: {
                width: "100%",
                fontSize: 18,
              },
            }}
            onChange={handleChange}
            fullWidth
          />
          <Box height={10} />
          <Button
            style={{
              width: "100%",
              marginTop: 5,
              backgroundColor: displayColor(succeed),
            }}
            variant="contained"
            disabled={loading || error}
            onClick={async () => {
              if (item) {
                if (socket?.connected) {
                  setLoading(true);
                  const data = {
                    Message: "",
                    id_Sender: userId,
                    id_Receiver: id_Receiver(Profile, userId),
                    id: chat_id,
                    Profile: [
                      Profile.Profile2.ProfileNumber,
                      Profile.Profile1.ProfileNumber,
                    ],
                    date: new Date(),
                    item,
                    Price,
                    imageSender: imageSender?.image ? imageSender : null,
                    Pseudo: Pseudo,
                  };
                  dispatch(
                    sendMessage(
                      "",
                      chat_id,
                      id_Receiver(Profile, userId),
                      userId,
                      item,
                      Price,
                      data,
                      socket
                    )
                  );
                  setLoading(false);
                  handleClickAway();
                }
              } else {
                sendProposition(Price, itemId);
              }
            }}
          >
            {!error ? loadingSendProposition(succeed, loading) : null}
            {error ? (
              <Typography style={{ fontSize: 16 }}>{error}</Typography>
            ) : null}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  error: state.messageReducer.error,
});

export default connect(mapStateToProps)(PricePropose);
