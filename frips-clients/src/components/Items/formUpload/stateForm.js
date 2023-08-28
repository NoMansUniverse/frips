import React, { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  ClickAwayListener,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  makeStyles,
  Popper,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
  },
  TypoHeader: {
    fontSize: 16,
    fontWeight: "1.15em",
    color: "black",
  },
  Typo: {
    fontSize: "1.15em",
    color: "#8B8B8B",
  },
  Dialog: {
    width: "100vw",
    minHeight: "30vh",
  },
}));

const StateForm = ({ field, form, mobile }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [Description, setDescription] = useState(null);
  const SizeForm = useSelector((state) => state.itemInfo.itemInfo);

  useEffect(() => {
    if (field.value.Name) {
      setDescription(field.value.Description);
      form.setFieldValue(field.name, field.value.id);
    }
  }, [field]);

  const renderedStateClothes = SizeForm?.itemconditionInfo?.map((item) => {
    return (
      <li
        style={{ listStyleType: "none", width: "100%" }}
        onClick={() => {
          form.setFieldValue(field.name, item.id);
          setDescription(item.Description);
          handleClickAway();
        }}
      >
        <Box style={{ padding: 10 }} display="flex">
          <Box display="flex" flexDirection="column" position="relative">
            <Typography className={classes.TypoHeader}>
              {item.Description}
            </Typography>
            <Box flexWrap="wrap">
              <Typography className={classes.Typo} align="inherit">
                {item.Name}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <Checkbox
              checked={item.id === field.value}
              color="primary"
              disableFocusRipple
              disableRipple
              disableTouchRipple
            ></Checkbox>
          </Box>
        </Box>
      </li>
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
          value={Description}
          onChange={(e) => form.setFieldValue(field.name, e.target.value)}
          autoComplete="off"
          multiline={true}
          placeholder="Indique l'état"
          fullWidth
          InputProps={{
            style: { fontSize: 16 },
            readOnly: true,

            endAdornment: (
              <InputAdornment position="end" className={classes.pointer}>
                {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
              </InputAdornment>
            ),
          }}
        />

        {!mobile() ? (
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
                <Typography style={{ fontSize: 16 }}>Etat</Typography>
                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                    <CloseIcon style={{fontSize:30}}  /> 
                  </IconButton>
                </Box>
              </Box>
              <Divider/>

              <Box
                style={{ backgroundColor: "white", overflowY: "auto" }}
                width={"100%"}
              >
                {renderedStateClothes}
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default StateForm;
