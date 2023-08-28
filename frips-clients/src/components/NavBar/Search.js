import {
  alpha,
  Box,
  ClickAwayListener,
  MenuItem,
  Popper,
  Typography,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addFilterFromSearch, getInfoSearch } from "../../actions";
import _ from "lodash";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    flexGrow: 1,
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    zIndex: 1400,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
}));

const options = {
  includeScore: true,
  keys: ["Name"],
  threshold: 0.3,
};

const highestScoreArray = (arrays) => {
  let highestScore = -Infinity;
  let highestScoreIndex = -1;
  for (let i = 0; i < arrays.length; i++) {
    const currentScore = arrays[i].reduce((acc, curr) => acc + curr.score, 0);
    if (currentScore > highestScore) {
      highestScore = currentScore;
      highestScoreIndex = i;
    }
  }
  const result = arrays.map((array, index) => {
    if (index === highestScoreIndex) {
      return array;
    } else {
      return [];
    }
  });
  return result;
};

const matchValueSearch = (array1, searchArray, arrayBrand, currentText) => {
  const pattern = `^(${arrayBrand
    .map((brand) => brand.Name)
    .join("|")})\\s(.*)$`;

  let splitArray = currentText.match(new RegExp(pattern, "i"));

  const array = array1.map((subArray, index) => {
    const filterArray = new Fuse(subArray, options).search(
      { $or: searchArray },
      { limit: 2 }
    );
    return filterArray;
  });

  if (splitArray?.length === 2) {
    return [array[0][0], array[1]];
  } else {
    highestScoreArray(array);
  }
  return array;
};
const WOMAN_ID = { Name: "Femme", id: 1 };
const MAN_ID = { Name: "Homme", id: 104 };

const makeCombination = (
  arrays,
  noFilterArrayCategory,
  currentText,
  noFilterArrayBrand
) => {
  const [arrayBrand, arrayCategory] = arrays;
  const suggestionArray = [];

  if (!arrayBrand) {
    return suggestionArray;
  }

  if (arrayBrand.length !== 0 && arrayCategory?.length !== 0) {
    const { item } = arrayBrand[0];
    let previous;
    for (let index = 0; index < arrayCategory.length; index++) {
      if (
        arrayCategory[index].item.Name ===
          arrayCategory[index + 1]?.item?.Name &&
        !(
          Boolean(_.find(arrayCategory, { item: { Name: "Homme" } })) ||
          Boolean(_.find(arrayCategory, { item: { Name: "Femme" } }))
        )
      ) {
        suggestionArray.push(
          `${item.Name} ${arrayCategory[index].item.Name} Femme`
        );
        suggestionArray.push(
          `${item.Name} ${arrayCategory[index].item.Name} Homme`
        );
        previous = arrayCategory[index].item.Name;
      } else if (previous !== arrayCategory[index].item.Name) {
        suggestionArray.push(`${item.Name} ${arrayCategory[index].item.Name}`);
      }
    }
  } else if (arrayBrand.length !== 0 && arrayCategory.length === 0) {
    const { item } = arrayBrand[0];

    suggestionArray.push(item.Name);
    if (arrayCategory?.length !== 0) {
      for (let index = 0; index < arrayCategory.length; index++) {
        if (
          arrayCategory[index].item.Name ===
            arrayCategory[index + 1]?.item?.Name &&
          !(
            Boolean(_.find(arrayCategory, { item: { Name: "Homme" } })) ||
            Boolean(_.find(arrayCategory, { item: { Name: "Femme" } }))
          )
        ) {
          suggestionArray.push(
            `${item.Name} ${arrayCategory[index].item.Name} Femme`
          );
          suggestionArray.push(
            `${item.Name} ${arrayCategory[index].item.Name} Homme`
          );
        }
      }
    } else {
      for (let index = 0; index < 3; index++) {
        suggestionArray.push(
          `${item.Name} ${noFilterArrayCategory[1][index].Name}`
        );
      }
    }
  } else if (arrayBrand.length === 0 && arrayCategory.length !== 0) {
    const checkIfBothExist = arrayCategory.filter((d) => d.score <= 0.2);
    if (checkIfBothExist.length >= 2) {
      const { item } = arrayCategory[0];
      if (item.Name !== "Femme" || item.Name !== "Homme") {
        suggestionArray.push(`${item.Name} Femme`);
        suggestionArray.push(`${item.Name} Homme`);
      }

      for (let index = 0; index < 3; index++) {
        suggestionArray.push(
          `${noFilterArrayCategory[0][index]?.Name}   ${item?.Name}`
        );
      }
    } else {
      const { item } = arrayCategory[0];

      suggestionArray.push(item.Name);
      for (let index = 0; index < 5; index++) {
        suggestionArray.push(
          `${noFilterArrayCategory[0][index]?.Name}   ${item?.Name}`
        );
      }
    }
  } else {
    suggestionArray.push(WOMAN_ID.Name);
    suggestionArray.push(MAN_ID.Name);
  }

  suggestionArray.push(`rechercher "${currentText}"`);

  return suggestionArray;
};

