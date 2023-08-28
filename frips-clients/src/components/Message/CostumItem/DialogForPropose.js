import {
  Box,
  Button,
  Card,
  CardActionArea,
  ClickAwayListener,
  Dialog,
  Divider,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  handleClickAwayPropose,
  handleClickAwaySecondPage,
  handleClickPropose,
  handleClickSecondPage
} from "../../../actions";
import API_ENDPOINT from "../../../api/url";
import SecondPageDialog from "./SecondPageDialog";

const useStyles = makeStyles((theme) => ({
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
    overflow: "hidden",
    width: 600,
  },
  GridSytem: {
    display: "grid",
    padding: 1,
    overflow: "auto",
    gridTemplateColumns: "repeat(3,33%)",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },

  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    width: "100%",
    height: "100%",
  },
}));

const renderItemForPropose = (state, classes, dispatch, isItemFrom) => {
  return state.map((item, index) => {
    return (
      <Box width={"100%"} height={"100%"} padding={1}>
        <Card className={classes.BoxOneItem}>
          <Box>
            <CardActionArea
              style={{ width: "100%", height: 300 }}
              onClick={() => {
                dispatch(handleClickSecondPage(item));
              }}
            >
              <img
                alt={`/images/${state[index].id}/${state[index].image[0].image}`}
                src={`${API_ENDPOINT}/images/${state[index].id}/${state[index].image[0].image}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardActionArea>
          </Box>
          <Box padding={2}>
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {item.Price} CHF
            </Typography>
            <Typography>{item.Size}</Typography>
            <Typography>{item.item_brand[0].brand.Name}</Typography>
          </Box>
          <Divider />
          <Box height={44} display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                dispatch(addFavorite(state[index].id));
              }}
            ></IconButton>

            <Typography>
              {state[index]._count ? state[index]._count.favorit : null}
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  });
};

const ListForPropose = ({
  id,
  items,
  itemFromId,
  AnchorEl,
  loading,
  loaded,
  secondPage,
  socket,
}) => {
  const classes = useStyles();
  const isItemFrom = useSelector((state) => state.itemForPropose.isFromItem);
  const item = useSelector((state) => state.itemForPropose.item);

  const [anchorEl, setAnchorEl] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(handleClickPropose());
  };

  const handleClickAway = (e) => {
    dispatch(handleClickAwayPropose());
  };

  return (
    <ClickAwayListener disableReactTree onClickAway={handleClickAway}>
      <Box>
        <Button type="outlined" color="primary" onClick={handleClick}>
          faire une offre
        </Button>

        {!secondPage && AnchorEl ? (
          <Dialog
            transitionDuration={0}
            open={Boolean(AnchorEl && !secondPage)}
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
                <Typography style={{ fontSize: 18 }}>
                  Faire une offre
                </Typography>
                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box className={classes.GridSytem}>
                {renderItemForPropose(items, classes, dispatch)}
              </Box>
            </Box>
          </Dialog>
        ) : null}

        {AnchorEl && isItemFrom ? (
          <Dialog transitionDuration={0} open={Boolean(AnchorEl && isItemFrom)}>
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
                <Box padding={3} position="absolute" left={0}>
                  <IconButton
                    onClick={() => {
                      dispatch(handleClickAwaySecondPage());
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>
                <Typography style={{ fontSize: 18 }}>
                  Faire une offre
                </Typography>
                <Box padding={3} position="absolute" right={0}>
                  <IconButton onClick={handleClickAway}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>

              <SecondPageDialog
                id={id}
                socket={socket}
                item={item}
                handleClickAway={handleClickAway}
                classes={classes}
              />
            </Box>
          </Dialog>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

const mapStateToProps = (state) => ({
  items: state.itemForPropose.itemForPropose,
  loading: state.itemForPropose.loading,
  itemFromId: state.itemForPropose.item,
  AnchorEl: state.itemForPropose.handleClick,
  loaded: state.itemForPropose.loaded,
  idFavorite: state.items.favorites,
  secondPage: state.itemForPropose.SecondPage,
});

export default connect(mapStateToProps)(ListForPropose);
