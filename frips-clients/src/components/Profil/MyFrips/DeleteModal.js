import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../../actions";
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

const DeleteModal = ({ anchorEl, handleClickAway, idItem }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  return (
    <Modal
      open={Boolean(anchorEl)}
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
            Voulez-vous vraiment supprimer votre article ?
          </Typography>
          <Box height={"5vh"} />

          <Box display={"flex"} justifyContent="space-around">
            <Button
              variant="outlined"
              color="primary"
              style={{ fontSize: 13 }}
              onClick={() => {
                dispatch(deleteItem(anchorEl));
                handleClickAway();
              }}
            >
              confirmer
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

export default DeleteModal;
