import { Box } from "@material-ui/core";
import React from "react";

import CostumPopper from "./CostumPopper";

const renderCatalogueFilter = (typeOfCatalogue) => {
  return typeOfCatalogue.map((item, index) => {
    return <CostumPopper item={item} />;
  });
};
const CostumChips = ({ TypeCatalogue }) => {
  return (
    <Box
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexWrap={"wrap"}
    >
      {renderCatalogueFilter(TypeCatalogue)}
    </Box>
  );
};

export default CostumChips;
