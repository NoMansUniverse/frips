import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ItemCreate from "../components/Items/ItemCreate";

const SellerRoute = ({ user }) => {
  const location = useLocation();

  return Boolean(user?.IBAN) ? (
    <ItemCreate />
  ) : (
    <Navigate to="/member/register/Seller" state={{ from: location }} replace />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.loading, 
});

export default connect(mapStateToProps)(SellerRoute);
