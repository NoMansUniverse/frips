import { Box } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import StepTextError from "../Items/formUpload/errorText";
import TextFieldLogin from "./TextFieldLogin";

const SecondStep = ({ control, errors,setValue }) => {
  return (
    <React.Fragment>
      
      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Controller
            name="step2.firstName"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Prénom" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.firstName?.message} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Controller
            name="step2.name"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin
                  {...{ ...field, placeholder: "Nom de famille" }}
                />
              );
            }}
          />

          <StepTextError text={errors?.step2?.name?.message} />
        </Box>
      </Box>
      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"100%"}>
          <Controller
            name="step2.Birthday"
            control={control}
            render={({ field }) => {
              return <TextFieldLogin {...{ ...field, placeholder: "Date de naissance, par exemple 04/02/2000" ,setValue}} />;
            }}
          />

          <Box>
            <StepTextError text={errors?.step2?.Birthday?.message} />
          </Box>
        </Box>

        <StepTextError text={errors?.step2?.Mois?.message} />
      </Box>

      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"75%"}>
          <Controller
            name="step2.Rue"
            control={control}
            render={({ field }) => {
              return <TextFieldLogin {...{ ...field, placeholder: "Rue" }} />;
            }}
          />

          <StepTextError text={errors?.step2?.Rue?.message} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"25%"}>
          <Controller
            name="step2.Numero"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Numéro" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Numero?.message} />
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Controller
            name="step2.NPA"
            control={control}
            render={({ field }) => {
              return <TextFieldLogin {...{ ...field, placeholder: "NPA" }} />;
            }}
          />

          <StepTextError text={errors?.step2?.NPA?.message} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Controller
            name="step2.Localite"
            control={control}
            render={({ field }) => {
              return (
                <TextFieldLogin {...{ ...field, placeholder: "Localité" }} />
              );
            }}
          />

          <StepTextError text={errors?.step2?.Localite?.message} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SecondStep;
