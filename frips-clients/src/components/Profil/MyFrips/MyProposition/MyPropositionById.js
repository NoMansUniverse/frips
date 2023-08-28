import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  makeStyles,
  Typography
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyPropositionId } from "../../../../actions";
import API_ENDPOINT from "../../../../api/url";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  Grid: {
    display: "grid",
    padding: 10,
    gridTemplateColumns: "repeat(2,50%)",
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

const renderStatus = (id, Approve, dateApprove, history, id_proposition) => {
  if (Boolean(Approve) && Boolean(dateApprove)) {
    return (
      <Box display={"flex"} flexDirection="column">
        <Typography
          style={{
            borderRadius: 5,
            padding: 5,
            fontSize: 18,
            border: "1px solid rgb(80, 220, 100)",
            backgroundColor: "rgba(80, 220, 100,0.2)",
          }}
        >
          Offre acceptée
        </Typography>
        <Typography style={{ fontSize: 16 }}>
          vous avez 24 heures pour faire le paiement autrement l'offre sera
          annulée
        </Typography>
        <Button
          onClick={() => {
            history(`/payment/${id}`, {
              state: {
                isFrom: true,
              },
            });
          }}
          style={{ marginTop: 5, fontSize: 13.5 }}
          variant="contained"
          color="primary"
        >
          Procéder au paiement
        </Button>
      </Box>
    );
  }
  if (!Boolean(Approve) && Boolean(dateApprove)) {
    return (
      <Typography
        style={{
          borderRadius: 5,
          padding: 5,
          fontSize: 16,
          border: "1px solid rgb(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0,0.2)",
        }}
      >
        Offre refusée
      </Typography>
    );
  } else {
    return (
      <Typography style={{ fontSize: 16 }}>Offre en attente...</Typography>
    );
  }
};

const MyPropositionById = ({ loading, item }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
      dispatch(fetchMyPropositionId(id));
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
        <Typography style={{ fontSize: 16 }}>aucune proposition</Typography>
      </Box>
    );
  }

  return (
    <Box
      width={"100%"}
      style={{ backgroundColor: "#F5f5f3" }}
      position="relative"
    >
      <Box height={"10vh"} />
      <Box
        width={"100%"}
        height={"70vh"}
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
                  alt={`${API_ENDPOINT}/${item.image[0].id_Item}`}
                  src={`${API_ENDPOINT}/images/${item.image[0].id_Item}/${item.image[0].image}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </CardActionArea>
            </Box>
            <Box
              padding={2}
              display="flex"
              justifyContent={"center"}
              flexDirection="column"
              alignItems={"center"}
            >
              <Typography
                style={{ wordBreak: "break-word", fontSize: 16 }}
                color="primary"
              >
                {item.Name}
              </Typography>
              <Box
                display="flex"
                justifyContent={"center"}
                flexDirection="column"
                alignItems={"center"}
              >
                <Typography style={{ fontSize: 16, fontWeight: 400 }}>
                  {item.Price} CHF
                </Typography>
                <Typography style={{ fontSize: 16 }}>{item.Size}</Typography>
                <Typography style={{ fontSize: 16 }}>
                  {item.item_brand[0]?.brand.Name}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent={"center"}
              flexDirection="column"
              alignItems={"center"}
            >
              <Typography style={{ fontSize: 16 }}>Prix Proposé</Typography>
              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                flexDirection="column"
                alignItems={"center"}
              >
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {item?.pricepropose} CHF
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent={"center"}
              flexDirection="column"
              alignItems={"center"}
            >
              <Typography style={{ fontSize: 16 }}>Status</Typography>
              <Box flexGrow={1} className={classes.Description}>
                {renderStatus(item.id, item.Approve, item.dateApprove, history)}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  item: state.myFrips.propositionId,
  myaccount: state.auth.user,
});

export default connect(mapStateToProps)(MyPropositionById);
