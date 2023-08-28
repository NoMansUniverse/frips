import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

const RegroupByDate = ({ current,next }) => {
  if(moment(current.Date_Houre).local().format("LL") !==moment(next.Date_Houre).local().format("LL")){
    return (
      <Box width="100%" height={25} display="flex" justifyContent="center">
        <Typography>{moment(next.Date_Houre).local().format("LL")}</Typography>
      </Box>
      
    );
  }
  else{ 
    return <React.Fragment />
  }
};

export default RegroupByDate;
