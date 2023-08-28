import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import StepTextError from "../Items/formUpload/errorText";
import TextFieldLogin from "./TextFieldLogin";

const FirsStep = ({
  control,
  onSubmit,
  errors,
  getValues,
  setshowPassword,
  showPassword,
}) => {
  return (
    <React.Fragment>
      <Box marginTop={3}>
        <Controller
          name="step1.Pseudo"
          control={control}
          render={({ field }) => {
            return <TextFieldLogin {...{ ...field, placeholder: "Pseudo" }} />;
          }}
        />

        <Box>
          <StepTextError text={errors?.step1?.Pseudo?.message} />

          {getValues().step1.Pseudo !== "" ? (
            <Typography>
              Attention ton nom pseudo sera unique et ne pourra plus être
              changé.
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Box marginTop={3}>
        <Controller
          name="step1.Email"
          control={control}
          render={({ field }) => {
            return <TextFieldLogin {...{ ...field, placeholder: "Email" }} />;
          }}
        />

        <StepTextError text={errors?.step1?.Email?.message} />
      </Box>
      <Box marginTop={3}>
        <Controller
          name="step1.Password"
          control={control}
          render={({ field }) => {
            return (
              <TextFieldLogin
                {...{
                  ...field,
                  placeholder: "Mot de passe",
                  setshowPassword,
                  showPassword,
                }}
              />
            );
          }}
        />
        <StepTextError text={errors?.step1?.Password?.message} />
      </Box>
    </React.Fragment>
  );
};

export default FirsStep;
