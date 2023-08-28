import {
  Box,
  ClickAwayListener,
  makeStyles,
  MenuItem,
  Popper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import {
  GiBackpack,
  GiConverseShoe,
  GiLargeDress,
  GiRunningShoe,
} from "react-icons/gi";
import { IoShirtSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Catalogue } from "../Items/staticItems/staticItemName";
import { MdSelectAll } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  fakeBox: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    width: "100vh",
  },
  BoxShadow: {
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    backgroundColor: "white",
    borderRadius: 5,
  },
}));

let thirdQuery;

const changeIcon = (index, category) => {
  if (category === 0) {
    if (index === 0) {
      return <GiLargeDress color="#82A0C2" size={20} />;
    } else if (index === 1) {
      return <GiConverseShoe color="#82A0C2" size={20} />;
    } else {
      return <BsHandbagFill color="#82A0C2" size={20} />;
    }
  } else {
    if (index === 0) {
      return <IoShirtSharp color="#82A0C2" size={20} />;
    } else if (index === 1) {
      return <GiRunningShoe color="#82A0C2" size={20} />;
    } else {
      return <GiBackpack color="#82A0C2" size={20} />;
    }
  }
};

const SubHeaderNavigation = ({ category, transformStringToUrl, name }) => {
  const history = useNavigate();

  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const [indexItem, setIndex] = useState(0);

  let secondQuery = "/" + Catalogue[category].subitems[indexItem]?.Name;

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClickAway = (e) => {
    setAnchor(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box width={"50%"}>
        <Box
          color="primary"
          style={{ fontSize: 16, color: "black" }}
          className={classes.fakeBox}
          onClick={handleClick}
        >
          <Typography style={{ fontSize: 16, color: "black" }}>
            {name}
          </Typography>

          <Popper
            disablePortal={false}
            style={{ width: "65%", zIndex: 2 }}
            popperOptions={{ positionFixed: true }}
            anchorEl={anchor}
            placement="bottom"
            open={Boolean(anchor)}
          >
            <Box
              position="absolute"
              className={classes.BoxShadow}
              top={0}
              zIndex={2000}
              marginTop={1.5}
              left={15}
              width={"100%"}
              display="flex"
            >
              <Box width={"30%"} display="flex" flexDirection="column">
                {Catalogue[category].subitems.map((item, index) => {
                  return (
                    <React.Fragment>
                      {index === 0 ? (
                        <MenuItem
                          key={index}
                          style={{ height: 50, fontSize: 16, display: "flex" }}
                          onClick={(e) => {
                            handleClickAway(e);

                            history(`/${name}`);
                          }}
                        >
                          <MdSelectAll color="#82A0C2" size={30} />
                          <Typography
                            style={{
                              marginleft: 10,
                              fontSize: 16,
                              flexGrow: 1,
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            Voir tout
                          </Typography>
                        </MenuItem>
                      ) : null}
                      <MenuItem
                        key={index}
                        style={{ height: 50, fontSize: 16, display: "flex" }}
                        onClick={() => {
                          secondQuery = "/" + item.label;
                          setIndex(index);
                        }}
                      >
                        {changeIcon(index, category)}
                        <Typography
                          style={{
                            marginleft: 10,
                            fontSize: 16,
                            flexGrow: 1,
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          {item.Name}
                        </Typography>
                      </MenuItem>
                    </React.Fragment>
                  );
                })}
              </Box>
              <Box width={"70%"}>
                <Box display="grid" gridTemplateColumns="repeat(2,50%)">
                  {Catalogue[category].subitems[indexItem].subitems.map(
                    (item, index) => {
                      return (
                        <React.Fragment>
                          {index === 0 ? (
                            <MenuItem
                              key={index}
                              disableTouchRipple
                              disableGutters
                              style={{
                                height: 50,
                                fontSize: 16,
                                color: "black",
                              }}
                              onClick={(e) => {
                                thirdQuery =
                                  "/" + transformStringToUrl(item.Name);
                                handleClickAway(e);

                                history(`/${name}` + secondQuery);
                              }}
                            >
                              Voir tout
                            </MenuItem>
                          ) : null}
                          <MenuItem
                            key={index}
                            disableTouchRipple
                            disableGutters
                            style={{ height: 50, fontSize: 16, color: "black" }}
                            onClick={(e) => {
                              thirdQuery =
                                "/" + transformStringToUrl(item.Name);
                              handleClickAway(e);

                              history(`/${name}` + secondQuery + thirdQuery);
                            }}
                          >
                            {item.Name}
                          </MenuItem>
                        </React.Fragment>
                      );
                    }
                  )}
                </Box>
              </Box>
            </Box>
          </Popper>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default SubHeaderNavigation;
