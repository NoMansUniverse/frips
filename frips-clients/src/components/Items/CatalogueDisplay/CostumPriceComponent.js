import { Box, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

import { useDispatch } from "react-redux";
import { addToFilter } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  BoxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    maxHeight: 100,
    overflow: "auto",
  },
  ItemBox: {
    fontSize: 16,
  },
  FormLittleBox: {
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBox: {
    display: "block",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  checkBox: {
    position: "absolute",
    "&:hover": {
      background: "transparent",
    },
    right: 0,
  },
}));

const CostumPriceComponent = ({ label }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box display="flex" alignItems="center" className={classes.BoxShadow}>
      <Box display="flex" flexDirection="column" padding={1}>
        <Box>
          <Typography style={{ fontSize: 18 }}>De</Typography>
        </Box>
        <Box>
          <TextField
            placeholder="CHF"
            inputProps={{ style: { fontSize: 18 } }}
            onBlur={(e) => {
              if (!isNaN(e.target.value) && e.target.value !== "") {
                dispatch(
                  addToFilter({ value: e.target.value, De: true }, label)
                );
              }
            }}
            onKeyPress={(e) => {
              if (
                !isNaN(e.target.value) &&
                e.target.value !== "" &&
                e.key === "Enter"
              ) {
                dispatch(
                  addToFilter({ value: e.target.value, De: true }, label)
                );
              }
            }}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" padding={1}>
        <Box>
          <Typography style={{ fontSize: 18 }}>À</Typography>
        </Box>
        <Box>
          <TextField
            inputProps={{ style: { fontSize: 18 } }}
            placeholder="CHF"
            onBlur={(e) => {
              if (!isNaN(e.target.value) && e.target.value !== "") {
                dispatch(
                  addToFilter({ value: e.target.value, A: true }, label)
                );
              }
            }}
            onKeyPress={(e) => {
              if (
                !isNaN(e.target.value) &&
                e.target.value !== "" &&
                e.key === "Enter"
              ) {
                dispatch(
                  addToFilter({ value: e.target.value, A: true }, label)
                );
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CostumPriceComponent;
