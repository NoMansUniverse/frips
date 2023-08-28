import { useMediaQuery } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";
import DisplayCatalogue from "./DisplayCatalogue";

const ContainerFilter = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return !mobile ? <DisplayCatalogue /> : null;
};

export default ContainerFilter;
