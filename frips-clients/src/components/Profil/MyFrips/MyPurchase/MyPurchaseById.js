import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyPurchaseId } from "../../../../actions";
import { TiWarning } from "react-icons/ti";
import API_ENDPOINT from "../../../../api/url";
import DeliveryStep from "../MySell/DeliveryStep";

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

const renderDeliveryStep = ({ DateSend, review }, classes) => {
  if (!DateSend) {
    return (
      <Badge className={classes.menus} overlap="circle">
        <Box display={"flex"} alignItems="center">
          <Typography style={{ fontSize: 16 }} component="span" color="inherit">
            <TiWarning color="#dc3545 " size={"1.7em"} />A livrer
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

const MyPurchaseById = ({ loading, item }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
      dispatch(fetchMyPurchaseId(id));
  }, [dispatch]);

  if (loading && !Boolean(item)) {
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

  if (!loading && !Boolean(item)) {
    return (
      <Box
        minHeight={300}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>L'article n'existe plus</Typography>
      </Box>
    );
  }

  const { account } = item;
  const { buyerAccount } = item;

  return (
    <Box
      width={"100%"}
      style={{ backgroundColor: "#F5f5f3" }}
      position="relative"
    >
      <Box height={"10vh"} />
      <Box
        width={"70%"}
        margin={"auto"}
        marginBottom={10}
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
                  history(`/items/${item.id}`);
                }}
              >
                <img
                  alt={item.image[0].id_Item}
                  src={`${API_ENDPOINT}/images/${item.image[0].id_Item}/${item.image[0].image}`}
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
                <Typography>{item?.item_fees[0]?.fees?.Name}</Typography>
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
          <DeliveryStep
            classesSell={classes}
            item={item}
            id={item.id}
            account={account}
            buyerAccount={buyerAccount}
          />
        </Card>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  item: state.myFrips.purchaseId,
  myaccount: state.auth.user,
});

export default connect(mapStateToProps)(MyPurchaseById);
