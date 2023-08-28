import { SET_PREVIOUS_LOCATION } from "../actions/type.js";

const initialValues = {
  previousLocation: "/signup",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_PREVIOUS_LOCATION:
      return {
        ...state,
        previousLocation: payload,
      };

    default:
      return state;
  }
};
