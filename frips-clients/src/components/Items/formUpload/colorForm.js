import React, { useState } from "react";

import {
  Box,
  ClickAwayListener,
  Divider,
  InputAdornment,
  Popper,
  TextField,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import {
  Dialog,
  IconButton,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import _ from "lodash";

import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  pointer: {
    cursor: "pointer",
  },
  BoxItem: (props) => ({
    "&:hover": {
      background: props.hoverColor,
    },
  }),
  Typography: {
    fontWeight: 500,
    fontSize: 18,
  },
  IconColor: {
    position: "absolute",
    right: 10,
  },
  Dialog: {
    width: "100vw",
    height: "80vh",
  },
});

const CostumBox = ({ item, setvalue, value ,index}) => {
  const props = { hoverColor: alpha(item.Code, 0.6) };

  const classes = useStyles(props);

  return (
    <Box style={{ position: "relative",backgroundColor:_.some(value,{Code:item.Code}) ? `${alpha(item.Code, 0.6)}`:""}}>
      <MenuItem
        key={item.Name}
        onClick={() => {
          if (!_.find(value, item)) {
            if (value.length !== 2) {
              setvalue.setFieldValue("Color", [...value, item]);
            } else {
              setvalue.setFieldValue("Color", [value[1], (value[0] = item)]);
            }
          } else {
            setvalue.setFieldValue(
              "Color",
              value.filter((value) => {
                return value.id !== item.id;
              })
            );
          }
        }}
      >
        <Typography className={classes.Typography}>{item.Name}</Typography>
        <FiberManualRecordSharpIcon
          className={classes.IconColor}
          style={{
            color: `${item.Code}`,
            fontSize: 30,
            stroke: "black",
            strokeWidth: 1,
          }}
        />
      </MenuItem>
    </Box>
  );
};

const extractName = (field) => {
  let new_array = [];

  field?.map((item) => {
    if (item.Name) {
      new_array.push(item.Name);
    }
  });

  return new_array;
};

const ColorForm = ({ form, mobile, field, ...props }) => {
  const classes = useStyles();
  const ColorInfo = useSelector(
    (state) => state.itemInfo.itemInfo.itemColorInfo
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const renderedColorForm = ColorInfo.map((item, index) => {
    return (
      <CostumBox index={index} value={field.value} setvalue={form} item={item}></CostumBox>
    );
  });

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
          placeholder="Selectionne une Couleur"
          value={extractName(field.value)}
          onChange={(e) => form.setFieldValue(field.name, e.target.value)}
          fullWidth
          InputProps={{
            readOnly: true,
            style: { fontSize: 16 },
            classes: { input: classes.pointer },

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
                {renderedColorForm}
              </Box>
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
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography style={{ fontSize: 16 }}>Couleurs</Typography>
                  <Typography style={{ fontSize: 16,marginTop:10 }}>
                    {extractName(field.value)
                      .toString()
                      .replace(/([a-z])([A-Z])/g, "$1, $2")}
                  </Typography>
                </Box>
                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                    <CloseIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </Box>
              </Box>
              
              <Divider/>

              <Box style={{ backgroundColor: "white" }} width={"100%"}>
                {renderedColorForm}
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default ColorForm;
