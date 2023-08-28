const emailConfirmationSend = ({}) => {
    return `
    <html>
  <head>
    <meta charset="UTF-8">
    <title>Confirmation d'envoi</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #fff;">
      <p style="font-size: 17px; line-height: 24px; margin: 16px 0; text-align: left;">
        Bonjour,<br>
        <br>
        Nous sommes ravis de vous informer que votre article sur MyFrips a bien été envoyé.<br>
        <br>
        Si vous avez des questions sur votre achat, vous pouvez contacter le vendeur via la messagerie<br>
        <br>
        Voici les détails de votre envoi :<br>
        <br>
        <img src="https://example.com/images/item.jpg" alt="Nom de l'article" style="width: 200px; height: auto; margin-bottom: 16px;"><br>
        <strong>Nom de l'article:</strong> Chemise en coton<br>
        <strong>Description:</strong> Chemise en coton légèrement utilisée, taille L.<br>
        <strong>Prix:</strong> 10€<br>
        <br>
        Nous espérons que vous serez satisfait(e) de votre achat sur MyFrips.<br>
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

    `
}

module.exports = {emailConfirmationSend}

