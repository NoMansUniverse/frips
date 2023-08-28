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
    maxHeight:300,
    textAlign: "justify",
    overflow:"auto"
  },
}));

const SellInfo = () => {
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
          FAQ sur les ventes
        </Typography>

        <Accordion style={{ marginTop: 15 ,marginBottom:15}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="securize-payment"
            id="securize-payment"
          >
            <Typography className={classes.typoTitle}>
              Comment vendre rapidement ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.typoBody}>
              Créez une annonce claire et détaillée : Assurez-vous que votre
              annonce décrit clairement le produit que vous vendez, avec des
              images de haute qualité et une description précise de ses
              caractéristiques. Cela aidera les acheteurs à comprendre
              exactement ce qu'ils achètent. <br /><br/>
              Fixez un prix compétitif : Recherchez les prix des produits
              similaires sur notre marketplace et fixez un prix compétitif pour
              votre annonce. <br /><br/>
              Répondez rapidement aux messages : Si un acheteur vous envoie un
              message, répondez-y rapidement pour montrer que vous êtes un
              vendeur sérieux et fiable. <br /><br/>
              Proposez un excellent service client : Offrez un service clientèle
              de qualité en répondant aux questions des acheteurs rapidement, en
              expédiant rapidement les commandes et en résolvant rapidement les
              problèmes éventuels. <br /><br/>
              Partagez votre annonce : Partagez votre annonce sur vos réseaux
              sociaux et votre site web pour atteindre plus d'acheteurs
              potentiels. <br /><br/>
              En suivant ces conseils, vous pourrez augmenter vos chances de
              vendre rapidement sur notre marketplace. N'oubliez pas que la clé
              du succès est de fournir un excellent service clientèle et de
              proposer des produits de qualité à des prix compétitifs
            </Typography>
          </AccordionDetails>
        </Accordion>

       
      </Box>
    </Box>
  );
};

export default SellInfo;
