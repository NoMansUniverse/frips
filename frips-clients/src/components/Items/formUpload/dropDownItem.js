import React, { useState } from "react";

import {
  Box,
  ClickAwayListener,
  Dialog,
  IconButton,
  InputAdornment,
  makeStyles,
  Modal,
  Popper,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { listCategorie } from "../staticItems/staticItemName";

import CloseIcon from "@material-ui/icons/Close";
import _ from "lodash";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
  pointer: {
    cursor: "pointer",
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
  Arrow: {
    right: 0,
    position: "absolute",
    "&:hover": {
      background: "transparent",
    },
  },
  BoxCurrentItem: {
    height: 50,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  BoxItem: {
    height: 50,
    minHeight: 50,
    fontSize: 16,
    position: "relative",
  },
  TypoActualValue: {
    fontSize: 16,
    fontWeight: 500,
  },
  Dialog: {
    width: "100vw",
    minHeight: "20vh",
  },
}));

const DropDownItem = ({ field, form, mobile, size, setSize, ...props }) => {
  const [navigationValue, setNavigationValue] = useState([]);
  const Catalogue = useSelector(
    (state) => state?.itemInfo?.itemInfo?.infoCategory
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyle();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = (e) => {
    setAnchorEl(null);
  };

  if (!mobile) {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box style={{ position: "relative" }} width={"100%"}>
          <TextField
            onClick={handleClick}
            autoComplete="off"
            type="text"
            placeholder="Selectionne une catégorie"
            value={_.find(Catalogue, { id: field.value })?.Name}
            onChange={(e) => {
              if (e.currentTarget !== "") {
                form.SetFieldValue(field.name, e.target.value);
              }
            }}
            fullWidth
            InputProps={{
              classes: { input: classes.pointer },
              style: { fontSize: 16 },

              readOnly: true,

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
              style={{ width: "28%", marginTop: 1 }}
              anchorEl={anchorEl}
              placement="bottom"
              open={Boolean(anchorEl)}
            >
              <Box
                style={{ backgroundColor: "white", position: "absolute" }}
                width={"100%"}
              >
                {listCategorie(
                  field.value,
                  navigationValue,
                  setNavigationValue,
                  classes,
                  form,
                  handleClickAway,
                  setSize
                )}
              </Box>
            </Popper>
          ) : (
            <Dialog
              open={Boolean(anchorEl)}
              PaperProps={{ style: { margin: 0, flexDirection: "inherit" } }}
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
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 100,
                  }}
                >
                  <Typography>{field.Name}</Typography>
                  <Box padding={3} position="absolute" right={0}>
                    <IconButton onClick={handleClickAway}>
                      <CloseIcon style={{ fontSize: 30 }} />
                    </IconButton>
                  </Box>
                </Box>

                <Box style={{ backgroundColor: "white" }} width={"100%"}>
                  {listCategorie(
                    field.value,
                    navigationValue,
                    setNavigationValue,
                    classes,
                    form,
                    handleClickAway,
                    setSize,
                    mobile
                  )}
                </Box>
              </Box>
            </Dialog>
          )}
        </Box>
      </ClickAwayListener>
    );
  } else {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box style={{ position: "relative" }} width={"100%"}>
          <TextField
            onClick={handleClick}
            autoComplete="off"
            placeholder="Selectionne une catégorie"
            value={_.find(Catalogue, { id: field.value })?.Name}
            onChange={(e) => {
              if (e.currentTarget !== "") {
                form.SetFieldValue(field.name, e.target.value);
              }
            }}
            fullWidth
            InputProps={{
              classes: { input: classes.pointer },
              style: { fontSize: 16 },

              readOnly: true,

              endAdornment: (
                <InputAdornment position="end" className={classes.pointer}>
                  {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
                </InputAdornment>
              ),
            }}
          />

          <Dialog
            open={Boolean(anchorEl)}
            PaperProps={{ style: { margin: 0, flexDirection: "inherit" } }}
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
                
              >
                <Typography>{field.Name}</Typography>
                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                    <CloseIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </Box>
              </Box>

              <Box style={{ backgroundColor: "white" }} width={"100%"}>
                {listCategorie(
                  field.value,
                  navigationValue,
                  setNavigationValue,
                  classes,
                  form,
                  handleClickAway,
                  setSize,
                  mobile
                )}
              </Box>
            </Box>
          </Dialog>
        </Box>
      </ClickAwayListener>
    );
  }
};

export default DropDownItem;
