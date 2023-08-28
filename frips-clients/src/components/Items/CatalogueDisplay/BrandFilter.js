import {
  Box,
  Checkbox, MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import Fuse from "fuse.js";
import _ from "lodash";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { addToFilter, removeToFilter } from "../../../actions";

const options = {
  includeScore: true,
  keys: ["Name"],
  threshold: 0.1,
};

const renderBrand = (
  classes,
  searchResults,
  filter,
  label,
  dispatch,
  infoItems,
  close
) => {
  if (searchResults.length === infoItems.length) {
    return searchResults.map((item, index) => {
      return (
        <MenuItem
          className={classes.ItemBox}
          onClick={() => {
            if (_.includes(filter[label], item)) {
              dispatch(removeToFilter(item));
            } else {
              dispatch(addToFilter(item, label));
              close()

            }
          }}
        >
          <Typography style={{ fontSize: 18 }}>{item.Name}</Typography>
          <Checkbox
            className={classes.checkBox}
            style={{ backgroundColor: "transparent" }}
            checked={_.includes(filter[label], item)}
            color="primary"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          ></Checkbox>
        </MenuItem>
      );
    });
  } else {
    return searchResults.map(({ item }, index) => {
      return (
        <MenuItem
          className={classes.ItemBox}
          onClick={() => {
            if (_.includes(filter[label], item)) {
              dispatch(removeToFilter(item));
            } else {
              dispatch(addToFilter(item, label));
              close()

            }
          }}
        >
          <Typography style={{ fontSize: 18 }}>{item.Name}</Typography>
          <Checkbox
            className={classes.checkBox}
            style={{ backgroundColor: "transparent" }}
            checked={_.includes(filter[label], item)}
            color="primary"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          ></Checkbox>
        </MenuItem>
      );
    });
  }
};
const BrandFilter = ({ filter, label, classes, infoItems,close }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(infoItems);
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const fuse = new Fuse(infoItems, options);
    const results = fuse.search(value);

    setSearchResults(results);
  };

  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResults(infoItems);
    }
  }, [infoItems, searchResults]);

  return (
    <Box >
      <TextField
        value={searchValue}
        autoComplete="off"
        fullWidth
        placeholder="Choississez une marque"
        style={{padding:5}}
        InputProps={{
            style: { fontSize: 16 },

            
          }}
        onChange={handleSearchChange}
      />
      {renderBrand(classes, searchResults, filter, label, dispatch, infoItems,close)}
    </Box>
  );
};

export default BrandFilter;
