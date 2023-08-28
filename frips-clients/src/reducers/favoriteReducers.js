import {
  ADD_FAVORITE,
  FETCH_FAVORITE,
  FETCH_FAVORITE_SUCCESS,
  FETCH_MYFAVORITE,
  FETCH_MYFAVORITEIDs,
  NUMBER_COUNT,
  REMOVE_FAVORITE,
} from "../actions/type.js";

const initialState = {
  favoritIds: [],
  favoritItem: [],
  loading: true,
  count: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favoritIds: [...state.favoritIds, payload],
      };
    case REMOVE_FAVORITE:
      const newIds = state.favoritIds.filter((item) => {
        return item.id_Item !== payload.id_Item;
      });

      return {
        ...state,
        favoritIds: [...newIds],
      };

    case FETCH_MYFAVORITEIDs:
      return {
        ...state,
        favoritIds: [...payload],
      };

    case NUMBER_COUNT:
      return {
        ...state,
        count: payload,
      };

    case FETCH_MYFAVORITE:
      return {
        ...state,
        favoritItem: [...payload],
      };
    case FETCH_FAVORITE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
