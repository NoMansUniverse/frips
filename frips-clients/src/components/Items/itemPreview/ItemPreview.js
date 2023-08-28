import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { isNumber } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchItem, idFavorite, itemViewed } from "../../../actions";
import { RESET_ITEM } from "../../../actions/type";
import ImageGalleryPreview from "./ImageGalleryPreview";
import ItemProfil from "./ItemFromProfil";
import ItemInformation from "./itemInformation";
import { Rating } from "@material-ui/lab";
import API_ENDPOINT from "../../../api/url";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  },

  floatContentInfomrationdiv: {
    width: "25%",
    height: 565,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  floatContentInformation: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 20,
  },
  floatContentProfil: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 4,
  },
  floatContentImage: {
    boxSizing: "border-box",
    paddingRight: 10,
    height: 565,
    minHeight: 565,
    minWidth: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "40vh",
      left: "auto",
      right: "auto",
      padding: 20,
    },
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "75%",
    },
  },
  ContentInformationItem: {
    width: "calc(50% - 5px)",
    marginTop: 2,
  },
  ContentInformationButton: {},
  popover: {
    pointerEvents: "none",
  },
  floatContentArticle: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "block",
    },
  },
  ArticleProfil: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
    },
  },
  Container: {
    width: 1300,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
    },
  },
  profile: {
    marginLeft: "1vw",
    margin: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: "1vh",
    alignItems: "center",
    display: "flex",
    backgroundColor: "rgba(205, 217, 231,1)",
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const ItemPreview = (props) => {
  const classes = useStyles();
  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  let singleItem = useSelector((state) => state.items.UniqueItem);
  let loading = useSelector((state) => state.items.loading);
  const myAccount = useSelector((state) => state.auth.user);
  let favorite = useSelector((state) => state.favoriteReducers.favoritIds);
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    if (isNumber(id)) {
      dispatch(fetchItem(id));
      dispatch(idFavorite());
      dispatch(itemViewed(id));
    }

    window.scrollTo(0, 0);

    return () => {
      dispatch({ type: RESET_ITEM });
    };
  }, [dispatch, location, id]);
  if (Boolean(singleItem.length===0) && loading) {
    return (
      <Box
        width="100%"
        height={"100vh"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  } else {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
      >
        <Box className={classes.Container}>
          <Box height={"10vh"} width={"100%"}></Box>

          <Box className={classes.floatContentArticle}>
            <Box
              display="flex"
              className={classes.floatContentImage}
              marginBottom={5}
            >
              <ImageGalleryPreview
                images={singleItem.image}
              ></ImageGalleryPreview>
            </Box>

            <Box paddingLeft={2} className={classes.floatContentInfomrationdiv}>
              <ItemInformation
                state={singleItem}
                classes={classes}
                review={singleItem.review}
                myAccount={myAccount}
                favorite={favorite}
              />
            </Box>
            <Box height={"15vh"} width={"100%"}></Box>
            <Box className={classes.profile}>
              <Box display={"flex"} alignItems="center" width={"100%"}>
                <IconButton
                  onClick={() => {
                    history(`/member/${singleItem?.account?.Pseudo}`);
                  }}
                >
                  <Avatar
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      cursor: "pointer",
                    }}
                    alt={`${singleItem?.account?.Pseudo}`}
                    src={`${API_ENDPOINT}/imageProfile/${singleItem?.account?.id}/${singleItem.account?.image?.image}`}
                  />
                </IconButton>
                <Typography
                  style={{
                    fontSize: 16,
                    wordBreak: "break-all",
                  }}
                >
                  {singleItem?.account?.Pseudo}
                </Typography>
                <Box
                  display={"flex"}
                  flexGrow={1}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Rating
                    size="large"
                    value={singleItem?.review}
                  
                    precision={0.5}
                    readOnly
                  />
                </Box>
              </Box>
            </Box>
            <Box className={classes.ArticleProfil}>
              <ItemProfil
                items={singleItem.userItem}
                favorite={favorite}
                number={2}
              />
            </Box>
            <Box height={50} width={"100%"} />
            <Box display="flex" width={"100%"} height={40} padding={2}>
              <Typography style={{ fontSize: 20, color: "#757575" }}>
                Offres similaire
              </Typography>
            </Box>

            <Box height={"5vh"} width={"100%"} />

            <Box className={classes.ArticleProfil}>
              <ItemProfil
                favorite={favorite}
                items={singleItem.findedSimilarProduct}
                number={3}
              ></ItemProfil>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default ItemPreview;
