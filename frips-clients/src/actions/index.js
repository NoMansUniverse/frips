import _ from "lodash";
import axiosInstance from "../api/api";
import API_ENDPOINT from "../api/url";
import setAuthToken from "../utils/setAuthToken";
import {
  ADD_FAVORITE,
  ADD_FILTER,
  ADD_MESSAGE_IMAGE,
  ADD_MORE_MESSAGE,
  AUTH_ERROR,
  CHANGE_ADDRESS,
  CHANGE_IBAN,
  CHANGE_PAGINATION,
  CHANGE_PAGINATION_MYFRIPS,
  CREATE_ITEM,
  DELIVERY,
  DISPATCH_HANDLECLICK,
  EDIT_ITEM,
  ERROR,
  ERROR_ITEM,
  ERROR_MESSAGE,
  ERROR_PAYMENT_PAGE,
  FETCH_FILTER,
  FETCH_INFO_ITEM,
  FETCH_ITEM,
  FETCH_ITEMS,
  FETCH_ITEM_FILTER_SUCCESS,
  FETCH_ITEM_TYPE,
  FETCH_MYFAVORITE,
  FETCH_MYFAVORITEIDs,
  FETCH_MYPROPOSITIONID,
  FETCH_MYPROPOSITION_RECEIVED_ID,
  FETCH_MYPURCHASEID,
  FETCH_MYSELLBYID,
  FETCH_NEW_ITEMS,
  FETCH_NEW_ITEM_TYPE,
  FETCH_TOP_BUSINESS,
  GENERATE_CONV,
  GET_ALL_CONV,
  GET_CONV,
  GET_ITEM_PROPOSE,
  GET_ITEM_PROPOSE_FROMID,
  GET_MORE_ITEMS,
  GET_MORE_MESSAGE,
  GET_MORE_MESSAGE_LOADING,
  GET_NOTIFICATION,
  HANDLEAWAY_CLICK_FORPROPOSE,
  HANDLE_AWAYSECOND_PAGE,
  HANDLE_CLICK_FORPROPOSE,
  HANDLE_SECOND_PAGE,
  INFO_ITEM,
  ISRESERVED,
  LOADING_FETCH_ITEM,
  LOADING_MYFRIPS,
  LOADING_PAYMENT,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  LOGOUT,
  MEMBERS_FETCH_SUCCESS,
  MEMBERS_ITEMS,
  MEMBERS_LOADING,
  MESSAGE_ERROR,
  MESSAGE_LOADING,
  MSG_ERROR,
  MYFRIPS_ERROR,
  MYFRIPS_ERROR_FETCH,
  NEW_MESSAGE,
  NO_MORE,
  NUMBER_COUNT,
  PAYMENT_FAILED,
  PAYMENT_INFO,
  PAYMENT_INFO_SUCCESS_FETCH,
  PAYMENT_INTENT,
  RECEIVED,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REMOVE_FAVORITE,
  REMOVE_FILTER,
  REMOVE_ITEM,
  REMOVE_NOTIFICATION_MYFRIPS,
  RESET_ERROR,
  RESET_PAYMENT,
  REVIEW,
  SEARCH,
  SEND_DATE,
  SOCKET,
  STATUS_PROPOSITION,
  STATUS_PROPOSITION_ID,
  SUCCESS_CREATION_ITEM,
  SUCCESS_FETCH_ITEM,
  SUCCESS_FETCH_MYFRIPS,
  UPDATE_MESSAGE,
  USER_LOADED,
} from "./type";
////LOGIN/////
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const loadUser = (socket) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axiosInstance.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(idFavorite());
    dispatch(getUnReadNotification());
    if (socket?.connected) {
      socket.emit("join", { userId: res.data.id, socketId: socket.id });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const setSocket = (socket) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCKET,
      payload: socket,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const itemViewed = (id) => async (dispatch, getState) => {
  const auth = getState().auth.user;
  try {
    if (auth) {
      await axiosInstance.post("/api/items/view", { id }, config);
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (values, from, history) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/user",
      { ...values.step1, ...values.step2 },
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());

    history(from);
  } catch (error) {
    //todos error handling
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const userIfExist = (values, setActiveStep) => async (dispatch) => {
  try {
    await axiosInstance.post("/api/user/checkUser", {
      Email: values.Email,
      Pseudo: values.Pseudo,
    });

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch({
      type: RESET_ERROR,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const login = (values, from, history) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/auth", values, config);
    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data,
    });
    dispatch(loadUser());
    history(from, { replace: true });
  } catch (error) {
    console.log(error);
    //todos error handling
    const displayError = error.response?.data?.errors;
    if (displayError) {
      dispatch({
        type: LOGIN_FAIL,
        payload: displayError[0],
      });
    }
  }
};

export const changeImageProfile = (image) => async (dispatch, getState) => {
  try {
    const formData = new FormData();
    formData.append("singleImage", image);

    const { data } = await axiosInstance.post(
      "/api/members/myProfile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({ type: "IMAGE_CHANGE", payload: data });
  } catch (error) {
    //todos error handling
  }
};

export const logout = (history) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  history("/");
};

////LOGIN/////*

////ITEM/////

export const createItem =
  (formValues, images, history, setIsLoading,setAdded,mobile) => async (dispatch, getState) => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      for (const key in formValues) {
        if (key === "image") {
          for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
          }
        }
        if (key === "Color" && key !== "image") {
          formValues.Color.forEach((element) => {
            formData.append("Color", element.id);
          });
        } else {
          formData.append(key, formValues[key]);
        }
      }

      const response = await axiosInstance.post("/api/items", formData);

      dispatch({ type: CREATE_ITEM, payload: response.data });
      setIsLoading(false);
      dispatch({ type: SUCCESS_CREATION_ITEM, payload: true });
      setAdded(true)
      if(!mobile){
        history("/")
      }
    } catch (error) {
      dispatch({ type: ERROR_ITEM, payload: true });

      dispatch({ type: SUCCESS_CREATION_ITEM, payload: false });
    }
    //
  };

