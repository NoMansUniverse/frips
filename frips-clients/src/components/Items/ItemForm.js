/* eslint-enable react/jsx-no-comment-textnodes */
import React, { useEffect } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { createItem, editItemSend, getItemCreationInfo } from "../../actions";
import BrandForm from "./formUpload/BrandForm";
import ColorForm from "./formUpload/colorForm";
import DropDownItem from "./formUpload/dropDownItem";
import SizeForm from "./formUpload/sizeForm";
import StateForm from "./formUpload/stateForm";

import { useTheme } from "@material-ui/core/styles";
import * as yup from "yup";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageBox from "./DND/SortableGrid";
import {
  CostumPriceField,
  CostumTextField,
  CostumTextFieldDescription,
} from "./formUpload/costumTextfield";
import DeliveryFormRadio from "./formUpload/DeliveryFormRadio";
import TaskSuccess from "./TaskSuccess";
import { RESET_ITEM } from "../../actions/type";

const useStyles = makeStyles((theme) => ({
  boxForm: {
    display: "flex",
    justifyContent: "center",
  },
  DragItem: {
    padding: 3,
    width: 200,
    height: 200,
  },
  formContainer: {
    boxSizing: "border-box",
    width: 1000,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  BoxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  FormLittleBox: {
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBox: {
    display: "block",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  DeliveryBox: {
    display: "block",
    width: "100%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const createSizeArray = (id) => {
  const SizeArray = [];
  if (id < 104) {
    SizeArray.push(0);
    if (id < 73) {
      SizeArray.push(0);
    }
    if (id > 73 && id < 81) {
      SizeArray.push(1);
    } else {
      SizeArray.push(2);
    }
  }
  return SizeArray;
};

const TextError = (props) => {
  if (props.error) {
    return (
      <Typography style={{ color: "red", fontSize: "1.0em" }}>
        {props.error.msg} !
      </Typography>
    );
  } else {
    return (
      <Typography style={{ color: "red", fontSize: "0.8em" }}>
        {props.children}
      </Typography>
    );
  }
};

const validationSchema = yup.object({
  image: yup
    .array()
    .min(1, "Mettez au moins une image")
    .required("Une Description est requise"),
  Titre: yup
    .string("Enter your email")

    .min(5, "Le titre doit au moins avoir 10 caractères")

    .required("Un Titre est requis"),
  Description: yup
    .string("Enter your password")
    .min(15, "La description doit au moins avoir 15 caractères")
    .required("Une Description est requise"),
  Size: yup.string("Enter your password").required("Une taille est requise"),

  Catalogue: yup
    .string("Mettez au moins une photo")
    .required("Choississez une Catégorie"),
  Brand: yup
    .string("Mettez au moins une photo")
    .required("Choississez une Marque"),
  State: yup
    .number("Mettez au moins une photo")
    .required(`Choissisez l'état de votre produit`),
  Price: yup
    .number("Doit être un nombre")
    .min(1, "Mettez un prix plus grand ou égale à 1 CHF")
    .required("Mettez un prix plus grand ou égale à 1 CHF"),
  Color: yup
    .array()
    .min(1, "Mettez aux moins une couleur")
    .required("Mettez aux moins une couleur"),
  Delivery: yup
    .array()
    .min(1, "Mettez aux moins un mode de livraison")
    .required("Mettez aux moins un mode de livraison"),
});

const ItemForm = ({
  initialValues,
  edit,
  id,
  editItem,
  itemInfo,
  error,
  loading,
  editInitialValues,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [added,setAdded] = useState(false)
  const [size, setSize] = useState([]);
  const [picture, setPicture] = useState(!edit ? [] : [...editItem]);
  const history = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"),{noSsr:true});

  const onSubmit = (values) => {
    if (!edit) {
      dispatch(createItem(values, picture, history, setIsLoading,setAdded,mobile));
    } else {
      dispatch(editItemSend(values, picture, history, id, setIsLoading,setAdded,mobile));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(()=>{
    return () =>{
      dispatch({type:RESET_ITEM})
    }
  },[])

  useEffect(() => {
    if (!Boolean(itemInfo) && !loading) {
      dispatch(getItemCreationInfo());
    }
  }, [itemInfo, loading]);

  useEffect(() => {
    if (Object.keys(editInitialValues).length !== 0) {
      setSize(createSizeArray(initialValues.Catalogue));
    }
  }, [Object.keys(editInitialValues).length !== 0]);

 


  const typeOfInput = () => {
    if (!mobile) {
      return null;
    } else if (mobile) {
      return true;
    }
  };


  if ((mobile && added) || isLoading) {
    return <TaskSuccess edit={edit} error={error} isLoading={isLoading} added={added} />;
  }
  if (
    (Object.keys(initialValues)?.length === 0 && loading) ||
    editItem?.length === 0
  ) {
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
  } else if(!isLoading ) {
    return (
      <Box style={{ backgroundColor: "#F5f5f3" }}>
        <Box width={"100%"} height={30} />
        <Formik
          enableReinitialize={true}
          onSubmit={onSubmit}
          initialValues={initialValues || {}}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <Box className={classes.formContainer}>
                  <Box marginTop={3} marginBottom={3}>
                    <Typography style={{ fontSize: 25, fontWeight: 500 }}>
                      {!edit ? "Mettre en Vente" : "Modification"}
                    </Typography>
                  </Box>

                  <Box className={classes.BoxShadow}>
                    <Box padding={3}>
                      <Typography style={{ color: "#909090" }}>
                        Ajoute jusqu'à 10 photos
                      </Typography>
                    </Box>

                    <Dropzone
                      noClick
                      noKeyboard
                      accept="image/*"
                      onDrop={(acceptedFiles) => {
                        const fileArray = Array.from(acceptedFiles).map(
                          (file) => URL.createObjectURL(file)
                        );

                        if (
                          fileArray.length + formik.values.image.length <=
                          10
                        ) {
                          setPicture(picture.concat(acceptedFiles));
                          formik.setFieldValue(
                            "image",
                            formik.values.image.concat(fileArray)
                          );
                        } else {
                          const item1 = picture
                            .concat(acceptedFiles)
                            .slice(0, 10);
                          const item = formik.values.image
                            .concat(fileArray)
                            .slice(0, 10);
                          formik.setFieldValue("image", item);
                          setPicture(item1);
                        }
                      }}
                    >
                      {({ getRootProps, getInputProps, open }) => {
                        return (
                          <Box
                            minHeight={182}
                            margin={3}
                            style={{
                              border: "1px rgb(201,201,201) dashed",
                              overflow: "hidden",
                            }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            {...getRootProps()}
                          >
                            {formik.values.image.length === 0 ? (
                              <Box>
                                <input {...getInputProps()} />
                                <Button
                                  startIcon={<AddIcon></AddIcon>}
                                  variant="outlined"
                                  color="primary"
                                  onClick={open}
                                >
                                  <Typography>Ajouter des photos</Typography>
                                </Button>
                              </Box>
                            ) : (
                              <Box height={"100%"} width={"100%"}>
                                <Field
                                  id="image"
                                  name="image"
                                  open={open}
                                  edit={edit}
                                  getInputProps={getInputProps}
                                  picture={picture}
                                  setPicture={setPicture}
                                  component={ImageBox}
                                ></Field>
                              </Box>
                            )}
                          </Box>
                        );
                      }}
                    </Dropzone>

                    <Box padding={3}>
                      <ErrorMessage
                        name="image"
                        component={TextError}
                      ></ErrorMessage>
                    </Box>
                  </Box>

                  <Box height={30}></Box>

                  <Box className={classes.BoxShadow} display="block">
                    <Box className={classes.FormLittleBox} padding={3}>
                      <Box className={classes.SubFormLittleBox}>
                        <Typography variant="h6">Titre</Typography>
                        <ErrorMessage name="Titre" component={TextError} />
                      </Box>
                      <Box className={classes.SubFormLittleBox}>
                        <Field
                          id="Titre"
                          name="Titre"
                          type="text"
                          component={CostumTextField}
                        ></Field>
                      </Box>
                    </Box>

                    <Divider />

                    <Box className={classes.FormLittleBox} padding={3}>
                      <Box className={classes.SubFormLittleBox}>
                        <Typography variant="h6">Description</Typography>
                        <ErrorMessage
                          name="Description"
                          component={TextError}
                        />
                      </Box>
                      <Box className={classes.SubFormLittleBox}>
                        <Field
                          id="Description"
                          name="Description"
                          type="text"
                          component={CostumTextFieldDescription}
                        ></Field>
                      </Box>
                    </Box>

                    <Divider />
                  </Box>

                  <Box height={25}></Box>

                  <Box className={classes.BoxShadow}>
                    <Box className={classes.FormLittleBox} padding={3}>
                      <Box className={classes.SubFormLittleBox}>
                        <Typography variant="h6">Catalogue</Typography>
                        <ErrorMessage
                          name="Catalogue"
                          component={TextError}
                        ></ErrorMessage>
                      </Box>
                      <Box className={classes.SubFormLittleBox}>
                        <Field
                          name="Catalogue"
                          id="Catalogue"
                          mobile={typeOfInput()}
                          size={size}
                          setSize={setSize}
                          component={DropDownItem}
                        ></Field>
                      </Box>
                    </Box>

                    <Divider />

                    <Box className={classes.FormLittleBox} padding={3}>
                      <Box className={classes.SubFormLittleBox}>
                        <Typography variant="h6">Marque</Typography>
                        <ErrorMessage
                          name="Brand"
                          component={TextError}
                        ></ErrorMessage>
                      </Box>
                      <Box className={classes.SubFormLittleBox}>
                        <Field
                          name="Brand"
                          id="Brand"
                          mobile={typeOfInput()}
                          component={BrandForm}
                        ></Field>
                      </Box>
                    </Box>
                    <Divider />

                    {size.length === 2 ||
                    formik.values?.Color.length !== 0 ||
                    formik.values.s ? (
                      <Box>
                        <Box className={classes.FormLittleBox} padding={3}>
                          <Box className={classes.SubFormLittleBox}>
                            <Typography variant="h6">Taille</Typography>
                            <ErrorMessage
                              name="Size"
                              component={TextError}
                            ></ErrorMessage>
                          </Box>
                          <Box className={classes.SubFormLittleBox}>
                            <Field
                              id="Size"
                              name="Size"
                              size={size}
                              mobile={typeOfInput()}
                              component={SizeForm}
                            ></Field>
                          </Box>
                        </Box>
                        <Divider />

                        <Box className={classes.FormLittleBox} padding={3}>
                          <Box className={classes.SubFormLittleBox}>
                            <Typography variant="h6">Couleurs</Typography>
                            <ErrorMessage
                              name="Color"
                              component={TextError}
                            ></ErrorMessage>
                          </Box>
                          <Box className={classes.SubFormLittleBox}>
                            <Field
                              id="Color"
                              name="Color"
                              mobile={typeOfInput()}
                              component={ColorForm}
                            ></Field>
                          </Box>
                        </Box>
                        <Divider />
                      </Box>
                    ) : null}
                    <Box className={classes.FormLittleBox} padding={3}>
                      <Box className={classes.SubFormLittleBox}>
                        <Typography variant="h6">Etat</Typography>
                        <ErrorMessage
                          name="State"
                          component={TextError}
                        ></ErrorMessage>
                      </Box>
                      <Box className={classes.SubFormLittleBox}>
                        <Field
                          name="State"
                          id="State"
                          mobile={typeOfInput}
                          component={StateForm}
                        ></Field>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>

                  <Box height={25} />

                  <Box className={classes.BoxShadow}>
                    <Box className={classes.FormLittleBox} padding={3}>
                      <Box className={classes.SubFormLittleBox}>
                        <Typography variant="h6">Prix</Typography>
                        <ErrorMessage name="Price" component={TextError} />
                      </Box>
                      <Box className={classes.SubFormLittleBox}>
                        <Field
                          name="Price"
                          id="Price"
                          component={CostumPriceField}
                        ></Field>
                      </Box>
                    </Box>
                  </Box>

                  <Box height={25} />

                  <Box className={classes.BoxShadow}>
                    <Box padding={3}>
                      <Typography variant="h6">Mode de Livraison</Typography>
                      <ErrorMessage name="Delivery" component={TextError} />
                    </Box>
                    <Box className={classes.DeliveryBox} padding={3}>
                      <Field
                        name="Delivery"
                        id="Delivery"
                        component={DeliveryFormRadio}
                      ></Field>
                    </Box>
                  </Box>

                  <Box height={25} />

                  <Box display="flex" justifyContent="flex-end">
                    {!edit ? (
                      <Button
                        disabled={isLoading}
                        style={{ color: "white", fontSize: 15 }}
                        variant="contained"
                        type="submit"
                        color="primary"
                      >
                        {isLoading ? <CircularProgress size={24} /> : "Ajouter"}
                      </Button>
                    ) : (
                      <Button
                        disabled={isLoading}
                        style={{ color: "white", fontSize: 15 }}
                        variant="contained"
                        type="submit"
                        color="primary"
                      >
                        {isLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Sauvegarder les changements"
                        )}
                      </Button>
                    )}
                  </Box>

                  <Box height={"5vh"} />
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  }
};
const mapStateToProps = (state) => ({
  itemInfo: state.itemInfo.itemInfo,
  loadingFilter: state.filterCatalogue.filterLoading,
  editInitialValues: state.items.initialValues,
  error: state.items.error,
  loading: state.itemInfo.loading,
});

export default connect(mapStateToProps)(ItemForm);
