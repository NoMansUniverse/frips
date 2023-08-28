import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createItem, getItemCreationInfo } from "../../actions";
import ItemForm from "./ItemForm";

const initialValues = {
  Titre: "",
  Description: "",
  image: [],
  Catalogue: "",
  Brand: "",
  Size: "",
  Color: [],
  Price: "",
  State: "",
  Delivery:[]
};

const ItemCreate = () => {
  const loading = useSelector((state) => state.itemInfo.loading);
  const loaded = useSelector((state) => state.itemInfo.loaded);
  const itemInfo = useSelector((state) => state.itemInfo.itemInfo);

  const history = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && !itemInfo) {
      dispatch(getItemCreationInfo());
    }
  }, [dispatch, loading, loaded]);

  if (loading && !itemInfo) {
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

  const onSubmit = (values, image) => {
    dispatch(createItem(values, image, history));
  };

  return (
    <div>
      <ItemForm initialValues={initialValues} onSubmit={onSubmit}></ItemForm>
    </div>
  );
};

export default ItemCreate;
