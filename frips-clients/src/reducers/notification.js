import {
  CLEAR_NOTIFICATION,
  NEW_NOTIFICATION,
  NOTIFICATION,
  READ_CONVERSATION,
  UNREAD_NOTIFICATION,
} from "../actions/type";

const initialState = {
  loading: true,
  notificationUser: [],
  unReadNotification: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIFICATION:
      return {
        ...state,
        notificationUser: [...state.notificationUser, payload],
      };

    case UNREAD_NOTIFICATION:
      return {
        ...state,
        unReadNotification: payload,
      };
    case CLEAR_NOTIFICATION: {
      const removeArrayUser = state.notificationUser.filter((user, index) => {
        return user.id_Chat !== payload;
      });
      return {
        ...state,
        notificationUser: [...removeArrayUser],
      };
    }

    case READ_CONVERSATION: {
      const removeArrayUser = state.notificationUser.filter((conv, index) => {
        return conv.id === payload.id;
      });
      return {
        ...state,
        unReadNotification: [...removeArrayUser],
      };
    }
    case NEW_NOTIFICATION: {
      return {
        ...state,
        unReadNotification: [...state.unReadNotification, payload],
      };
    }

    default:
      return state;
  }
};
