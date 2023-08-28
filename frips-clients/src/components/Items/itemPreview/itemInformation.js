import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import _ from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, newConv, removeFavorite } from "../../../actions";
import API_ENDPOINT from "../../../api/url";
import PricePropose from "../../Checkout/PricePropose";
const ItemInformation = ({ state, classes, review, myAccount, favorite }) => {
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClickAway = () => {
    setAnchorEl(false);
  };

  const dispatch = useDispatch();

  if (!state?.Price) {
    return null;
  }

  return (
    <Box height={"100%"}>
      <Box className={classes.floatContentProfil} position="relative">
        <Box display="flex" padding={2} width={"100%"}>
          <Box display="flex" alignItems="center">
            <CardHeader
              style={{ padding: 0 }}
              avatar={
                <IconButton
                  onClick={() => {
                    history(`/member/${state.account.Pseudo}`);
                  }}
                >
                  <Avatar
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      cursor: "pointer",
                      height: 50,
                      width: 50,
                    }}
                    alt={`${state.account.Pseudo}`}
                    src={`${API_ENDPOINT}/imageProfile/${state.account.id}/${state.account?.image?.image}`}
                  />
                </IconButton>
              }
            />
            <Box display="flex" flexDirection={"column"} position="relative">
              <Typography
                onClick={() => {
                  history(`/member/${state.account.Pseudo}`);
                }}
                style={{
                  fontSize: 16,
                  cursor: "pointer",
                  wordBreak: "break-word",
                }}
              >
                {state.account.Pseudo}
              </Typography>
              <Rating value={review} precision={0.5} readOnly />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.floatContentInformation}>
        <Box marginBottom={2}>
          <Typography style={{ fontSize: "1.5em" }}>
            {state.Price} CHF
          </Typography>
        </Box>

        <Box display="flex" marginTop={2}>
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Marque
            </Typography>
          </Box>

          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16 }}>
              {state.item_brand[0].brand.Name}
            </Typography>
          </Box>
        </Box>

        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Taille
            </Typography>
          </Box>
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16 }}>{state.Size}</Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Etat
            </Typography>
          </Box>
          <Box className={classes.ContentInformationItem}>
            <Typography
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                fontSize: 16,
              }}
            >
              {state.itemcondition.Name}
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Couleur (s)
            </Typography>
          </Box>
          <Box className={classes.ContentInformationItem}>
            {state.item_brand === 1
              ? state.item_brand.color.Name
              : state.item_color.map((item, index) => {
                  if (index === 0) {
                    return (
                      <Typography style={{ fontSize: 16 }}>
                        {item.color.Name}
                      </Typography>
                    );
                  } else {
                    return (
                      <Typography style={{ fontSize: 16 }}>
                        {`   ${item.color.Name}`}
                      </Typography>
                    );
                  }
                })}
          </Box>
        </Box>

        <Divider style={{ marginTop: 5 }} />
        <Box marginTop={2}>
          <Box height={"100%"}>
            <Box display="inline-block" lineHeight={2}>
              <Typography style={{ fontSize: 17, color: "#999998" }}>
                Nom
              </Typography>
            </Box>

            <Box display="inline-block" width={"100%"}>
              <Typography style={{ wordWrap: "break-word", fontSize: 16 }}>
                {state.Name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box marginTop={1}>
          <Box height={"100%"}>
            <Box display="inline-block" lineHeight={2}>
              <Typography style={{ fontSize: 16, color: "#999998" }}>
                Description
              </Typography>
            </Box>

            <Box display="inline-block" width={"100%"}>
              <Typography style={{ wordWrap: "break-word", fontSize: 16 }}>
                {state.Description}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {myAccount?.id !== state?.account?.id ? (
            <Button
              variant="outlined"
              style={{ width: "100%", marginTop: 5 }}
              onClick={() => {
                dispatch(newConv(state.id, state, history));
              }}
            >
              Envoyer un message
            </Button>
          ) : null}

          <Button
            style={{ width: "100%", marginTop: 5 }}
            variant="contained"
            color="primary"
            onClick={() => history(`/payment/${state.id}`)}
          >
            Acheter
          </Button>

          {myAccount?.id !== state?.account?.id ? (
            <Button
              style={{ width: "100%", marginTop: 5 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                if (!Boolean(myAccount)) {
                  history("/signup");
                } else {
                  handleClick();
                }
              }}
            >
              Faire une offre
            </Button>
          ) : null}
          {anchorEl ? (
            <PricePropose
              itemPrice={state.Price}
              idReceiver={state.account.id}
              itemId={state.id}
              handleClickAway={handleClickAway}
              anchorEl={anchorEl}
            />
          ) : null}

          <Button
            variant="outlined"
            style={{ width: "100%", marginTop: 5 }}
            onClick={() => {
              if (Boolean(myAccount)) {
                if (_.some(favorite, { id_Item: state.id })) {
                  dispatch(removeFavorite(state.id, null, false));
                } else {
                  dispatch(addFavorite(state.id, null, false));
                }
              } else {
                history("/signup");
              }
            }}
          >
            {_.some(favorite, { id_Item: state.id }) ? (
              <Box display="flex" width={"100%"} justifyContent="center">
                <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
                enlever des favoris
              </Box>
            ) : (
              <Box display="flex" justifyContent="center">
                <FavoriteBorderIcon
                  style={{ color: "grey" }}
                ></FavoriteBorderIcon>
                ajouter aux favoris
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemInformation;
