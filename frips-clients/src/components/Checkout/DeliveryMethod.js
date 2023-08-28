import {
  Box,
  makeStyles,
  Radio,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: "pointer",
  },
  BoxItem: (props) => ({
    "&:hover": {
      background: props.hoverColor,
    },
    display: "flex",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
  }),
  Typography: {
    fontWeight: 500,
    fontSize: 16,
  },

  checkBox: {
    position: "absolute",
    "&:hover": {
      background: "transparent",
    },
    right: 0,
    top: 0,
  },
  DeliveryBox: {
    display: "flex",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const DeliveryMethod = ({
  deliveryArray,
  selectedDelivery,
  setSelectedDelivery,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderDeliveryMethods = (arrayDelivery) => {
    return arrayDelivery?.map(({ fees }) => {
      return (
        <Box
          className={classes.BoxItem}
          border={3}
          padding={2}
          width="100%"
          margin={1}
          borderColor={selectedDelivery === fees.id ? "#82A0C2" : "#9E9E9E"}
          borderRadius={20}
          marginBottom={2}
          onClick={() => {
            if (selectedDelivery === fees.id) {
              setSelectedDelivery(null);
            } else {
              setSelectedDelivery(fees.id);
            }
          }}
        >
          <Box display={"flex"}>
            <Typography className={classes.Typography}>{fees.Name}</Typography>
          </Box>
          <Box
            marginLeft={2}
            display="flex"
            alignItems={"center"}
            flexDirection="column"
          >
            <Typography
              style={{ fontWeight: 700 }}
              className={classes.Typography}
            >
              {Boolean(fees.Price) ? `${fees.Price} CHF` : "gratuit"}
            </Typography>
          </Box>
          {!mobile ? (
            <Radio
              className={classes.checkBox}
              style={{ backgroundColor: "transparent" }}
              checked={selectedDelivery === fees.id}
              color="primary"
              disableFocusRipple
              disableRipple
              disableTouchRipple
            />
          ) : null}
        </Box>
      );
    });
  };

  return (
    <Box className={classes.DeliveryBox}>
      {renderDeliveryMethods(deliveryArray)}
    </Box>
  );
};

export default DeliveryMethod;
