import React from "react";

import { Input } from "@material-ui/core";
import { isNumber } from "lodash";

export const CostumTextField = ({ field, form, error, ...props }) => {
  return (
    <Input
      placeholder="Ex: Pull bleu marque X"
      autoComplete="off"
      style={{ fontSize: 16 }}
      spellCheck={false}
      value={field.value}
      onChange={(e) => form.setFieldValue(field.name, e.target.value)}
      fullWidth
    />
  );
};

export const CostumTextFieldDescription = ({
  field,
  form,
  meta,
  error,
  ...props
}) => {
  return (
    <Input
      placeholder="Ex: couleur,utilisation"
      autoComplete="off"
      value={field.value}
      spellCheck={false}
      style={{ fontSize: 16 }}
      onChange={(e) => form.setFieldValue(field.name, e.target.value)}
      fullWidth
      multiline
      inputProps={{ maxLength: 275 }}
    />
  );
};

const customRound = (price) => {
  let decimal = price - Math.floor(price);
  return decimal >= 0.25 && decimal <= 0.75
    ? Math.floor(price) + 0.5
    : Math.round(price);
};
export const CostumPriceField = ({ field, form, error, ...props }) => {
  return (
    <Input
      placeholder="0.00 CHF"
      autoComplete="off"
      style={{ fontSize: 16 }}
      spellCheck={false}
      value={field.value}
      onChange={(e) => {
        if (isNaN(e.target.value)) {
            return;
        } else {
          form.setFieldValue(field.name, e.target.value);
        }
      }}
      fullWidth
    />
  );
};
