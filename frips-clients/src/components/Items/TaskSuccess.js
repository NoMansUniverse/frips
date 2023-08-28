import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import { useNavigate } from "react-router-dom";

const TaskSuccess = ({ error, isLoading, edit,added }) => {
  const navigate = useNavigate();

  if (!isLoading && !Boolean(error) && added) {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        flexGrow={1}
        style={{ backgroundColor: "#F5f5f3" }}
        height="100vh"
        alignItems={"center"}
      >
        <CheckCircleIcon style={{ color: "#4AA05F", fontSize: 80 }} />
        <Typography style={{ fontSize: 18
         }}>
          {edit ? "Article changé avec succès" : "Article ajouté avec succès"}
        </Typography>
        <Button
          style={{ width: "auto", marginTop: 5 }}
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Retour au Menu
        </Button>
      </Box>
    );
  } else if (isLoading) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  } else {
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      height="100vh"
      style={{ backgroundColor: "#F5f5f3" }}
      flexGrow={1}
      alignItems={"center"}
    >
      <ErrorIcon style={{ color: "#DD3437", fontSize: 80 }} />
      <Typography> Oups il y a eu un problème</Typography>
      <Box display={"flex"}>
        <Button
          style={{ width: "100%", marginTop: 5 }}
          variant="outlined"
          color="primary"
          onClick={() => navigate("/items/new")}
        >
          Essayer à nouveau
        </Button>
      </Box>
    </Box>;
  }
};

export default TaskSuccess;
