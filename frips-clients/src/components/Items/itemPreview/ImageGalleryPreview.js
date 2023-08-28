import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import API_ENDPOINT from "../../../api/url";
import DialogPreviewProduct from "./DialogProductPreview";
const useStyles = makeStyles((theme) => ({
  floatContentInfomrationdiv: {
    width: "25%",
    height: 565,
  },
  PointCursorPicture: {
    cursor: "pointer",
    height: "100%",
    width: "100%",
    float: "right",
    objectFit: "cover",
    borderRadius: 5,
    "&:hover": {
      background: "transparent",
      cursor: "pointer",
    },
  },
  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    width: "100%",
  },
  GridSytem: {
    display: "grid",
    gridTemplateColumns: "repeat(4,25%)",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },
}));

const gridImage = (images, handleClickOpen, setIndex, classes) => {
  switch (true) {
    case images.length === 2:
      return (
        <Box
          width={"50%"}
          height={"100%"}
          onClick={() => {
            handleClickOpen();
            setIndex(1);
          }}
        >
          <img
            alt={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[1].image}`}
            src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[1].image}`}
            className={classes.PointCursorPicture}
          ></img>
        </Box>
      );
    case images.length === 3:
      return (
        <Box
          width={"50%"}
          height={"100%"}
          display="grid"
          gridTemplateRows="repeat(2,50%)"
        >
          {MapReceivedImage(images, handleClickOpen, setIndex, classes)}
        </Box>
      );
    case images.length === 4:
      return (
        <Box width={"50%"} height={"100%"} display="flex" flexWrap="wrap">
          <Box
            padding={"0.2%"}
            width={"50%"}
            height={"50%"}
            onClick={() => {
              handleClickOpen();
              setIndex(1);
            }}
          >
            <img
              alt={images[1].image}
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[1].image}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 5,
              }}
            ></img>
          </Box>
          <Box
            width={"50%"}
            height={"50%"}
            padding={"0.2%"}
            onClick={() => {
              handleClickOpen();
              setIndex(2);
            }}
          >
            <img
            alt={images[2].image}
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[2].image}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 5,
              }}
            ></img>
          </Box>
          <Box
            width={"100%"}
            height={"50%"}
            padding={"0.2%"}
            onClick={() => {
              handleClickOpen();
              setIndex(3);
            }}
          >
            <img
            alt={images[3].image}
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[3].image}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 5,
              }}
            ></img>
          </Box>
        </Box>
      );

    case images.length >= 5:
      return (
        <Box
          width={"50%"}
          height={"100%"}
          display="grid"
          gridTemplateColumns="repeat(2,50%)"
        >
          {MapReceivedImage(images, handleClickOpen, setIndex, classes)}
        </Box>
      );
  }
};

const MapReceivedImage = (images, handleClickOpen, setIndex, classes) => {
  return images.map((item, index) => {
    if (images.length <= 5) {
      if (index === 0) {
        return null;
      }
      if (index < 4) {
        return (
          <Box
            padding={"0.7%"}
            overflow="hidden"
            onClick={() => {
              handleClickOpen();
              setIndex(index);
            }}
          >
            <img
            alt={images[index].image}
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[index].image}`}
              className={classes.PointCursorPicture}
            ></img>
          </Box>
        );
      } else if (index === 4) {
        return (
          <Box
            padding={"0.7%"}
            overflow="hidden"
            onClick={() => {
              handleClickOpen();
              setIndex(index);
            }}
          >
            <img
            alt={images[index].image}
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[index].image}`}
              className={classes.PointCursorPicture}
            ></img>
          </Box>
        );
      }
    } else {
      if (index === 0) {
        return null;
      }

      if (index < 4) {
        return (
          <Box
            padding={"0.7%"}
            overflow="hidden"
            onClick={() => {
              handleClickOpen();
              setIndex(index);
            }}
          >
            <img
              alt={`/images/${images[0].id_Item}/${images[index].image}`}
              key={`/images/${images[0].id_Item}/${images[index].image}`}
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[index].image}`}
              className={classes.PointCursorPicture}
            ></img>
          </Box>
        );
      } else if (index === 4) {
        return (
          <Box
            overflow="hidden"
            padding={"0.7%"}
            onClick={() => {
              handleClickOpen();
              setIndex(index);
            }}
          >
            <Box
              style={{ backgroundColor: "#000000", borderRadius: 5 }}
              width={"100%"}
              height={"100%"}
              display="flex"
              justifyContent="center"
              position="relative"
              alignItems="center"
            >
              <img
              alt={images[index].image}
                src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[index].image}`}
                className={classes.PointCursorPicture}
                style={{ opacity: 0.6 }}
              ></img>

              <Box position="absolute" style={{ cursor: "pointer" }}>
                <Box display="flex" alignItems="center">
                  <AddIcon style={{ fontSize: 35, color: "white" }}></AddIcon>
                  <Typography style={{ fontSize: 35, color: "white" }}>
                    {images.length - 5}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      } else {
        return null;
      }
    }
  });
};

const ImageGalleryPreview = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  let images = useSelector((state) => state.items.UniqueItem.image);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  if (!images) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <React.Fragment>
      {images.length !== 1 ? (
        <Box width={"50%"} height={"100%"}>
          <Box
            width={"100%"}
            height={"100%"}
            onClick={() => {
              handleClickOpen();
              setIndex(0);
            }}
            paddingRight={"0.7%"}
          >
            <img
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[0].image}`}
              className={classes.PointCursorPicture}
              style={{objectFit:"cover"}}

            ></img>
          </Box>
        </Box>
      ) : (
        <Box width={"100%"} height={"100%"}>
          <Box
            width={"100%"}
            height={"100%"}
            onClick={() => {
              handleClickOpen();
              setIndex(0);
            }}
            paddingRight={"0.7%"}
          >
            <img
              src={`${API_ENDPOINT}/images/${images[0].id_Item}/${images[0].image}`}
              className={classes.PointCursorPicture}
              style={{objectFit:"cover"}}

            ></img>
          </Box>
        </Box>
      )}

      {gridImage(images, handleClickOpen, setIndex, classes)}

      {images ? (
        <DialogPreviewProduct
          open={open}
          images={images}
          handleClose={handleClose}
          index={index}
          setIndex={setIndex}
        />
      ) : null}
    </React.Fragment>
  );
};

export default ImageGalleryPreview;
