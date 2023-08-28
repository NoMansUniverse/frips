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
    textAlign: "justify",
  },
}));

const BuyInfo = () => {
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
          FAQ sur mes achats
        </Typography>

        <Accordion style={{ marginTop: "5vh" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="create-account"
            id="create-account"
          >
            <Typography className={classes.typoTitle}>
              Comment négocier ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li className={classes.typoBody}>
                Faites des recherches : Avant de négocier, renseignez-vous sur
                le produit que vous souhaitez acheter ou vendre. Assurez-vous de
                connaître la valeur marchande du produit et les prix proposés
                par d'autres vendeurs.
              </li>
              <br />
              <li className={classes.typoBody}>
                Soyez poli et professionnel : La négociation peut parfois être
                tendue, mais il est important de rester poli et professionnel
                tout au long du processus. Évitez les insultes ou les remarques
                offensantes.
              </li>
              <br />

              <li className={classes.typoBody}>
                Présentez des arguments solides : Si vous voulez que l'autre
                partie accepte votre offre, présentez des arguments solides pour
                appuyer votre position. Par exemple, si vous êtes l'acheteur,
                vous pouvez souligner les défauts du produit ou les offres
                concurrentes.
              </li>
              <br />

              <li className={classes.typoBody}>
                Restez flexible : Soyez ouvert aux compromis et aux négociations
                pour trouver un terrain d'entente qui convient aux deux parties.
              </li>
              <br />
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="change-image"
            id="change-image"
          >
            <Typography className={classes.typoTitle}>
              Comment vous protéger ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Pour garantir votre sécurité, nous avons mis en place des mesures
              pour prévenir les fraudes et les usurpations d'identité. Nous
              n'autorisons aucun échange d'informations personnelles via la
              messagerie. En cas de doute sur un produit, nous vous conseillons
              de contacter directement le vendeur pour clarifier les
              informations concernant l'article. Si vous rencontrez un problème
              avec un vendeur malhonnête, vous pouvez contacter notre service
              client pour signaler l'incident et nous prendrons les mesures
              nécessaires pour résoudre le problème.
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
              Changer d'utilisateur, de mot de passe, ou d'email
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

        <Accordion style={{ marginTop: 15, marginBottom: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="change-addresse"
            id="change-addresse"
          >
            <Typography className={classes.typoTitle}>
              Changer d'adresse de livraison
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

export default BuyInfo;
