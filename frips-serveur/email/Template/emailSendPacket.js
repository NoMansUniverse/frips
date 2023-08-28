const sendPacket = (profile,sender,item) => {

    return `
    <html lang="fr">
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <body
      style="
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      "
    >
      <table
        style="
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        "
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                width="100%"
                style="
                  max-width: 37.5em;
                  margin: 0 auto;
                  padding: 20px 0 48px;
                  width: 580px;
                "
              >
                <tr style="width: 100%">
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <img alt="Airbnb"
                            src=${"https://myfrips.ch/Logo.png"}
                            width="40" height="40" style=" display: block;
                            outline: none; border: none; text-decoration: none; "
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <table
                      style="padding-bottom: 20px"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              role="presentation"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              width="100%"
                            >
                              <tbody style="width: 100%">
                                <tr style="width: 100%">
                                  <p
                                    style="
                                      font-size: 32px;
                                      line-height: 1.3;
                                      margin: 16px 0;
                                      font-weight: 700;
                                      color: #484848;
                                    "
                                  >
                                    Bonjour, ${profile.Pseudo}
                                  </p>
                                
                                <p style="font-size: 17px; line-height: 24px; margin: 16px 0; text-align: left;">
                                Nous vous informons que  ${sender.Pseudo} a envoyé le colis à votre adresse de livraison.
                                </p>
                                
                                
                                  <p style="
                                  font-size: 17px;
                                  line-height: 24px;
                                  margin: 16px 0;
                                    text-align: left;
                                "> Vous pouvez vous connecter à votre compte et cliquer sur le lien ci-dessous pour voir les détails de l'expédition. </p>

                                  ${Boolean(item) ? `
                                  <table
    style="
      padding-left: 40px;
      padding-right: 40px;
      padding-top: 40px;
      padding-bottom: 40px;
    "
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="100%"
          >
            <tbody style="width: 100%">
              <tr style="width: 100%">
                <td>
                  <img alt="${item.Name}"
                    src=${`https://api.myfrips.ch:5000//images/${item.id}/${item.image[0].image}`}
                    width="150" height="150" style=" display: block; outline:
                    none; border: none; text-decoration: none; float: left;
                    object-fit: cover; max-width: 100%; height: auto;" />
                </td>
                <td style="vertical-align: top; padding-left: 12px">
                  <p
                    style="
                      font-size: 14px;
                      line-height: 2;
                      margin: 0;
                      font-weight: 500;
                    "
                  >
                    ${item.Name}
                  </p>
                  <p
                    style="
                      font-size: 14px;
                      line-height: 2;
                      margin: 0;
                      color: #747474;
                      font-weight: 500;
                    "
                  >
                    ${item.Size}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>           `:""}
  
                                  <a
                                    href=https://myfrips.ch/members/myFrips/myPurchase/${item.id}
                                    style="
                                      background-color: #82a0c2;
                                      border-radius: 3px;
                                      color: #fff;
                                      font-size: 18px;
                                      text-decoration: none;
                                      text-align: center;
                                      display: inline-block;
                                      width: 100%;
                                      p-y: 19px;
                                      line-height: 100%;
                                      max-width: 100%;
                                      padding: 19px 0px;
                                    "
                                    >
                                    <div style="text-align: center;">
                                    <span style="
                                        display: inline-block;
                                        background-color: #82a0c2;
                                        color: #fff;
                                        text-align: center;
                                        border-radius: 3px;
                                        font-size: 18px;
                                        height: 50px;
                                        line-height: 50px;
                                        max-width: 100%;
                                        text-decoration: none;
                                    ">
                                      Voir les détails de l'article 
                                    </span>
                                  </div>
                                    </a>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                
                                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                                  <a target="_blank" style="color:#9ca299;text-decoration:underline;font-size:14px" href="https://myfrips.ch/">MyFrips</a>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
    
    `;
  };
  module.exports = {sendPacket};
  