import { Typography } from "@material-ui/core";
import React from "react";





const StepTextError = ({text}) => {
  if (text) {
    return (
      <Typography style={{ color: "red", fontSize: "1.0em" }}>
        {text} !
      </Typography>
    );
  } else {
    return (
      <React.Fragment/>
    );
  }
};

export default StepTextError;
