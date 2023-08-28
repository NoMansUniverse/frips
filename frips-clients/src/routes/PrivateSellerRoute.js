import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SellerRoute from "./SellerRoute";
import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

const withAuth = (WrappedComponent) => (props) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [userLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      setUserLoaded(true);
    }
  }, [user, loading]);

  useEffect(() => {
    if (!isAuthenticated &&!loading) {
      navigate("/login", { state: { isFromSeller: location } });
    }

  }, [isAuthenticated,loading]);

  if (!userLoaded) {
    return null;
  }

  return <WrappedComponent {...props} user={user} />;
};

const PrivateSellerRoute = withAuth(SellerRoute);

export default PrivateSellerRoute;
