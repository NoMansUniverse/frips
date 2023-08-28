import React from "react";

import { Box, Checkbox, IconButton, MenuItem, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";


export const navigationCatalogue = (
  id,
  rank,
  classes,
  setNavigationValue,
  form,
  SelectableItem,
  setSize = null,
  mobile,
  setCatalogue
) => {
  const scrollItem = rank[rank.length - 1].array.map((item, index) => {
    if (item.type === "list") {
      return (
        <Box>
          <MenuItem
            key={index}
            disableFocusRipple
            disableTouchRipple
            className={classes.BoxItem}
            onClick={() => {
              setNavigationValue([
                ...rank,
                { upId: item.Name, id: rank.length, array: item.subitems },
              ]);
            }}
          >
            {item.Name}

            <IconButton
              className={classes.Arrow}
              disableFocusRipple
              disableRipple
              disableTouchRipple
            >
              <ChevronRightIcon style={{ fontSize: 25 }} />{" "}
            </IconButton>
          </MenuItem>
        </Box>
      );
    } else {

      return (
        <Box>
          <MenuItem
            className={classes.BoxItem}
            key={index}
            onClick={() => {
              if (!Number.isNaN(item.sizeType)) {

                setSize(oldArray => [...oldArray, item.sizeType]);
              }
              form.setFieldValue("Catalogue", item.id);
              setNavigationValue([]);
              form.setFieldValue("Size","")
              SelectableItem();
            }}
          >
            {item.Name}
            <Checkbox
              style={{ backgroundColor: "transparent" }}
              checked={item.id === id}
              className={classes.checkBox}
              color="primary"
              disableFocusRipple
              disableRipple
              disableTouchRipple
            ></Checkbox>
          </MenuItem>
        </Box>
      );
    }
  });

  return (
    <Box>
      <Box className={classes.BoxCurrentItem}>
        <IconButton
          onClick={() => {
            setNavigationValue(
              rank.filter((item, index) => index !== rank.length - 1)
            );
          }}
          className={classes.ArrowBackIcon}
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Typography style={{ padding: 16, fontWeight: 500, fontSize: 16 }}>
            {rank[rank.length - 1].upId}
          </Typography>
        </Box>
      </Box>

      {rank[rank.length - 1].array.length < 6 ? (
        scrollItem
      ) : !mobile ? (
        <Box style={{ maxHeight: 200, width: "100%", overflow: "auto" }}>
          {" "}
          {scrollItem}{" "}
        </Box>
      ) : (
        <Box style={{ height: "100%", overflow: "auto" }}> {scrollItem} </Box>
      )}
    </Box>
  );
};
