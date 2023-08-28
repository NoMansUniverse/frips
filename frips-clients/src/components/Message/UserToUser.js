import { Box, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  FormLittleBox: {
    display: "flex",
    flexWrap: "wrap",
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBox: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      fontSize: 16,
      padding: 5,
    },
  },
  MenuSetting: {
    height: 65,
    width: "100%",
    display: "flex",
    position: "relative",
  },
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    padding: 30,
    margin: "auto",
    position: "relative",
  },
  Spacer: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "column",
  },
  Header: {
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  Dialog: {
    width: 400,
    height: 600,
    [theme.breakpoints.down("sm")]: {
      height: 500,
      width: "auto",
    },
  },
  formContainer: {
    boxSizing: "border-box",
    width: 1000,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
}));



const UserToUser = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();


  return (
    <Box height="100vh" style={{ backgroundColor: "#F5f5f3" }}>
      <Box height="10vh" />
      <Box className={classes.formContainer}></Box>
    </Box>
  );
};

export default UserToUser;
