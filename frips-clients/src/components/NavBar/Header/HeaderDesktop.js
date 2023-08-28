import { Avatar, Box, Divider, Slide } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CopyrightIcon from "@material-ui/icons/Copyright";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useRef } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { MdOutlineAttachMoney, MdRecycling } from "react-icons/md";
import { Button } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { logout } from "../actions";
import { IoShirtSharp } from "react-icons/io5";
import { GiLargeDress } from "react-icons/gi";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useNavigate } from "react-router-dom";
import Search from "./NavBar/Search";
import SubHeaderManager from "./NavBar/SubHeaderManager";
import API_ENDPOINT from "../api/url";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10%",
    height: "100%",
    paddingRight: "10%",
    width: "100%",
  },

  SearchBar: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },

  container: {
    display: "flex",
    flex: 1,
    height: 40,
  },
  toolBarSpace: {
    ...theme.mixins.toolbar,
  },

  icon: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  grow: {
    backgroundColor: "#F5f5f3",
    display: "flex",
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: "50px",
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  Logo: {
    fontFamily: "Lobster",
    fontSize: 35,
    cursor: "pointer",
    color: "white",
    background: "transparent",
    outline: "none",
    userSelect: "none",
    msTouchSelect: "none",
    WebkitUserSelect: "none",

    WebkitTapHighlightColor: "transparent",
    WebkitTouchCallout: "none",
  },
  BoxItem: {
    height: 50,
    minHeight: 50,
    width: "100%",
    fontSize: 16,
    color: "rgb(117,117,117)",
    fontFamily: "Helvetica",
    position: "relative",
  },
  Slide: {
    WebkitOverflowScrolling: "touch",
    backgroundColor: "white",
    overflowY: "scroll",
    padding: 10,
    position: "relative",
  },
}));

const HeaderDesktop = ({ onSearchSubmit }) => {
  const classes = useStyles();
  const history = useNavigate();

  const state = useSelector((state) => state.auth);
  const avatarRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const unReadNotification = useSelector(
    (state) => state.notification.unReadNotification
  );
  const sellNotification = useSelector(
    (state) => state.myFrips.sellNotification
  );
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isAuth = (handleClose) => {
    if (!state.loading && state.isAuthenticated) {
      return (
        <MenuItem
          className={classes.BoxItem}
          style={{ color: "#fa5250" }}
          onClick={() => {
            dispatch(logout(history));
            handleClose();
          }}
        >
          Se déconnecter
        </MenuItem>
      );
    } else {
      return (
        <MenuItem
          className={classes.BoxItem}
          onClick={() => {
            history("/signup");
            handleClose();
          }}
        >
          S'inscrire | se connecter
        </MenuItem>
      );
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuDesktop = (event) => {
    if (anchorEl === null) {
      setAnchorEl(avatarRef.current);
    } else {
      setAnchorEl(null);
    }
  };



  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      id={menuId}
      disableScrollLock={true}
      open={isMenuOpen}
      anchorEl={avatarRef.current}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transitionDuration={0}
      disableAutoFocusItem
      disablePortal={true}
      PaperProps={{
        style: {
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          transform: "translateX(-90%) translateY(55px)",
        },
      }}
      onClose={handleMenuDesktop}
    >
      <MenuItem
        className={classes.BoxItem}
        onClick={() => {
          history("/settings/profile");
          handleMenuDesktop();
        }}
      >
        Mon profile
      </MenuItem>
      <MenuItem
        className={classes.BoxItem}
        onClick={() => {
          history("/members/myFrips");
          handleMenuDesktop();
        }}
      >
        Mes Annonces
      </MenuItem>

      {isAuth(handleMenuDesktop)}
    </Menu>
  );

 

  

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          elevation={0}
          style={{ backgroundColor: "transparent" }}
        >
          <Toolbar
            className={classes.root}
            style={{ backgroundColor: "#82A0C2" }}
          >
            <Box
              variant="h6"
              height={"100%"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingRight={2}
              onClick={() => {
                history("/");
                handleMobileMenuClose();
              }}
            >
              <Typography className={classes.Logo}>
                {mobile ? "F" : "MyFrips"}
              </Typography>
            </Box>
            {!mobile ? (
              <Box width={500}>
                <Search />
              </Box>
            ) : null}

            <div className={classes.grow} />
            {!state.loading ? (
              <Box>
                <div className={classes.sectionDesktop}>
                  <Box flexGrow={1} display="flex" alignItems={"center"}>
                    {!state.isAuthenticated ? (
                      <Box marginLeft={2} alignItems="center">
                        <Button
                          onClick={() => history("/signup")}
                          variant="outlined"
                          style={{ backgroundColor: "#F7F9FB" }}
                        >
                          <Typography style={{ fontSize: 12 }}>
                            S'inscrire | se connecter
                          </Typography>
                        </Button>
                      </Box>
                    ) : null}

                    <Box marginLeft={2} />
                    <Button
                      onClick={() => history("/items/new")}
                      variant="contained"
                      style={{ backgroundColor: "#F7F9FB" }}
                    >
                      <Typography style={{ fontSize: 12 }}>
                        Vendre un article
                      </Typography>
                    </Button>
                  </Box>
                  {state.isAuthenticated ? (
                    <Box display="flex" marginLeft={1}>
                      <IconButton
                        aria-label="show 4 new mails"
                        color="inherit"
                        onClick={() => {
                          history("/members/myFrips/mySell");
                        }}
                      >
                        <Badge
                          badgeContent={sellNotification?.length}
                          color="secondary"
                        >
                          <MdOutlineAttachMoney size={25} />
                        </Badge>
                      </IconButton>
                      <IconButton
                        aria-label="show 4 new mails"
                        color="inherit"
                        onClick={() => {
                          history("/member/conversation");
                        }}
                      >
                        <Badge
                          badgeContent={unReadNotification?.length}
                          color="secondary"
                        >
                          <MailIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        aria-label="show  new notifications"
                        color="inherit"
                        onClick={() => {
                          history("/member/myFavorite");
                        }}
                      >
                        <Badge color="secondary">
                          <FavoriteIcon />
                        </Badge>
                      </IconButton>

                      <Box
                        display={"flex"}
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            cursor: "pointer",
                            zIndex: 1500,
                          }}
                          onClick={handleMenuDesktop}
                          alt={`${state.user?.Pseudo}`}
                          src={`${API_ENDPOINT}/imageProfile/${state.user?.id}/${state.user?.image?.image}`}
                        />

                        <Box
                          style={{ cursor: "pointer", zIndex: 1500 }}
                          ref={avatarRef}
                          onClick={handleMenuDesktop}
                        >
                          {Boolean(anchorEl) ? (
                            <ExpandLess style={{ cursor: "pointer" }} />
                          ) : (
                            <ExpandMore style={{ cursor: "pointer" }} />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                </div>
              </Box>
            ) : null}
          </Toolbar>

          <Box height={2} bgcolor="white" />

          {mobile ? (
            <Box
              width={"100%"}
              style={{ backgroundColor: "#82A0C2" }}
              height={40}
              margin="auto"
              alignItems="center"
              display="flex"
            >
              <Box width={"100%"} className={classes.SearchBar}>
                <Search />
              </Box>
            </Box>
          ) : (
            <SubHeaderManager />
          )}
          {renderMenu}
        </AppBar>
      </div>
      <div className={classes.toolBarSpace} />
    </React.Fragment>
  );
};

export default HeaderDesktop;
