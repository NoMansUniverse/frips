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
import _ from "lodash";
import React, { useMemo } from "react";
import { AiFillFire } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../../actions";
import API_ENDPOINT from "../../../api/url";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Rating } from "@material-ui/lab";

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
  profile: {
    marginLeft: "1vw",
    margin: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom:"1vh",
    alignItems: "center",
    display: "flex",
    backgroundColor: "rgba(205, 217, 231,1)",
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const renderedItem = (state, classes, favorite, dispatch, history, mobile) => {
  if (!Boolean(state)) return;
  return (
    <React.Fragment>
      {state.map((item, index) => {
        return (
          <Box width={"100%"} height={"100%"} maxHeight={550} padding={1}>
            <Card className={classes.BoxOneItem}>
              <Box
                display={"flex"}
                alignItems="center"
                marginBottom={5}
                width="100%"
              />
              <Box>
                <CardActionArea
                  style={{ width: "100%", height: 300 }}
                  onClick={() => {
                    history(`/items/${state[index].id}`);
                  }}
                >
                  <img
                    alt={`/images/${state[index].id}/${state[index].image[0].image}`}
                    src={`${API_ENDPOINT}/images/${state[index].id}/${state[index].image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
                      dispatch(removeFavorite(state[index].id, 7));
                    } else {
                      dispatch(addFavorite(state[index].id, 7));
                    }
                  }}
                >
                  {_.some(favorite, { id_Item: item.id }) ? (
                    <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
                  ) : (
                    <FavoriteBorderIcon
                      style={{ color: "grey" }}
                    />
                  )}
                </IconButton>

                <Typography>
                  {state[index]._count ? state[index]._count.favorit : null}
                </Typography>
              </Box>
            </Card>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

const TopBusiness = ({ favorite, loading, mobile, accountTop }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const renderTopBusiness = useMemo(() => {
    return renderedItem(
      accountTop?.item,
      classes,
      favorite,
      dispatch,
      history,
      mobile
    );
  }, [accountTop, favorite, loading]);

  if (Boolean(accountTop)) {
    return (
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Box padding={1.5} display={"flex"} alignItems="center">
          <Typography style={{ fontSize: 18, fontWeight: 550 }}>
            Top Vendeur
          </Typography>
          <AiFillFire size={20} />
        </Box>
        <Box className={classes.profile}>
          <Box display={"flex"} alignItems="center" width={"100%"}>
            <IconButton
              onClick={() => {
                history(`/member/${accountTop.Pseudo}`);
              }}
            >
              <Avatar
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  cursor: "pointer",
                }}
                alt={`${accountTop.Pseudo}`}
                src={`${API_ENDPOINT}/imageProfile/${accountTop.id}/${accountTop?.image?.image}`}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: 16,
                wordBreak: "break-all",
              }}
            >
              {accountTop.Pseudo}
            </Typography>
            <Box
              display={"flex"}
              flexGrow={1}
              alignItems="center"
              justifyContent={"center"}
            >
              <Rating
                size="large"
                value={accountTop?._avg?.Note}
                precision={0.5}
                readOnly
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.GridSytem}>{renderTopBusiness}</Box>
      </Box>
    );
  }
  return <></>;
};

export default TopBusiness;
