import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import PaymentForm from "./PaymentForm";
import STRIPE_KEY from "../../api/stripe";

const stripePromise = loadStripe(`${STRIPE_KEY}`);


const StripeContainer = ({
  cs,
  loading,
  id_Item,
  loadingPayment,
  setloadinPayment,
  classes,
  selectedId,
}) => {
  const appearance = {
    theme: "stripe",
    variables: {
      colorText: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: cs, appearance }}>
      <PaymentForm
        classes={classes}
        loadingPayment={loadingPayment}
        setloadinPayment={setloadinPayment}
        idItem={id_Item}
        selectedId={selectedId}
        key="payment-form"
      />
    </Elements>
  );
};

const mapStateToProps = (state) => ({
  cs: state.payment.clientSecret,
  loading: state.payment.loading,
});

export default connect(mapStateToProps)(StripeContainer);
