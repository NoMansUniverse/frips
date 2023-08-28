import React, { useState } from "react";

import {
  Box,
  Checkbox,
  ClickAwayListener,
  Dialog,
  IconButton,
  InputAdornment,
  makeStyles,
  MenuItem,
  Popper,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";

import _ from "lodash";

import { useSelector } from "react-redux";

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
    position: "relative",
  },
  Typo: {
    fontSize: 16,
    fontWeight: 500,
  },
  Dialog: {
    width: "100vw",
    height: "80vh",
  },
}));

const BrandForm = ({ mobile, field, form, ...props }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const BrandInfo = useSelector(
    (state) => state?.itemInfo?.itemInfo?.brandInfo
  );
  const [suggestion, setSuggestion] = useState(BrandInfo);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleText = (text) => {
    form.setFieldValue("Brand", text);
    let matches = [];
    if (text.length > 0) {
      matches = BrandInfo.filter((item) => {
        const regex = new RegExp(`${text}`, "gi");

        return item.Name.match(regex);
      });

      matches = _.orderBy(matches, ["brand"], ["asc"]);

      if (matches.length === 0) {
        setSuggestion([{ Name: `${text}`, pasDispo: true }]);
      } else {
        setSuggestion(matches);
      }
    }

    if (text.length === 0) {
      setSuggestion(BrandInfo);
    }
  };

  const brandCatalogue = () => {
    return (
      <Box
        style={{ width: "100%", overflow: "auto" }}
        maxHeight={mobile ? "none" : 250}
      >
        {suggestion?.map((item) => {
          if (!item.pasDispo) {
            return (
              <MenuItem
                onClick={() => {
                  form.setFieldValue("Brand", item.Name);

                  setAnchorEl();
                  setSuggestion(BrandInfo);
                }}
                className={classes.BoxItem}
              >
                <Typography className={classes.Typo}>{item.Name}</Typography>
                <Checkbox
                  style={{ backgroundColor: "transparent" }}
                  checked={item.Name === field.value}
                  className={classes.checkBox}
                  inputProps={{}}
                  color="primary"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                ></Checkbox>
              </MenuItem>
            );
          } else {
            return (
              <Box>
                <Box
                  className={classes.BoxItem}
                  display="flex"
                  alignItems="center"
                >
                  <Typography style={{ padding: 16, color: "grey" }}>
                    Marque pas disponible
                  </Typography>
                </Box>
                <MenuItem
                  className={classes.BoxItem}
                  onClick={() => {
                    form.setFieldValue(field.name, item.Name);

                    setAnchorEl();
                    setSuggestion(BrandInfo);
                  }}
                >
                  <Typography className={classes.Typo}>
                    {`Utiliser ${item.Name} comme marque `}
                  </Typography>
                </MenuItem>
              </Box>
            );
          }
        })}
      </Box>
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <TextField
          onClick={handleClick}
          value={field.value}
          autoComplete="off"
          onChange={(e) => {
            handleText(e.target.value);
          }}
          id="Brand"
          name="Brand"
          type="text"
          placeholder="Selectionne une Marque"
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
            popperOptions={{ positionFixed: true }}
            open={Boolean(anchorEl)}
          >
            <Box
              style={{ backgroundColor: "white", position: "absolute" }}
              width={"100%"}
            >
              {brandCatalogue(suggestion)}
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
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
                style={{ position: "sticky", top: 0, backgroundColor: "white" ,zIndex:100}}

              >
                <Typography style={{ fontSize: 16 }}>Marque</Typography>

                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                  <CloseIcon style={{fontSize:30}}  /> 

                  </IconButton>
                </Box>
              </Box>
              <Box padding={2}>
                <TextField
                  onClick={handleClick}
                  value={field.value}
                  autoComplete="off"
                  onChange={(e) => {
                    handleText(e.target.value);
                  }}
                  id="Brand"
                  name="Brand"
                  type="text"
                  placeholder="Selectionne une Marque"
                  fullWidth
                  InputProps={{
                    style: { fontSize: 16 },
                    startAdornment: (
                      <InputAdornment className={classes.pointer}>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                style={{ backgroundColor: "white", overflow: "auto" }}
                width={"100%"}
              >
                {brandCatalogue(suggestion)}
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default BrandForm;
