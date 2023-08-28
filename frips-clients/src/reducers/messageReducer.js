import {
  ADD_MESSAGE_IMAGE,
  ADD_MORE_MESSAGE,
  ERROR_MESSAGE,
  GENERATE_CONV,
  GET_ALL_CONV,
  GET_CONV,
  GET_MORE_MESSAGE,
  MESSAGE_FETCH_SUCCESS,
  MESSAGE_LOADING,
  NEW_MESSAGE,
  NO_MORE,
  SEND_DATE,
  UPDATE_MESSAGE,
} from "../actions/type";

const initialState = {
  loading: true,
  conversations: [],
  openConversation: null,
  lastMessage: [],
  moreMessageLoading: false,
  pageNumber: 1,
  countConversations: null,
  id_Chat: null,
  error: null,
  sendPropose: false,
  ProfileNumber: {},
  numberLoadingMessage: null,
  itemForPropose: [],
  item: null,
  newMessage: false,
  count: null,
  hasmore: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NEW_MESSAGE:
      return {
        ...state,
        newMessage: payload,
      };

    case GET_ALL_CONV:
      return {
        ...state,
        conversations: payload.myConversation,
        count: payload.count,
        hasmore: true,
      };

    case GENERATE_CONV:
    case GET_CONV:
      return {
        ...state,
        openConversation: payload,
        conversations: [],

        Profile: {
          Profile2: {
            ProfileName: payload.Profile1.Pseudo,
            ProfileNumber: payload.Profile1.id,
            imageProfile: payload.Profile1?.image,
          },
          Profile1: {
            ProfileName: payload.Profile.Pseudo,
            ProfileNumber: payload.Profile.id,
            imageProfile: payload.Profile?.image,
          },
        },
        message: [...payload.message],
        loaded: true,
        hasmore: payload.messageNumber,
      };

    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_MESSAGE:
      return {
        ...state,
        conversations: [...payload],
      };
    case MESSAGE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_MORE_MESSAGE:
      return {
        ...state,
        message: [...state.message, ...payload],
        lastMessage: [...payload],
      };

    case NO_MORE:
      return {
        ...state,
        hasmore: false,
      };

    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true,
        sendPropose: false,
      };

    case ADD_MORE_MESSAGE:
      return {
        ...state,
        message: [payload, ...state.message],
        sendPropose: false,
      };

    case ERROR_MESSAGE:
      return {
        ...state,
        error: payload,
      };

    case SEND_DATE:
      return {
        ...state,
        message: [...payload],
      };

    case ADD_MESSAGE_IMAGE:
      return {
        ...state,
        item: payload,
        sendPropose: true,
      };

    default:
      return state;
  }
};
