import { Box, Button, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuccessComponent = ({ id, navigate }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
    >
      <CheckCircleIcon style={{ color: "#4AA05F", fontSize: 80 }} />
      <Typography style={{ fontSize: 16 }}>
        Paiement effectué avec succès
      </Typography>
      <Button
        style={{ width: "100%", marginTop: 5 }}
        variant="outlined"
        color="primary"
        onClick={() => navigate("/")}
      >
        Retour au Menu
      </Button>
    </Box>
  );
};

const FailComponent = ({ id, navigate }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
    >
      <ErrorIcon style={{ color: "#DD3437", fontSize: 80 }} />
      <Typography>Il semblerait que le paiement a échoué</Typography>
      <Box display={"flex"}>
        <Button
          style={{ width: "100%", marginTop: 5 }}
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/payment/${id}`)}
        >
          Essayer à nouveau
        </Button>
      </Box>
    </Box>
  );
};

const StatusPaymentComponent = ({ successed, failed, item }) => {
  const navigate = useNavigate();
  return (
    <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
      width="100%"
      height="100vh"
      alignItems="center"
      flexDirection={"column"}
    >
      {successed ? (
        <SuccessComponent navigate={navigate} id={item?.id} />
      ) : (
        <FailComponent navigate={navigate} id={item?.id} />
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  successed: state.payment.successed,
  failed: state.payment.failed,
  item: state.payment.item,
});

export default connect(mapStateToProps)(StatusPaymentComponent);
