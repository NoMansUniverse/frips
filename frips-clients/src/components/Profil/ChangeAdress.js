import {
    Box, InputAdornment, makeStyles, Popper, TextField
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";
const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    display: "block",
    alignItems: "center",
  },
  SettingContent: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    display: "block",
    alignItems: "center",
    width: "25%",
  },
  MenuSetting: {
    height: 50,
  },
  Spacer: {
    width: "100%",
    height: 50,
  },
  Header: {
    fontSize: 16,
    fontWeight: 50,
  },
  Dialog: {
    width: 350,
    height: 500,
    [theme.breakpoints.down("sm")]: {
      height: 500,
      width: "auto",
    },
  },
}));

const ChangeAdress = ({ form, Canton }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <TextField
        onClick={handleClick}
        autoComplete="off"
        placeholder="Selectionne une catégorie"
        value={""}
        onChange={(e) => form.SetFieldValue("s")}
        style={{ width: 350 }}
        InputProps={{
          classes: { input: classes.pointer },

          readOnly: true,

          endAdornment: (
            <InputAdornment position="end" className={classes.pointer}>
              {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
            </InputAdornment>
          ),
        }}
      />
      <Popper
        style={{ marginTop: 1 }}
        anchorEl={anchorEl}
        placement="bottom-start"
        popperOptions={{ positionFixed: true }}
        open={Boolean(anchorEl)}
      >
        <Box
          style={{ backgroundColor: "white", width: 350, position: "absolute" }}
        >
          {Canton.map((item) => {
            return <Box>{item}</Box>;
          })}
        </Box>
      </Popper>
    </Box>
  );
};

export default ChangeAdress;
