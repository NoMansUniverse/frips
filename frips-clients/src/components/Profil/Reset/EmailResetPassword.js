import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../../../api/api";
import StepTextError from "../../Items/formUpload/errorText";
import TextFieldLogin from "../../Login/TextFieldLogin";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    boxSizing: "border-box",
    width: 300,
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
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
    },
  },
}));

const initialValue = {
  Email: "",
};

const validationSchema = yup.object().shape({
  Email: yup
    .string("Enter your Email")

    .email("Veuillez entrer un Email valide")

    .required("Veuillez entrer un Email valide"),
});

export const EmailResetPassword = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [emailSend, setEmailSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    control,
    register,
    getValues,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const history = useNavigate();
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await axiosInstance.post("/api/auth/reset/password", { ...values });
      setEmailSend(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <Box width={"100%"} style={{ backgroundColor: "#F5f5f3" }} height="100%">
      <Box height={"5vh"} />
      <Box
        width={"100%"}
        display="flex"
        height={"100%"}
        justifyContent="center"
        flexDirection={"column"}
        alignItems="center"
      >
        <Box height={"3vh"} />

        <Box
          className={classes.BoxShadow}
          display="flex"
          flexDirection="column"
          marginBottom={10}
          padding={3}
        >
          <Typography variant="h6">
            Veuillez entrer l'email associé à votre compte pour recevoir le lien
            pour changer de mot de passe
          </Typography>
          {!emailSend ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box marginTop={3}>
                <Controller
                  name="Email"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextFieldLogin
                        {...{
                          ...field,
                          placeholder: "Email",
                        }}
                      />
                    );
                  }}
                />
                <StepTextError text={errors?.Email?.message} />
              </Box>
              <Button
                style={{ width: "100%", height: 50, marginTop: "5vh" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                <Typography style={{ fontSize: 14, color: "white" }}>
                  Envoyer
                </Typography>
              </Button>
            </form>
          ) : (
            <Box
            marginTop={8}
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <CheckCircleIcon style={{ color: "#4AA05F", fontSize: 80 }} />
              <Typography style={{ fontSize: 16 ,marginTop:30}}>
                Votre email a été envoyé avec succès. Veuillez vérifier votre
                boîte de réception ainsi que votre dossier de courriers
                indésirables (spams).
              </Typography>
            </Box>
          )}
          {error ? <StepTextError text={error.msg} /> : null}
        </Box>
      </Box>
    </Box>
  );
};

export default EmailResetPassword;
