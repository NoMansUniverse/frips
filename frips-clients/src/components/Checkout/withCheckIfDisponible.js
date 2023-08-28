import { Box, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { checkIfDisponible, cleanUpPayment } from "../../actions";
import { ISRESERVED, RESET_PAYMENT } from "../../actions/type";
import CheckOutComponent from "./CheckOutComponent";

const withCheckIfDisponible = (WrappedComponent) => {
  const ComponentWithCheckIfDisponible = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isDisponible = useSelector((state) => state.payment.isDisponible);
    const loading = useSelector((state) => state.payment.loading);
    const msg = useSelector((state) => state.payment.error);

    useEffect(() => {
      dispatch(checkIfDisponible(parseInt(id)));
      return () => {
        dispatch(cleanUpPayment(id));
      };
    }, [dispatch, id]);



    if (loading && !isDisponible) {
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
    }

    if ((!loading && !isDisponible) ) {
      return (
        <Box
          minHeight={"100vh"}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography style={{ fontSize: 16 }}>
            L'article a été vendu
          </Typography>
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithCheckIfDisponible;
};

export default withCheckIfDisponible;
