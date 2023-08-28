import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import moment from "moment";
import "moment/locale/fr";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { getMoreMessage, receivedNewMessage } from "../../actions";
import Message from "./Message";
import RegroupByDate from "./RegroupByDate";

import { connect } from "react-redux";
import newMessage from "./newMessage";
import Div100vh from "react-div-100vh";
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
    width: "80%",
    display: "flex",
    flexDirection: "column",
    padding: 12,
    margin: "auto",
    flex: 3,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
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
    flex: 2,
    display: "flex",
    flexWrap: "wrap",
    height: 300,
    maxHeight: "100vh",
    overflowY: "scroll",
    flexDirection: "column-reverse",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    
  },
}));

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const renderMessages = (conv, userId, setRef, image, newMessage) => {
  return conv.map((item, index, elements) => {
    const next =
      elements[index + 1 < conv.length ? index + 1 : conv.length - 1];

    return (
      <React.Fragment>
        <Message
          setRef={setRef}
          item={item.item}
          id_Sender={item.id_Sender}
          userId={userId}
          Text={item.Text}
          newMessage={newMessage}
          image={image}
          index={index}
          hours={item.Date_Houre}
          own={item.id_Sender === userId}
        />
        <RegroupByDate next={next} current={item} />
      </React.Fragment>
    );
  });
};

/* node.scrollIntoView({
    behavior: "smooth",
    block: "nearest" // <-- only scroll this div, not the parent as well
  })
*/
const findImage = (userId, Profile) => {
  if (!Profile) return;

  const { Profile1, Profile2 } = Profile;

  if (userId === Profile1.ProfileNumber) {
    return Profile2;
  } else {
    return Profile1;
  }
};
const MessageComponent = ({
  pageNumber,
  loading,
  newMessage,
  Profile,
  setReceiveNewMessage,
  receivedMessage,
  hasmore,
  moreMessageLoading,
  message,
  userId,
  isBottom,
  setIsBottom,
  isAccepted,
  setIsAccepted,
}) => {
  const classes = useStyles();
  const [number, setNumber] = useState(1);
  const setRef = useRef(null);
  const dispatch = useDispatch();

  let id_Chat;
  if (message) {
    id_Chat = message[0]?.id_Chat;
  }

  const [time, settime] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      settime(!time);
    }, 1000);
  }, [message, time]);

  useEffect(() => {
    setRef.current?.scrollTo(0,0)
  }, []);

  const position = useCallback((node) => {
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, []);
  const handleScroll = (e) => {

    if (e.target.scrollTop === 0) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };
  useEffect(() => {
    if (isAccepted) {
      setRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        // <-- only scroll this div, not the parent as well
      });
      setIsBottom(true);

      dispatch(receivedNewMessage(false));
      setIsAccepted(false);
    }
  }, [isAccepted, newMessage]);

  const renderedConv = useMemo(() => {
    if (message.length !== 0) {
      return renderMessages(
        message,
        userId,
        setRef,
        findImage(userId, Profile),
        receivedMessage
      );
    }
  }, [message, userId, newMessage, receivedMessage]);

  const fetchContacts = () => {
    setNumber((prevState) => prevState + 1);
    setTimeout(() => {
      if (hasmore > message.length) {
        dispatch(getMoreMessage(id_Chat, number));
      }
    }, 1500);
  };

  return (
    <div className={classes.MessageBox} id="scrollable">
      <InfiniteScroll
        onScroll={handleScroll}
        dataLength={message.length}
        next={fetchContacts}
        hasMore={hasmore > message.length}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          position: "relative",
          WebkitTransform: "translate3d(0, 0, 0)",
        }} //To put endMessage and loader to the top.
        scrollThreshold={1}
        inverse={true} //
        scrollableTarget="scrollable"
        loader={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={2}
            position="relative"
          >
            <CircularProgress size={30}></CircularProgress>
          </Box>
        }
      >
        {renderedConv}
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newMessage: state.messageReducer.newMessage,
  hasmore: state.messageReducer.hasmore,
  moreMessageLoading: state.messageReducer.moreMessageLoading,
  pageNumber: state.messageReducer.pageNumber,
  userId: state.auth.user?.id,
  Profile: state.messageReducer.Profile,
  message: state.messageReducer.message,
});

export default connect(mapStateToProps)(MessageComponent);
