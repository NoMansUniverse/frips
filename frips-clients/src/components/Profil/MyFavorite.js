import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addFavorite,
  fetchMyFavorite,
  removeFavorite,
} from "../../actions/index";
import API_ENDPOINT from "../../api/url";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  GridSystem: {
    display: "grid",
    gridTemplateColumns: "repeat(3,33%)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  floatContentArticle: {
    display: "flex",
    flexDirection: "column",
    width: 1000,
    margin: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "block",
    },
  },
}));

const renderedItem = (favoriteItems, classes, favorite, dispatch, navigate) => {
  return favoriteItems.map((item, index) => {
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
                navigate(`/items/${item.id}`);
              }}
            >
              <img
                alt={`${API_ENDPOINT}/images/${item.id}/${item?.image[0]?.image}`}
                src={`${API_ENDPOINT}/images/${item.id}/${item?.image[0]?.image}`}
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
                  dispatch(removeFavorite(item.id, 1));
                } else {
                  dispatch(addFavorite(item.id, 1));
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

            <Typography>{item._count ? item._count.favorit : null}</Typography>
          </Box>
        </Card>
      </Box>
    );
  });
};

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  margin: 0;
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
  align-items: center;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  li a {
    height: 40px;
    padding: 0 10px;
    font-size: 0.9375rem;
    min-width: 40px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.23);

    color: rgba(0, 0, 0, 0.87);
    margin: 0 3px;
    box-sizing: border-box;
    text-align: center;
    font-family: "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.43;
    cursor: pointer;
    display: inline-flex;
    outline: 0;
    position: relative;
    align-items: center;
    user-select: none;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: rgba(130, 160, 194, 0.3);
    border-color: 1px solid rgba(130, 160, 194, 0.5);
    color: #82a0c2;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
const MyFavorite = ({ loading, items, favoriteIds, count }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [pagination, changePagination] = useState(1);
  const theme = useTheme();
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = ({ selected }) => {
    changePagination(selected + 1);
  };

  useEffect(() => {
    dispatch(fetchMyFavorite(pagination));
    window.scrollTo(0, 0);
  }, [dispatch, pagination]);

  const renderedItems = useMemo(() => {
    return renderedItem(items, classes, favoriteIds, dispatch, history);
  }, [items, favoriteIds, dispatch]);

  if (loading && items.length === 0) {
    return (
      <Box
        width={"100%"}
        height={"100vh"}
        style={{ backgroundColor: "#F5f5f3" }}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <Box
        width={"100%"}
        height={"100vh"}
        style={{ backgroundColor: "#F5f5f3" }}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>
          Vous n'avez aucun favori
        </Typography>
      </Box>
    );
  }

  return (
    <Box width={"100%"} style={{ backgroundColor: "#F5f5f3" }}>
      <Box height={"15vh"} />
      <Box className={classes.floatContentArticle}>
        <Box margin="auto" padding={3}>
          <Typography style={{ fontSize: 22, fontWeight: 500 }}>
            My Favorites
          </Typography>
        </Box>
        <Box padding={3} className={classes.GridSystem}>
          {renderedItems}
        </Box>
        <Box className={classes.PaginationBox}>
          <MyPaginate
            pageCount={Math.ceil(count / 6)}
            onPageChange={handleChange}
            pageRangeDisplayed={!mobile ? 2 : 1}
            forcePage={pagination - 1}
            marginPagesDisplayed={!mobile ? 2 : 1}
            nextLabel={
              <ArrowForwardIosIcon
                style={{
                  color:
                    pagination !== Math.ceil(count / 6)
                      ? "rgba(130, 160, 194, 1)"
                      : "grey",
                }}
              />
            }
            nextClassName={classes.arrow}
            previousLabel={
              <ArrowBackIosIcon
                style={{
                  color: pagination !== 1 ? "rgba(130, 160, 194, 1)" : "grey",
                }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  items: state.favoriteReducers.favoritItem,
  loading: state.favoriteReducers.loading,
  favoriteIds: state.favoriteReducers.favoritIds,
  count: state.favoriteReducers.count,
});

export default connect(mapStateToProps)(MyFavorite);
