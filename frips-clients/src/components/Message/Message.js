import { Avatar, Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import moment from "moment";
import "moment/locale/de";
import "moment/locale/fr";
import ProposeMessage from "./ProposeMessage";
import { useDispatch } from "react-redux";
import { sendDateProposition } from "../../actions";
import API_ENDPOINT from "../../api/url";
const useStyles = makeStyles((theme) => ({
  MenuSetting: {
    height: 30,
    width: "100%",
    display: "flex",
    position: "relative",
  },
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    padding: 30,
    margin: "auto",
    position: "relative",
  },
  MessageBoxLeft: {
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
  MessageBoxRight: {
    display: "flex",
    justifyContent: "flex-start",
    position: "relative",
    padding: 5,
    alignItems: "center",
  },
  Message: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word",
    borderRadius: 5,
    color: "black",
    maxWidth: 400,
    minWidth: 350,
    wordBreak: "break-word",
    hyphens: "auto",
    [theme.breakpoints.down("sm")]: {
      minWidth: "50%",
    },
  },
}));

const offerReceiver = (item, dispatch) => {
  if (
    item?.pricepropose[0].SendDate &&
    item?.pricepropose[0].Approve === null && 
    !item?.pricepropose[0]?.dateApprove
  ) {
    return (
      <Box padding={2} width="100%" display={"flex"}>
        <div style={{ flexGrow: 1, padding: 5 }}>
          <Button
            onClick={() => {
              dispatch(sendDateProposition(item.id, new Date(),true,item?.pricepropose[0]?.id_Account))
            }}
            style={{ backgroundColor: "white", width: "100%" }}
          >
            Accepter
          </Button>
        </div>
        <div style={{ flexGrow: 1, padding: 5 }}>
          <Button
            onClick={() => {
              dispatch(sendDateProposition(item.id, null,false,item?.pricepropose[0]?.id_Account));
            }}
            style={{ backgroundColor: "white", width: "100%" }}
          >
            Refuser
          </Button>
        </div>
      </Box>
    );
  }
  if (item?.pricepropose[0]?.SendDate && item?.pricepropose[0]?.Approve) {
    return (
      <Box padding={2} width="100%" display={"flex"} justifyContent="center" alignItems={"center"}>
        <Typography style={{ fontSize: 16 }}> Offre acceptée </Typography>
      </Box>
    );
  }
  if (item?.pricepropose[0]?.SendDate && !item?.pricepropose[0]?.Approve) {
    return (
      <Box padding={2} width="100%" display={"flex"} justifyContent="center" alignItems={"center"}>
        <Typography style={{ fontSize: 16 }}> Offre refusée </Typography>
      </Box>
    );
  }
};

const offerSender = (item, dispatch) => {
  if (
    item?.pricepropose[0].SendDate  &&
    item?.pricepropose[0].Approve === null && 
    !item?.pricepropose[0]?.dateApprove
  ) {
    return (
      <Box padding={2} width="100%" display={"flex"} justifyContent="center" alignItems={"center"}>
        <Typography style={{ fontSize: 16 }}>...Offre en attente </Typography>
      </Box>
    );
  }
  if (item?.pricepropose[0]?.SendDate && item?.pricepropose[0]?.Approve &&
    item?.pricepropose[0]?.dateApprove) {
    return (
      <Box padding={2} width="100%" display={"flex"}>
        <Typography style={{ fontSize: 16 }} justifyContent="center" alignItems={"center"}> Offre acceptée </Typography>
      </Box>
    );
  }
  if (
    item?.pricepropose[0]?.SendDate &&
    !item?.pricepropose[0]?.Approve &&
    item?.pricepropose[0]?.dateApprove
  ) {
    return (
      <Box padding={2} width="100%" display={"flex"}>
        <Typography style={{ fontSize: 16 }} justifyContent="center" alignItems={"center"}> Offre refusée </Typography>
      </Box>
    );
  }
};

