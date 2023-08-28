import {
  Box,
  Checkbox,
  ClickAwayListener, MenuItem,
  Popper,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { addFilterFrips } from "../../../actions";

import _ from "lodash";
import { useDispatch } from "react-redux";

const filterArrayItems = [
  [
    { Name: "Nombre de vue", id: 0 },
    { Name: "Nombre de j'aime", id: 1 },
    { Name: "Meilleure offre", id: 2 },
    { Name: "par date croissante", id: 3 },
  ],
  [
    { Name: "à envoyer", id: 10 },
    { Name: "vendu", id: 11 },
    { Name: "vendu par ordre décroissant", id: 8 },
    { Name: "vendu par ordre croissant", id: 9 },
  ],
  [
    { Name: "Offre acceptée", id: 5 },
    { Name: "Offre en attente ", id: 6 },
    { Name: "Offre refusée ", id: 7 },
  ],
  [
    { Name: "à recevoir", id: 12 },
    { Name: "reçu", id: 13 },
    { Name: "acheté par ordre décroissant", id: 14 },
  ],
];

const renderFilter = (id, classes, dispatch, filterMyFrips) => {
  return filterArrayItems[id].map((item, index) => {
    return (
      <MenuItem
        className={classes.ItemBox}
        onClick={() => {
          dispatch(addFilterFrips(item.id));
        }}
      >
        <Typography style={{ fontSize: 18 }}>{item.Name}</Typography>
        <Checkbox
          className={classes.checkBox}
          style={{ backgroundColor: "transparent" }}
          checked={_.includes(filterMyFrips, item.id)}
          color="primary"
          disableFocusRipple
          disableRipple
          disableTouchRipple
        ></Checkbox>
      </MenuItem>
    );
  });
};

const Filter = ({ id, classes, filterMyFrips }) => {
  const [AnchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        className={classes.hover}
        onClick={handleClick}
        border={1}
        margin={2}
        borderRadius={2}
        display="flex"
        alignItems="center"
        style={{
          borderColor:
            filterMyFrips.length !== 0 ? "rgba(130, 160, 194,1)" : "#CCCCCC",
          backgroundColor:
            filterMyFrips.length !== 0 ? "rgba(205, 217, 231,1)" : "",
        }}
      >
        <Box
          display={"flex"}
          alignItems="center"
          height={40}
          justifyContent="center"
          aria-readonly={"true"}
        >
          <Typography  style={{ fontSize: 16 }}>Trier par</Typography>
            <FaFilter color="#82A0C2" style={{marginLeft:4}} />
            <Typography>({filterMyFrips.length})</Typography>
        </Box>

        <Popper
          anchorEl={AnchorEl}
          placement="bottom-start"
          style={{ minWidth: 300, maxWidth: "50%" }}
          modifiers={{
            offset: {
              enabled: true,
              offset: "0, 5",
            },
          }}
          open={Boolean(AnchorEl)}
        >
          <Box itemRef={AnchorEl} className={classes.boxShadow}>
            {renderFilter(id, classes, dispatch, filterMyFrips)}
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Filter;
