import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../actions";
import { RESET_ERROR } from "../../actions/type";
import TextError from "../Items/formUpload/errorText";

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
  },
}));

const TextFieldLogin = ({
  placeholder,
  field,
  form,
  showPassword,
  setshowPassword,
}) => {
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (field.name === "Password") {
    return (
      <TextField
        fullWidth
        id={field.name}
        name={field.name}
        value={field.value}
        type={showPassword ? "text" : "password"}
        autoComplete="off"
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
        InputProps={{
          spellCheck: false,
          endAdornment: (
            <React.Fragment>
              {field.name === "Password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null}
            </React.Fragment>
          ),
          style: { fontSize: 16 },
        }}
      />
    );
  } else {
    return (
      <TextField
        fullWidth
        id={field.name}
        name={field.name}
        value={field.value}
        autoComplete="off"
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
        InputProps={{
          spellCheck: false,
          endAdornment: (
            <React.Fragment>
              {field.name === "Password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null}
            </React.Fragment>
          ),
          style: { fontSize: 16 },
        }}
      />
    );
  }
};

const initialValues = {
  Email: "",
  Password: "",
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useNavigate();
  const [showPassword, setshowPassword] = useState(false);

  let location = useLocation();


  let from;
  if (
   
    location &&
    location.state &&
    location.state.isFromSeller &&
    location.state.isFromSeller.pathname
  ) {
    from = location.state.isFromSeller.pathname;

  } else if (
    location &&
    location.state &&
    location.state.from &&
    location.state.from.pathname
  ) {
    from = location.state.from.pathname;

  } else {
    from = "/";
  }

  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ERROR });
    };
  }, []);

  const onSubmit = (values) => {
    dispatch(login(values, from, history));
  };

  return (
    <Box width={"100%"} style={{ backgroundColor: "#F5f5f3" }} height={"100%"}>
      <Box>
        <Box
          width={"100%"}
          minHeight={600}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={375}
            height={400}
            className={classes.BoxShadow}
            display="flex"
            flexDirection="column"
            padding={3}
          >
            <Box display="flex" justifyContent="center">
              <Typography style={{ fontSize: 25, fontWeight: 500 }}>
                Se connecter
              </Typography>
            </Box>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <Box marginTop={3}>
                      <Field
                        name="Email"
                        id="Email"
                        component={TextFieldLogin}
                        placeholder={"Adresse Email"}
                      />
                    </Box>

                    <Box marginTop={3}>
                      <Field
                        name="Password"
                        showPassword={showPassword}
                        setshowPassword={setshowPassword}
                        id="Password"
                        component={TextFieldLogin}
                        placeholder={"Mot de passe"}
                      />
                    </Box>

                    {error ? (
                      <Box marginTop={3}>
                        <TextError text={error.msg} />
                      </Box>
                    ) : null}
                    <Box marginTop={3} width={"100%"}>
                      <Button
                        style={{ width: "100%", height: 50 }}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        <Typography style={{ fontSize: 14, color: "white" }}>
                          Se connecter
                        </Typography>
                      </Button>
                    </Box>

                    <Box marginTop={3} width={"100%"}>
                      <Button
                        style={{ width: "100%", height: 50 }}
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={()=>{
                          history("/reset-password")
                        }}
                      >
                        <Typography style={{ fontSize: 14 }}>
                          Mot de passe oublié ?
                        </Typography>
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
            <Box marginTop={5} width={"100%"} display="flex">
              <Typography
                style={{ fontSize: 15, paddingLeft: 5 }}
                color="primary"
              >
                <Link to="/signup">créer un compte ?</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
