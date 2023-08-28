import {
  Box,
  Button,
  CircularProgress, Typography
} from "@material-ui/core";
import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { succeedPayment } from "../../actions";
import { PAYMENT_FAILED } from "../../actions/type";
import ModalCostum from "./ModalCostum";
import SecurityBadge from "./SecurityBadge";


const PaymentForm = ({
  idItem,
  cs,
  loading,
  selectedId,
  loadingPayment,
  setloadinPayment,
  classes,
  idAccount,
}) => {
  const [isReady, setIsReady] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setloadinPayment(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      dispatch({ type: PAYMENT_FAILED });
      navigate(`/payment/${idItem}/paymentStatus`, { replace: true });
    } else {
      dispatch(succeedPayment(idItem, cs, idAccount, navigate, selectedId));
    }
  };

  return (
    <form onSubmit={handleSubmit} id={"payment-form"}>
      <Box
        display={"flex"}
        flexDirection="column"
        padding={3}
        className={classes.boxShadow}
      >
        <Box marginBottom={2}>
          <Typography className={classes.TypographyText}>Paiement</Typography>
        </Box>
        <div>
          <PaymentElement
            id="payment-element"
            onReady={() => {
              setIsReady(true);
            }}
            options={{
              wallets: {
                applePay: "auto",
                googlePay: "auto",
              },
            }}
          />
          {!isReady ? (
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress size={100} />
            </Box>
          ) : null}
        </div>
      </Box>
      <ModalCostum open={loadingPayment} />
      <Box display={"flex"} justifyContent="center" padding={5} width={"100%"}>
        <SecurityBadge />
        <Button
          style={{ height: 40, flexGrow: 1 }}
          color="primary"
          variant="contained"
          disabled={!stripe}
          type="submit"
          target={"payment-form"}
        >
          Procéder au paiement
        </Button>
      </Box>
    </form>
  );
};

const mapStateToProps = (state) => ({
  cs: state.payment.clientSecret,
  loading: state.payment.loading,
  idAccount: state.auth.user.id,
});

export default connect(mapStateToProps)(PaymentForm);
