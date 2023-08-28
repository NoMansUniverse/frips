import { combineReducers } from "redux";
import auth from "./auth";
import creationItem from "./creationItem";
import favoriteReducers from "./favoriteReducers";
import filterCatalogue from "./filterCatalogue";
import itemForPropose from "./itemForPropose";
import itemReducer from "./itemReducer";
import messageReducer from "./messageReducer";
import myFrips from "./myFrips";
import notification from "./notification";
import payment from "./payment";
import members from "./members";
import location from "./location"
import parameter from "./parameter";


export default combineReducers({
  items: itemReducer,
  auth,
  messageReducer,
  favoriteReducers,
  myFrips,
  filterCatalogue,
  itemForPropose,
  itemInfo: creationItem,
  notification,
  payment,
  members,
  location,
  parameter,
});
