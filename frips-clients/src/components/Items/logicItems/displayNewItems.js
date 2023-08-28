import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import _ from "lodash";
import React, { useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../../actions";
import API_ENDPOINT from "../../../api/url";
import { MdFavorite } from "react-icons/md";

const renderedItem = (state, classes, favorite, dispatch, history, mobile) => {
  return (
    <React.Fragment>
      {state.map((item, index) => {
        return (
          <Box width={"100%"} height={"100%"} maxHeight={540} padding={1}>
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
                      dispatch(removeFavorite(state[index].id, 4));
                    } else {
                      dispatch(addFavorite(state[index].id, 4));
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
      })}

      {!mobile ? (
        <Box
          width={"100%"}
          height={"100%"}
          padding={1}
          maxHeight={540}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            className={classes.BoxOneItem}
            style={{
              backgroundColor: "#f5f6f7",
              borderRadius: 5,
              opacity: 0.6,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ width: "100%", height: "100%" }}
            >
              <CardActionArea
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  history("/items/allNewItems");
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ width: "100%", height: "100%" }}
                >
                  <Typography style={{ color: "black", fontSize: 20 }}>
                    Afficher plus
                  </Typography>
                </Box>
              </CardActionArea>
            </Box>
          </Card>
        </Box>
      ) : 
        null
      }
    </React.Fragment>
  );
};

const DisplayNewItems = ({ classes, favorite, loading }) => {
  const history = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.newItem);

  const renderedItems = useMemo(() => {
    return renderedItem(items, classes, favorite, dispatch, history, mobile);
  }, [items, favorite, loading, mobile]);

  if (items.length !== 0 && !loading) {
    return (
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Box padding={1.5} display={"flex"} alignItems="center">
          <Typography style={{ fontSize: 18, fontWeight: 550 }}>
            Articles les plus aimés
          </Typography>
          <MdFavorite size={20} />

        </Box>
        <Box className={classes.GridSytem}>{renderedItems}</Box>
        {mobile ? <Box
          alignItems={"center"}
          justifyContent="center"
          display={"flex"}
          height={100}
          width="100%"
          onClick={() => {
            history("/items/allNewItems");
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <Typography style={{ color: "black", fontSize: 20 }}>
            Afficher plus
          </Typography>
        </Box>:null}
      </Box>
    );
  }
  return <></>;
};

const mapStateToProps = (state) => ({
  items: state.items.newItem,
  loading: state.items.loading,
});

export default connect(mapStateToProps)(DisplayNewItems);
