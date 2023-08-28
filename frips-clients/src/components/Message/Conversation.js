import {
  Avatar,
  Box, CircularProgress,
  Divider,
  Icon,
  makeStyles,
  MenuItem,
  Typography
} from "@material-ui/core";
import AdjustOutlinedIcon from "@material-ui/icons/AdjustOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import moment from "moment";
import "moment/locale/de";
import "moment/locale/fr";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllConv } from "../../actions";
import API_ENDPOINT from "../../api/url";


const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: "1%",
  },
  Divider: {
    height: "10vh",
    [theme.breakpoints.down("sm")]: {
      height: "10vh",
    },
  },
  Menu:{
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: "1%",
  },

  formContainer: {
    marginBottom: "5vh",
    overflow: "auto",
    margin: "auto",
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
      width: "100%",
      height: "100vh",
      marginBottom: 0,
    },
  },
}));

const renderAvatarUrl = (
  { account_accountTochat_id_Account_2, account_accountTochat_id_Account_1 },
  userId
) => {
  if (account_accountTochat_id_Account_2.id === userId) {
    return `${account_accountTochat_id_Account_1.id}/${account_accountTochat_id_Account_1?.image?.image}`;
  } else if (account_accountTochat_id_Account_1.id === userId) {
    return `${account_accountTochat_id_Account_2.id}/${account_accountTochat_id_Account_2?.image?.image}`;
  }
};

const renderPseudo = (
  { account_accountTochat_id_Account_2, account_accountTochat_id_Account_1 },
  userId
) => {
  if (account_accountTochat_id_Account_2.id === userId) {
    return `${account_accountTochat_id_Account_1.Pseudo}`;
  } else {
    return `${account_accountTochat_id_Account_2.Pseudo}`;
  }
};

const UserMessage = (messages, classes, history, idUser) => {
  return messages.map((item, index) => {
    return (
        <MenuItem key={index} className={classes.boxShadow}>
          <Avatar
            onClick={(e) => {
              e.preventDefault();
              history(`/member/${renderPseudo(item, idUser)}`);
            }}
            alt={renderPseudo(item, idUser)}
            src={`${API_ENDPOINT}/imageProfile/${renderAvatarUrl(
              item,
              idUser
            )}`}
          />
          <Box
            display={"flex"}
            alignItems="center"
            flexGrow={1}
            onClick={() => {
              history(`/member/message/${item.id}`);
            }}
          >
            <Box
              width={"20%"}
              minWidth={"20%"}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Typography
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "80%",
                }}
              >
                {renderPseudo(item, idUser)}
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              style={{ color: "black", height: 50, width: 1.5 }}
            />

            <Box display="flex" paddingLeft={2} flexGrow={1} width="100%">
              <Box display="flex" flexGrow={1} width="100%">
                <Typography
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "calc(20%)",
                    flexGrow: 1,
                  }}
                >
                  {item.message[0]?.Text ? (
                    item.message[0].Text
                  ) : (
                    <Box display={"flex"}>
                      <AttachMoneyIcon style={{ color: "#228D57" }} />
                      <Typography style={{ fontSize: 16 }}>
                        Proposition
                      </Typography>
                      <AttachMoneyIcon style={{ color: "#228D57" }} />
                    </Box>
                  )}
                </Typography>
                <Box justifyContent="flex-end" display={"flex"}>
                  <Box display={"flex"} alignItems={"center"}>
                    {item.message[0].Unread &&
                    idUser !== item.message[0].id_Sender ? (
                      <Icon style={{ marginRight: "1vh" }}>
                        <AdjustOutlinedIcon color="primary" />
                      </Icon>
                    ) : null}
                    <Typography style={{ fontSize: 13 }}>
                      {moment(item.message[0].Date_Houre).fromNow()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </MenuItem>
    );
  });
};

const AllConversations = ({ conversations, loading, count, idUser }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation()
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
      dispatch(getAllConv());
    
  }, [dispatch, location]);

  if (conversations.length === 0 && loading && Boolean(count)) {
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

  if (!loading && count===0 &&conversations.length ===0 ) {

    return (
      <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
      width="100%"
      height="100vh"
      alignItems="center"
    >
      <Typography style={{ fontSize: 16 }}>Vous n'avez aucun message</Typography>
    </Box>
    )
  }

  return (
    <Box style={{ backgroundColor: "#F5f5f3" }} height={"100%"}>
      <Box className={classes.Divider} />
      <Box className={classes.formContainer}>
        {UserMessage(conversations, classes, history, idUser)}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  conversations: state.messageReducer.conversations,
  loading: state.messageReducer.loading,
  count: state.messageReducer.count,
  idUser: state.auth.user.id,
});

export default connect(mapStateToProps)(AllConversations);
