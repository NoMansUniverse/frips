import {
    DISPATCH_HANDLECLICK,
    GET_ITEM_PROPOSE,
    GET_ITEM_PROPOSE_FROMID,
    HANDLEAWAY_CLICK_FORPROPOSE,
    HANDLE_AWAYSECOND_PAGE,
    HANDLE_CLICK_FORPROPOSE,
    HANDLE_SECOND_PAGE
} from "../actions/type";

const initialState = {
  dispatch: false,
  loading: true,
  isFromItem: false,
  item: null,
  itemForPropose: [],
  SecondPage: false,
  handleClick: false,
  loaded: false,
  hasmore: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEM_PROPOSE:
      return {
        ...state,
        loading: false,

        itemForPropose: [...payload],
        loaded: true,
      };

    case HANDLEAWAY_CLICK_FORPROPOSE:
      return {
        ...state,
        loading: false,

        dispatch: true,
        handleClick: false,
        SecondPage: false,
        isFromItem: false,
        loaded: true,
      };

    case GET_ITEM_PROPOSE_FROMID:
      return {
        ...state,
        loading: false,
        item: { ...payload, image: payload.image[0] },
        isFromItem: true,
        SecondPage: true,
        handleClick: true,
        loaded: true,
      };

    case HANDLE_CLICK_FORPROPOSE:
      return {
        ...state,
        loaded: true,
        handleClick: true,
        loading: false,
      };

    case DISPATCH_HANDLECLICK:
      return {
        ...state,
        loaded: false,
        loading: true,
      };

    case HANDLE_SECOND_PAGE:
      return {
        ...state,
        loaded: false,
        SecondPage: true,
        item: { ...payload, image: payload.image[0] },
        isFromItem: true,
        handleClick: true,
        loading: true,
      };

    case HANDLE_AWAYSECOND_PAGE:
      return {
        ...state,
        loaded: false,
        SecondPage: false,
        handleClick: true,
        isFromItem: false,
        loading: true,
      };

    default:
      return state;
  }
};
