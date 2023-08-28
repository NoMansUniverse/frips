import { Box, IconButton, MenuItem, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const history = useNavigate();
  return (
    <Box
      width={"100%"}
      position="aboslute"
      bottom={0}
      display={"flex"}
      alignItems="center"
      flexDirection="column"
      style={{ backgroundColor: "#82A0C2" }}
    >
      <Box margin="auto" display="flex" alignItems="center" height={70}>
        <Box>
          <MenuItem
            onClick={() => history("/Condition-general-de-vente-et-politique")}
          >
            Conditions Générales
          </MenuItem>
        </Box>
        <Box>
          <MenuItem onClick={() => history("/aide")}>Assistance</MenuItem>
        </Box>

        <Box>
          <a
            rel="noreferrer"
            target="_blank"
            href={"https://instagram.com/my_frips?igshid=ZDdkNTZiNTM="}
          >
            <IconButton>
              <InstagramIcon />
            </IconButton>
          </a>
        </Box>
        <Box>
          <a
            rel="noreferrer"
            target="_blank"
            href={"https://www.facebook.com/profile.php?id=100090896610241"}
          >
            <IconButton>
              <FacebookIcon />
            </IconButton>
          </a>
        </Box>
      </Box>
      <Box display={"flex"} alignItems="center">
        <FaLeaf size={20} />
        <Typography style={{ fontSize: 16, marginLeft: 2 }}>
          <a
            rel="noreferrer"
            target="_blank"
            href={"https://www.infomaniak.com/en/ecology"}
            style={{color:"black"}}
          >
            Powered by renewable energy
          </a>
        </Typography>
      </Box>
      <Box display={"flex"} alignItems="center">
        <AiOutlineCopyrightCircle style={{ color: "black" }} />

        <Typography
          style={{
            fontSize: 15,
            color: "black",
            fontFamily: "Lobster",
            padding: 6,
          }}
        >
          MyFrips
        </Typography>
        <Typography>2023</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
