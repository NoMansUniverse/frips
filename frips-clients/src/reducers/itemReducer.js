import {
  CREATE_ITEM,
  EDIT_ITEM,
  ERROR_ITEM,
  FETCH_ID_FAVORITE,
  FETCH_ITEM,
  FETCH_ITEMS,
  FETCH_NEW_ITEMS,
  FETCH_TOP_BUSINESS,
  GET_MORE_ITEMS,
  LOADING_FETCH_ITEM,
  LOADING_ITEM,
  RESET_ITEM,
  SUCCESS_CREATION_ITEM,
  SUCCESS_FETCH_ITEM,
} from "../actions/type.js";

const initialValues = {
  loading: false,
  items: [],
  UniqueItem: [],
  loaded: false,
  favorites: [],
  newItem: [],
  error: false,
  initialValues: {},
  topBusiness:null,
  imageBlob: [],
  editItemPage: null,
  successCreationItem: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  switch (action.type) {
    case LOADING_ITEM:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case CREATE_ITEM:
      return {
        ...state,
        [action.payload.id]: [...state.items, action.payload],
      };

    case SUCCESS_CREATION_ITEM: {
      return {
        ...state,
        successCreationItem: action.payload,
      };
    }
    case EDIT_ITEM:
      return {
        ...state,
        initialValues: action.payload.initialValues,
        imageBlob: action.payload.imageBlob,
      };

    case ERROR_ITEM:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_ITEMS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload],

        loaded: true,
      };

    case GET_MORE_ITEMS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload],

        loaded: true,
      };

    case FETCH_ID_FAVORITE:
      return {
        ...state,
        loading: false,

        favorites: action.payload,
        loaded: true,
      };

    case FETCH_ITEM:
      return {
        ...state,

        UniqueItem: action.payload,
      };

    case FETCH_TOP_BUSINESS:
      return {
        ...state,
        topBusiness:{...action.payload}
      }
    case LOADING_FETCH_ITEM:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case SUCCESS_FETCH_ITEM:
      return {
        ...state,
        loading: false,
        loaded: true,
      };

    case FETCH_NEW_ITEMS:
      return {
        ...state,
        loading: false,

        newItem: [...action.payload],
        loaded: true,
      };

    case RESET_ITEM:
      return {
        ...state,
        UniqueItem: [],
        initialValues: {},
        imageBlob: [],
        editItemPage: null,
      };

    default:
      return state;
  }
};
