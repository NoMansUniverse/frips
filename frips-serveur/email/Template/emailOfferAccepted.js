const emailOfferAccepted = (profile,args) => {

  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Notification d'acceptation de votre offre</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Votre offre a été acceptée !</h1>
    <p>Bonjour ${profile.Pseudo},</p>
    <p>Nous avons le plaisir de vous informer que une de vos offres a été acceptée sur MyFrips. Félicitations ! Vous avez 24 heures pour effectuer le paiement autrement l'offre disparaîtra</p>
    <p>Pour voir les détails de la transaction et finaliser l'achat, veuillez cliquer sur le lien ci-dessous :</p>
    <a ref=https://myfrips.ch/members/myFrips/myProposition/${args.id}    >
    <span
    style="   
      background-color: #82a0c2;
      border-radius: 3px;
      color: #fff;
      height:30px,
      font-size: 18px;
      text-decoration: none;
      text-align: center;
      display:flex;
      height:50px;
      justify-content:center;
      align-items:center;
      width: 100%;
      p-y: 19px;
      max-width: 100%;
      height:25px,
      line-height: 120%;
      text-transform: none;
      mso-padding-alt: 0px;
      mso-text-raise: 14.25px;
    "
    >
   Voir l'offre
    </span>
    </a>
    <p>Merci de votre confiance,</p>
    <p>L'équipe MyFrips</p>
  </body>
</html>
    `;
};

module.exports = {emailOfferAccepted}
