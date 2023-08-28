import { Box, Icon, Link, Typography } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import React from "react";
import { BiPackage } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";

const DetailAddress = ({ buyerAccount }) => {
  const { Firstname, Lastname } = buyerAccount;
  const { City, NPA, Street, NumStreet } = buyerAccount?.address;
  return (
    <Box display={"flex"} flexDirection={"column"} marginBottom={5}>
      <Box display={"flex"} alignItems="center">
        <Icon component={GiPositionMarker} />
        <Typography style={{ fontSize: 16 }}>Adresse</Typography>
      </Box>
      <Box marginLeft={10} display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} flexDirection="column">
          <Typography
            style={{ fontSize: 16, fontWeight: 600 }}
          >{`${Firstname} ${Lastname}`}</Typography>
          <Typography
            style={{ fontSize: 16 }}
          >{`${Street} ${NumStreet}`}</Typography>
          <Typography style={{ fontSize: 16 }}>{`${City} ${NPA}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const typeOfDelivery = (price) => {
  if (price === 7) {
    return "Livraison Poste Standard";
  }
  if (price === 9) {
    return "Livraison Poste Rapide";
  }
  return "Livraison en main-propre";
};

const DetailsDelivery = ({ item, buyerAccount, account, classes }) => {
  const { Firstname, Lastname } = account;
  const { City, NPA, Street, NumStreet } = account?.address;
  return (
    <Box padding={2} width="100%">
      <Typography style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
        Résumé de la vente
      </Typography>

      <Box className={classes.delivery}>
        <Box className={classes.deliveryCategory}>
          <Box display={"flex"} flexDirection={"column"} marginBottom={5}>
            <Box display={"flex"} alignItems="center">
              <Icon component={AttachMoneyIcon} />
              <Typography style={{ fontSize: 16 }}>Prix</Typography>
            </Box>
            <Box marginLeft={10} display={"flex"}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography style={{ fontSize: 15 }}>{"Prix"}</Typography>
                <Typography style={{ fontSize: 15 }}>{"Livraison"}</Typography>
                <Typography style={{ fontSize: 15 }}>{"Frais"}</Typography>
                <Typography style={{ fontSize: 17, fontWeight: 720 }}>
                  {"Total"}
                </Typography>
              </Box>
              <Box display={"flex"} marginLeft={6} flexDirection={"column"}>
                <Typography style={{ fontSize: 15 }}>
                  {item?.Price}.-
                </Typography>
                <Typography style={{ fontSize: 15 }}>
                  {item?.DeliveryPrice}.-
                </Typography>
                <Typography style={{ fontSize: 15 }}>
                  {item?.Price_Fees}.-
                </Typography>
                <Typography style={{ fontSize: 17, fontWeight: 720 }}>
                  {item?.Price + item?.DeliveryPrice + item?.Price_Fees}
                  CHF
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"} marginBottom={5}>
            <Box display={"flex"} alignItems="center" marginBottom={2}>
              <Icon component={BiPackage} />
              <Typography style={{ fontSize: 16 }}>
                Mode de Livraison
              </Typography>
            </Box>
            <Box marginLeft={10} display={"flex"}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography style={{ fontSize: 17, fontWeight: 700 }}>
                  {typeOfDelivery(item.DeliveryPrice)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.deliveryCategory}>
          <Box display={"flex"} flexDirection={"column"} marginBottom={5}>
            <Box display={"flex"} alignItems="center">
              <Icon component={BsFillPersonFill} />
              <Typography style={{ fontSize: 16 }}>Vendeur</Typography>
            </Box>
            <Box marginLeft={10} display={"flex"} width="100%">
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 600 }}
                >{`${Firstname} ${Lastname}`}</Typography>
                <Typography style={{ fontSize: 16 }}>
                  {account.Pseudo}
                </Typography>
                <Typography style={{ fontSize: 16 }}>
                  <Link href={`mailto:${account.Email}`} color="primary">
                    {account.Email}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
          <DetailAddress buyerAccount={buyerAccount} />
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsDelivery;
