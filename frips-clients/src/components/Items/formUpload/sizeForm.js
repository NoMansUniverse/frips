import React, { useState } from "react";

import {
  Box,
  Checkbox,
  ClickAwayListener,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  makeStyles,
  MenuItem,
  Popper,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { arraySize } from "../staticItems/staticItemName";

import CloseIcon from "@material-ui/icons/Close";

const useStyle = makeStyles((theme) => ({
  checkBox: {
    position: "absolute",
    "&:hover": {
      background: "transparent",
    },
    right: 0,
  },
  BoxItem: {
    height: 50,
    fontSize: 16,
  },
  Dialog: {
    width: "100vw",
    minHeight: "20vh",
  },
}));

const SizeForm = ({ form, field, mobile, size, ...props }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, subId] = size;

  const renderedStateClothes = arraySize[id]?.subitems[subId]?.subitems.map(
    (item, index) => {
      return (
        <Box style={{ position: "relative" }}>
          {index !== 0 ? <Divider></Divider> : null}
          <MenuItem
            className={classes.BoxItem}
            onClick={() => {
              form.setFieldValue("Size", item.id);
              setAnchorEl();
            }}
          >
            {item.id}
            <Checkbox
              className={classes.checkBox}
              style={{ backgroundColor: "transparent" }}
              checked={item.id === field.value}
              color="primary"
              disableFocusRipple
              disableRipple
              disableTouchRipple
            ></Checkbox>
          </MenuItem>
        </Box>
      );
    }
  );

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <TextField
          onClick={handleClick}
          autoComplete="off"
          placeholder="Selectionne une taille"
          value={field.value}
          fullWidth
          InputProps={{
            style: { fontSize: 16 },

            endAdornment: (
              <InputAdornment position="end" className={classes.pointer}>
                {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
              </InputAdornment>
            ),
          }}
        />
        {!mobile ? (
          <Popper
            disablePortal={false}
            style={{ width: "35%" }}
            anchorEl={anchorEl}
            placement="bottom"
            open={Boolean(anchorEl)}
          >
            <Box
              style={{ backgroundColor: "white", position: "absolute" }}
              width={"100%"}
            >
              <Box maxHeight={250} overflow="auto">
                {renderedStateClothes}
              </Box>
            </Box>
          </Popper>
        ) : (
          <Dialog
            open={Boolean(anchorEl)}
            PaperProps={{ style: { margin: 0 ,flexDirection:"inherit"} }}

          >
            <Box
              className={classes.Dialog}
              display="flex"
              flexDirection="column"
            >
              <Box
                minHeight={80}
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                style={{ position: "sticky", top: 0, backgroundColor: "white" ,zIndex:100}}

              >
                <Typography style={{ fontSize: 16 }}>Taille</Typography>
                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                  <CloseIcon style={{fontSize:30}}  /> 

                  </IconButton>
                </Box>
              </Box>

              <Box style={{ backgroundColor: "white" }} width={"100%"}>
                {renderedStateClothes}
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SizeForm;