export const fetchItems = (fromHome, mobile) => async (dispatch, getState) => {
  const loading = getState().items.loading;

  try {
    const { data } = await axiosInstance.get("/api/items");
    dispatch({ type: LOADING_FETCH_ITEM });
    dispatch({ type: FETCH_ITEMS, payload: data });
    dispatch(fetchNewItems());
    dispatch(fetchTopBusiness(mobile));

    dispatch({ type: SUCCESS_FETCH_ITEM });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopBusiness = (mobile) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/items/topBusiness",
      { mobile },
      config
    );
    dispatch({ type: FETCH_TOP_BUSINESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchNewItems = () => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.get("/api/items/new");
    dispatch({ type: FETCH_NEW_ITEMS, payload: data });
  } catch (error) {}
};

export const fetchMoreItems = (number) => async (dispatch, getState) => {
  const { data } = await axiosInstance.post(`/api/items/more`, {
    number: number,
  });

  dispatch({ type: GET_MORE_ITEMS, payload: data });
};

export const fetchMyfrips = (url, type) => async (dispatch, getState) => {
  const number = getState().myFrips.pagination;
  const filter = getState().myFrips.filter;

  let newItemsDisplay;
  let numberCount;
  try {
    dispatch({ type: "LOADING_MYFRIPS" });
    const { data } = await axiosInstance.post(url, { filter, number });

    newItemsDisplay = [...data.items];
    numberCount = data.count;

    dispatch({
      type,
      payload: { items: newItemsDisplay, count: numberCount, msg: data.msg },
    });
    dispatch({ type: "SUCCESS_FETCH_MYFRIPS" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_FETCH_ITEM });
    const response = await axiosInstance.get(`/api/items/${id}`);
    dispatch({ type: FETCH_ITEM, payload: response.data });
    dispatch({ type: SUCCESS_FETCH_ITEM });
  } catch (error) {}
};

export const editItem = (id, formValues) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ITEM" });

    const response = await axiosInstance.get(`/api/edit/${id}`);

    for (let index = 0; index < response.data.image.length; index++) {
      const blob = await (
        await fetch(
          `${API_ENDPOINT}/images/${id}/${response.data.image[index].image}`
        )
      ).blob();
      response.data.image[index] = new File(
        [blob],
        `${response.data.image[index].image}`,
        { type: blob.type }
      );
    }

    for (let index = 0; index < response.data.item_fees.length; index++) {
      response.data.item_fees[index] = response.data.item_fees[index].id_Fees;
    }

    const newArray = Array.from(response.data.image).map((file) =>
      URL.createObjectURL(file)
    );

    response.data.item_brand = response.data.item_brand[0].brand.Name;
    response.data.item_category = response.data.item_category[0].id_Category;

    for (let index = 0; index < response.data.item_color.length; index++) {
      response.data.item_color[index] = response.data.item_color[index].color;
    }

    const initialValues = {
      Titre: response.data.Name,
      Description: response.data.Description,
      image: newArray,
      Catalogue: response.data.item_category,
      Brand: response.data.item_brand,
      Size: response.data.Size,
      Color: response.data.item_color,
      Price: response.data.Price,
      State: response.data.itemcondition,
      Delivery: response.data.item_fees,
    };

    dispatch({
      type: EDIT_ITEM,
      payload: { initialValues, imageBlob: response.data.image },
    });
    dispatch({ type: SUCCESS_FETCH_ITEM });
  } catch (error) {
    console.log(error);
  }
};

