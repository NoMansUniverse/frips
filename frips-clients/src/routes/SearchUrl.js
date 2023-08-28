import { Box, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { addToFilter, getItemCreationInfo } from "../actions";

const transformStringToUrl = (string) => {
  return string
    .replaceAll("-", " ")
    .replaceAll("and", "&")
    .replaceAll(" and ", "et");
};

const checkUrl = (url, infoItem) => {
  const arrayUrl = Object.values(url);

  for (let index = 0; index < arrayUrl.length; index++) {
    const findCategory = _.find(infoItem, {
      Name: transformStringToUrl(arrayUrl[index]),
    });
    if (!findCategory) {
      return false;
    }
  }
  return true;
};


const SearchUrl = ({ itemInfo, loading, loadingFilter }) => {
  const location = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!itemInfo && !loading) {
      dispatch(getItemCreationInfo());
    } 
  }, [itemInfo, location]);



  if (!itemInfo || loadingFilter) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  } else {
    return checkUrl(location, itemInfo.infoCategory) && !loadingFilter ? (
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    ) : (
      <Navigate to="/PageIntrouvable" replace />
    );
  }
};

const mapStateToProps = (state) => ({
  itemInfo: state.itemInfo.itemInfo,
  loadingFilter: state.filterCatalogue.filterLoading,

  loading: state.itemInfo.loading,
});

export default connect(mapStateToProps)(SearchUrl);
