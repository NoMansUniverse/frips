import {
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress, Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  changeMyFripsPagination,
  fetchMyfrips,
  sendStatusProposition
} from "../../../actions";
import { FETCH_MYFRIPS } from "../../../actions/type";
import API_ENDPOINT from "../../../api/url";
import MyPaginate from "../../Footer/PaginationComponent";
import DeleteModal from "./DeleteModal";
const renderedItem = (
  classes,
  state,
  history,
  handleClick,
  setNavigation,
  expand,
  toggleAcordion,
  dispatch,
  mobile
) => {
  return state.map((item, index) => {
    if (item?.pricepropose.length !== 0) {
      if (
        item?.pricepropose[0].Approve === null &&
        item?.pricepropose[0].dateApprove === null
      ) {
        return (
          <Box
            width={"100%"}
            height={"100%"}
            padding={1}
            position="relative"
            key={item.id}
            id={item.id}
          >
            <Card className={classes.boxShadow}>
              <Box className={classes.Grid}>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <CardActionArea
                    style={{ width: 180, height: 180 }}
                    onClick={() => {
                      history(`/items/${state[index].id}`);
                    }}
                  >
                    <img
                      alt={`${API_ENDPOINT}/${state[index].image[0].id_Item}`}
                      src={`${API_ENDPOINT}/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </CardActionArea>
                </Box>
                <Box
                  padding={2}
                  style={{
                    flexDirection: "column",
                  }}
                  className={classes.Description}
                >
                  <Typography
                    style={{ wordBreak: "break-word" }}
                    color="primary"
                  >
                    {item.Name}
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: 5,
                    }}
                  >
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item.Price} CHF
                    </Typography>
                    <Typography>{item.Size}</Typography>
                    <Typography>{item.item_brand[0]?.brand.Name}</Typography>
                  </Box>
                </Box>

                {!mobile ? (
                  <Box className={classes.Description}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history(`/items/edit/${item.id}`);
                      }}
                    >
                      modifier
                      <EditIcon />
                    </Button>
                  </Box>
                ) : (
                  <Box display={"flex"} justifyContent="space-between">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history(`/items/edit/${item.id}`);
                      }}
                    >
                      modifier
                      <EditIcon />
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      supprimer
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                )}

                <Box className={classes.Description}>
                  <Box>Nombre de vue</Box>
                  <Box flexGrow={1} className={classes.Description}>
                    <Typography>{item?._count.nbview}</Typography>
                  </Box>
                </Box>
                <Box className={classes.Description}>
                  <Typography>Nombre de j'aime</Typography>
                  <Box flexGrow={1} className={classes.Description}>
                    <Typography>{item?._count.favorit}</Typography>
                  </Box>
                </Box>

                {!mobile ? (
                  <Box className={classes.Description}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      supprimer
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                ) : null}
              </Box>

              {Boolean(item?.pricepropose[0]?.Price) ? (
                <Accordion expanded={expand}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={toggleAcordion}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Badge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant={"dot"}
                      color={"primary"}
                      invisible={expand}
                    >
                      <Typography style={{ fontSize: 16 }}>
                        Vous avez une offre
                      </Typography>
                    </Badge>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display={"flex"} alignItems="center" width={"100%"}>
                      <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                        {item?.pricepropose[0]?.Price} CHF
                      </Typography>
                      <Box
                        display={"flex"}
                        justifyContent="flex-end"
                        flexGrow={1}
                      >
                        <Button
                          style={{ marginLeft: 5 }}
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            dispatch(
                              sendStatusProposition(
                                item.id,
                                new Date(),
                                true,
                                item?.pricepropose[0].id_Account
                              )
                            );
                          }}
                        >
                          Accepter
                        </Button>

                        <Button
                          onClick={() => {
                            dispatch(
                              sendStatusProposition(
                                item.id,
                                null,
                                false,
                                item?.pricepropose[0].id_Account
                              )
                            );
                          }}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: 5 }}
                        >
                          Refuser
                        </Button>
                      </Box>
                    </Box>
                  </AccordionDetails>
                 
                </Accordion>
              ) : null}
            </Card>
          </Box>
        );
      }

      if (
        Boolean(item?.pricepropose[0].Approve) &&
        Boolean(item?.pricepropose[0].SendDate)
      ) {
        return (
          <Box
            width={"100%"}
            height={"100%"}
            padding={1}
            position="relative"
            key={item.id}
            id={item.id}
          >
            <Card className={classes.boxShadow}>
              <Box className={classes.Grid}>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <CardActionArea
                    style={{ width: 180, height: 180 }}
                    onClick={() => {
                      history(`/items/${state[index].id}`);
                    }}
                  >
                    <img
                      alt={`${API_ENDPOINT}/state[index].image[0].id_Item`}
                      src={`${API_ENDPOINT}/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </CardActionArea>
                </Box>
                <Box
                  padding={2}
                  style={{
                    flexDirection: "column",
                  }}
                  className={classes.Description}
                >
                  <Typography
                    style={{ wordBreak: "break-word" }}
                    color="primary"
                  >
                    {item.Name}
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: 5,
                    }}
                  >
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item.Price} CHF
                    </Typography>
                    <Typography>{item.Size}</Typography>
                    <Typography>{item.item_brand[0]?.brand.Name}</Typography>
                  </Box>
                </Box>

                {!mobile ? (
                  <Box className={classes.Description}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history(`/items/edit/${item.id}`);
                      }}
                    >
                      modifier
                      <EditIcon />
                    </Button>
                  </Box>
                ) : (
                  <Box display={"flex"} justifyContent="space-between">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history(`/items/edit/${item.id}`);
                      }}
                    >
                      modifier
                      <EditIcon />
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      supprimer
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                )}

                <Box className={classes.Description}>
                  <Box>Nombre de vue</Box>
                  <Box flexGrow={1} className={classes.Description}>
                    <Typography>{item?._count.nbview}</Typography>
                  </Box>
                </Box>
                <Box className={classes.Description}>
                  <Typography>Nombre de j'aime</Typography>
                  <Box flexGrow={1} className={classes.Description}>
                    <Typography>{item?._count.favorit}</Typography>
                  </Box>
                </Box>

                {!mobile ? (
                  <Box className={classes.Description}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      supprimer
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                ) : null}
              </Box>

              {Boolean(item?.pricepropose[0]?.Price) ? (
                <Accordion expanded={expand}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={toggleAcordion}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Badge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant={"dot"}
                      color={"primary"}
                      invisible={expand}
                    >
                      <Typography style={{ fontSize: 16 }}>
                        Vous avez une offre
                      </Typography>
                    </Badge>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display={"flex"} alignItems="center" width={"100%"}>
                      <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                        {item?.pricepropose[0]?.Price} CHF
                      </Typography>

                      <Box
                        display={"flex"}
                        justifyContent="flex-end"
                        flexGrow={1}
                      >
                        <Typography style={{ fontSize: 16 }}>
                          {" "}
                          Offre acceptée
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                  
                </Accordion>
              ) : null}
            </Card>
          </Box>
        );
      }
      if (
        Boolean(!item?.pricepropose[0].Approve) &&
        Boolean(item?.pricepropose[0].SendDate)
      ) {
        return (
          <Box
            width={"100%"}
            height={"100%"}
            padding={1}
            position="relative"
            key={item.id}
            id={item.id}
          >
            <Card className={classes.boxShadow}>
              <Box className={classes.Grid}>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <CardActionArea
                    style={{ width: 180, height: 180 }}
                    onClick={() => {
                      history(`/items/${state[index].id}`);
                    }}
                  >
                    <img
                      alt={`${API_ENDPOINT}/state[index].image[0].id_Item`}
                      src={`${API_ENDPOINT}/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </CardActionArea>
                </Box>
                <Box
                  padding={2}
                  style={{
                    flexDirection: "column",
                  }}
                  className={classes.Description}
                >
                  <Typography
                    style={{ wordBreak: "break-word" }}
                    color="primary"
                  >
                    {item.Name}
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: 5,
                    }}
                  >
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item.Price} CHF
                    </Typography>
                    <Typography>{item.Size}</Typography>
                    <Typography>{item.item_brand[0]?.brand.Name}</Typography>
                  </Box>
                </Box>

                {!mobile ? (
                  <Box className={classes.Description}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history(`/items/edit/${item.id}`);
                      }}
                    >
                      modifier
                      <EditIcon />
                    </Button>
                  </Box>
                ) : (
                  <Box display={"flex"} justifyContent="space-between">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history(`/items/edit/${item.id}`);
                      }}
                    >
                      modifier
                      <EditIcon />
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      supprimer
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                )}

                <Box className={classes.Description}>
                  <Box>Nombre de vue</Box>
                  <Box flexGrow={1} className={classes.Description}>
                    <Typography>{item?._count.nbview}</Typography>
                  </Box>
                </Box>
                <Box className={classes.Description}>
                  <Typography>Nombre de j'aime</Typography>
                  <Box flexGrow={1} className={classes.Description}>
                    <Typography>{item?._count.favorit}</Typography>
                  </Box>
                </Box>

                {!mobile ? (
                  <Box className={classes.Description}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      supprimer
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                ) : null}
              </Box>

              {Boolean(item?.pricepropose[0]?.Price) ? (
                <Accordion expanded={expand}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={toggleAcordion}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Badge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant={"dot"}
                      color={"primary"}
                      invisible={expand}
                    >
                      <Typography style={{ fontSize: 16 }}>
                        Vous avez une offre
                      </Typography>
                    </Badge>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display={"flex"} alignItems="center" width={"100%"}>
                      <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                        {item?.pricepropose[0]?.Price} CHF
                      </Typography>
                      <Box
                        display={"flex"}
                        justifyContent="flex-end"
                        flexGrow={1}
                      >
                        <Typography style={{ fontSize: 16 }}>
                          Offre refusée
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                  
                </Accordion>
              ) : null}
            </Card>
          </Box>
        );
      }
    } else {
      return (
        <Box
          width={"100%"}
          height={"100%"}
          padding={1}
          position="relative"
          key={item.id}
          id={item.id}
        >
          <Card className={classes.boxShadow}>
            <Box className={classes.Grid}>
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
              >
                <CardActionArea
                  style={{ width: 180, height: 180 }}
                  onClick={() => {
                    history(`/items/${state[index].id}`);
                  }}
                >
                  <img
                    alt={`${API_ENDPOINT}/${state[index].image[0].id_Item}`}
                    src={`${API_ENDPOINT}/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </CardActionArea>
              </Box>
              <Box
                padding={2}
                style={{
                  flexDirection: "column",
                }}
                className={classes.Description}
              >
                <Typography style={{ wordBreak: "break-word" }} color="primary">
                  {item.Name}
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 5,
                  }}
                >
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    {item.Price} CHF
                  </Typography>
                  <Typography>{item.Size}</Typography>
                  <Typography>{item.item_brand[0]?.brand.Name}</Typography>
                </Box>
              </Box>

              {!mobile ? (
                <Box className={classes.Description}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      history(`/items/edit/${item.id}`);
                    }}
                  >
                    modifier
                    <EditIcon />
                  </Button>
                </Box>
              ) : (
                <Box display={"flex"} justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      history(`/items/edit/${item.id}`);
                    }}
                  >
                    modifier
                    <EditIcon />
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    supprimer
                    <DeleteForeverIcon />
                  </Button>
                </Box>
              )}

              <Box className={classes.Description}>
                <Box>Nombre de vue</Box>
                <Box flexGrow={1} className={classes.Description}>
                  <Typography>{item?._count.nbview}</Typography>
                </Box>
              </Box>
              <Box className={classes.Description}>
                <Typography>Nombre de j'aime</Typography>
                <Box flexGrow={1} className={classes.Description}>
                  <Typography>{item?._count.favorit}</Typography>
                </Box>
              </Box>

              {!mobile ? (
                <Box className={classes.Description}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    supprimer
                    <DeleteForeverIcon />
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Card>
        </Box>
      );
    }
  });
};

