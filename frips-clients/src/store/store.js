import reduxThunk from "redux-thunk";

import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,
    composeEnhancers(applyMiddleware(reduxThunk)))



export default store;