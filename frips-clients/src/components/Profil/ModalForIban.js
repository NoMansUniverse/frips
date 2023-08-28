import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { changeIban } from "../../actions";
import StepTextError from "../Items/formUpload/errorText";
import TextFieldLogin from "../Login/TextFieldLogin";

const initialValue = {
  IBAN: "",
};

const validationSchema = yup.object().shape({
  IBAN: yup
    .string()
    .matches(
      /^CH[0-9A-Za-z]{2}\s[0-9A-Za-z]{4}\s[0-9A-Za-z]{4}\s[0-9A-Za-z]{4}\s[0-9A-Za-z]{4}\s[0-9A-Za-z]$/,

      "Veuillez entrer un IBAN valide"
    )
    .required("Un IBAN est requis"),
});

export const ModalForIban = ({ open, classes, handleClose }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (event) => {
    const input = event.target.value.replace(/\s/g, "").toUpperCase();
    let formatted = input.match(/.{1,4}/g)?.join(" ");

    if (formatted && input.length > 4 && input.length % 4 === 0) {
      formatted += "";
    }
    return formatted || "";
  };

  const onSubmit = (values) => {
    dispatch(changeIban(values.IBAN, from));
    handleClose();
  };

  return (
    <Dialog open={open}>
      <Box className={classes.DialogIban}>
        <Box
          width={"100%"}
          style={{ backgroundColor: "#F5f5f3" }}
          height="100%"
        >
          <Typography variant="h6">Veuillez entrer un IBAN valide</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box width={"100%"} marginTop={2}>
              <Controller
                name="IBAN"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextFieldLogin
                      multiline={true}
                      placeholder="par ex CH12 1245 124A 213A 123B 1"
                      value={value}
                      onChange={(e) => {
                        onChange(handleChange(e));
                      }}
                    />
                  );
                }}
              />
              <StepTextError text={errors?.IBAN?.message} />

              <Button
                style={{ width: "100%", height: 50, marginTop: "5vh" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                <Typography style={{ fontSize: 14, color: "white" }}>
                  Valider
                </Typography>
              </Button>
            </Box>
          </form>
          <Button
            style={{ width: "100%", height: 50, marginTop: "2vh" }}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={handleClose}
          >
            <Typography style={{ fontSize: 14 }}>Retour</Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModalForIban;
