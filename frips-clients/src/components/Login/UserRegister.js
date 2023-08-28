import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  makeStyles,
  Switch,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { registerUser, userIfExist } from "../../actions";
import { RESET_ERROR } from "../../actions/type";
import StepTextError from "../Items/formUpload/errorText";
import CostumStepper from "./CostumStepper";
import FirsStep from "./FirsStep";
import SecondStep from "./SecondStep";

const CustomSwitch = withStyles({
  switchBase: {
    color: "#bab8b8", // color when switch is off
    "&$checked": {
      color: "#82A0C2", // color when switch is on
    },
    "&$checked + $track": {
      backgroundColor: "#82A0C2",
    },
  },
  
  checked: {},
  track: {},
})(Switch);

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
  step1: {
    Email: "",
    Pseudo: "",
    Password: "",
    check: false,
  },
  step2: {
    firstName: "",
    name: "",
    NPA: "",
    Localite: "",
    Birthday: "",
    Rue: "",
    Numero: "",
  },
};

const regExp = "w*[a-zA-Z]w*";

const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    Pseudo: yup
      .string("Un nom d'utilisateur est requi")
      .min(3, "Votre pseudo doit au moins faire 3 charactères")
      .matches(regExp, {
        message: "Doit avoir au moins une lettre",
        excludeEmptyString: true,
      })
      .required(`Un nom d'utilisateur est requis`),
    Email: yup
      .string("Enter your Email")

      .email("Veuillez entrer un Email valide")

      .required("Veuillez entrer un Email valide"),
    Password: yup
      .string("Entrez un mot de passe ")
      .min(8, "Le mot de passe  doit au moins avoir 8 caractères")
      .required("Un mot de passe est requis"),
    check: yup
      .boolean()
      .oneOf(
        [true],
        "Veuillez accepter les conditions générales et confirmer avoir au moins 18 ans"
      )
      .required(
        "Veuillez accepter les conditions générales et confirmer avoir au moins 18 ans"
      ),
  }),
});

function getSteps() {
  return ["Créer un profil", "Valider ses informations personnels"];
}

export const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const {
    control,
    register,
    getValues,
    watch,
    handleSubmit,
    clearErrors,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const pseudo = watch("step1.Pseudo"); // you can also target specific fields by their names

  console.log(errors);
  const renderStepper = (step) => {
    switch (step) {
      case 0:
        return (
          <FirsStep
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            getValues={getValues}
            errors={errors}
            showPassword={showPassword}
            setshowPassword={setshowPassword}
          />
        );
      case 1:
        return (
          <SecondStep
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            getValues={getValues}
            setValue={setValue}
            errors={errors}
          />
        );

      default:
        return <React.Fragment />;
    }
  };

  const error = useSelector((state) => state.auth.error);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ERROR });
    };
  }, []);

  const handleNext = async () => {
    const results = await trigger([
      "step1.Email",
      "step1.Pseudo",
      "step1.Password",
      "step1.check",
    ]);

    if (activeStep === 0 && results) {
      dispatch(userIfExist(getValues().step1, setActiveStep, activeStep));
    }
  };

  let from;
  if (
    location &&
    location.state &&
    location.state.from &&
    location.state.from.pathname
  ) {
    from = location.state.from.pathname;
  } else if (
    location &&
    location.state &&
    location.state.isFromSeller &&
    location.state.isFromSeller.pathname
  ) {
    from = location.state.isFromSeller.pathname;
  } else {
    from = "/";
  }

  const onSubmit = (values) => {
    dispatch(registerUser(values, from, history));
  };

  return (
    <Box width={"100%"} style={{ backgroundColor: "#f0f1f2" }}>
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
          <Box display="flex" justifyContent="center" padding={2}>
            <Typography style={{ fontSize: 25, fontWeight: 500 }}>
              {getSteps()[activeStep]}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepper(activeStep)}
            <Box marginTop={5} display={"flex"} flexDirection={"column"}>
              <Typography>
                En t’inscrivant, tu confirmes que tu acceptes les Conditions
                générales de MyFrips, la Politique de confidentialité, les
                règles du catalogue, les règles de la communauté et avoir au
                moins 18 ans.
              </Typography>

              <Controller
                name="step1.check"
                control={control}
                render={({ field }) => {
                  return <CustomSwitch size="large" {...field} />;
                }}
              />
            </Box>

            <StepTextError text={errors?.step1?.check?.message} />

            {error ? (
              <Box marginTop={3}>
                <StepTextError text={error?.msg} />
              </Box>
            ) : null}
            <Box marginTop={5} width={"100%"}>
              <Button
                style={{ width: "100%", height: 50 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                <Typography hy style={{ fontSize: 14, color: "white" }}>
                  S'inscrire
                </Typography>
              </Button>
            </Box>

            <Box marginTop={3} width={"100%"} display="flex">
              <Typography style={{ fontSize: 15 }}>Déjà un compte ?</Typography>
              <Typography
                style={{ fontSize: 15, paddingLeft: 5 }}
                color="primary"
              >
                <Link to="/login">Se connecter</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
