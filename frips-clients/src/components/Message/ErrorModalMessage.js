import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React from "react";
import { AiFillWarning } from "react-icons/ai";
const ErrorModalMessage = ({ warning ,setShowWarning}) => {
  return (
    <Dialog open={Boolean(warning)} >
      <DialogTitle
        style={{ color: red[500], display: "flex", alignItems: "center" }}
      >
        <AiFillWarning size={30} style={{ marginRight: "8px" }} />
        Attention !
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          style={{
            fontSize: 17,
            verticalAlign: "center",
            display: "inline-block",
          }}
        >
          Pour votre sécurité, l'envoi de numéros de téléphone, de liens
          externes et les invitations à utiliser d'autres plateformes ne sont
          pas autorisés sur cette plateforme. L'envoi de telles informations
          peut entraîner des risques de fraude/scam et de sécurité pour vous et
          les autres utilisateurs de la plateforme.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={()=>{
            setShowWarning(false)
        }}>
          Compris
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModalMessage;
