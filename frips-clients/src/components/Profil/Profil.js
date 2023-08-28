import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useRef, useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import { useDispatch, useSelector } from "react-redux";
import { changeImageProfile } from "../../actions";
import API_ENDPOINT from "../../api/url";
import ModalAdress from "./ModalAdress";
import ModalForIban from "./ModalForIban";
import Money from "./MoneyComponents/Money";
import ModalMoneyRequest from "./MoneyComponents/ModalMoneyRequest";

const useStyles = makeStyles((theme) => ({
  FormLittleBox: {
    display: "flex",
    flexWrap: "wrap",
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBoxLeft: {
    display: "flex",
    alignItems: "center",
    width: "75%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      fontSize: 16,
      padding: 5,
    },
  },
  SubFormLittleBoxRight: {
    display: "flex",
    alignItems: "center",
    width: "25%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      fontSize: 16,
      padding: 5,
    },
  },
  SettingContent: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    display: "block",
    alignItems: "center",
    width: "25%",
  },
  MenuSetting: {
    height: 50,
  },
  Spacer: {
    width: "100%",
    height: 50,
  },
  Header: {
    fontSize: 18,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  Dialog: {
    width: 400,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: 15,

    [theme.breakpoints.down("sm")]: {
      height: "80vh",
      width: "auto",
      padding: 5,
    },
  },
  DialogIban: {
    width: 400,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: 15,

    [theme.breakpoints.down("sm")]: {
      width: "auto",
      padding: 5,
    },
  },
  formContainer: {
    boxSizing: "border-box",
    width: 1000,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
}));

