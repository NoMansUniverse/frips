import {
  Box,
  Divider,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ModalAdress from "../Profil/ModalAdress";

const useStyles = makeStyles((theme) => ({
  MenuSetting: {
    height: 50,
  },

  Header: {
    fontSize: 18,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  Dialog: {
    width: 350,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: 15,

    [theme.breakpoints.down("sm")]: {
      height: "80vh",
      width: "auto",
      padding: 5,
    },
  },
}));
const Adress = ({ addresse }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!addresse?.address) {
    return (
      <React.Fragment>
        <MenuItem
          onClick={() => {
            handleClickOpen();
          }}
          style={{ width: "100%", padding: 0, height: 50 }}
        >
          <Box flexGrow={1}>Ajouter votre adresse de livraison</Box>
          <Box>
            <AddIcon style={{ fontSize: 30 }} />
          </Box>
        </MenuItem>
        <ModalAdress
          open={open}
          handleClose={handleClose}
          address={addresse?.address}
          Firstname={""}
          Lastname={""}
          classes={classes}
        />
      </React.Fragment>
    );
  } else {
    const { Firstname, Lastname } = addresse;
    const { City, NPA, Street, NumStreet } = addresse?.address;
    return (
      <Box display={"flex"} flexDirection="column" flexGrow={1}>
        <Typography
          style={{ fontSize: 16 }}
        >{`${Firstname} ${Lastname}`}</Typography>
        <Typography
          style={{ fontSize: 16 }}
        >{`${Street} ${NumStreet}`}</Typography>
        <Typography style={{ fontSize: 16 }}>{`${City} ${NPA}`}</Typography>
        <Divider />

        <MenuItem
          style={{ width: "100%", padding: 0, height: 50 }}
          onClick={() => {
            handleClickOpen();
          }}
        >
          <Box flexGrow={1}>
            <Typography style={{ fontSize: 16 }}>
              Changer votre adresse de livraison ?
            </Typography>
          </Box>
          <Box>
            <AddIcon style={{ fontSize: 30 }} />
          </Box>
        </MenuItem>
      </Box>
    );
  }
};

export default Adress;
