import {
  Box,
  CircularProgress,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  cleanUpPayment,
  fetchPaymentInfo,
  fetchPaymentIntent,
} from "../../actions";
import API_ENDPOINT from "../../api/url";
import Adress from "./Adress";
import DeliveryMethod from "./DeliveryMethod";
import StatusPaymentComponent from "./StatusPaymentComponent";
import StripeContainer from "./StripeContainer";
import withCheckIfDisponible from "./withCheckIfDisponible";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    borderRadius: 10,
  },
  boxShadowDelivery: {
    width: 100,
    height: 100,
    borderRadius: 4,
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    "&:hover": {
      background: "transparent",
      cursor: "pointer",
    },
  },

  floatContentInfomrationdiv: {
    width: "30%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
      padding: 20,
    },
  },

  floatContentInformation: {
    boxSizing: "border-box",
    paddingRight: 10,
    height: 565,
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
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  InformationProduct: {
    width: "70%",
    minHeight: 700,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  TypographyText: {
    fontSize: 16,
    fontWeight: 600,
  },
  TypographyTextSub: {
    color: "grey",
    fontSize: 15,
  },
}));

const customRound = (price) => {
  let decimal = price - Math.floor(price);
  return decimal >= 0.25 && decimal <= 0.75
    ? Math.floor(price) + 0.5
    : Math.round(price);
};

const custumFees = (item) => {
  return customRound(item.Price * 1.07) - item.Price <= 1
    ? customRound(item.Price + 1.5) - item.Price
    : customRound(item.Price * 1.07) - item.Price;
};

