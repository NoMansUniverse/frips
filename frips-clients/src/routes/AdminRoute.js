import propsTypes from "prop-types";
import React from "react";
import { connect, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  let location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading,user } = auth;
  if (loading) {
    return null;
  }



  return isAuthenticated && !loading ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

AdminRoute.propsTypes = {
  auth: propsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
