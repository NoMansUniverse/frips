import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, Typography } from "@material-ui/core";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { updateAddress } from "../../actions";
import StepTextError from "../Items/formUpload/errorText";
import TextFieldLogin from "../Login/TextFieldLogin";

const validationSchema = yup.object().shape({
  Prenom: yup.string("Entrez un Prénom ").required("Un Prénom est requis"),
  Nom: yup.string("Entrez un Nom ").required("Un Nom est requis"),
  NPA: yup.string("Entrez un NPA ").required("Un NPA est requis"),
  Rue: yup
    .string("Entrez une rue ")
    .matches(
      /^[^\d]+$/,
      "Veuillez indiquer seulement le nom de la rue dans ce champs s'il vous plaît"
    )
    .required("Un rue est requise"),
  Localite: yup
    .string("Entrez une localitée ")
    .matches(/^[^\d]+$/, "Veuillez indiquer seulement le nom de votre localité")
    .required("Une localitée est requise"),
  Numero: yup
    .string("Entrez un  numéro")
    .matches(/^[0-9]*$/, "Veuillez seulement utiliser des nombres")
    .required("Un numéro est requis"),
});

const renderTextField = (control, errors, initialValue) => {
  return Object.keys(initialValue).map((item) => {
    return (
      <Box marginTop={3} display="flex" alignItems={"center"}>
        <Box width={"50%"}>
          <Typography style={{ fontSize: 16 }}>{item}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} width={"50%"}>
          <Controller
            name={`${item}`}
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: `${item}` }} />
              );
            }}
          />

          <StepTextError text={errors[item]?.message} />
        </Box>
      </Box>
    );
  });
};

const ModalAdress = ({
  classes,
  open,
  handleClose,
  address,
  Firstname,
  Lastname,
}) => {
  const dispatch = useDispatch();

  let initialValue;
  if (address) {
    initialValue = {
      Prenom: Firstname,
      Nom: Lastname,
      NPA: address.NPA,
      Localite: address.City,
      Rue: address.Street,
      Numero: address.NumStreet,
    };
  } else {
    initialValue = {
      Prenom: "",
      Nom: "",
      NPA: "",
      Localite: "",
      Rue: "",
      Numero: "",
    };
  }

  const {
    control,
    register,
    getValues,
    watch,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });

  const onSubmit = (values) => {
    dispatch(updateAddress(values));
    handleClose();
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.Dialog}>
          <Box
            justifyContent="center"
            display="flex"
            alignItems="center"
            className={classes.MenuSetting}
          >
            <Typography className={classes.Header}>
              Ajouter une Adresse
            </Typography>
          </Box>
          {renderTextField(control, errors, initialValue)}
          <Box marginTop={5}>
            <Button
              style={{ width: "100%", height: 50 }}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Confirmer
            </Button>
          </Box>

          <Box marginTop={2}>
            <Button
              style={{ width: "100%", height: 50 }}
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default ModalAdress;
