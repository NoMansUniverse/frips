import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "moment/locale/fr";
import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addMessage,
  getConv,
  getItemForPropse,
  readMessage,
  receivedNewMessage,
  sendMessage,
} from "../../actions";
import { ERROR_MESSAGE } from "../../actions/type";
import API_ENDPOINT from "../../api/url";
import PricePropose from "../Checkout/PricePropose";
import ErrorModalMessage from "./ErrorModalMessage";
import MessageComponent from "./renderMessageComponent";

const useStyles = makeStyles((theme) => ({
  MenuSetting: {
    height: 65,
    width: "100%",
    display: "flex",
    position: "relative",
  },
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    padding: 12,
    margin: "auto",
    flex: 3,
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
    },
  },
  textfield: {
    width: "70%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
      margin: 0,
    },
  },

  Header: {
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  MessageBox: {
    position: "relative",
    flexGrow: 3,
    display: "flex",
    height: 300,
    overflow: "auto",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
    },
  },
  container: {
    flexGrow: 1,
    marginBottom: "5vh",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
      marginBottom: 0,
      height: "calc(100vh - 164px)",
    },
  },
  Divider: {
    height: "10vh",
    [theme.breakpoints.down("sm")]: {
      height: 0,
    },
  },
  page: {
    
  },
}));

const renderProfileName = (Profile, userId) => {
  if (!Profile) return;

  if (Profile.Profile1.ProfileNumber === userId) {
    return Profile.Profile2.ProfileName;
  } else {
    return Profile.Profile1.ProfileName;
  }
};

const renderProfileNumber = (Profile, userId) => {
  if (!Profile) return;
  if (Profile.Profile1.ProfileNumber === userId) {
    return Profile.Profile2.ProfileNumber;
  } else {
    return Profile.Profile1.ProfileNumber;
  }
};

const renderProfilImage = (Profile, userId) => {
  if (!Profile) return;
  if (Profile.Profile1.ProfileNumber === userId) {
    return Profile.Profile2?.imageProfile;
  } else {
    return Profile.Profile1?.imageProfile;
  }
};

const id_Receiver = (Profile, userId) => {
  if (Profile.Profile1.ProfileNumber !== userId) {
    return Profile.Profile1.ProfileNumber;
  }
  if (Profile.Profile2.ProfileNumber !== userId) {
    return Profile.Profile2.ProfileNumber;
  }
};

const swissArrayNumber = ["076", "077", "078", "079"];

function isSwissPhoneNumber(inputString) {
  const regex = /(\d+)/g;
  const numbers = inputString.match(regex);
  if (!numbers) {
    return false;
  }
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    if (
      number.length >= 2 &&
      [
        "076",
        "077",
        "078",
        "079",
        "0076",
        "0077",
        "0078",
        "0079",
        "07",
        "07",
        "07",
      ].includes(number.slice(0, 3))
    ) {
      return true;
    }
  }
  return false;
}

function checkString(inputString, setCheckForbiddenAction) {
  const regexLinks = /((https?:\/\/|www\.)[^\s]+)/g; // regex to match URLs

  const regexForbiddenWords =
    /(fb|facebook|insta|instagram|snap|snapchat|whatsapp|telegram|email|@|mon num|téléphone|tel|phone)/i; // regex to match forbidden words
  return !(
    regexLinks.test(inputString) ||
    regexForbiddenWords.test(inputString.replace(/\s/g, "")) ||
    isSwissPhoneNumber(inputString.replace(/\s/g, ""))  
  );
}

