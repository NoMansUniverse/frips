import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  makeStyles,
  Typography
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { changeMyFripsPagination, fetchMyfrips } from "../../../../actions";
import { FETCH_PROPOSITION } from "../../../../actions/type";
import API_ENDPOINT from "../../../../api/url";
import MyPaginate from "../../../Footer/PaginationComponent";
import DeleteModal from "../DeleteModal";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  columnGrid: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  Grid: {
    display: "grid",
    padding: 10,
    gridTemplateColumns: "repeat(6,25%)",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  floatContentArticle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: 1000,
    margin: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "block",
    },
  },

  PaginationBox: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      backgroundColor: "#F5f5f3",
    },
  },
  Description: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "inherit",
      justifyContent: "flex-end",
      marginTop: 8,
    },
  },
}));

const renderStatus = (id, Approve, dateApprove, history, id_proposition) => {
  if (Boolean(Approve) && Boolean(dateApprove)) {
    return (
      <Box display={"flex"} flexDirection="column">
        <Typography
          style={{
            borderRadius: 5,
            padding: 5,
            fontSize: 18,
            border: "1px solid rgb(80, 220, 100)",
            backgroundColor: "rgba(80, 220, 100,0.2)",
          }}
        >
          Offre acceptée
        </Typography>
        <Typography>
          vous avez 24 heures pour faire le paiement autrement l'offre sera
          annulée
        </Typography>
        <Button
          onClick={() => {
            history(`/payment/${id}`, {
              state: {
                isFrom: true,
              },
            });
          }}
          style={{ marginTop: 5, fontSize: 13.5 }}
          variant="contained"
          color="primary"
        >
          Procéder au paiement
        </Button>
      </Box>
    );
  }
  if (!Boolean(Approve) && Boolean(dateApprove)) {
    return (
      <Typography
        style={{
          borderRadius: 5,
          padding: 5,
          fontSize: 16,
          border: "1px solid rgb(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0,0.2)",
        }}
      >
        Offre refusée
      </Typography>
    );
  } else {
    return (
      <Typography style={{ fontSize: 16 }}>Offre en attente...</Typography>
    );
  }
};

const renderedItem = (classes, items, history, handleClick, setNavigation) => {
  return items.map((item, index) => {
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
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <CardActionArea
                style={{ width: 180, height: 180 }}
                onClick={() => {
                  history(`/items/${items[index].id}`);
                }}
              >
                <img
                  alt={`${API_ENDPOINT}/${items[index].image[0].id_Item}`}
                  src={`${API_ENDPOINT}/images/${items[index].image[0].id_Item}/${items[index].image[0].image}`}
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
              display="flex"
              justifyContent={"center"}
              flexDirection="column"
              alignItems={"center"}
            >
              <Typography style={{ wordBreak: "break-word" }} color="primary">
                {item.Name}
              </Typography>
              <Box
                display="flex"
                justifyContent={"center"}
                flexDirection="column"
                alignItems={"center"}
              >
                <Typography style={{ fontSize: 16, fontWeight: 400 }}>
                  {item.Price} CHF
                </Typography>
                <Typography>{item.Size}</Typography>
                <Typography>{item.item_brand[0]?.brand.Name}</Typography>
              </Box>
            </Box>

            <Box className={classes.Description}>
              <Typography style={{ fontSize: 16 }}>Prix Proposé</Typography>
              <Box flexGrow={1} className={classes.Description}>
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {item?.pricepropose} CHF
                </Typography>
              </Box>
            </Box>
            <Box className={classes.Description}>
              <Typography style={{ fontSize: 16 }}>Status</Typography>
              <Box flexGrow={1} className={classes.Description}>
                {renderStatus(item.id, item.Approve, item.dateApprove, history)}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    );
  });
};

const MyProposition = ({
  items,
  loading,
  setNavigation,
  pagination,
  filterMyFrips,
  mobile,
  count,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
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
    dispatch(fetchMyfrips(`/api/members/MyProposition`, FETCH_PROPOSITION));
  }, [dispatch, filterMyFrips, pagination]);

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

  if (!loading && items.length === 0 && count === 0) {
    return (
      <Box
        minHeight={200}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>
          Vous avez fait 0 offre ses dernières 24 heures
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.items}>
      <DeleteModal anchorEl={anchorEl} handleClickAway={handleClickAway} />
      {renderedItem(classes, items, history, handleClick, setNavigation)}
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
  items: state.myFrips.proposition,
  pagination: state.myFrips.pagination,
  filterMyFrips: state.myFrips.filter,
  count: state.myFrips.count,
});

export default connect(mapStateToProps)(MyProposition);
