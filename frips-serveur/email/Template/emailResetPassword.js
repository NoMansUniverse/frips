const sendResetPassword = (token) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Réinitialisation de mot de passe - MyFrips</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center;">Réinitialisation de mot de passe</h1>
        <p>Bonjour,</p>
        <p>Nous avons bien reçu votre demande de réinitialisation de mot de passe pour votre compte MyFrips.</p>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="https://myfrips.ch/reset-password/${token}" style="display: block; width: 100%; max-width: 400px; margin: 20px auto; background-color: #82a0c2; color: #fff; font-size: 16px; text-align: center; text-decoration: none; padding: 20px; border-radius: 3px;">Réinitialiser mon mot de passe</a>
        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez simplement cet e-mail.</p>
        <p>Cordialement,</p>
        <p>L'équipe MyFrips</p>
      </body>
    </html>
    `
  }
  
  module.exports = { sendResetPassword };
  