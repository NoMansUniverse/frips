import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect } from "react";
import { BiPackage } from "react-icons/bi";
import { TiWarning } from "react-icons/ti";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMyFripsPagination, fetchMyfrips } from "../../../../actions";
import { FETCH_MYPURCHASE } from "../../../../actions/type";
import API_ENDPOINT from "../../../../api/url";
import MyPaginate from "../../../Footer/PaginationComponent";
import PurchaseStep from "./PurchaseStep";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  Grid: {
    display: "grid",
    padding: 10,
    gridTemplateColumns: "repeat(6,16.66%)",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  menus: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "inherit",
      flexGrow: 1,
      justifyContent: "flex-end",
      marginTop: 8,
    },
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  details: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
    },
  },
  delivery: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
  },
  deliveryCategory: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    maxWidth: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  send: {
    display: "flex",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    height: 100,

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const renderDeliveryStep = ({ DateSend, review, Status }) => {
  if (!DateSend) {
    return (
      <Badge overlap="circle">
        <Box display={"flex"} alignItems="center">
          <Typography style={{ fontSize: 16 }} component="span" color="inherit">
            <TiWarning color="#dc3545 " size={"1.7em"} />
            en cours d'envoi
          </Typography>
        </Box>
      </Badge>
    );
  }
  if (DateSend && !Status) {
    return (
      <Badge overlap="circle">
        <Box display={"flex"} alignItems="center">
          <Typography style={{ fontSize: 16 }} component="span" color="inherit">
            <BiPackage color="#82A0C2 " size={"1.7em"} />
            envoie en transit
          </Typography>
        </Box>
      </Badge>
    );
  }

  if (DateSend && Boolean(review[0]?.Note)) {
    return (
      <Typography
        style={{
          borderRadius: 5,
          padding: 5,
          fontSize: 16,
          border: "1px solid rgb(80, 220, 100)",
          backgroundColor: "rgba(80, 220, 100,0.2)",
        }}
      >
        Terminé
      </Typography>
    );
  } else {
    return (
      <Typography
        style={{
          borderRadius: 5,
          padding: 5,
          fontSize: 18,
        }}
      >
        Laisser une review
      </Typography>
    );
  }
};
const typeOfDelivery = (price) => {
  if (price === 7) {
    return "Livraison Poste Standard";
  }
  if (price === 9) {
    return "Livraison Poste Rapide";
  }
  return "Livraison en main-propre";
};

const renderedItem = (classes, state, history) => {
  return state.map((item, index) => {
    const { account } = item;
    const { buyerAccount } = item;

    return (
      <Box
        width={"100%"}
        height={"100%"}
        padding={1}
        position="relative"
        key={item.id}
        id={item.id}
      >
        <Card className={classes.boxShadow}>
          <Box className={classes.Grid}>
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <CardActionArea
                style={{ width: 180, height: 180 }}
                onClick={() => {
                  history(`/items/${state[index].id}`);
                }}
              >
                <img
                  alt={state[index].image[0].id_Item}
                  src={`${API_ENDPOINT}/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </CardActionArea>
            </Box>

            <Box padding={2} className={classes.details}>
              <Typography style={{ wordBreak: "break-word" }} color="primary">
                {item?.Name}
              </Typography>
            </Box>

            <Box className={classes.menus}>
              <Typography style={{ fontSize: 15 }}>Vendu à </Typography>

              <Box flexGrow={1} className={classes.menus}>
                <Typography style={{ fontSize: 15 }}>
                  {account?.Pseudo}
                </Typography>
              </Box>
            </Box>

            <Box className={classes.menus}>
              <Typography style={{ fontSize: 15 }}>
                Type de Livraison
              </Typography>

              <Box flexGrow={1} className={classes.menus}>
                <Typography>{typeOfDelivery(item.DeliveryPrice)}</Typography>
              </Box>
            </Box>
            <Box className={classes.menus}>
              <Typography style={{ fontSize: 15 }}>Prix</Typography>

              <Box flexGrow={1} className={classes.menus}>
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {item.Price} CHF
                </Typography>
              </Box>
            </Box>
            <Box className={classes.menus}>
              <Typography style={{ fontSize: 15 }}>Status</Typography>
              <Box flexGrow={1} className={classes.menus}>
                <Typography style={{ fontSize: 15 }}>
                  {renderDeliveryStep(item, classes)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <PurchaseStep
            classesSell={classes}
            item={item}
            id={item.id}
            account={account}
            buyerAccount={buyerAccount}
          />
        </Card>
      </Box>
    );
  });
};

const MyPurchase = ({
  mobile,
  pagination,
  filterMyFrips,
  loading,
  items,
  msg,
  count,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleChange = ({ selected }) => {
    dispatch(changeMyFripsPagination(selected + 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_FILTER_MYFRIPS" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!loading && items.length === 0 && Boolean(count)) {
      dispatch(fetchMyfrips(`/api/members/myPurchase`, FETCH_MYPURCHASE));
    }
  }, [dispatch, loading]);

  useEffect(() => {
    dispatch(fetchMyfrips(`/api/members/myPurchase`, FETCH_MYPURCHASE));
  }, [filterMyFrips, pagination]);

  if (loading && items.length === 0 && !Boolean(count)) {
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

  if (!loading && items.length === 0 && count === 0) {
    return (
      <Box
        minHeight={200}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>{msg}</Typography>
      </Box>
    );
  }

  return (
    <Box minHeight={300} className={classes.items}>
      {renderedItem(classes, items, history)}
      {Boolean(count) ? (
        <MyPaginate
          pageCount={Math.ceil(count / 5)}
          onPageChange={handleChange}
          pageRangeDisplayed={!mobile ? 2 : 1}
          forcePage={pagination - 1}
          marginPagesDisplayed={!mobile ? 2 : 1}
          nextLabel={
            <ArrowForwardIosIcon
              style={{
                color:
                  pagination !== Math.ceil(count / 5)
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
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.purchase,
  pagination: state.myFrips.pagination,
  filterMyFrips: state.myFrips.filter,
  count: state.myFrips.count,
  msg: state.myFrips.msg,
});

export default connect(mapStateToProps)(MyPurchase);
