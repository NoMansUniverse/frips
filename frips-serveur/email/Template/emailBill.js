const emailBill = (buyerProfile, item, transaction) => {
  const { Firstname, Lastname } = buyerProfile;
  const { City, NPA, Street, NumStreet } = buyerProfile?.address;
  return `
      <html lang="fr">

    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    
    </div>

    <body style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;background-color:#ffffff">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:660px">
        <tr style="width:100%">
          <td>
            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td>
                  <td align="right" style="display:table-cell">
                    <p style="font-size:32px;line-height:24px;margin:16px 0;font-weight:300;color:#888888">Résumé de la commande</p>
                  </td>
          </td>
        </tr>
        </tbody>
      </table>
      
      <table style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
              <table style="height:46px" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
                <tbody style="width:100%">
                  <tr style="width:100%">
                    <td colSpan="2">
                      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                              <p style="font-size:20px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">Pseudo</p>
                              <a href="https://myfrips.ch/member/${buyerProfile.Pseudo}" style="color:#15c;text-decoration:underline;font-size:16px;margin:0;padding:0;line-height:1.4">
                               ${buyerProfile.Pseudo}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                              <p style="font-size:14px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">Date du paiement</p>
                              <p style="font-size:12px;line-height:1.4;margin:0;padding:0">${new Date(
                                transaction.DateSell
                              ).toLocaleString("fr-CH", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                                timeZone: "Europe/Zurich",
                              })}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                              <p style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">Numéro</p><a target="_blank" style="color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4">${
                                item.id
                              }</a>
                            </td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td colSpan="2" style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                      <p style="font-size:16px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">Addresse Livraison</p>
                      <p style="font-size:14px;line-height:1.4;margin:0;padding:0">${Firstname} ${Lastname}</p>
                      <p style="font-size:14px;line-height:1.4;margin:0;padding:0">${Street} ${NumStreet}</p>
                      <p style="font-size:14px;line-height:1.4;margin:0;padding:0">${City} ${NPA}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px;margin:30px 0 15px 0;height:24px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
              <p style="font-size:18px;line-height:24px;margin:0;background:#fafafa;padding-left:10px;font-weight:500">Achat</p>
            </td>
          </tr>
        </tbody>
      </table>
      <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
      <tbody>
      <tr>
        <td>
        <td style="width:64px">
  <img alt=${
    item.Name
  } src=${`https://api.myfrips.ch:5000//images/${item.id}/${item.image[0].image}`} width="64" height="64" style="display:block;outline:none;border:1px solid rgba(128,128,128,0.2);text-decoration:none;margin:0 0 0 20px;border-radius:14px;object-fit: cover;" />
  </td>
        <td style="padding-left:22px">
          <p style="font-size:14px;line-height:1.4;margin:0;padding:0;width:"50%">${
            item.Name
          }</p>
          <p style="font-size:14px;line-height:1.4;margin:0;padding:0">${
            item.Size
          }</p>
          <p style="font-size:14px;line-height:1.4;margin:0;padding:0">${
            item.item_brand[0].brand.Name
          }</p>


        </td>
        
        </td>
      </tr>
    </tbody>
      
      <tbody>
          <tr>
            <td>
            <td style="width:64px">
  </td>
            <td style="padding-left:22px">
              <p style="font-size:14px;line-height:1.4;margin:0;padding:0">Prix</p>
              <p style="font-size:14px;line-height:1.4;margin:0;padding:0">Livraison</p>
              <p style="font-size:14px;line-height:1.4;margin:0;padding:0">Frais</p>


            </td>
            <td align="right" style="display:table-cell;padding:0px 20px 0px 0px;width:100px;vertical-align:top">
              <p style="font-size:14px;line-height:24px;margin:0">${
                transaction.Price
              } CHF</p>
              <p style="font-size:14px;line-height:24px;margin:0">${
                transaction.PriceDelivery

              } CHF</p>
              <p style="font-size:14px;line-height:24px;margin:0">${
                transaction.Price_Fees

              } CHF </p>
            </td>
            </td>
          </tr>
        </tbody>
      </table>
      <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0 0 0" />
      <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
            <td align="right" style="display:table-cell">
              <p style="font-size:10px;line-height:24px;margin:0;color:rgb(102,102,102);font-weight:600;padding:0px 30px 0px 0px;text-align:right">TOTAL</p>
            </td>
            <td style="height:48px;border-left:1px solid;border-color:rgb(238,238,238)"></td>
            <td style="display:table-cell;width:90px">
              <p style="font-size:16px;line-height:24px;margin:0px 20px 0px 0px;font-weight:600;white-space:nowrap;text-align:right">${
                transaction.Price_Fees +
                transaction.Price +
                transaction.PriceDelivery
              } CHF</p>
            </td>
            </td>
          </tr>
        </tbody>
      </table>
      <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:0 0 40px 0" />
    
    
    
      <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
            <td align="center" style="display:block;margin:40px 0 0 0"><img alt="MyFrips" src="https://myfrips.ch/Logo.png" width="26" height="26" style="display:block;outline:none;border:none;text-decoration:none" /></td>
            </td>
          </tr>
        </tbody>
      </table>
      </td>
      </tr>
      </table>
    </body>

  </html>
    `;
};

module.exports = { emailBill };