const renderFees = (id) => {
  if (id === 1) {
    return 7;
  }
  if (id === 2) {
    return 9;
  }
  if (id === 3) {
    return 0;
  }
};
const CheckOut = ({
  loading,
  cs,
  item,
  idAccount,
  myAddress,
  error,
  successed,
  failed,
  isDisponible,
}) => {
  const classes = useStyles();
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [loadingPayment, setloadinPayment] = useState(false);
  const [haveAdress, setHaveAdress] = useState(false);
  const hasProposition = useLocation();
  const isMounted = useRef(false);
  const [showInfo, setShowInfo] = useState(false);

  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      if (isMounted.current && hasProposition.pathname === `/payment/${id}`) {
        dispatch(cleanUpPayment(id));
      }
    };
  }, [hasProposition.pathname, dispatch, id]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!item && !loading && isDisponible) {
      dispatch(fetchPaymentInfo(id, hasProposition.state?.isFrom));
    }
  }, [dispatch, item, loading, isDisponible]);

  useEffect(() => {
    const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
    const timer = setTimeout(() => {
      dispatch(cleanUpPayment(id));
      navigate("/"); // replace with your redirect URL
    }, TIMEOUT_DURATION);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (Boolean(selectedDelivery)) {
      dispatch(
        fetchPaymentIntent(id, selectedDelivery, hasProposition.state?.isFrom)
      );
    }
  }, [dispatch, selectedDelivery]);

  if (successed !== null || failed !== null) {
    return <StatusPaymentComponent />;
  }
  if (!item) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  } else {
    return (
      <Box style={{ backgroundColor: "#F5f5f3" }} width={"100%"}>
        <Box height={60} />
        <Box
          width={1000}
          margin="auto"
          className={classes.floatContentArticle}
          position="relative"
        >
          <Box
            className={classes.InformationProduct}
            paddingRight={5}
            display="flex"
            flexDirection="column"
          >
            <Box className={classes.boxShadow} padding={3} display="block">
              <Box marginBottom={5}>
                <Typography className={classes.TypographyText}>
                  Votre commande
                </Typography>
              </Box>
              <Box display={"flex"}>
                <Box
                  id="classes.boxShadowDelivery"
                  className={classes.boxShadowDelivery}
                  onClick={() => {
                    navigate(`/items/${item.id}`);
                  }}
                >
                  <img
                    id={`payment-${item.id}`}
                    alt={`${API_ENDPOINT}/images/${item.id}/${item.image[0].image}`}
                    src={`${API_ENDPOINT}/images/${item.id}/${item.image[0].image}`}
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
                  <Typography style={{ fontSize: 16 }}>{item.Name}</Typography>
                  <Typography style={{ fontSize: 16 }}>
                    {item.Size} · {item.item_brand[0].brand.Name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box height={40} />

            <Box padding={3} className={classes.boxShadow}>
              <DeliveryMethod
                selectedDelivery={selectedDelivery}
                setSelectedDelivery={setSelectedDelivery}
                deliveryArray={item.item_fees}
              />
            </Box>
            <Box height={40} />
            <Box className={classes.boxShadow} padding={3} display="block">
              <Box marginBottom={2}>
                <Typography className={classes.TypographyText}>
                  Adresse de Livraison
                </Typography>
              </Box>
              <Box height={5} />

              <Box display="flex" alignItems="center" flexDirection={!Boolean(myAddress.address) ? "column" :""}>
                <Adress addresse={myAddress} />
                {!Boolean(myAddress?.address) ? (
                  <Typography style={{ fontSize: 16, color: "#dc3545" }}>
                    veuillez choisir une addresse de livraison
                  </Typography>
                ) : null}
              </Box>
            </Box>
            <Box height={40} />

            {Boolean(selectedDelivery) && Boolean(cs) && Boolean(myAddress.address) ? (
              <StripeContainer
                classes={classes}
                loadingPayment={loadingPayment}
                setloadinPayment={setloadinPayment}
                id_Item={item.id}
                selectedId={selectedDelivery}
              />
            ) : null}
          </Box>

          <Box width={"30%"} className={classes.floatContentInfomrationdiv}>
            <Box padding={5} className={classes.boxShadow}>
              <Box margin={2}>
                <Typography className={classes.TypographyText}>
                  Résumé de la commande
                </Typography>
              </Box>
              <Divider />
              <Box marginTop={2} display="flex">
                <Box className={classes.ContentInformationItem}>
                  <Typography className={classes.TypographyText}>
                    Commande
                  </Typography>
                </Box>
                <Box className={classes.ContentInformationItem}>
                  <Typography>{item.Price} CHF</Typography>
                </Box>
              </Box>

              <Box marginTop={2} display="flex">
                <Box className={classes.ContentInformationItem}>
                  <Typography className={classes.TypographyText}>
                    Frais de port
                  </Typography>
                </Box>
                <Box className={classes.ContentInformationItem}>
                  <Typography>
                    {renderFees(selectedDelivery)
                      ? `${renderFees(selectedDelivery)} CHF`
                      : null}
                  </Typography>
                </Box>
              </Box>

              <Box
                marginTop={2}
                marginBottom={2}
                display="flex"
                flexWrap="wrap"
              >
                <Box
                  className={classes.ContentInformationItem}
                  display="flex"
                  alignItems={"center"}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Typography className={classes.TypographyText}>
                    Frais
                  </Typography>

                  <Box
                    onClick={() => {
                      navigate("/aide/paymentInfo");
                    }}
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Typography style={{ marginLeft: 6 }}>
                      en savoir plus
                    </Typography>
                    <HelpOutlineIcon
                      style={{
                        height: "0.85em",
                        width: "0.85em",
                        marginLeft: 5,
                      }}
                    />
                  </Box>
                </Box>
                <Box className={classes.ContentInformationItem}>
                  {custumFees(item)}
                  CHF
                </Box>
              </Box>

              <Divider />

              <Box marginTop={2} display="flex">
                <Box className={classes.ContentInformationItem}>
                  <Typography className={classes.TypographyText}>
                    Total
                  </Typography>
                </Box>
                <Box className={classes.ContentInformationItem}>
                  <Typography>
                    {Boolean(selectedDelivery) ? (
                      `${
                        renderFees(selectedDelivery) +
                        custumFees(item) +
                        item.Price
                      } CHF`
                    ) : (
                      <Typography style={{ fontSize: 16, color: "#dc3545" }}>
                        veuillez choisir un mode de livraison
                      </Typography>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

const mapStateToProps = (state) => ({
  cs: state.payment.clientSecret,
  loading: state.payment.loading,
  idAccount: state.auth.user.id,
  myAddress: state.auth.user,
  item: state.payment.item,
  isDisponible: state.payment.isDisponible,
  error: state.payment.error,
  successed: state.payment.successed,
  failed: state.payment.failed,
});

export default withCheckIfDisponible(connect(mapStateToProps)(CheckOut));
