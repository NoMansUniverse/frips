import { Box, IconButton, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";

import CloseIcon from "@material-ui/icons/Close";
import API_ENDPOINT from "../../../api/url";

const useStyles = makeStyles((theme) => ({
  Dialog: {
    width: 350,
    height: 500,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      height:"70vh",
      width:"80vw",
      objectFit: "inside",

    },
  },
}));

const DialogPreviewProduct = ({
  open,
  handleClose,
  images,
  index,
  setIndex,
}) => {
  const classes = useStyles();

  if (!images[0].image) {
    return null;
  }

  return (
    <div>
      <Dialog open={open}>
        <Box
          className={classes.Dialog}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box display="flex" position="absolute" right={0} top={0}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: "transparent", color: "black" }}
              onClick={handleClose}
            >
              {" "}
              <CloseIcon color="primary" style={{ fontSize: 32 }} />{" "}
            </IconButton>
          </Box>
          <Box display="flex" height={"50%"} position="absolute" right={0}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => {
                if (index === images.length - 1) {
                  setIndex(0);
                } else {
                  setIndex(index + 1);
                }
              }}
            >
              {" "}
              <NavigateNextIcon />{" "}
            </IconButton>
          </Box>
          <Box display="flex" height={"50%"} position="absolute" left={0}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => {
                if (index === 0) {
                  setIndex(images.length - 1);
                } else {
                  setIndex(index - 1);
                }
              }}
            >
              {" "}
              <NavigateBeforeIcon />{" "}
            </IconButton>
          </Box>

          <img
            alt={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[index].image}`}
            src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[index].image}`}
            className={classes.image}

          ></img>
        </Box>
      </Dialog>
    </div>
  );
};

export default DialogPreviewProduct;
