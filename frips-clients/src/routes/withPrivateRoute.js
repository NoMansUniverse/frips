import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loadUser } from "../actions";

const withPrivateRoute = (Component) => {
  const PrivateRoute = ({socket}) => {
    let location = useLocation();
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated, loading,user } = auth;


    useEffect(()=>{
      dispatch(loadUser(socket))
    },[])

    return isAuthenticated && !loading ? (
      <Component />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
    socket:state.auth.socket
  });

  return connect(mapStateToProps)(PrivateRoute);
};

export default withPrivateRoute;