const transformSearchToArrayString = (string) => {
  return string.split(/\b(?:a|the|was|\s)+\b/i).map((strArray) => {
    return { Name: strArray.replace(/\s*$/, "") };
  });
};

const renderSuggestion = (suggestion, dispatch, history, handleMenuClose) => {
  return suggestion.map((item) => {
    return (
      <MenuItem
        style={{ height: 40 }}
        key={item}
        onClick={() => {
          dispatch(addFilterFromSearch(item, true, history));
          handleMenuClose();
        }}
      >
        <Typography style={{ fontSize: 16 }}>{item}</Typography>
      </MenuItem>
    );
  });
};

const Search = ({ SearchInfo, loading, loadingFilter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const location = useLocation();
  const [arrayFilter, setArrayFilter] = useState([]);
  const [filterQuery, setFilterQuery] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useNavigate();
  const menuRef = useRef();

  const handleMenuDesktop = (event) => {
    setAnchorEl(menuRef.current);
  };
  useEffect(() => {
    setTerm("");
  }, [location.pathname]);

  useEffect(() => {
    if (!SearchInfo && loading) {
      dispatch(getInfoSearch());
    } else {
      setArrayFilter(SearchInfo);
    }
  }, [dispatch, loading]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setTerm("");
  };

  useEffect(() => {
    if (term !== "" && !anchorEl) {
      handleMenuDesktop();
    } else if (term !== "" && anchorEl) {
      setTimeout(() => {
        setFilterQuery(
          matchValueSearch(
            arrayFilter,
            transformSearchToArrayString(term),
            arrayFilter[0],
            term
          )
        );
      }, 100);
    } else {
      handleMenuClose();
      setFilterQuery([]);
    }
  }, [term, anchorEl]);

  const onChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        ref={menuRef}
        spellCheck="false"
        style={{ zIndex: 1400 }}
        value={term}
        fullWidth={true}
        placeholder="Rechercher un article"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onChange}
        inputProps={{ "aria-label": "Rechercher un article" }}
      />
      <ClickAwayListener
        style={{ backgroundColor: "red" }}
        onClickAway={handleMenuClose}
      >
        <Popper
          disableScrollLock={true}
          open={Boolean(anchorEl)}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transitionDuration={0}
          disableAutoFocusItem
          disablePortal={true}
          style={{
            width: menuRef?.current?.offsetWidth,
          }}
        >
          <Box
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              transform: "translateY(5px)",
              maxHeight: "50vh",
              overflow: "auto",
            }}
          >
            {term !== ""
              ? renderSuggestion(
                  makeCombination(filterQuery, arrayFilter, term),
                  dispatch,
                  history,
                  handleMenuClose
                )
              : null}
          </Box>
        </Popper>
      </ClickAwayListener>
    </div>
  );
};

const mapStateToProps = (state) => ({
  SearchInfo: state.itemInfo.Search,
  loading: state.itemInfo.loading,
  loadingFilter: state.filterCatalogue.loading,
});

export default connect(mapStateToProps)(Search);
