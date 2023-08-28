import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  typoTitle: {
    fontSize: 18,
  },
  typoBody: {
    fontSize: 16,
    textAlign:"justify"
  },
}));

const AccountInfo = () => {
  const classes = useStyle();

  return (
    <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
      width="100%"
      flexGrow={1}
    >
      <Box className={classes.container}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          FAQ sur mon compte
        </Typography>

        <Accordion style={{ marginTop: "5vh" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="create-account"
            id="create-account"
          >
            <Typography className={classes.typoTitle}>
              Comment créer un compte
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Pour créer un compte, rendez-vous sur la page d'inscription et
              remplissez les informations requises, telles que votre nom, votre
              adresse e-mail et votre mot de passe.{"  " + "  "}
              <Link to="/signup">créer un compte</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="change-image"
            id="change-image"
          >
            <Typography className={classes.typoTitle}>
              Comment changer d'image
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Pour changer votre image de profil, connectez-vous à votre compte
              et accédez à la section "image" sous votre profil. Vous pourrez
              alors télécharger une nouvelle image pour remplacer celle
              actuellement affichée. Si vous rencontrez des difficultés pour
              effectuer cette opération, n'hésitez pas  à contacter le service
              d'assistance technique.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="change-password"
            id="change-password"
          >
            <Typography className={classes.typoTitle}>
              Comment changer de nom d'utilisateur, de mot de passe, ou d'email ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Malheureusement, il n'est pas possible de changer votre pseudo une
              fois qu'il a été créé. Cependant, si vous souhaitez modifier votre
              adresse e-mail ou votre mot de passe, veuillez nous contacter pour
              obtenir de l'aide. Notre équipe d'assistance technique sera
              heureuse de vous aider à procéder aux modifications nécessaires.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: 15,marginBottom:15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="change-addresse"
            id="change-addresse"
          >
            <Typography className={classes.typoTitle}>
              Comment changer d'adresse de livraison ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Pour changer votre adresse de livraison, connectez-vous à votre
              compte et accédez à la section "Profil". Dans cette section, vous
              devriez voir un bouton ou un lien intitulé "Changer d'adresse de
              livraison". Cliquez sur ce bouton ou lien et suivez les
              instructions pour modifier votre adresse de livraison. Si vous
              avez des difficultés à trouver cette section ou à effectuer cette
              opération, n'hésitez pas à contacter notre service d'assistance
              technique pour obtenir de l'aide.
            </Typography>
          </AccordionDetails>
        </Accordion>
      
      </Box>
    </Box>
  );
};

export default AccountInfo;
