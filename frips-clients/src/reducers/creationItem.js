import {
  FETCH_INFO_ITEM,
  FETCH_INFO_ITEM_SUCCESS,
  INFO_ITEM,
  SEARCH,
} from "../actions/type";

const initialState = {
  loading: true,
  itemInfo: null,
  Search: null,
  loaded: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INFO_ITEM:
      return {
        ...state,
        itemInfo: payload,
      };
    case SEARCH:
      return {
        ...state,
        Search: payload,
      };
    case FETCH_INFO_ITEM:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INFO_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
