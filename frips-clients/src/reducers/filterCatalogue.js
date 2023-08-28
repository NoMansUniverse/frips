import _ from "lodash";
import {
  ADD_FILTER,
  CHANGE_PAGINATION,
  FETCH_FILTER,
  FETCH_ITEM_FILTER_SUCCESS,
  FETCH_ITEM_TYPE,
  FETCH_NEW_ITEM_TYPE,
  FILTER,
  REMOVE_FILTER,
} from "../actions/type.js";

const initialValues = {
  loading: true,
  filterLoading: true,

  AllFilter: {
    Catalogue: [],
    Couleur: [],
    Marque: [],
    Taille: [],
    Price: [0, Number.POSITIVE_INFINITY],
    Etat: [],
    Search: [],
    sortedBy: null,
  },
  Chips: [],
  items: [],
  pagination: 1,
  count: 0,
  loaded: false,
  filterLoaded: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;

  switch (action.type) {
    case CHANGE_PAGINATION:
      return {
        ...state,
        pagination: payload,
      };

    case FETCH_ITEM_TYPE:
      return {
        ...state,
        items: [...payload],
      };

    case ADD_FILTER:
      let setfilter;
      let setChips;

      if (payload.label === "Price") {
        if (payload.value.De) {
          const found = state.Chips.some((el) => el.De === true);
          if (found) {
            const array = state.Chips.filter((el) => {
              return el.De !== true;
            });

            setChips = [...array, payload.value];
          } else {
            setChips = [...state.Chips, payload.value];
          }
          setfilter = {
            ...state.AllFilter,
            ...(state.AllFilter.Price[0] = parseInt(payload.value.value)),
          };
        } else {
          const found = state.Chips.some((el) => el.A === true);
          if (found) {
            const array = state.Chips.filter((el) => {
              return el.A !== true;
            });

            setChips = [...array, payload.value];
          } else {
            setChips = [...state.Chips, payload.value];
          }
          setfilter = {
            ...state.AllFilter,
            ...(state.AllFilter.Price[1] = parseInt(payload.value.value)),
          };
        }
      }

      if (payload.label === "sortedBy") {
        setfilter = { ...state.AllFilter, sortedBy: payload.value };
        setChips = [...state.Chips];
      }

      if (payload.label === "Catalogue") {
        setfilter = {
          ...state.AllFilter,
          [payload.label]: [...state.AllFilter[payload.label], payload.value],
        };
        setChips = [...state.Chips, payload.value];
      } else if (payload.label !== "Price" && payload.label !== "sortedBy") {
        setfilter = {
          ...state.AllFilter,
          [payload.label]: [...state.AllFilter[payload.label], payload.value],
        };
        setChips = [...state.Chips, payload.value];
      }

      return {
        ...state,

        AllFilter: {
          ...setfilter,
        },
        filterLoading: false,
        Chips: setChips,
        pagination: 1,
      };

    case REMOVE_FILTER:
      let copyObjectAllFilter = { ...state.AllFilter };
      let arrayChip;

      if (payload.label !== "sortedBy") {
        for (const [key, value] of Object.entries(copyObjectAllFilter)) {
          if (_.find(value, payload)) {
            _.remove(value, (item) => {
              return item.id === payload.id;
            });
          }
        }

        arrayChip = state.Chips.filter((item) => {
          return item.Name !== payload.Name;
        });
      }

      if (payload.De) {
        const array = state.Chips.filter((el) => {
          return el.De !== true;
        });
        copyObjectAllFilter = {
          ...state.AllFilter,
          ...(state.AllFilter.Price[0] = 0),
        };
        arrayChip = [...array];
      } else if (payload.A) {
        const array = state.Chips.filter((el) => {
          return el.A !== true;
        });
        copyObjectAllFilter = {
          ...state.AllFilter,
          ...(state.AllFilter.Price[1] = Number.POSITIVE_INFINITY),
        };
        arrayChip = [...array];
      }

      if (payload.label === "sortedBy") {
        copyObjectAllFilter = { ...state.AllFilter, sortedBy: null };
        arrayChip = [...state.Chips];
      }

      return {
        ...state,
        AllFilter: { ...copyObjectAllFilter },
        Chips: [...arrayChip],
        filterLoading: false,
        pagination: 1,
      };

    case FETCH_NEW_ITEM_TYPE:
      return {
        ...state,
        loading: true,
        count: payload.count,
        items: [...payload.items],
        loaded: false,
      };

    case FETCH_ITEM_FILTER_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
      };

    case FETCH_FILTER:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case FILTER:
      return {
        ...state,
        filterLoading: true,
      };

    case "RESTORE":
      return initialValues;

    default:
      return state;
  }
};
