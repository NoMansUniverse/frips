import propsTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loadUser } from "../actions";

const PrivateRoute = ({ socket }) => {
  let location = useLocation();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = auth;

  if (loading) {
    return null;
  }

  return isAuthenticated && !loading ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

PrivateRoute.propsTypes = {
  auth: propsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  socket: state.auth.socket,
});

export default connect(mapStateToProps)(PrivateRoute);
