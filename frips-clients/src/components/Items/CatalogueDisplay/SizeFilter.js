import {
  Box,
  Checkbox,
  IconButton,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import _ from "lodash";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addToFilter, removeToFilter } from "../../../actions";
import { arraySize } from "../staticItems/staticItemName";

const useStyles = makeStyles((theme) => ({
  BoxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    overflow: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  label: {
    backgroundColor: "white",
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemBox: {
    fontSize: 16,
    width: "100%",
    minHeight: 40,
  },
  pointer: {
    cursor: "pointer",
  },
  Arrow: {
    position: "absolute",
    "&:hover": {
      background: "transparent",
    },
    right: 0,
    width: 39,
    height: 39,
  },
  ArrowBackIcon: {
    height: 40,

    "&:hover": {
      background: "transparent",
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

const renderArraySize = (
  classes,
  filter,
  label,
  setNavigation,
  navigationId,
  dispatch
) => {
  return handleArray(navigationId).map((item, index) => {
    console.log(item);
    return (
      <MenuItem
        className={classes.ItemBox}
        onClick={() => {
          if ((item.type && index === 0) || (item.type && index === 1)) {
            setNavigation(index);
          } else {
            if (Boolean(navigationId === 0)) {
              if (_.find(filter["Catalogue"], { Name: "Homme", id: 104 })) {
                dispatch(removeToFilter({ Name: "Homme", id: 104 }));
                dispatch(addToFilter({ Name: "Femme", id: 1 }, "Catalogue"));
              } else if(!_.find(filter["Catalogue"], { Name: "Femme", id: 1 })) {
                dispatch(addToFilter({ Name: "Femme", id: 1 }, "Catalogue"));
              }
            } else if (Boolean(navigationId === 1)) {
              if (_.find(filter["Catalogue"], { Name: "Femme", id: 1 })) {
                dispatch(removeToFilter({ Name: "Femme", id: 1 }));
                dispatch(addToFilter({ Name: "Homme", id: 104 }, "Catalogue"));
              } else if(!_.find(filter["Catalogue"], { Name: "Homme", id: 104})) {
                dispatch(addToFilter({ Name: "Homme", id: 104}, "Catalogue"));
              }
            }
            if (_.includes(filter[label], item)) {
              dispatch(removeToFilter(item));
            } else {
              dispatch(addToFilter(item, label));
            }
          }
        }}
      >
        <Typography style={{ fontSize: 18 }}>{item.Name}</Typography>
        {!item.type ? (
          <Checkbox
            className={classes.checkBox}
            style={{ backgroundColor: "transparent" }}
            checked={_.includes(filter[label], item)}
            color="primary"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          ></Checkbox>
        ) : (
          <IconButton
            className={classes.Arrow}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            <ChevronRightIcon style={{ fontSize: 25 }} />
          </IconButton>
        )}
      </MenuItem>
    );
  });
};

const handleArray = (selectIndex) => {
  if (selectIndex === 0 || selectIndex === 1) {
    const subArray = [];
    arraySize[selectIndex].subitems.map((subItem, indexSub) => {
      subItem.subitems.map((itemToPush) => {
        subArray.push(itemToPush);
      });
    });
    return subArray;
  } else {
    return arraySize;
  }
};

const SizeFilter = ({ filter, label }) => {
  const [navigationId, setNavigation] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box className={classes.BoxShadow}>
      {navigationId === 0 || navigationId === 1 ? (
        <Box className={classes.label}>
          <IconButton
            onClick={() => {
              setNavigation(null);
            }}
            style={{ justifySelf: "flex-start", display: "flex" }}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography style={{ fontSize: 18 }}>
            {arraySize[navigationId].Name}
          </Typography>
        </Box>
      ) : null}
      {renderArraySize(
        classes,
        filter,
        label,
        setNavigation,
        navigationId,
        dispatch
      )}
    </Box>
  );
};

export default SizeFilter;