const MyItems = ({
  classes,
  items,
  loading,
  setNavigation,
  msg,
  pagination,
  filterMyFrips,
  count,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [expand, setExpand] = useState(true);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };
  const handleChange = ({ selected }) => {
    dispatch(changeMyFripsPagination(selected + 1));
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (number) => {
    setAnchorEl(number);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_FILTER_MYFRIPS" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!loading && items.length === 0 && Boolean(count)) {
      dispatch(fetchMyfrips(`/api/members/myFrips`, FETCH_MYFRIPS));
    }
  }, [dispatch, loading]);

  useEffect(() => {
    dispatch(fetchMyfrips(`/api/members/myFrips`, FETCH_MYFRIPS));
  }, [filterMyFrips, pagination]);

  if (loading && items.length === 0) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height={"100%"}
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <Box
        minHeight={200}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>{msg}</Typography>
        <Link to={"/items/new"}>Commencer à vendre ?</Link>
      </Box>
    );
  }
  return (
    <Box className={classes.items}>
      <DeleteModal anchorEl={anchorEl} handleClickAway={handleClickAway} />
      {renderedItem(
        classes,
        items,
        history,
        handleClick,
        setNavigation,
        expand,
        toggleAcordion,
        dispatch,
        mobile
      )}
      <Box className={classes.PaginationBox}>
        <MyPaginate
          pageCount={Math.ceil(count / 5)}
          onPageChange={handleChange}
          pageRangeDisplayed={!mobile ? 2 : 1}
          forcePage={pagination - 1}
          marginPagesDisplayed={!mobile ? 2 : 1}
          nextLabel={
            <ArrowForwardIosIcon
              style={{
                color:
                  pagination !== Math.ceil(count / 5)
                    ? "rgba(130, 160, 194, 1)"
                    : "grey",
              }}
            />
          }
          nextClassName={classes.arrow}
          previousLabel={
            <ArrowBackIosIcon
              style={{
                color: pagination !== 1 ? "rgba(130, 160, 194, 1)" : "grey",
              }}
            />
          }
        />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.items,
  pagination: state.myFrips.pagination,
  filterMyFrips: state.myFrips.filter,
  count: state.myFrips.count,
  msg: state.myFrips.msg,
});

export default connect(mapStateToProps)(MyItems);
