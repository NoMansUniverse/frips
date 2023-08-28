import React, { useEffect, useMemo, useState } from "react";

import {
  Avatar,
  Box,
  Button,
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
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addFavorite,
  changePagination,
  getItemCreationInfo,
  idFavorite,
  paginationForFilter,
  removeFavorite,
} from "../../../actions";
import API_ENDPOINT from "../../../api/url";
import MyPaginate from "../../Footer/PaginationComponent";
import { arraySize, Catalogue } from "../staticItems/staticItemName";
import CostumChips from "./CostumChips";
import RenderChipsComponents from "./RenderChipsComponent";

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
  },
  GridSytem: {
    display: "grid",
    gridTemplateColumns: "repeat(5,20%)",
    width: "100%",
    position: "relative",

    minHeight: 400,
    opacity: (props) => {
      if (props) {
        return 0.5;
      } else {
        return null;
      }
    },
    transition: (props) => {
      if (props) {
        return "opacity .25s ease-out";
      } else {
        return null;
      }
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },
  pagination: {
    flexWrap: "nowrap",
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      overflow: "hidden",
      flexWrap: "nowrap",
    },
  },
  PaginationBox: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "auto",
      flex: "none",
    },
  },
}));

const renderedItem = (state, classes, favorite, dispatch, history) => {
  return state.map((item, index) => {
    let category = item.item_category[0].category.Name;
    let brand = item.item_brand[0].brand.Name;
    return (
      <Box width={"100%"} height={"100%"} padding={1} id={item}>
        <Card className={classes.BoxOneItem}>
          <Box
            display={"flex"}
            alignItems="center"
            marginBottom={2}
            width="100%"
          >
            <IconButton
              onClick={() => {
                history(`/member/${item.account.Pseudo}`);
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
                history(`/items/${state[index].id}`);
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
            <Typography>{brand}</Typography>
            <Typography>{category}</Typography>
          </Box>
          <Divider />
          <Box height={44} display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                if (_.some(favorite, { id_Item: item.id })) {
                  dispatch(removeFavorite(state[index].id, 5));
                } else {
                  dispatch(addFavorite(state[index].id, 5));
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

const filterBy = [
  { Name: "Prix décroissant", id: 0, label: "sortedBy" },
  { Name: "Prix croissant", id: 1, label: "sortedBy" },
];

const DisplayCatalogue = ({
  items,
  loaded,
  loading,
  itemInfo,
  pagination,
  filterLoading,
  infoLoading,
  count,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles(loading);

  const theme = useTheme();
  const history = useNavigate();

  useEffect(() => {
    return () => {
      dispatch({ type: "RESTORE" });
    };
  }, []);

  useEffect(() => {
    if (itemInfo && !infoLoading) {
      setTypeOfFilter([
        { label: "Catalogue", array: Catalogue },
        { label: "Taille", array: arraySize },
        { label: "Couleur", array: itemInfo.itemColorInfo },
        { label: "Marque", array: itemInfo.brandInfo },
        { label: "Price", array: null },
        { label: "Etat", array: itemInfo.itemconditionInfo },
        { label: "sortedBy", array: filterBy },
      ]);
    }
    if (!itemInfo && !infoLoading) {
      dispatch(getItemCreationInfo());
    }
  }, [dispatch, itemInfo, infoLoading]);

  useEffect(() => {
    dispatch(idFavorite());
  }, [dispatch]);

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const favorite = useSelector((state) => state.favoriteReducers.favoritIds);
  const handleChange = ({ selected }) => {
    dispatch(changePagination(selected + 1));
  };

  const [filterItem, setFilterItem] = useState(items);
  const allFilterProps = useSelector(
    (state) => state.filterCatalogue.AllFilter
  );
  const chips = useSelector(
    (state) => state.filterCatalogue.Chips
  );

  const [typeOfFilter, setTypeOfFilter] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    if (items.length !== 0 && !loading) {
      setFilterItem(items);
    }
  }, [items, dispatch, loading]);

  useEffect(() => {
    dispatch(paginationForFilter());
  }, [dispatch, allFilterProps, pagination, filterLoading]);

  const renderedItems = useMemo(() => {
    if (count === 0 && !loading) {
    } else {
      return renderedItem(filterItem, classes, favorite, dispatch, history);
    }
  }, [filterItem, items, allFilterProps]);

  if (loading && itemInfo?.length === 0) {
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
      id="scrollable"
    >
      <Box width={"100%"} margin="auto">
        <Box height={"10vh"} />

        <Box
          display="flex"
          flexDirection={"column"}
          margin={"auto"}
          width={"100%"}
          padding={4}
        >
          {typeOfFilter ? <CostumChips TypeCatalogue={typeOfFilter} /> : null}
          <RenderChipsComponents />
        </Box>
        {count === 0 && !loading ? (
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            alignItems="center"
            flexDirection={"column"}
            marginBottom={10}
          >
            <Typography
              style={{
                fontSize: "1.3rem",
                color: "#82A0C2",
                paddingLeft: "1.3rem",
                marginBottom:10
              }}
            >
              Oups il semblerait qu'il n'y ait aucun résultat correspondant à
              votre recherche
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history("/items/allNewItems")
                dispatch({ type: "RESTORE" });
              }}
              style={{ marginLeft: "1rem" }}
            >
              {chips.length === 1
                ? "Effacer le filtre"
                : "Effacer les filtres"}
            </Button>
          </Box>
        ) : (
          <Box className={classes.GridSytem}>{renderedItems}</Box>
        )}

        <Box className={classes.PaginationBox}>
          <MyPaginate
            pageCount={Math.ceil(count / 15)}
            onPageChange={handleChange}
            pageRangeDisplayed={!mobile ? 2 : 1}
            forcePage={pagination - 1}
            marginPagesDisplayed={!mobile ? 2 : 1}
            nextLabel={
              <ArrowForwardIosIcon
                style={{
                  color:
                    pagination !== Math.ceil(count / 15)
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
  items: Object.values(state.filterCatalogue?.items),
  loading: state.filterCatalogue.loading,
  loaded: state.filterCatalogue.loaded,
  count: state.filterCatalogue.count,
  infoLoading: state.itemInfo.loading,

  itemInfo: state.itemInfo.itemInfo,
  pagination: state.filterCatalogue.pagination,
  idFavorite: state.items.favorites,
  filterLoading: state.filterCatalogue.filterLoading,
  filterLoaded: state.filterCatalogue.filterLoaded,
});

export default connect(mapStateToProps)(DisplayCatalogue);
