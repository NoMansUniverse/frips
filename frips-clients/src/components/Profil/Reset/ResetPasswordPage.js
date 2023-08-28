import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../../../api/api";
import StepTextError from "../../Items/formUpload/errorText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Mot de Passe est requis")
    .min(8, "Le mot de de passe doit au moins avoir 8 caratères "),
  confirmNewPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Les deux mots de passes doivent être identique"
    )
    .required("Confirmer le mot de passe doit être rempli"),
});

const ResetPasswordPage = () => {
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const [sendNewPassword,setSendNewPassword] = useState(false)
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get(
          `/api/auth/reset/password/${token}`,
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Page introuvable");
      }
    };
    fetchData();
  }, []);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
        await axiosInstance.post(
            `/api/auth/newPassword`,
            {...data,token}
          );
          setSendNewPassword(true)
          setTimeout(() => {
            navigate('/login');
          }, 10*1000);
    } catch (error) {
        setError("Oups quelque chose s'est mal passé")
        setSendNewPassword(true)

    }
      
};
  if (loading && !Boolean(error)) {
    return (
      <Box
        width={"100%"}
        height={"100vh"}
        style={{ backgroundColor: "#F5f5f3" }}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  } else if (!loading && Boolean(error)) {
    return (
      <Box
        width={"100%"}
        height={"100vh"}
        style={{ backgroundColor: "#F5f5f3" }}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>{error}</Typography>
      </Box>
    );
  }
  return (
    <Box width={"100%"} style={{ backgroundColor: "#F5f5f3" }} >
      <Box height={"5vh"} />

      <Box
        width={"100%"}
        display="flex"
        justifyContent="center"
        flexDirection={"column"}
        alignItems="center"
      >
        <Box height={"5vh"} />

        <Box
          className={classes.BoxShadow}
          display="flex"
          flexDirection="column"
          marginBottom={10}
          padding={3}
        >
          <Typography style={{ fontSize: 16 }}>
            Changer de mot de passe
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginTop={3}>
              <TextField
                {...register("newPassword")}
                autoComplete="new-password"
                label="Nouveau mot de passe"
                type={showPassword ? "text" : "password"}
                fullWidth
                InputProps={{
                  spellCheck: false,
                  endAdornment: (
                    <React.Fragment>
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    </React.Fragment>
                  ),
                  style: { fontSize: 16 },
                }}
              />

              <StepTextError text={errors?.password?.message} />
            </Box>
            <Box marginTop={3}>
              <TextField
                {...register("confirmNewPassword")}
                autoComplete="new-password"
                fullWidth
                label="Confirmer nouveau mot de passe"
                type="password"
                inputProps={{ style: { fontSize: 16 } }}
              />
              <StepTextError text={errors?.confirmNewPassword?.message} />
            </Box>
            {!sendNewPassword ? <Button
              style={{ width: "100%", height: 50, marginTop: "5vh" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              <Typography style={{ fontSize: 14, color: "white" }}>
                Confirmer
              </Typography>
            </Button>: <Box
            marginTop={8}
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <CheckCircleIcon style={{ color: "#4AA05F", fontSize: 80 }} />
              <Typography style={{ fontSize: 16 ,marginTop:30}}>
                Mot de passe changé avec succès
              </Typography>
            </Box>
            
            }
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
