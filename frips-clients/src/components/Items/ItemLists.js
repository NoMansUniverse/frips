import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Alert } from "@material-ui/lab";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addFavorite,
  fetchItems,
  fetchMoreItems,
  removeFavorite
} from "../../actions";
import { SUCCESS_CREATION_ITEM } from "../../actions/type";
import API_ENDPOINT from "../../api/url";
import TopBusiness from "./FirstPage/TopBusiness";
import DisplayMain from "./logicItems/displayImageMain";
import DisplayNewItems from "./logicItems/displayNewItems";


const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    borderRadius: 2,
    padding: 2,
    top: 50,
    left: 20,
    position: "absolute",
    width: 280,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      position: "relative",
      top: 0,
      left: 0,
    },
  },
  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  GridSytem: {
    display: "grid",
    gridTemplateColumns: "repeat(5,20%)",
    width: "100%",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },
  floatImage: {
    width: "100%",
    height: 400,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",

      display: "block",
    },
  },
  floatContentArticle: {
    //display:"flex" mais il y a bug des images qui s'affichent mal
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "block",
    },
  },
  ItemBox: {
    position: "relative",
    flex: 2,
    display: "flex",
    maxHeight: "100%",
    overflowY: "auto",
  },
}));

const renderedItem = (state, classes, favorite, dispatch, navigate) => {
  return state.map((item, index) => {
    return (
      <Box width={"100%"} height={"100%"} padding={1} key={index}>
        <Card className={classes.BoxOneItem}>
          <Box
            display={"flex"}
            alignItems="center"
            marginBottom={2}
            width="100%"
          >
            <IconButton
              onClick={() => {
                navigate(`/member/${item.account.Pseudo}`);
              }}
            >
              <Avatar
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  cursor: "pointer",
                }}
                alt={`${item.account.Pseudo}`}
                src={`${API_ENDPOINT}/imageProfile/${item.account.id}/${item.account?.image?.image}`}
              />
            </IconButton>
            <Typography
              style={{
                wordBreak: "break-all",
              }}
            >
              {item.account.Pseudo}
            </Typography>
          </Box>
          <Box>
            <CardActionArea
              style={{ width: "100%", height: 300 }}
              onClick={() => {
                navigate(`/items/${state[index].id}`);
              }}
            >
              <img
                alt={`${API_ENDPOINT}/images/${state[index].id}/${state[index].image[0].image}`}
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
            <Typography>{item.item_brand[0]?.brand.Name}</Typography>
          </Box>
          <Divider />
          <Box height={44} display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                if (_.some(favorite, { id_Item: item.id })) {
                  dispatch(removeFavorite(state[index].id, 0));
                } else {
                  dispatch(addFavorite(state[index].id, 0));
                }
              }}
            >
              {_.some(favorite, { id_Item: item.id }) ? (
                <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon
                  style={{ color: "grey" }}
                ></FavoriteBorderIcon>
              )}
            </IconButton>

            <Typography>
              {state[index]._count ? state[index]._count.favorit : null}
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  });
};

const SuccesAddItem = () => {
  return (
    <Box justifyContent={"center"} alignItems="center" width={"50vh"}>
      <Typography style={{ fontSize: 18 }}>
        Article ajouté avec succès
      </Typography>
    </Box>
  );
};
function TransitionUp(props) {
  return <Slide {...props} direction="left" />;
}

const ItemList = ({
  loading,
  items,
  loaded,
  success,
  favorite,
  topBusiness,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Page, setPage] = useState(2);
  let navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"),{noSsr:true});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!loading && items.length === 0) {
      dispatch(fetchItems(true, mobile));
    }
  }, [dispatch, loading]);

  const renderedItems = useMemo(() => {
    return renderedItem(items, classes, favorite, dispatch, navigate);
  }, [items, favorite, loading, dispatch]);

  const fetchMore = () => {
    setPage((prevState) => prevState + 1);
    setTimeout(() => {
      dispatch(fetchMoreItems(Page));
    }, 1500);
  };

  const Image = useMemo(() => {
    return <DisplayMain classes={classes} />;
  });

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (success) {
      setOpen(success);
    } else {
      setOpen(success);
    }
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
    dispatch({ type: SUCCESS_CREATION_ITEM, payload: false });
  };

  if (loading && items.length === 0) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
    >
      <Box width={"100%"} height={"100%"}>
        {success && !mobile ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={1500}
            onClose={handleClose}
            TransitionComponent={TransitionUp}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              children={<SuccesAddItem />}
            />
          </Snackbar>
        ) : null}
        (
        <Box className={classes.floatContentArticle}>
          <Box height={mobile ? "3vh":"5vh"}  />
          {Image}
          <Box height={mobile ? "3vh":"5vh"}  />
          <TopBusiness
            favorite={favorite}
            loading={loading}
            mobile={mobile}
            accountTop={topBusiness}
          />
          <Box height={mobile ? "7vh":"10vh"} />

          <DisplayNewItems
            mobile={mobile}
            classes={classes}
            favorite={favorite}
          />
          <Box height={mobile ? "3vh":"5vh"} />

          <Box padding={1.5} display={"flex"} alignItems="center">
            <Typography style={{ fontSize: 18, fontWeight: 550 }}>
              Articles ajoutés récemment 
            </Typography>
            
          </Box>
          <Box height={"1vh"} width={"100%"} />

          <InfiniteScroll
            style={{ width: "100%" }}
            dataLength={items.length}
            next={fetchMore}
            hasMore={true}
            loader={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding={2}
                width={"100%"}
              >
                <CircularProgress size={30}></CircularProgress>
              </Box>
            }
          >
            <Box className={classes.GridSytem}>{renderedItems}</Box>
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  items: Object.values(state.items?.items),
  loading: state.items.loading,
  loaded: state.items.loaded,
  favorite: state.favoriteReducers.favoritIds,
  topBusiness: state.items.topBusiness,
  success: state.items.successCreationItem,
});

export default connect(mapStateToProps)(ItemList);
