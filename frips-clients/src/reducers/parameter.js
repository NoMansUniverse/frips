import {
    SET_MOBILE_VERSION
} from "../actions/type.js";
  
  const initialValues = {
    isMobile: false,
    
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialValues, action) => {
    const { payload } = action;
    switch (action.type) {
      case SET_MOBILE_VERSION:
        return {
          ...state,
          isMobile: payload,
        };
  
      default:
        return state;
    }
  };
  