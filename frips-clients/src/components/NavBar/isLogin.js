import { MenuItem } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions";
const IsLogin = (isAuthenticated, handleClose, classes) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  if (isAuthenticated) {
    return (
      <MenuItem
        onClick={() => {
          dispatch(logout());
        }}
      >
        Se déconnecter
      </MenuItem>
    );
  } else {
    <MenuItem
      onClick={() => {
        history("/login");
      }}
    >
      Se connecter
    </MenuItem>;
  }
};

export default IsLogin;
