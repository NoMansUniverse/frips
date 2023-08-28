var postmark = require("postmark");
const config = require("config");
const { emailUser } = require("./Template/emailNewUser");
const { emailMessage } = require("./Template/emailMessage");
const { searchInformation } = require("./searchInformationEmail");
const { emailSell } = require("./Template/emailSell");
const { emailBill } = require("./Template/emailBill");
const { emailOfferReceived } = require("./Template/emailOfferReceived");
const { emailOfferAccepted } = require("./Template/emailOfferAccepted");
const client = new postmark.ServerClient(config.get("postMark"));
const log4js = require("log4js");
const { sendPacket } = require("./Template/emailSendPacket");
const { sendResetPassword } = require("./Template/emailResetPassword");
const logger = log4js.getLogger("mail");

const typeOfEmail = (type, information, args) => {
  switch (type) {
    case "Welcome":
      return {
        From: "noreply@myfrips.ch",
        To: information.Email,
        Subject: "Confirmation d'inscription à MyFrips",
        HtmlBody: emailUser(information.Pseudo),
        MessageStream: "outbound",
      };
    case "NewMessage":
      return {
        From: "noreply@myfrips.ch",
        To: information?.findUserItem?.Email,
        Subject: Boolean(args?.id_Item)
          ? "Vous avez reçu une nouvelle offre"
          : "Vous avez reçu un nouveau message",
        HtmlBody: emailMessage(
          information.findUserItem,
          information.SenderPseudo,
          args?.id_Chat,
          information?.itemForEmail,
          args?.pricepropose
        ),
        MessageStream: "outbound",
      };
    case "Sell":
      return {
        From: "noreply@myfrips.ch",
        To: information.Email,
        Subject: "Une vente a été conclue !",
        HtmlBody: emailSell(information, args.id_Item),
        MessageStream: "outbound",
      };
    case "Bill":
      return {
        From: "noreply@myfrips.ch",
        To: information.buyerAccount.Email,
        Subject: "Résumé de votre achat",
        HtmlBody: emailBill(
          information.buyerAccount,
          information.soldItem,
          information.transactionInfo
        ),
        MessageStream: "outbound",
      };
    case "ReceivedOffer":
      return {
        From: "noreply@myfrips.ch",
        To: information.findUserItem.Email,
        Subject: "Vous avez reçu une nouvelle offre",
        HtmlBody: emailOfferReceived(
          information.findUserItem,
          information.senderInfo,
          information?.itemForEmail,
          args?.pricepropose
        ),
        MessageStream: "outbound",
      };
    case "AcceptedOffer":
      return {
        From: "noreply@myfrips.ch",
        To: information.Email,
        Subject: "Une de tes offres a été acceptée",
        HtmlBody: emailOfferAccepted(information,args),
        MessageStream: "outbound",
      };
    case "SendPacket":
      return {
        From: "noreply@myfrips.ch",
        To: information.findUserItem.Email,
        Subject: "Notification d'envoi de colis sur MyFrips",
        HtmlBody: sendPacket(
          information.findUserItem,
          information.Sender,
          information?.itemForEmail
          ),
        MessageStream: "outbound",


      }
    case "ResetPassword":
      return {
        From: "noreply@myfrips.ch",
        To: information.Email,
        Subject: "Demande de réinitialisation de mot de passe",
        HtmlBody: sendResetPassword(args.token),
        MessageStream: "outbound",

      }

    default:
      break;
  }
};

const sendEmail = async (id_Receiver, type, args) => {
  try {
    
    const information = await searchInformation(id_Receiver, type, args);

    console.log(information)
    if (Boolean(information)) {
      client.sendEmail(
        typeOfEmail(type, information, args),
        (error, result) => {
          if (result) {
            logger.info(result);
          } else {
            console.log(information)
            throw new Error(error);
          }
        }
      );
    }
  } catch (error) {
    console.log(error)
    logger.error(error);
  }
};

module.exports = { sendEmail };
