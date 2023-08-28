const emailSell = (profile,id) => {

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Confirmation de vente</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9;">
      <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #fff;">
        <p style="font-size: 17px; line-height: 24px; margin: 16px 0; text-align: left;">
          Bonjour ${profile.Pseudo},<br>
          <br>
          Nous sommes heureux de vous informer qu'un de vos articles sur MyFrips a été vendu ! Félicitations !<br>
          <br>
          Pour faciliter le processus d'envoi, veuillez consulter la page de vente pour obtenir les coordonnées du destinataire et les instructions d'expédition.<br>
          <br>
          Vous pouvez accéder à la page de vente en cliquant sur le lien ci-dessous :<br>
          <br>
          <a href="https://www.myfrips.ch/members/mySell/${id}" style="display: inline-block; padding: 10px 20px; background-color: #82a0c2; color: #fff; text-decoration: none; border-radius: 5px;">Voir ma vente</a><br>
          <br>
          Nous espérons que cette vente sera le début de nombreuses autres transactions réussies sur MyFrips.<br>
          <br>
          Cordialement,<br>
          L'équipe de MyFrips
        </p>
        <p style="font-size: 16px; line-height: 22px; margin: 16px 0; text-align: left; font-weight: bold;">
          MyFrips - La marketplace de seconde main de vêtements
        </p>
      </div>
    </body>
  </html>


    `;
};

module.exports = { emailSell };