export const editItemSend =
  (formValues, images, history, id, setIsLoading,setAdded,mobile) => async (dispatch) => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      for (const key in formValues) {
        if (key === "image") {
          for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
          }
        }
        if (key === "Color" && key !== "image") {
          formValues.Color.forEach((element) => {
            formData.append("Color", element.id);
          });
        } else {
          formData.append(key, formValues[key]);
        }
      }

      formData.append("id_Item", id);

      const response = await axiosInstance.post("/api/edit", formData);

      setIsLoading(false);
      setAdded(true)
      if(!mobile){
        history("/members/myFrips/myItems");
      }
    } catch (error) {
      dispatch({ type: ERROR_ITEM, payload: true });
      console.log(error);
    }
  };

////ITEM/////*

////MESSAGE/////

export const getItemForPropse = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.post("/api/items/ItemForPorpose", {
      id: id,
    });

    dispatch({ type: GET_ITEM_PROPOSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getItemForPropseFromId = () => async (dispatch, getState) => {
  const item = getState().items.UniqueItem;

  try {
    dispatch({ type: GET_ITEM_PROPOSE_FROMID, payload: item });
  } catch (error) {}
};

export const handleClickPropose = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DISPATCH_HANDLECLICK });
    dispatch({ type: HANDLE_CLICK_FORPROPOSE });
  } catch (error) {}
};

export const handleClickAwayPropose = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DISPATCH_HANDLECLICK });

    dispatch({ type: HANDLEAWAY_CLICK_FORPROPOSE });
  } catch (error) {}
};

export const sendMessage =
  (Text, chat_id, id_Receiver, id_Sender, item, Price, data, socket) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let messageAdded;

    try {
      if (Text !== "") {
        messageAdded = {
          Text,
          chat_id,
          id_Receiver,
          id_Sender,
          Date_Hour: new Date().toISOString(),
          item: null,
        };
        await axiosInstance.post(
          "/api/conversation/myConversation/newMessage",
          {
            Text,
            chat_id,
            id_Receiver: id_Receiver,
            id_Item: null,
            Price: null,
          },
          config
        );
        dispatch(addMessage(messageAdded));
      } else {
        messageAdded = {
          Text,
          chat_id,
          id_Receiver,
          id_Sender,
          Date_Hour: new Date().toISOString(),
          item: {
            Price: item.Price,
            id: item.id,
            pricepropose: [
              { Price, SendDate: new Date(), Approve: null, dateApprove: null },
            ],
            image: [{ image: item.image[0].image }],
          },
        };
        await axiosInstance.post(
          "/api/conversation/myConversation/newMessage",
          {
            Text,
            chat_id,
            id_Receiver: id_Receiver,
            id_Item: item.id,
            Price: parseFloat(Price),
          },
          config
        );
        dispatch(addMessage(messageAdded));
        socket.emit("new message", data);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_MESSAGE,
        payload:
          "Vous avez déjà envoyé une offre, veuillez patientez 24 heures",
      });
    }
  };

export const newConv = (id, item, history) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosInstance.post(
      "/api/conversation",
      { id: id },
      config
    );
    dispatch({ type: GENERATE_CONV, payload: response.data });

    if (response) {
      dispatch(getItemForPropseFromId());
      history(`/member/message/${response.data.id}`, { state: item });
    }
  } catch (error) {}
};

