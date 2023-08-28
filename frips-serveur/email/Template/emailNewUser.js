const emailUser = (name) =>{
    return `
    <html lang="fr">

    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    
  
    <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
          <td><img alt="myFrips" src=${"https://myfrips.ch/Logo.png"} width="50" height="50" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
          <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #fff;">
      <p style="font-size: 17px; line-height: 24px; margin: 16px 0; text-align: "justify";">
        Bonjour, ${name}<br>
        <br>
        Nous sommes ravis de vous informer que votre inscription sur MyFrips a été un succès. Vous faites désormais partie de notre communauté de passionnés de mode et de seconde main.<br>
        <br>
        Vous pouvez dès maintenant explorer notre marketplace et découvrir des articles de secondes mains. Vous pouvez également ajouter vos propres articles et commencer à vendre ou encore acheter.<br>
        <br>
        Nous espérons que MyFrips répondra à vos attentes et vous permettra de faire de bonnes affaires.<br>
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

module.exports = {emailUser}