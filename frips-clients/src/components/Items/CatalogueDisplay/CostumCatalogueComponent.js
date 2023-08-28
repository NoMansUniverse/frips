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
import { Catalogue } from "../staticItems/staticItemName";
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
    position: "absolute",
    left: 0,
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

const navigation = (depth, navigationValue) => {
  switch (depth) {
    case 1:
    case 2:
    case 3:
    case 4:
      return navigationValue[depth].subitems;
    default:
      return navigationValue[0];
  }
};
const CostumCatalogueComponent = ({ label, filter,close }) => {
  const classes = useStyles();
  const [navigationValue, setNavigationValue] = useState([Catalogue]);
  const [depth, setDepth] = useState(0);
  const dispatch = useDispatch();

  return (
    <Box className={classes.BoxShadow}>
      {depth !== 0 || navigationValue.length !== 1 ? (
        <Box className={classes.label}>
          <IconButton
            onClick={() => {
              setDepth(depth - 1);
              setNavigationValue(_.dropRight(navigationValue));
            }}
            className={classes.ArrowBackIcon}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography style={{ fontSize: 18 }}>
            {navigationValue[depth].Name}
          </Typography>
        </Box>
      ) : null}
      {depth !== 0 ? (
        <MenuItem
          className={classes.ItemBox}
          onClick={() => {
            if (
              Boolean(
                _.find(filter["Catalogue"], {
                  id: navigationValue[depth].id,
                  Name: navigationValue[depth].Name,
                })
              )
            ) {
              dispatch(
                removeToFilter({
                  id: navigationValue[depth].id,
                  Name: navigationValue[depth].Name,
                })
              );
            } else {
              dispatch(
                addToFilter(
                  {
                    id: navigationValue[depth].id,
                    Name: navigationValue[depth].Name,
                  },
                  "Catalogue"
                )
              );
              close()

            }
          }}
        >
          <Typography style={{ fontSize: 18 }}>Tous</Typography>
          <Checkbox
            className={classes.checkBox}
            style={{ backgroundColor: "transparent" }}
            checked={Boolean(
              _.find(filter[label], {
                id: navigationValue[depth].id,
                Name: navigationValue[depth].Name,
              })
            )}
            color="primary"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          ></Checkbox>
        </MenuItem>
      ) : null}
      {navigation(depth, navigationValue).map((item, index) => {
        return (
          <MenuItem
            className={classes.ItemBox}
            onClick={() => {
              if (item.type) {
                if (depth === 0) {
                  setNavigationValue([
                    ...navigationValue,
                    navigationValue[depth][index],
                  ]);
                } else {
                  setNavigationValue([
                    ...navigationValue,
                    navigationValue[depth].subitems[index],
                  ]);
                }

                setDepth(depth + 1);
              } else {
                if (_.includes(filter[label], item)) {
                  dispatch(removeToFilter(item));
                } else {
                  dispatch(addToFilter(item, label));
                }
                setDepth(0);
                setNavigationValue([Catalogue]);
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
                {" "}
                <ChevronRightIcon style={{ fontSize: 25 }} />{" "}
              </IconButton>
            )}
          </MenuItem>
        );
      })}
    </Box>
  );
};

export default CostumCatalogueComponent;
