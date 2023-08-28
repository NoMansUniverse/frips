import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editItem, getItemCreationInfo } from "../../actions";
import ItemForm from "./ItemForm";

const ItemEdit = ({ loading, loaded, initialValues, imageBlob }) => {
  let { id } = useParams();
  const dispatch = useDispatch();



  useEffect(() => {
    if (!loading && Object.keys(initialValues).length ===0 && imageBlob.length===0) {
      dispatch(editItem(id));
    }
    dispatch(getItemCreationInfo());
  }, [dispatch, id, loading, initialValues]);

  if (loading && Object.keys(initialValues).length ===0 && imageBlob.length===0) {
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
  } else {

    return (
      <Box>
        <ItemForm
          id={id}
          edit={true}
          editItem={imageBlob}
          initialValues={initialValues}
        />
      </Box>
    );
  }
};
const mapStateToProps = (state) => ({
  loading: state.items.loading,
  loaded: state.items.loaded,
  initialValues: state.items.initialValues,
  imageBlob: state.items.imageBlob,
});

export default connect(mapStateToProps)(ItemEdit);