const UserProfile = () => {
  const editor = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModalIban, setOpenModalIban] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);

  const [openChange, setOpenChange] = useState(false);
  const state = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState({
    image: "",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    file: true ? "s" : null,
    scale: 1,
    rotate: 0,
    preview: null,
  });

  const imageHandleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage({
        ...selectedImage,
        image: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (state.image?.image) {
      setSelectedImage({
        ...selectedImage,
        image: `/imageProfile/${state.id}/${state.image?.image}`,
      });
    }
  }, []);

  const handleScale = (e, value) => {
    const scale = parseFloat(value);
    setSelectedImage({ ...selectedImage, scale: scale });
  };

  const handlePositionChange = (position) => {
    setSelectedImage({ ...selectedImage, position: position });
  };

  const handleClosePayment = () => {
    setOpenModalPayment(false);
  };

  const handleOpenPayment = () => {
    setOpenModalPayment(true);
  };

  const handleCloseIban = () => {
    setOpenModalIban(false);
  };

  const handleOpenIban = () => {
    setOpenModalIban(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenChange = () => {
    setOpenChange(true);
  };

  const handleChangeClose = () => {
    if (state.image?.image) {
      setSelectedImage({
        ...selectedImage,
        image: `/imageProfile/${state.id}/${state.image?.image}`,
      });
    }
    setOpenChange(false);
  };

  return (
    <Box style={{ backgroundColor: "#F5f5f3" }} width={"100%"}>
      <Box className={classes.Spacer} />
      <Box className={classes.formContainer}>
        <Box width={"100%"} marginRight={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.MenuSetting}
          >
            <Typography className={classes.Header}>
              Détails du profil
            </Typography>
          </Box>
          <Box padding={2} className={classes.FormLittleBox}>
            <Box className={classes.SubFormLittleBoxLeft}>
              <Box padding={3}>
                <Typography>Ta photo de profil</Typography>
              </Box>
            </Box>

            <Box
              className={classes.SubFormLittleBoxRight}
              justifyContent="flex-end"
            >
              <Avatar
                style={{
                  marginRight: 10,
                  fontSize: 20,
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
                alt={`${state.Pseudo}`}
                src={`${API_ENDPOINT}/imageProfile/${state.id}/${state.image?.image}`}
              />

              <Button
                onClick={handleOpenChange}
                variant="contained"
                color="primary"
              >
                {state.image?.image ? "changer de photo" : "upload une photo"}
              </Button>
              <Dialog open={openChange}>
                <Box className={classes.Dialog}>
                  <Box
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                    className={classes.MenuSetting}
                  >
                    <Typography className={classes.Header}>
                      Ajouter une photo
                    </Typography>
                  </Box>

                  <Box display={"flex"} justifyContent="center" width={"100%"}>
                    <ReactAvatarEditor
                      scale={parseFloat(selectedImage.scale)}
                      ref={editor}
                      position={selectedImage.position}
                      onPositionChange={handlePositionChange}
                      rotate={parseFloat(selectedImage.rotate)}
                      style={{
                        padding: 20,
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                      }}
                      borderRadius={"100%"}
                      disableDrop={true}
                      image={selectedImage.image}
                      className="editor-canvas"
                    />
                  </Box>
                  <Box padding={3}>
                    <Slider
                      min={1}
                      step={0.01}
                      max={2}
                      onChange={handleScale}
                    />

                    <form style={{ width: "100%", padding: 10 }}>
                      <input
                        style={{ display: "none" }}
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={imageHandleChange}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          startIcon={<AddIcon></AddIcon>}
                          style={{ width: "100%" }}
                          variant="outlined"
                          color="primary"
                          component="span"
                        >
                          <Typography>Ajouter une photo</Typography>
                        </Button>
                      </label>
                    </form>

                    {selectedImage.image ? (
                      <Box
                        display={"flex"}
                        justifyContent="center"
                        paddingTop={2}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          style={{ width: "100%" }}
                          onClick={() => {
                            const canvas = editor.current.getImage();

                            canvas.toBlob(function (blob) {
                              const file = new File(
                                [blob],
                                selectedImage.file.name,
                                { type: selectedImage.file.type }
                              );
                              dispatch(changeImageProfile(file));
                            });
                          }}
                        >
                          <Typography>Sauvegarder</Typography>
                        </Button>
                      </Box>
                    ) : null}

                    <Box
                      display={"flex"}
                      justifyContent="center"
                      paddingTop={2}
                    >
                      <Button
                        color="primary"
                        variant="outlined"
                        style={{ width: "100%" }}
                        onClick={handleChangeClose}
                      >
                        <Typography>Retour</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Dialog>
            </Box>
          </Box>
          <Divider />
          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBoxLeft}>
              <Box padding={3} width={"50%"}>
                <Typography style={{ fontSize: 16 }}>Adresse E-mail</Typography>
              </Box>
              <Box padding={3} display="flex" width={"50%"}>
                <Typography style={{ fontSize: 16 }}>{state.Email}</Typography>
              </Box>
            </Box>
          </Box>
          <Divider />

          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBoxLeft}>
              <Box padding={3} width={"50%"}>
                <Typography style={{ fontSize: 16 }}>IBAN</Typography>
              </Box>
              <Box padding={3} display="flex" width={"50%"}>
                <Typography style={{ fontSize: 16 }}>{state?.IBAN}</Typography>
              </Box>
            </Box>

            <Box
              className={classes.SubFormLittleBoxRight}
              justifyContent="flex-end"
            >
              <Button
                onClick={handleOpenIban}
                variant="contained"
                color="primary"
              >
                Changer
              </Button>
              <ModalForIban
                open={openModalIban}
                handleClose={handleCloseIban}
                classes={classes}
              />
            </Box>
          </Box>
          <Divider />

          <Box className={classes.FormLittleBox} padding={2}>
            <Box className={classes.SubFormLittleBoxLeft}>
              <Box padding={3} width={"50%"} flexDirection={"column"}>
                <Typography style={{ fontSize: 16 }}>
                  Mon porte-monnaie
                </Typography>
              </Box>
              <Box padding={3} display="flex" width={"50%"}>
                <Money
                  sumUnpaidMoney={state?.sumUnpaidMoney}
                  MoneyAvaible={state?.MoneyAvaible}
                />
              </Box>
            </Box>

            <Box
              className={classes.SubFormLittleBoxRight}
              justifyContent="flex-end"
            >
              <Button
                onClick={handleOpenPayment}
                variant="outlined"
                color="primary"
              >
                Transférer sur mon compte
              </Button>
            </Box>
            {openModalPayment ? <ModalMoneyRequest
              open={openModalPayment}
              handleClickAway={handleClosePayment}
              IBAN={state?.IBAN}
            />:null}
          </Box>
        </Box>

        <Box className={classes.Spacer} />

        <Box
          display="flex"
          flexDirection={"column"}
          className={classes.boxShadow}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.MenuSetting}
          >
            <Typography className={classes.Header}>
              Adresse de livraison
            </Typography>
          </Box>

          <Box className={classes.FormLittleBox} padding={5}>
            <Box className={classes.SubFormLittleBoxLeft}>
              <Box padding={3} display="flex" justifyContent={"center"}>
                <Typography style={{ paddingRight: 5, fontSize: 16 }}>
                  Adresse
                </Typography>
              </Box>
              {Boolean(state?.address) ? (
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography
                    style={{ fontSize: 16, fontWeight: 600 }}
                  >{`${state?.Firstname} ${state?.Lastname}`}</Typography>
                  <Typography
                    style={{ fontSize: 16 }}
                  >{`${state?.address?.Street} ${state?.address?.NumStreet}`}</Typography>
                  <Typography
                    style={{ fontSize: 16 }}
                  >{`${state?.address?.City} ${state?.address?.NPA}`}</Typography>
                </Box>
              ) : null}
            </Box>

            <Box
              className={classes.SubFormLittleBoxRight}
              justifyContent="flex-end"
            >
              <Button variant="contained" color="primary" onClick={handleOpen}>
                {state?.address ? "changer" : "ajouter"}
              </Button>
            </Box>
          </Box>
          <ModalAdress
            open={open}
            classes={classes}
            address={state?.address}
            Firstname={state?.Firstname}
            Lastname={state?.Lastname}
            handleClose={handleClose}
          />
        </Box>
        <Box className={classes.Spacer} />
      </Box>
    </Box>
  );
};

export default UserProfile;
