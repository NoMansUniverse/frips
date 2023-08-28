import { Box, Chip, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToFilter } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: 14,
  },
}));

const renderChips = (filterType, classes, dispatch) => {
  if (!filterType) return;

  return filterType.map((value, index) => {
    if (value?.De) {
      return (
        <Chip
          style={{ fontSize: 16 }}
          label={`De ${value?.value} CHF`}
          className={classes.chip}
          onDelete={() => {
            dispatch(removeToFilter(value));
          }}
        />
      );
    }
    if (value?.A) {
      return (
        <Chip
          style={{ fontSize: 16 }}
          label={`A ${value?.value} CHF`}
          className={classes.chip}
          onDelete={() => {
            dispatch(removeToFilter(value));
          }}
        />
      );
    } else {
      return (
        <Chip
          style={{ fontSize: 16 }}
          label={value?.Name}
          className={classes.chip}
          onDelete={() => {
            dispatch(removeToFilter(value));
          }}
        />
      );
    }
  });
};

const RenderChipsComponents = () => {
  const Chips = useSelector((state) => state.filterCatalogue.Chips);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      width="100%"
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {renderChips(Chips, classes, dispatch)}
    </Box>
  );
};

export default RenderChipsComponents;