const Conversation = ({
  conv,
  loading,
  userId,
  newMessage,
  Profile,
  socket,
  imageSender,
}) => {
  const classes = useStyles();
  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  const [Message, setMessage] = useState({ text: "", chat_id: id });
  const [receivedMessage, setReceivedMessage] = useState(false);
  const [isBottom, setIsBottom] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [error, setError] = useState(false);
  const [checkForbiddenAction, setCheckForbiddenAction] = useState({
    arrayMessage: [],
    digitsArray: [],
  });

  const history = useNavigate();
  const fromItem = useLocation().state;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));


  if (mobile) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const handleClick = () => {
    setAnchorEl(true);
  };
  const handleClickAway = () => {
    dispatch({ type: ERROR_MESSAGE, payload: null });
    setAnchorEl(false);
  };

  useEffect(() => {
    if (socket && !socket?.connected) {
      console.log("Socket is not connected. Attempting to reconnect...");
      socket.connect();
    }
    if (socket?.connected) {
      socket.emit("join room", id);

      socket.on("message received", (text) => {
        dispatch(receivedNewMessage(true));
        dispatch(addMessage(text));
      });

      return () => {
        socket.emit("unsubscribe", id);
        socket.off("message received");
        socket.off("new message");
      };
    } else {
    }
  }, [socket?.connected, dispatch, id]);

  useEffect(() => {
    if (error) {
      dispatch(getConv(id));
      dispatch(readMessage(id));
    }
  }, [error]);

  useEffect(() => {
    if (!Number.isNaN(id) || error) {
      dispatch(getConv(id));
      dispatch(readMessage(id));
      setError(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isBottom) {
      dispatch(receivedNewMessage(false));
    }
  }, [newMessage, dispatch]);

  useEffect(() => {
    if (Profile) {
      dispatch(getItemForPropse(renderProfileNumber(Profile, userId)));
    }
  }, [dispatch, Profile]);

  const onChange = (e) => {
    setMessage({ ...Message, text: e.target.value });
  };

  if (loading || !conv) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height={"100%"}
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: "#F5f5f3" }} className={classes.page}>
      <Box className={classes.Divider} />

      <Box className={classes.container}>
        <ErrorModalMessage
          warning={showWarning}
          setShowWarning={setShowWarning}
        />
        {anchorEl ? (
          <PricePropose
            item={fromItem}
            Profile={Profile}
            chat_id={id}
            imageSender={imageSender}
            userId={userId}
            socket={socket}
            id_Receiver={id_Receiver}
            anchorEl={anchorEl}
            handleClickAway={handleClickAway}
            itemId={fromItem.id}
            itemPrice={fromItem.Price}
            Pseudo={renderProfileName(Profile, userId)}
          />
        ) : null}
        <Box
          className={classes.boxShadow}
          minHeight="70vh"
          position="relative"
          flex={3}
          flexDirection="column"
          display="flex"
        >
          <Box
            className={classes.MenuSetting}
            display="flex"
            alignItems="center"
          >
            <Avatar
              alt={renderProfilImage(Profile, userId)}
              style={{ border: 2, borderColor: "black" }}
              src={`${API_ENDPOINT}/imageProfile/${renderProfileNumber(
                Profile,
                userId
              )}/${renderProfilImage(Profile, userId)}`}
            ></Avatar>
            <Typography style={{ fontSize: "1.2em", marginLeft: 5 }}>
              {renderProfileName(Profile, userId)}
            </Typography>
          </Box>
          <Divider />

          {fromItem && !mobile ? (
            <React.Fragment>
              <Box display={"flex"} padding={3}>
                <Box
                  style={{ height: 50, width: 50 }}
                  onClick={() => {
                    history(`/items/${fromItem.id}`);
                  }}
                >
                  <img
                    alt={`${API_ENDPOINT}/images/${fromItem.id}/${fromItem.image[0].image}`}
                    src={`${API_ENDPOINT}/images/${fromItem.id}/${fromItem.image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  marginLeft={3}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="center"
                >
                  <Typography style={{ fontSize: 16 }}>
                    {fromItem.Name}
                  </Typography>
                  <Typography style={{ fontSize: 16 }}>
                    {fromItem.Size} · {fromItem.item_brand[0].brand.Name}
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  flexGrow={1}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClick}
                  >
                    Faire une offre
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 5 }}
                  >
                    Voir plus d'articles ?
                  </Button>
                </Box>
              </Box>

              <Divider />
            </React.Fragment>
          ) : null}
          {!mobile ? (
            <Box display={"flex"} flexGrow={2}>
              <MessageComponent
                isBottom={isBottom}
                setIsBottom={setIsBottom}
                receivedMessage={receivedMessage}
                setReceiveNewMessage={setReceivedMessage}
                setIsAccepted={setIsAccepted}
                isAccepted={isAccepted}
              />
            </Box>
          ) : (
            <MessageComponent
              isBottom={isBottom}
              setIsBottom={setIsBottom}
              receivedMessage={receivedMessage}
              setReceiveNewMessage={setReceivedMessage}
              setIsAccepted={setIsAccepted}
              isAccepted={isAccepted}
            />
          )}
          {newMessage && !isBottom ? (
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              height={50}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setIsAccepted(true);
                }}
              >
                <MailOutlineIcon />
                nouveau message
              </Button>
            </Box>
          ) : null}

          <Box
            style={{ backgroundColor: "white" }}
            flex={0.25}
            display="flex"
            width="100%"
            borderTop={1}
            borderColor="#E0E0E0"
            padding={2}
            alignItems="center"
            height="20%"
          >
            <TextField
              placeholder="Envoyer un message"
              className={classes.textfield}
              type="submit"
              onKeyPress={(e) => {
                if (
                  !checkString(Message.text.trim(), setCheckForbiddenAction)
                ) {
                  setShowWarning(true);
                  setMessage({ text: "", chat_id: id });
                } else {
                  if (e.key === "Enter" && Message.text.trim()) {
                    if (socket?.connected) {
                      dispatch(
                        sendMessage(
                          Message.text,
                          Message.chat_id,
                          id_Receiver(Profile, userId),
                          userId,
                          null,
                          null
                        )
                      );
                      setMessage({ text: "", chat_id: id, id });

                      const data = {
                        Message,
                        id_Sender: userId,
                        id_Receiver: id_Receiver(Profile, userId),
                        id: id,
                        Profile: [
                          Profile.Profile2.ProfileNumber,
                          Profile.Profile1.ProfileNumber,
                        ],
                        date: new Date(),
                        item: null,
                        Price: null,
                        imageSender: imageSender?.image ? imageSender : null,
                        Pseudo: renderProfileName(Profile, id_Receiver(Profile, userId)),
                      };

                      socket.emit("new message", data);
                    }
                    e.preventDefault();
                  }
                }
              }}
              value={Message.text}
              multiline={true}
              onChange={onChange}
              InputProps={{
                style: { fontSize: 16, maxHeight: "5vh" },

                endAdornment: (
                  <InputAdornment
                    onClick={(e) => {
                      if (
                        !checkString(
                          Message.text.trim(),
                          setCheckForbiddenAction
                        )
                      ) {
                        setShowWarning(true);
                        setMessage({ text: "", chat_id: id });
                      } else {
                        if (Message.text.trim()) {
                          if (socket?.connected) {
                            dispatch(
                              sendMessage(
                                Message.text,
                                Message.chat_id,
                                id_Receiver(Profile, userId),
                                userId,
                                null,
                                null
                              )
                            );
                            setMessage({ text: "", chat_id: id, id });

                            const data = {
                              Message,
                              id_Sender: userId,
                              id_Receiver: id_Receiver(Profile, userId),
                              id: id,
                              Profile: [
                                Profile.Profile2.ProfileNumber,
                                Profile.Profile1.ProfileNumber,
                              ],
                              date: new Date(),
                              item: null,
                              Price: null,
                              imageSender: imageSender?.image
                                ? imageSender
                                : null,
                              Pseudo: renderProfileName(Profile, userId),
                            };

                            socket.emit("new message", data);
                          }
                          e.preventDefault();
                        }
                      }
                    }}
                    position="end"
                    className={classes.pointer}
                  >
                    <AiOutlineSend size={20} color="#4C6A8C" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  conv: state.messageReducer.openConversation,
  userId: state.auth.user?.id,
  socket: state.auth.socket,
  loading: state.messageReducer.loading,
  loaded: state.messageReducer.loaded,
  newMessage: state.messageReducer.newMessage,
  imageSender: state.auth.user?.image,
  Profile: state.messageReducer?.Profile,
  message: state.messageReducer.message,
  sendPropose: state.messageReducer.sendPropose,
  item: state.messageReducer.item,
});

export default connect(mapStateToProps)(Conversation);
