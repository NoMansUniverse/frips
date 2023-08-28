import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  DragItem: {
    padding: 3,
    width: 200,
    height: 200,
  },
  Container: {
    boxSizing: "border-box",
    width: 1000,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "80%",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  BoxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  FormLittleBox: {
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBox: {
    display: "block",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },  
  typoTitle: {
    fontSize: 18,    
    fontWeight: "bold",
    marginBottom: "15px",
    marginTop: "15px",
  },
  typoSubtitle: {
    fontSize: 18,
    marginBottom:"10px",
  },
  typoBody: {
    fontSize: 16,    
    marginBottom:"10px",
  },
}));

export const ConditionGeneral = () => {
  const classes = useStyles();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
      width="100%"
      paddingBottom={8}
      marginTop={8}
      flexGrow={1}>
      <Box className={classes.Container}>
        <Typography variant="h5" sx={{ fontWeight: "bold" ,marginTop:5}} >
          Conditions Générales de reventes
        </Typography>
        <Typography className={classes.typoBody}>
          Version : mars 2023
        </Typography>
        <Typography className={classes.typoTitle}>1 Domaine d’application	</Typography>
        <Typography className={classes.typoBody}>
        Les conditions générales de revente (ci-après « CGR ») s'appliquent à tous les actes juridiques et à toutes les obligations liées à la revente de produits sur la boutique en ligne myfrips.ch (ci-après désignées individuellement « boutique en ligne »).
        MyFrips se réserve le droit de modifier les CGR à tout moment. La version des CGR en vigueur au moment de la commande est déterminante. Les conditions du client qui sont en contradiction avec ou qui dérogent aux présentes CGR ne sont pas reconnues.
        MyFrips met à la disposition de ses clients sa boutique en lignes en vue d’une offre et d’une acquisition de produits de friperie (désignées ci-après « Revente »). Dans la suite des CGR, le vendeur d’un produit est désigné comme « vendeur », l’acquéreur d’un produit comme « l’acheteur » et l’acquisition comme « achat » ou « vente ».
        L'offre de produits et de prestations de service de la boutique en ligne, également explicitement dans le cadre d’une revente, (ci-après « offre ») s'adresse exclusivement à la clientèle qui a son domicile/siège social en Suisse ou au Liechtenstein.
        Les livraisons ne sont effectuées qu'à des adresses en Suisse ou au Liechtenstein.
        </Typography>
        <Typography className={classes.typoTitle}>2 Conclusion du contrat / Parties</Typography>
        <Typography className={classes.typoBody}>
        Le vendeur conclut tout contrat établi au moyen d’une revente privée sur la boutique en ligne de MyFrips à son nom, avec ses propres factures et à ses propres risques. Le vendeur est le partenaire contractuel exclusif de l’acheteur. Le vendeur et l’acheteur sont seuls responsables du respect et de l’exécution de tous les contrats (y compris la livraison, la garantie, la résiliation, le paiement du prix d’achat, etc.).
        </Typography>
        <Typography className={classes.typoBody}>
        Le contrat entre le vendeur et l’acheteur est conclu au moment de la commande/de l’achat sur la boutique en ligne, aux conditions visibles (notamment le prix de vente et le délai de livraison) à ce moment par l’acheteur sur la boutique en ligne. Le vendeur et l’acheteur s’engagent à satisfaire pleinement les conditions de ce contrat.
        </Typography>
        <Typography className={classes.typoBody}>
        MyFrips n’est pas une partie d’un contrat; elle agit uniquement à titre d’intermédiaire et de prestataire de services entre l’acheteur et le vendeur. Seuls le vendeur et l’acheteur doivent satisfaire les conditions du contrat. Ni le vendeur ni l’acheteur ne sont des auxiliaires de MyFrips. Ils ne forment aucune société simple, individuellement ou avec MyFrips.
        </Typography>
        <Typography className={classes.typoBody}>
        L’acheteur est toujours informé de l’identité du vendeur et de ses parties contractantes sur la boutique en ligne et sur la facture.
        </Typography>
        <Typography className={classes.typoBody}>
        Une confirmation de commande automatique de MyFrips est envoyée à l’adresse e-mail indiquée par l’acheteur afin de le notifier de la réception d’une commande en ligne. Elle indique uniquement à l’acheteur que la commande effectuée est parvenue à la boutique en ligne et que le contrat avec le vendeur est entré en vigueur.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur est seul responsable de la déclaration et du règlement corrects de toute taxe sur la valeur ajoutée (TVA) éventuelle ainsi que d’autres taxes, cotisations ou frais associés à toutes les ventes que le vendeur effectue sur la boutique en ligne.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur et l’acheteur s’assurent de respecter en tout temps les présentes CGR.
        </Typography>
        <Typography className={classes.typoTitle}>3 Relations entre l’acheteur et le vendeur</Typography>
        <Typography className={classes.typoSubtitle}>3.1 Clauses du contrat à défaut de conditions divergentes</Typography>
        <Typography className={classes.typoBody}>
        Si, au moment de la conclusion du contrat, aucune autre condition n’est en vigueur ou si aucune description clairement différente du produit faite par le vendeur n’est valable, et si les parties n’ont rien convenu d’autre, les clauses suivantes s’appliquent aux contrats de vente:
        </Typography>
        <Typography className={classes.typoBody}>
        Les clauses du contrat entre le vendeur et l’acheteur sont déterminées par la description de produit faite par le vendeur ainsi que les conditions visibles (notamment le prix de vente) sur la boutique en ligne.
        </Typography>
        <Typography className={classes.typoBody}>
        La description de produit est une clause du contrat. Cela signifie que le vendeur garantit que le produit possède les caractéristiques décrites.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur est responsable des défauts matériels, c’est-à-dire des défauts qui n’ont pas été décrits et qui diminuent nettement la valeur ou empêche l’usage prévu du produit. En particulier, le vendeur est responsable de tout manque d’indication claire quant à un défaut de fonctionnement d’un appareil vendu.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur est dans l’obligation d’accorder à l’acheteur la possession et la propriété exemptes de droits tiers du produit contre règlement du prix de vente. Les exclusions de responsabilité à ce sujet sont illicites.
        </Typography>
        <Typography className={classes.typoBody}>
        L’acheteur prend connaissance du fait que la revente concerne des produits usagés qui peuvent avoir de légers défauts optiques exclus de la garantie.
        </Typography>
        <Typography className={classes.typoBody}>
        Tous les différends entre le vendeur et l’acheteur liés au contrat de revente relèvent exclusivement du droit matériel suisse. La Convention des Nations Unies sur les contrats de vente internationale de marchandises ne s'applique pas.
        </Typography>
        <Typography className={classes.typoSubtitle}>3.2 Exécution du contrat</Typography>

        <Typography className={classes.typoBody}>
        Lors de la conclusion du contrat et du paiement du prix, le nom, l’adresse et l’adresse e-mail de l’acheteur sont communiqués au vendeur.
        </Typography>
        <Typography className={classes.typoBody}>
        Les livraisons au client ne sont effectuées que par le biais d’expéditions à l’intérieur de la Suisse ou doivent être récupérées auprès du vendeur. En principe, les produits seront expédiés, à moins que l'acheteur et le vendeur n'en aient convenu autrement.
        </Typography>
        <Typography className={classes.typoBody}>
        L’adresse de livraison des clients doit être en Suisse ou au Liechtenstein et accessible par camion. Si ce n’est pas le cas, l’acheteur assume les frais éventuels.
        </Typography>
        <Typography className={classes.typoBody}>
        En cas de retard de livraison de la part du vendeur, l’acheteur est en droit de se retirer du contrat à partir du 10e jour civil suivant le paiement du prix d’achat. Dans ce cas, MyFrips rembourse au client les montants déjà versés. Il n'existe aucune autre possibilité de revendication auprès de MyFrips.
        </Typography>

        <Typography className={classes.typoTitle}>4 Facturation, encaissement et paiement</Typography>
        <Typography className={classes.typoBody}>
        À la conclusion du contrat d’achat conformément à l’article 2, le vendeur mandate MyFrips afin qu’elle encaisse la créance sur le prix d’achat qui figure sur le contrat correspondant. MyFrips accepte ce mandat d’encaissement de la créance et le met à exécution. La créance comprend toujours la totalité du montant de la facture correspondant au contrat (y compris l’ensemble des taxes [notamment une éventuelle TVA], frais, cotisations, frais d’emballage, d’expédition et de livraison; nommés ci-après « montant de la facture ») et l’ensemble des droits y relatifs (notamment le droit à des intérêts).
        </Typography>
        <Typography className={classes.typoBody}>
        MyFrips est autorisé à déduire son droit au paiement de la commission du droit du vendeur au paiement du montant de la facture.
        </Typography>
        <Typography className={classes.typoBody}>
        MyFrips établit un décompte pour chaque commande individuelle qui comprend chaque poste vendu.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur doit faire parvenir toute réclamation quant à ce décompte dans un délai de sept (7) jours ouvrables après sa réception. Au terme de ce délai, le décompte est considéré comme approuvé sans réserve.
        </Typography>
        

        <Typography className={classes.typoTitle}>5 Annulation du contrat</Typography>
        <Typography className={classes.typoBody}>
        Toute annulation du contrat n’est possible que dans un délai de 30 jours suivant la conclusion du contrat de vente et seulement si l'avoir se trouve encore sur le compte client du vendeur (s'il n’a pas encore été viré sur son compte banquaire). De plus, le vendeur et l’acheteur doivent s’accorder sur l’annulation du contrat et fournir des justificatifs (par exemple, quittance de la poste confirmant le renvoi du bien acheté). En cas d’annulation du contrat, MyFrips renonce à percevoir une commission auprès du vendeur ou la lui rembourse. MyFrips rembourse le prix d’achat déjà payé à l’acheteur. MyFrips se réserve le droit d’exiger du vendeur ou de l’acheteur le paiement d’une indemnité en raison de l’annulation du contrat.
        </Typography>
        

        <Typography className={classes.typoTitle}>6 Devoirs du vendeur</Typography>
        <Typography className={classes.typoSubtitle}>6.1 Produits et prix</Typography>
        <Typography className={classes.typoBody}>
        La revente n’est possible que sur des produits qui rentre dans les catégories suivantes :

              <ul>Vêtements</ul>
              <ul>Chaussures</ul>
              <ul>Sacs</ul>

        MyFrips est en droit d’exclure certains produits et catégories de produits de la revente.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur doit garantir, pour tous les prix publiés dans le cadre de la revente privée sur la boutique en ligne, que l’ensemble des taxes (notamment une éventuelle TVA), taxes de recyclage anticipées (« TRA »), coûts d’emballage, de livraison et tout autres cotisation, frais ou coût sont inclus dans le prix final.
        </Typography>
        <Typography className={classes.typoBody}>
        Toute déclaration fausse, mensongère ou déloyale sur le produit offert de la part du vendeur est interdite. Le vendeur s’engage à supprimer toutes les données personnelles se trouvant sur le produit et à ne pas vendre de contenu illégal. Tout défaut du produit ou de son emballage doit être signalé.
        </Typography>
        <Typography className={classes.typoSubtitle}>6.2 Expédition et confirmation d’expédition</Typography>
        <Typography className={classes.typoBody}>
        Le vendeur est dans l’obligation d’expédier le produit à l’acheteur et de confirmer l’expédition sur le compte du client dans les quatre (4) jours après confirmation du paiement de la part de MyFrips.
        </Typography>
        <Typography className={classes.typoSubtitle}>6.3 Droit de disposition sur le produit offert</Typography>
        <Typography className={classes.typoBody}>
        Le vendeur doit être autorisé à disposer du produit offert. Cela signifie en particulier que le transfert de possession et de propriété à l’acheteur est autorisé et peut être effectué entièrement et librement.
        </Typography>
        <Typography className={classes.typoSubtitle}>6.4 Aucune autre vente</Typography>
        <Typography className={classes.typoBody}>
        Le vendeur n’est pas autorisé à céder d’une autre matière le produit offert ou à accorder des droits le concernant à des tiers.
        </Typography>
        <Typography className={classes.typoSubtitle}>6.5 Commission</Typography>
        <Typography className={classes.typoBody}>
        Le vendeur paie à MyFrips une commission pour son rôle d’intermédiaire avec l’acheteur. La hauteur de la commission est de 7%. MyFrips est en droit de modifier la commission en tout temps, en respectant un préavis de 30 jours.
        </Typography>
        <Typography className={classes.typoBody}>
        La commission est calculée à partir du prix de vente de l’objet acheté (y compris les frais, cotisations, coûts d’emballage, frais de livraison, mais sans la TVA éventuelle).
        </Typography>
        <Typography className={classes.typoBody}>
        La commission est due pour l’ensemble des contrats que le vendeur conclut avec des acheteurs sur la boutique en ligne, sauf si le contrat entre l’acheteur et le vendeur est résilié ultérieurement d’un commun accord ou si l’acheteur ne respecte pas ses obligations de paiement.
        </Typography>
        <Typography className={classes.typoBody}>
        Le droit à la commission entre en vigueur à la conclusion du contrat, conformément à l’article 2.
        </Typography>

        <Typography className={classes.typoTitle}>6.6 Preuve d’expédition</Typography>
        <Typography className={classes.typoBody}>
        Sur demande de MyFrips, le vendeur est dans l’obligation de fournir une preuve d’expédition (par ex. numéro d’expédition du colis postal, reçu de la poste ou justificatif similaire).
        </Typography>
        

        <Typography className={classes.typoTitle}>7 Devoirs de l’acheteur</Typography>
        <Typography className={classes.typoSubtitle}>7.1 Paiement</Typography>
        <Typography className={classes.typoBody}>
        Les commandes obligent l’acheteur à acheter les produits. L’acheteur prend connaissance du fait que MyFrips encaisse le prix d’achat. Il s’engage à faire parvenir l’ensemble des paiements exclusivement à MyFrips.
        </Typography>
        <Typography className={classes.typoBody}>
        Les paiements doivent être effectués en francs suisses.
        </Typography>
        <Typography className={classes.typoSubtitle}>7.2 Devoir de contrôle et confirmation du contenu</Typography>

        <Typography className={classes.typoBody}>
        L’acheteur est dans l’obligation de confirmer la réception du produit dans les 14 jours sur son compte client. Il doit également vérifier la qualité du produit reçu dans les mêmes délais. En confirmant la réception du produit, il confirme que le produit a été vérifié et que celui-ci est conforme au contrat.
        </Typography>
        

        <Typography className={classes.typoTitle}>8 Relation entre le vendeur et MyFrips</Typography>
        
        <Typography className={classes.typoBody}>
          Le vendeur accepte les CGR en vigueur lors de la mise en ligne de son offre et accepte en particulier la commission perçue par MyFrips. En cas de non-respect des obligations qui découlent de ces CGR, MyFrips est en droit d’interdire l’utilisation de sa boutique en ligne.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur prend connaissance du fait que la boutique en ligne se base sur une solution technologique complexe et que sa disponibilité permanente ne peut être garantie. Le vendeur renonce expressément à toute revendication de droit à des dommages et intérêts associée à une interruption temporaire de la connexion avec la boutique en ligne et/ou un problème technique.
        </Typography>
        
        <Typography className={classes.typoTitle}>9 Responsabilité et exclusion de responsabilité</Typography>
        
        <Typography className={classes.typoBody}>
        La responsabilité de MyFrips est exclue dans les limites consenties par la loi. MyFrips décline notamment toute responsabilité quant à l’exhaustivité ou l’exactitude des indications des clients sur le site Web. La responsabilité de MyFrips n’est pas engagée pour des pertes de gain et des dommages directs consécutifs.
        </Typography>
        

        <Typography className={classes.typoTitle}>10 Autres dispositions</Typography>
        <Typography className={classes.typoSubtitle}>10.1 Protection et utilisation des données</Typography>
        
        <Typography className={classes.typoBody}>
        Les données de l'acheteur (nom, adresse, numéro de téléphone, etc.) sont transmises au vendeur à des fins d’exécution du contrat de vente. Le vendeur a uniquement le droit d'utiliser ces données pour le traitement du contrat de vente correspondant. Toute autre utilisation de ces données client par le vendeur est interdite (en particulier l'utilisation à des fins de marketing ou à d'autres fins, transmission ou vente, etc.). Le vendeur est dans l’obligation de traiter les données client en pleine conformité avec les lois sur la protection des données applicables.
        </Typography>
        <Typography className={classes.typoBody}>
        Après l'exécution du contrat de vente, le vendeur est tenu de supprimer toutes les données client générées sur la boutique en ligne dont il dispose encore. Sont exclues les données qui doivent être conservées en vertu de dispositions légales.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur reconnaît que les données client générées sur la boutique en ligne sont les données de MyFrips et que MyFrips a le droit de les utiliser, à sa seule discrétion et à ses propres fins.
        </Typography>
        <Typography className={classes.typoBody}>
        Le vendeur accorde à MyFrips le droit illimité et sans rémunération d’utiliser l’ensemble des données (notamment les données de produit) qu’il place dans la boutique en ligne. Cela comprend notamment le droit de publier et modifier ces données à des fins publicitaires dans des médias imprimés ou d’autres canaux de communication. Ce droit d’utilisation perdure après le terme du contrat.
        </Typography>
        <Typography className={classes.typoBody}>
        En outre, la déclaration de protection des données s'applique au traitement des données personnelles par MyFrips.
        </Typography>

        <Typography className={classes.typoSubtitle}>10.2 Nullité partielle</Typography>
        
        <Typography className={classes.typoBody}>
        Si certaines dispositions des présentes CGR devaient s'avérer être nulles ou non avenues, la validité des autres dispositions du contrat n'est en rien modifiée.
        </Typography>
        <Typography className={classes.typoSubtitle}>10.3 For et droit applicable</Typography>
        
        <Typography className={classes.typoBody}>
          Toutes les relations juridiques entre MyFrips et l’acheteur ou le vendeur sont soumises au droit matériel suisse. La Convention des Nations Unies sur les contrats de vente internationale de marchandises ne s'applique pas.
        </Typography>
        <Typography className={classes.typoBody}>
          Sauf en cas de dispositions légales différentes, le for est Lausanne, en Suisse.
        </Typography>

      </Box>
    
    </Box>
  );
};

export default ConditionGeneral;
