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

const PaymentInfo = () => {
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
          FAQ sur les paiements
        </Typography>

        <Accordion style={{ marginTop: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="securize-payment"
            id="securize-payment"
          >
            <Typography className={classes.typoTitle}>
            Est-ce que les paiements sont sécurisés ?

            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Nous utilisons Stripe, une plateforme de paiement en ligne très
              réputée et fiable. Stripe utilise des normes de sécurité de niveau
              bancaire pour protéger les informations de paiement des
              utilisateurs, telles que le cryptage SSL 256 bits et la conformité
              aux normes de sécurité PCI-DSS. Vous pouvez donc être sûr que vos
              informations de paiement seront protégées contre les fraudes et
              les attaques externes.
              <br />
              <br />
              N'hésitez pas à nous contacter si vous avez d'autres questions ou
              préoccupations
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
              Quand vais-je recevoir mon paiement ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Notre méthode de paiement est conçue pour offrir une protection
              supplémentaire aux acheteurs et renforcer la confiance dans notre
              marketplace. Le paiement sera déclenché une fois que l'acheteur
              aura reçu l'article et l'aura confirmé en le marquant comme
              "reçu".
              <br />
              Si l'acheteur oublie de marquer l'article comme "reçu", vous
              recevrez automatiquement votre paiement dans un délai d'une
              semaine après la livraison. Nous vous recommandons de suivre de
              près le statut de votre envoi pour vous assurer que l'acheteur a
              bien reçu l'article et qu'il l'a marqué comme "reçu".
              <br />
              <br />
              N'hésitez pas à nous contacter si vous avez des questions ou des
              préoccupations concernant le paiement de votre commande
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
              Pourquoi je dois payer des frais ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              En tant que marketplace, nous facturons des frais pour couvrir les
              coûts associés à la gestion de la plateforme, tels que les coûts
              de traitement des paiements, la sécurité et la maintenance
              technique. Ces frais nous permettent également de continuer à
              investir dans l'amélioration de notre plateforme pour offrir une
              expérience utilisateur optimale tout en maintenant un équilibre
              entre la rentabilité et la durabilité de notre entreprise.
              <br />
              <br />
              Il est important de noter que les frais que nous facturons, c'est
              à dire 7% sont compétitifs par rapport aux autres marketplaces qui
              sont de 10% en moyenne et qu'ils nous permettent de maintenir la
              qualité de notre service.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PaymentInfo;