const Message = ({
  own,
  Text,
  hours,
  item,
  id_Sender,
  userId,
  image,
  setRef,
  index,
  newMessage,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  if (own) {
    if (Boolean(item)) {
      return (
        <div className={classes.MessageBoxLeft} key={index}>
          <Box
            padding={2}
            paddingTop={1}
            paddingBottom={1}
            position="relative"
            display="flex"
            flexDirection="column"
          >
            <Box
              className={classes.Message}
              style={{ backgroundColor: "#82A0C2" }}
              display="flex"
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <ProposeMessage />
              <Box
                className={classes.MessageBoxRight}
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                }}
              >
                <Box height={150} width={150}>
                  <img
                    alt={`${API_ENDPOINT}/images/${item.id}/${item.image[0].image}`}
                    src={`${API_ENDPOINT}/images/${item.id}/${item.image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box flexGrow={1} display={"flex"} flexDirection="column">
                  <Box padding={2} display="flex" flexGrow={1}>
                    <Typography style={{ fontSize: 16 }}>
                      Prix de base :
                    </Typography>
                    <Typography style={{ fontSize: 16 }}>
                      {item.Price} CHF
                    </Typography>
                  </Box>

                  <Box padding={2} display="flex" flexGrow={1}>
                    <Typography style={{ fontSize: 16 }}>Offre :</Typography>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item?.pricepropose[0]?.Price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {offerSender(item, dispatch)}

              <Box
                className={classes.MessageBoxLeft}
                width="100%"
                padding={0.2}
              >
                <Typography style={{ fontSize: 12 }}>
                  {moment(hours).local().format("LT")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      );
    } else {
      return (
        <div className={classes.MessageBoxLeft}>
          <Box
            padding={2}
            paddingTop={1}
            paddingBottom={1}
            position="relative"
            display="flex"
            flexDirection="column"
          >
            <Box
              className={classes.Message}
              style={{ backgroundColor: "#82A0C2" }}
              display="flex"
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                className={classes.MessageBoxRight}
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                }}
              >
                <Typography style={{ fontSize: 16 }}>{Text}</Typography>
              </Box>
              <Box
                className={classes.MessageBoxLeft}
                width="100%"
                padding={0.2}
              >
                <Typography style={{ fontSize: 12 }}>
                  {moment(hours).local().format("LT")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      );
    }
  } else {
    if (item) {
      return (
        <div
          className={classes.MessageBoxRight}
          ref={index === 0 ? setRef : null}
        >
          <Box paddingTop={1} paddingBottom={1}>
            <Box
              className={classes.Message}
              style={{ backgroundColor: "#F5f3f3" }}
              display="flex"
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <ProposeMessage />

              <Box
                className={classes.MessageBoxRight}
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                }}
              >
                <Box height={150} width={150}>
                  <img
                    alt={`${API_ENDPOINT}/images/${item.id}/${item.image[0].image}`}
                    src={`${API_ENDPOINT}/images/${item.id}/${item.image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box flexGrow={1} display={"flex"} flexDirection="column">
                  <Box padding={2} display="flex" flexGrow={1}>
                    <Typography style={{ fontSize: 16 }}>
                      Prix de base :
                    </Typography>
                    <Typography style={{ fontSize: 16 }}>
                      {item.Price} CHF
                    </Typography>
                  </Box>

                  <Box padding={2} display="flex" flexGrow={1}>
                    <Typography style={{ fontSize: 16 }}>Offre :</Typography>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item?.pricepropose[0]?.Price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {offerReceiver(item, dispatch)}

              <Box
                className={classes.MessageBoxRight}
                width="100%"
                padding={0.2}
              >
                <Typography style={{ fontSize: 12 }}>
                  {moment(hours).local().fromNow() ===
                  "il y a quelques secondes"
                    ? moment(hours).local().fromNow()
                    : moment(hours).local().format("LT")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      );
    } else {
      return (
        <div
          className={classes.MessageBoxRight}
          ref={index === 0 ? setRef : null}
        >
          <Avatar
            src={`${API_ENDPOINT}/imageProfile/${image.ProfileNumber}/${image.imageProfile}`}
            style={{ marginRight: 10 }}
          />

          <Box paddingTop={1} paddingBottom={1}>
            <Box
              className={classes.Message}
              style={{
                backgroundColor: "#F5f3f3",
                border: "solid 1px",
                borderRadius: 4,
                borderColor: "#F5f3f3",
              }}
              display="flex"
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                className={classes.MessageBoxRight}
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                }}
              >
                <Typography style={{ fontSize: 16 }}>{Text}</Typography>
              </Box>
              <Box
                className={classes.MessageBoxRight}
                width="100%"
                padding={0.2}
              >
                <Typography style={{ fontSize: 12 }}>
                  {moment(hours).local().fromNow() ===
                  "il y a quelques secondes"
                    ? moment(hours).local().fromNow()
                    : moment(hours).local().format("LT")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      );
    }
  }
};

export default Message;