export const getUnReadNotification = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/conversation/unReadNotification`
    );
    dispatch({ type: "UNREAD_NOTIFICATION", payload: data.conversation });
    dispatch({
      type: GET_NOTIFICATION,
      payload: {
        resultsSell: data.resultsSell,
        resultsPurchase: [],
        resultsProposition: [],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeNotificationMyFrips =
  (obj, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: REMOVE_NOTIFICATION_MYFRIPS, payload: { obj, id } });
    } catch (error) {
      console.log(error);
    }
  };

export const handleNotificaiton =
  (notification) => async (dispatch, getState) => {
    const notif = getState().notification.unReadNotification;
    const conversations = getState().messageReducer.conversations;

    const { id_Chat } = notification;
    try {
      if (!_.find(notif, { id: id_Chat })) {
        dispatch({ type: "NEW_NOTIFICATION", payload: { id: id_Chat } });
      }

      const updateConv = _.find(conversations, { id: id_Chat });

      updateConv.message[0] = notification;

      const sortedArray = _.orderBy(
        conversations,
        (obj) => _.get(obj, "message[0].Date_Houre"),
        "desc"
      );
      dispatch({ type: UPDATE_MESSAGE, payload: sortedArray });
    } catch (error) {
      console.log(error);
    }
  };

export const readMessage = (id_Chat) => async (dispatch, getState) => {
  try {
    await axiosInstance.put(`/api/conversation/updateMessage`, { id_Chat });
    dispatch({ type: "READ_CONVERSATION", payload: { id: id_Chat } });

    dispatch({ type: "CLEAR_NOTIFICATION", payload: id_Chat });
  } catch (error) {
    console.log(error);
  }
};

export const sendPropose = (Price, idItem) => async (dispatch, getState) => {
  try {
    await axiosInstance.post(`/api/items/proposition`, { Price, idItem });
  } catch (error) {
    console.log(error);
  }
};

export const getConv = (id) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_LOADING });
    const response = await axiosInstance.get(
      `/api/conversation/myConversation/${id}`
    );
    dispatch({ type: GET_CONV, payload: response.data });
    dispatch({ type: "MESSAGE_FETCH_SUCCESS" });
  } catch (error) {
    dispatch({ type: MSG_ERROR });
  }
};

export const getAllConv = () => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_LOADING });

    const { data } = await axiosInstance.get(
      `/api/conversation/myConversation`
    );

    dispatch({ type: GET_ALL_CONV, payload: data });
    dispatch({ type: "MESSAGE_FETCH_SUCCESS" });
  } catch (error) {}
};

export const receivedNewMessage = (value) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MESSAGE, payload: value });
  } catch (error) {
    console.log(error);
  }
};

export const addMessage =
  (text, options = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_MORE_MESSAGE, payload: text });
    } catch (error) {
      dispatch({ type: MSG_ERROR });
    }
  };

export const moreMessageLoading = () => async (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: GET_MORE_MESSAGE_LOADING });
  }, 1000);
};

export const getMoreMessage = (id, number) => async (dispatch, getState) => {
  moreMessageLoading();
  try {
    const { data } = await axiosInstance.post(
      `/api/conversation/myConversation/${id}`,
      { number: number }
    );

    if (data.length === 0) {
      dispatch({ type: NO_MORE });
    } else {
      dispatch({ type: GET_MORE_MESSAGE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR });
  }
};

export const deleteItem = (id_Item) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.delete(
      `/api/items/deleteItem/${id_Item}`,
      config
    );
    dispatch({ type: REMOVE_ITEM, payload: id_Item });
  } catch (error) {
    console.log(error);
  }
};

/////////*********FAVORITE ************//////////

const updateItemsList = (key, getState) => {
  switch (key) {
    case 0:
      return getState().items.items;
    case 1:
      return getState().favoriteReducers.favoritItem;
    case 2:
      return getState().items.UniqueItem.userItem;
    case 3:
      return getState().items.UniqueItem.findedSimilarProduct;
    case 4:
      return getState().items.newItem;
    case 5:
      return getState().filterCatalogue.items;
    case 6:
      return getState().members.items;
    case 7:
      return getState().items.topBusiness.item;

    default:
      return getState().items.items;
  }
};
export const addFavorite =
  (id, fromFavorite, isFromItem) => async (dispatch, getState) => {
    const addId = { id };

    try {
      if (!isFromItem) {
        const items = updateItemsList(fromFavorite, getState);

        for (const [index, val] of items.entries()) {
          if (val.id === id) {
            val._count.favorit = val._count.favorit + 1;
            break;
          }
        }
        dispatch({ type: ADD_FAVORITE, payload: { id_Item: id } });
      }

      await axiosInstance.post(
        `/api/items/favorit`,
        JSON.stringify(addId),
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

export const removeFavorite =
  (id, fromFavorite) => async (dispatch, getState) => {
    const items = updateItemsList(fromFavorite, getState);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const addId = { id };

    try {
      for (const [index, val] of items.entries()) {
        if (val.id === id && val._count.favorit > 0) {
          val._count.favorit = val._count.favorit - 1;
          break;
        }
      }
      dispatch({ type: REMOVE_FAVORITE, payload: { id_Item: id } });
      await axiosInstance.delete(`/api/items/favorit`, { data: addId }, config);
    } catch (error) {
      console.log(error);
    }
  };

export const fetchMyFavorite = (pagination) => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_FAVORITE" });
    const { data } = await axiosInstance.post(`/api/items/favorit/all`, {
      pagination,
    });
    dispatch({ type: FETCH_MYFAVORITE, payload: data.items });
    dispatch({ type: NUMBER_COUNT, payload: data.count });
    dispatch(idFavorite());
    dispatch({ type: "FETCH_FAVORITE_SUCCESS" });
  } catch (error) {}
};

export const idFavorite = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get("/api/items/Id_of_MyFavorite");
    dispatch({ type: FETCH_MYFAVORITEIDs, payload: data });
  } catch (error) {}
};

///FILTER ITEM ///

export const filterCatalogue = (number) => async (dispatch) => {
  //const response = await axiosInstance.get(`/api/items/Id_of_MyFavorite`)

  try {
    dispatch({ type: FETCH_FILTER });
    const { data } = await axiosInstance.get(
      "/api/items/filterCataloguePagination"
    );
    dispatch({ type: FETCH_ITEM_TYPE, payload: data });
  } catch (error) {}
};

export const addToFilter = (value, label) => async (dispatch, getState) => {
  let data = { label, value };

  try {
    if (_.includes(getState().filterCatalogue.AllFilter[label], value)) return;
    else {
      dispatch({ type: FETCH_FILTER });
      dispatch({ type: ADD_FILTER, payload: data });
    }
  } catch (error) {}
};

export const removeToFilter = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_FILTER });

    dispatch({ type: REMOVE_FILTER, payload: value });
  } catch (error) {
    console.log(error);
  }
};

export const paginationForFilter = () => async (dispatch, getState) => {
  const number = getState().filterCatalogue.pagination;
  const AllFilter = getState().filterCatalogue.AllFilter;

  let newItemsDisplay;
  let numberCount;
  let { Catalogue, Couleur, Marque, Price, Etat, sortedBy, Search, Taille } =
    AllFilter;
  let newCatalogue = [];
  let newCouleur = [];
  let newMarque = [];
  let newEtat = [];
  let itemsId = [];
  let newTaille = [];

  if (
    AllFilter.Catalogue.length !== 0 ||
    AllFilter.Couleur.length !== 0 ||
    AllFilter.Marque.length !== 0 ||
    AllFilter.Etat.length !== 0 ||
    AllFilter.Taille.length !== 0
  ) {
    Catalogue.forEach((element) => {
      newCatalogue.push(element?.id);
    });
    Couleur.forEach((element) => {
      newCouleur.push(element.id);
    });
    Marque.forEach((element) => {
      newMarque.push(element.id);
    });
    Etat.forEach((element) => {
      newEtat.push(element.id);
    });
    Taille.forEach((element) => {
      newTaille.push(element.id);
    });
  }

  try {
    dispatch({ type: FETCH_FILTER });
    const { data } = await axiosInstance.post("/api/items/pagination", {
      number,
      newCatalogue,
      newCouleur,
      newMarque,
      newEtat,
      Price,
      itemsId,
      Search,
      newTaille,
      sortedBy,
    });
    newItemsDisplay = [...data.items];
    numberCount = data.count;

    dispatch({
      type: FETCH_NEW_ITEM_TYPE,
      payload: { items: newItemsDisplay, count: numberCount },
    });
    dispatch({ type: FETCH_ITEM_FILTER_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

const WOMAN_ID = { Name: "Femme", id: 1 };
const MAN_ID = { Name: "Homme", id: 104 };

export const addFilterFromSearch =
  (string, findElement, history) => async (dispatch, getState) => {
    const array = getState().itemInfo.Search;

    if (string === "Femme") {
      dispatch(addToFilter(WOMAN_ID, "Catalogue"));
      history(`/filter`);
    } else if (string === "Homme") {
      dispatch(addToFilter(MAN_ID, "Catalogue"));
      history(`/filter`);
    } else if (string.includes("Homme") || string.includes("Femme")) {
      const pattern = `^(${array[0]
        .map((brand) => brand.Name)
        .join("|")})\\s(.*)$`;

      if (string.includes("Homme")) {
        const myString = string.substring(0, string.indexOf("Homme"));
        let splitArray = myString.match(new RegExp(pattern, "i"));

        if (!Boolean(splitArray)) {
          for (let index = 0; index < array[1].length; index++) {
            const item = array[1][index];
            if (item.id >= 104 && item.Name === myString.trim()) {
              dispatch(
                addToFilter({ Name: myString.trim(), id: item.id }, "Catalogue")
              );
              history(`/filter`);

              break;
            }
          }
        } else {
          splitArray = [splitArray[1], splitArray[2]];

          if (Boolean(splitArray[2])) {
            for (let index = 0; index < array[1].length; index++) {
              const item = array[1][index];
              if (item.id >= 104 && item.Name === splitArray[1].trim()) {
                dispatch(
                  addToFilter(
                    { Name: splitArray[1].trim(), id: item.id },
                    "Catalogue"
                  )
                );

                break;
              }
            }
            for (let index = 0; index < array[0].length; index++) {
              const item = array[0][index];
              if (item.Name === splitArray[0].trim()) {
                dispatch(
                  addToFilter(
                    { Name: splitArray[0].trim(), id: item.id },
                    "Marque"
                  )
                );

                break;
              }
            }

            history(`/filter`);
          } else {
            dispatch(addToFilter({ Name: "Homme", id: 104 }, "Catalogue"));

            for (let index = 0; index < array[0].length; index++) {
              const item = array[0][index];
              if (item.Name === splitArray[0].trim()) {
                dispatch(
                  addToFilter(
                    { Name: splitArray[0].trim(), id: item.id },
                    "Marque"
                  )
                );

                break;
              }
            }
          }
          history(`/filter`);

        }
      } else {
        const myString = string.substring(0, string.indexOf("Femme"));

        let splitArray = myString.match(new RegExp(pattern, "i"));

        if (!Boolean(splitArray)) {
          for (let index = 0; index < array[1].length; index++) {
            const item = array[1][index];

            if (item.id < 104 && item.Name === myString.trim()) {
              dispatch(
                addToFilter({ Name: myString.trim(), id: item.id }, "Catalogue")
              );


              break;
            }
          }
          history(`/filter`);

        } else {
          splitArray = [splitArray[1], splitArray[2]];

          if(Boolean(splitArray[1])){
            for (let index = 0; index < array[1].length; index++) {
              const item = array[1][index];
              if (item.id < 104 && item.Name === splitArray[1].trim()) {
                dispatch(
                  addToFilter(
                    { Name: splitArray[1].trim(), id: item.id },
                    "Catalogue"
                  )
                );
  
                break;
              }
            }
            for (let index = 0; index < array[0].length; index++) {
              const item = array[0][index];
              if (item.Name === splitArray[0].trim()) {
                dispatch(
                  addToFilter(
                    { Name: splitArray[0].trim(), id: item.id },
                    "Marque"
                  )
                );
  
                break;
              }
            }
  
            history(`/filter`);
          }
          else{
            dispatch(addToFilter({ Name: "Femme", id: WOMAN_ID.id }, "Catalogue"));

            for (let index = 0; index < array[0].length; index++) {
              const item = array[0][index];
              if (item.Name === splitArray[0].trim()) {
                dispatch(
                  addToFilter(
                    { Name: splitArray[0].trim(), id: item.id },
                    "Marque"
                  )
                );
  
                break;
              }
            }
          }
          history(`/filter`);

        }
      }
    } else {
      try {
        if (string.includes("rechercher")) {
          let count = 0;
          string
            .replace("rechercher ", "")
            .replace(/"/g, "")
            .split(/\b(?:a|the|was|\s)+\b/i)
            .map((strArray) => {
              dispatch(
                addToFilter(
                  { Name: strArray.replace(/\s*$/, ""), id: 1304 + count },
                  "Search"
                )
              );
              count += 1;
            });
        } else {
          const pattern = `^(${array[0]
            .map((brand) => brand.Name)
            .join("|")})\\s(.*)$`;

          let splitArray = string.match(new RegExp(pattern, "i"));

          console.log(splitArray);

          if (Boolean(splitArray)) {
            splitArray = [splitArray[1], splitArray[2]];

            splitArray.forEach((element) => {
              if (_.some(array[1], { Name: element.trim() })) {
                dispatch(
                  addToFilter(
                    _.find(array[1], { Name: element.trim() }),
                    "Catalogue"
                  )
                );
              }
              if (_.some(array[0], { Name: element })) {
                dispatch(
                  addToFilter(_.find(array[0], { Name: element }), "Marque")
                );
              }
            });
          } else {
            if (_.some(array[1], { Name: string.trim() })) {
              dispatch(
                addToFilter(
                  _.find(array[1], { Name: string.trim() }),
                  "Catalogue"
                )
              );
            }
            if (_.some(array[0], { Name: string })) {
              dispatch(
                addToFilter(_.find(array[0], { Name: string }), "Marque")
              );
            }
          }
        }

        history(`/filter`);
      } catch (error) {
        console.log(error);
      }
    }
  };

export const changePagination = (number) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHANGE_PAGINATION, payload: number });
  } catch (error) {}
};

export const succeedPayment =
  (idItem, StripeIdentifier, id_Account, navigate, id_Fees) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post("/api/paymentIntent/succeed", {
        idItem,
        StripeIdentifier,
        id_Account,
        id_Fees,
      });
      dispatch({ type: "PAYMENT_SUCCESS" });
    } catch (error) {}
  };

export const getItemCreationInfo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_INFO_ITEM });
    const { data } = await axiosInstance.get("/api/infoItem/info");

    dispatch({ type: INFO_ITEM, payload: data });
    dispatch({ type: "FETCH_INFO_ITEM_SUCCESS" });
  } catch (error) {}
};

export const getInfoSearch = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_INFO_ITEM });
    const { data } = await axiosInstance.get("/api/infoItem/search");
    dispatch({ type: SEARCH, payload: data });
    dispatch({ type: "FETCH_INFO_ITEM_SUCCESS" });
  } catch (error) {
    console.log(error);
  }
};

export const displayError = (error) => async (dispatch, getState) => {
  try {
    dispatch({ type: ERROR, payload: error });
  } catch (error) {}
};

export const handleClickSecondPage = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: HANDLE_SECOND_PAGE, payload: item });
  } catch (error) {}
};

export const handleClickAwaySecondPage =
  (error) => async (dispatch, getState) => {
    try {
      dispatch({ type: HANDLE_AWAYSECOND_PAGE });
    } catch (error) {}
  };

export const addMessageImage = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_MESSAGE_IMAGE, payload: item });
    dispatch(handleClickAwayPropose());
  } catch (error) {}
};

export const fetchPaymentInfo =
  (idItem, isFromProposition) => async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_PAYMENT });
      const { data } = await axiosInstance.post(
        "/api/paymentIntent/info",
        { idItem, isFromProposition },
        config
      );
      dispatch({ type: PAYMENT_INFO, payload: data });
      dispatch({ type: PAYMENT_INFO_SUCCESS_FETCH });
    } catch (error) {
      dispatch({ type: ERROR_PAYMENT_PAGE, payload: error.response.data });
    }
  };

export const checkIfDisponible = (idItem) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_PAYMENT });

    const { data } = await axiosInstance.post(
      "/api/paymentIntent/isReserved",
      { idItem },
      config
    );
    dispatch({ type: ISRESERVED, payload: data });
    dispatch({ type: PAYMENT_INFO_SUCCESS_FETCH });
  } catch (error) {
    dispatch({ type: ERROR_PAYMENT_PAGE, payload: error.response.data });
  }
};

export const cleanUpPayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESET_PAYMENT });

    await axiosInstance.post("/api/paymentIntent/reserved", {
      idItem: id,
      isRerseved: true,
    });
  } catch (error) {
    dispatch({ type: ERROR_PAYMENT_PAGE, payload: error.response.data });
  }
};

export const fetchPaymentIntent =
  (idItem, id_Fees, isFromProposition) => async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_PAYMENT });
      const { data } = await axiosInstance.post(
        "/api/paymentIntent/createCheckoutPayment",
        { idItem, id_Fees, isFromProposition },
        config
      );
      dispatch({ type: PAYMENT_INTENT, payload: data });
      dispatch({ type: PAYMENT_INFO_SUCCESS_FETCH });
    } catch (error) {
      dispatch({ type: PAYMENT_FAILED });
    }
  };

export const addFilterFrips = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADD_FILTER_MYFRIPS", payload: id });
  } catch (error) {}
};

export const changeMyFripsPagination = (number) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PAGINATION_MYFRIPS, payload: number });
  } catch (error) {}
};

export const sendSuccessFullPayment = (id) => async (dispatch, getSate) => {
  try {
  } catch (error) {}
};

export const requestPayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_PAYMENT });
    const { data } = await axiosInstance.post(
      "/api/paymentIntent/info",
      { id },
      config
    );
  } catch (error) {
    dispatch({ type: PAYMENT_FAILED });
  }
};

export const updateAddress = (address) => async (dispatch, getState) => {
  try {
    const { Rue, Numero, Localite, NPA, Prenom, Nom } = address;

    const newAddress = { Street: Rue, NumStreet: Numero, City: Localite, NPA };

    await axiosInstance.post("/api/members/updateAddress", address, config);

    dispatch({
      type: CHANGE_ADDRESS,
      payload: { newAddress, Firstname: Prenom, Lastname: Nom },
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeIban =
  (IBAN, from, history) => async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/members/IBAN",
        { IBAN },
        config
      );

      dispatch({ type: CHANGE_IBAN, payload: data });
      if (history) {
        history("/settings/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getNotificationsMyFrips = () => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/members/myFripsNotifications",
      config
    );

    dispatch({ type: GET_NOTIFICATION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const changeStep =
  (id, type, id_transaction, url) => async (dispatch, getState) => {
    try {
      await axiosInstance.post(
        `/api/members/${url}`,
        { id_transaction },
        config
      );
      dispatch({ type: type, payload: id });
      if (type === DELIVERY) {
        dispatch(removeNotificationMyFrips("sellNotification", id_transaction));
      }
      if (type === RECEIVED) {
        dispatch(
          removeNotificationMyFrips("purchaseNotification", id_transaction)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export const sendDateProposition =
  (id_Item, dateApprove, approved, id_Account) =>
  async (dispatch, getState) => {
    const message = getState().messageReducer.message;

    const updateConv = _.find(message, { id_Item: id_Item });

    updateConv.item.pricepropose[0].Approve = approved;
    updateConv.item.pricepropose[0].dateApprove = dateApprove;

    try {
      await axiosInstance.post(
        `/api/members/StatusProposition`,
        { id_Item, approved, id_Account },
        config
      );

      dispatch({ type: SEND_DATE, payload: message });
    } catch (error) {
      console.log(error);
    }
  };

export const sendStatusProposition =
  (id, dateApprove, approved, id_Account, fromReceivedProposition) =>
  async (dispatch, getState) => {
    let items;

    try {
      if (!fromReceivedProposition) {
        items = getState().myFrips.items;

        const updateItems = _.find(items, { id });
        updateItems.pricepropose[0].Approve = approved;
        updateItems.pricepropose[0].dateApprove = dateApprove;
        dispatch({ type: STATUS_PROPOSITION, payload: items });
      } else {
        items = getState().myFrips.propostionReceived;

        items.Approve = approved;
        items.dateApprove = dateApprove;
        const updateItem = { ...items };
        dispatch({ type: STATUS_PROPOSITION_ID, payload: updateItem });
      }
      await axiosInstance.post(
        `/api/members/StatusProposition`,
        { id_Item: id, approved, id_Account },
        config
      );

      dispatch(removeNotificationMyFrips("propositionNotification", id));
    } catch (error) {
      console.log(error);
    }
  };

export const fetchMembersInfo =
  (name, pagination) => async (dispatch, getState) => {
    try {
      dispatch({ type: MEMBERS_LOADING });
      const { data } = await axiosInstance.post(
        `/api/members/user/${name}`,
        { number: pagination },
        config
      );
      dispatch({ type: MEMBERS_ITEMS, payload: data });
      dispatch({ type: MEMBERS_FETCH_SUCCESS });
    } catch (error) {
      console.log(error);
    }
  };

export const setReview =
  (note, id_transaction, isFromPurchase) => async (dispatch, getState) => {
    let items;

    if (!isFromPurchase) {
      items = getState().myFrips.sell;
    } else {
      items = getState().myFrips.purchase;
    }

    try {
      await axiosInstance.post(
        `/api/members/Rewiew`,
        { note, id_transaction },
        config
      );
      const findTransaction = _.find(items, { id_transaction });

      findTransaction.review = [{ Note: note }];

      dispatch({ type: REVIEW, payload: { isFromPurchase, items } });
    } catch (error) {
      console.log(error);
    }
  };

export const fetchMySellId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "LOADING_MYFRIPS" });

    const { data } = await axiosInstance.get(
      `/api/members/mySell/${id}`,
      config
    );
    dispatch({ type: FETCH_MYSELLBYID, payload: data });
    dispatch({ type: "SUCCESS_FETCH_MYFRIPS" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyPropositionId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_MYFRIPS });
    const { data } = await axiosInstance.get(
      `/api/members/MyProposition/${id}`,
      config
    );
    dispatch({ type: FETCH_MYPROPOSITIONID, payload: data });
    dispatch({ type: SUCCESS_FETCH_MYFRIPS });
  } catch (error) {
    dispatch({ type: MYFRIPS_ERROR, payload: error.response.data });

    dispatch({ type: MYFRIPS_ERROR_FETCH });
  }
};

export const fetchMyPropositionReceivedId =
  (id_Item, id_Sender) => async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_MYFRIPS });

      const { data } = await axiosInstance.get(
        `/api/members/ReceivedProposition/${id_Item}/${id_Sender}`,
        config
      );

      dispatch({ type: FETCH_MYPROPOSITION_RECEIVED_ID, payload: data });
      dispatch({ type: SUCCESS_FETCH_MYFRIPS });
    } catch (error) {
      dispatch({ type: MYFRIPS_ERROR, payload: error.response.data });

      dispatch({ type: MYFRIPS_ERROR_FETCH });
    }
  };

export const fetchMyPurchaseId = (id_Item) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_MYFRIPS });

    const { data } = await axiosInstance.get(
      `/api/members/MyPurchase/${id_Item}`,
      config
    );
    dispatch({ type: FETCH_MYPURCHASEID, payload: data });

    dispatch({ type: SUCCESS_FETCH_MYFRIPS });
  } catch (error) {
    dispatch({ type: MYFRIPS_ERROR, payload: error.response.data });

    dispatch({ type: MYFRIPS_ERROR_FETCH });
  }
};

export const fetchForPayment =
  (note, id_transaction) => async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/members/Rewiew`,
        { note, id_transaction },
        config
      );
      dispatch({ type: REVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const fetchSubscriber =
  (note, id_transaction) => async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/members/Rewiew`,
        { note, id_transaction },
        config
      );
      dispatch({ type: REVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const fetchProblemUser =
  (note, id_transaction) => async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/members/Rewiew`,
        { note, id_transaction },
        config
      );
      dispatch({ type: REVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
