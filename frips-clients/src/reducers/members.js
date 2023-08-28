import {
  MEMBERS_FETCH_SUCCESS,
  MEMBERS_ITEMS,
  MEMBERS_LOADING,
} from "../actions/type.js";

const initialValues = {
  loading: false,
  items: [],
  pagination: 1,
  msg: "",
  account: null,
  count: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  switch (action.type) {
    case MEMBERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MEMBERS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MEMBERS_ITEMS:
      return {
        ...state,
        items: [...payload.items],
        count: payload.count,
        account: payload.userAccount,
      };

    default:
      return state;
  }
};
