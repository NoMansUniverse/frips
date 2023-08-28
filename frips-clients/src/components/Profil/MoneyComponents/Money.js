import { Box, Typography } from "@material-ui/core";
import React from "react";

const Money = ({ sumUnpaidMoney, MoneyAvaible }) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography style={{ fontSize: 16, color: "#808080" }}>
        {Boolean(MoneyAvaible) ? `${MoneyAvaible} CHF` : "0.00 CHF"}{" "}
      </Typography>
      <Typography style={{ fontSize: 16 }}>
        {Boolean(sumUnpaidMoney) ? `${sumUnpaidMoney} CHF` : "0.00 CHF"}
      </Typography>
    </Box>
  );
};

export default Money;
