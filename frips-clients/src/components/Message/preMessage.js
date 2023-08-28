import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

const PreMessage = ({ id, setNumber, number, loading, inView }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" padding={2}>
      {inView ? <CircularProgress size={30}></CircularProgress> : null}
    </Box>
  );
};

export default PreMessage;
