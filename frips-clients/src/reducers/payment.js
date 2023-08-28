import {
  ERROR_PAYMENT_PAGE,
  ISRESERVED,
  LOADING_PAYMENT,
  PAYMENT_FAILED,
  PAYMENT_INFO,
  PAYMENT_INFO_SUCCESS_FETCH,
  PAYMENT_INTENT,
  PAYMENT_SUCCESS,
  RESET_PAYMENT,
} from "../actions/type.js";

const initialValues = {
  loading: false,
  item: null,
  clientSecret: "",
  successed: null,
  failed: null,
  error: null,
  isDisponible: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOADING_PAYMENT:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        failed: true,
        successed: false,
        loading: false,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        successed: true,
        failed: false,
        loading: false,
      };
    case PAYMENT_INFO:
      return {
        ...state,
        item: payload.item,
      };
    case PAYMENT_INFO_SUCCESS_FETCH:
      return {
        ...state,
        loading: false,
      };

    case PAYMENT_INTENT:
      return {
        ...state,
        clientSecret: payload.client_secret,
      };
    case ISRESERVED:
      return {
        ...state,
        isDisponible: payload,
      };
    case ERROR_PAYMENT_PAGE:
      return {
        ...state,
        isDisponible: false,
        error: payload,
      };
    case RESET_PAYMENT:
      return initialValues;

    default:
      return state;
  }
};
