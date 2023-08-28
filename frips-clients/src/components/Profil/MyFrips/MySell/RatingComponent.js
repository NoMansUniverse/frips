import { Box, Button, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setReview } from "../../../../actions";

const RatingComponent = ({ Pseudo, id, review,isFrom,setindex }) => {
  const [value, setValue] = useState(review || 0);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();


  return (
    <Box
      marginTop={10}
      marginBottom={10}
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      flexDirection="column"
      height={50}
    >
      <Typography style={{ fontSize: 16 }}>
        Évalue ta satisfaction de {Pseudo}
      </Typography>

      <Box display={"flex"} flexDirection="column" marginTop={2}>
        <Rating
          readOnly={review || disabled ? review ??value : null}
          size="large"
          name="rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      {!review || disabled ? (
        <Button
          disabled={disabled || review}
          onClick={() => {
            dispatch(setReview(value, id,isFrom));
            setindex(2)
            setDisabled(true)
          }}
          color="Primary"
          style={{ fontSize: 13, marginTop: 20, width: "25%" }}
          variant="outlined"
        >
          Evaluer
        </Button>
      ) : null}
    </Box>
  );
};

export default RatingComponent;
