import { Box, Button, Card, CardActionArea, Divider, IconButton, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleClickAwayPropose, sendMessage } from "../../../actions";
import API_ENDPOINT from "../../../api/url";

const renderItemForPropose = (item, classes, history) => {
  return (
    <Box width={"50%"} height={"100%"} padding={1}>
      <Card className={classes.BoxOneItem}>
        <Box>
          <CardActionArea
            style={{ width: "100%", height: 300 }}
            onClick={() => {
              history(`/items/${item.id}`);
            }}
          >
            <img
              alt={`${API_ENDPOINT}/images/${item.id}/${item.image.image}`}
              src={`${API_ENDPOINT}/images/${item.id}/${item.image.image}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </CardActionArea>
        </Box>
        <Box padding={2}>
          <Typography>{item.Size}</Typography>
          <Typography>{item.item_brand[0].brand.Name}</Typography>
        </Box>
        <Divider />
        <Box height={44} display="flex" alignItems="center">
          <IconButton onClick={() => {}}></IconButton>

          <Typography></Typography>
        </Box>
      </Card>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    flex: 0.5,
    width: "100%",
    height: "100%",
  },
}));

const SecondPageDialog = ({
  id,
  item,
  userId,
  Profile,
  socket,
  handleClickAway,
}) => {
  const [Price, setPrice] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();


  <Button type="outlined" color="primary" onClick={()=>{
  }}>
          faire une offre
        </Button>

  if (!item) {
    return null;
  }
  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const id_Receiver = () => {
    if (Profile.Profile1.ProfileNumber !== userId) {
      return Profile.Profile1.ProfileNumber;
    }
    if (Profile.Profile2.ProfileNumber !== userId) {
      return Profile.Profile2.ProfileNumber;
    }
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"}>
      {renderItemForPropose(item, classes, history)}
      <Box width={"50%"} display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography style={{ fontSize: 16 }}>Faire une offre</Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          padding={5}
        >
          <Box width={"50%"}>
            <Typography style={{ fontSize: 16 }}>Prix de base</Typography>
          </Box>

          <Box width={"50%"}>
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {item.Price} CHF
            </Typography>
          </Box>
        </Box>

        <Box
          padding={4}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
        >
          <TextField
            placeholder="offre en CHF"
            value={Price}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {Price ? "CHF" : null}
                </InputAdornment>
              ),
              max: 10,
              style: {
                width: "100%",
                fontSize: 16,
              },
            }}
            onChange={handleChange}
            fullWidth
          />

          <Box
            width={"100%"}
            marginTop={5}
            justifyContent={"center"}
            display={"flex"}
          >
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                if (socket.connected) {
                  dispatch(
                    sendMessage(null, id, id_Receiver(), userId, item, Price)
                  );

                  const data = {
                    Message: { text: null, chat_id: id },
                    id_Sender: userId,
                    id_Receiver: id_Receiver(),
                    id: id,
                    Profile: [
                      Profile.Profile2.ProfileNumber,
                      Profile.Profile1.ProfileNumber,
                    ],
                    date: new Date(),
                    item: {
                      Price: item.Price,
                      id: item.id,
                      pricepropose: [{ Price }],
                      image: [{ image: item.image.image }],
                    },
                  };

                  socket.emit("new message", data);
                }
                dispatch(handleClickAwayPropose());
              }}
            >
              Proposer
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.user?.id,
  Profile: state.messageReducer.Profile,
  sendPropose: state.messageReducer.sendPropose,
});

export default connect(mapStateToProps)(SecondPageDialog);
