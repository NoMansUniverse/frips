import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import _ from "lodash";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../../actions";
import API_ENDPOINT from "../../../api/url";

const useStyles = makeStyles((theme) => ({
  floatContentInfomrationdiv: {
    width: "25%",
    height: 565,
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
    gridTemplateColumns: "repeat(4,25%)",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2,50%)",
    },
  },
}));

const renderedItem = (state, classes, favorite, dispatch, navigate, number) => {
  return state?.map((item, index) => {
    let category = item?.item_category[0]?.category?.Name;
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
            <Typography>{category}</Typography>
          </Box>
          <Divider />
          <Box height={44} display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                if (_.some(favorite, { id_Item: item.id })) {
                  dispatch(removeFavorite(state[index].id, number));
                } else {
                  dispatch(addFavorite(state[index].id, number));
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

const ItemProfil = ({ items, favorite, number }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderedItems = useMemo(() => {
    return renderedItem(items, classes, favorite, dispatch, navigate, number);
  }, [items, favorite]);

  return <Box className={classes.GridSytem}>{renderedItems}</Box>;
};

export default ItemProfil;
