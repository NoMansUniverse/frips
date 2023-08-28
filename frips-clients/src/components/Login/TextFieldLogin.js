import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

const TextFieldLogin = (props) => {
  const [lastKeyEvent, setLastKeyEvent] = useState(null);

  function handleKeyDown(event) {
    setLastKeyEvent(event.keyCode);
  }

  const handleClickShowPassword = () => {
    props.setshowPassword(!props.showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (props.name === "step2.Birthday") {
    return (
      <TextField
        name={props.name}
        onBlur={props.onBlur}
        onChange={(event) => {
          const { value } = event.target;

          let birthdate = value.replace(/[^\d]/g, "").slice(0, 8);
          console.log(lastKeyEvent);
          if (lastKeyEvent !== 8) {
            // Add slashes between the day and month, and between month and year
            // Add slashes if they are missing
            if (birthdate.length >= 2 && birthdate.charAt(2) !== "/") {
              birthdate = `${birthdate.slice(0, 2)}/${birthdate.slice(2)}`;
            }
            if (birthdate.length >= 5 && birthdate.charAt(5) !== "/") {
              birthdate = `${birthdate.slice(0, 5)}/${birthdate.slice(5)}`;
            }
          } else {
            birthdate = birthdate.slice(0, -1);
            if (birthdate.length >= 2) {
              birthdate = `${birthdate.slice(0, 2)}/${birthdate.slice(2)}`;
            }
            if (birthdate.length >= 5) {
              birthdate = `${birthdate.slice(0, 5)}/${birthdate.slice(5)}`;
            }
          }

          props.onChange(birthdate);
        }}
        onKeyDown={handleKeyDown}
        onKeyPress={props.onKeyPress}
        placeholder={props.placeholder}
        value={props.value}
        ref={null}
        multiline={props.name === "Rue"}
        fullWidth
        style={{ padding: 5 }}
        autoComplete="off"
        InputProps={{
          spellCheck: false,

          style: { fontSize: 16 },
        }}
      />
    );
  }
  if (
    props.name === "step1.Password" ||
    props.name === "password" ||
    props.name === "ConfirmPassword"
  ) {
    return (
      <TextField
        fullWidth
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        ref={null}
        type={props.showPassword ? "text" : "password"}
        autoComplete="off"
        InputProps={{
          spellCheck: false,
          endAdornment: (
            <React.Fragment>
              {props.name === "step1.Password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {props.showPassword ? <Visibility /> : <VisibilityOff />}
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
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onKeyPress={props.onKeyPress}
        placeholder={props.placeholder}
        value={props.value}
        ref={null}
        multiline={props.name === "Rue"}
        fullWidth
        style={{ padding: 5 }}
        autoComplete="off"
        InputProps={{
          spellCheck: false,

          style: { fontSize: 16 },
        }}
      />
    );
  }
};

export default TextFieldLogin;

/**/
