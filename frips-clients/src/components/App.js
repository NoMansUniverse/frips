import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import PrivateRoute from "../routes/PrivateRoute";
import Footer from "./Footer/Footer";
import Header from "./Header";
import ItemList from "./Items/ItemLists";
import ItemPreview from "./Items/itemPreview/ItemPreview";
import LoginPage from "./Login/LoginPage";
import Theme from "./NavBar/createUITheme";
import UserProfile from "./Profil/Profil";

import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import _ from "lodash";
import { Provider } from "react-redux";
import {
  getAllConv,
  getItemCreationInfo,
  handleNotificaiton,
  idFavorite,
  loadUser,
  setSocket,
} from "../actions";
import { NOTIFICATION } from "../actions/type";
import Dashboard from "../admin/Dashboard";
import API_ENDPOINT from "../api/url";
import CheckUrl from "../routes/CheckUrl";
import store from "../store/store";
import setAuthToken from "../utils/setAuthToken";
import "./App.css";
import CheckOutComponent from "./Checkout/CheckOutComponent";
import StatusPaymentComponent from "./Checkout/StatusPaymentComponent";
import AccountInfo from "./Footer/Help/AccountInfo";
import Aide from "./Footer/Help/Aide";
import BuyInfo from "./Footer/Help/BuyInfo";
import ConditionGeneral from "./Footer/Help/ConditionGeneral";
import PaymentInfo from "./Footer/Help/PaymentInfo";
import SellInfo from "./Footer/Help/SellInfo";
import DisplayCatalogue from "./Items/CatalogueDisplay/DisplayCatalogue";
import ItemCreate from "./Items/ItemCreate";
import ItemEdit from "./Items/ItemEdit";
import Register from "./Login/UserRegister";
import Conversation from "./Message/Conversation";
import NewMessage from "./Message/newMessage";
import PageNotFound from "./NavBar/PageNotFound";
import MyFavorite from "./Profil/MyFavorite";
import MemberProfile from "./Profil/MyFrips/Members/MemberProfile";
import MyFrips from "./Profil/MyFrips/MyFrips";
import MyPropositionById from "./Profil/MyFrips/MyProposition/MyPropositionById";
import PropositionReceived from "./Profil/MyFrips/MyProposition/PropositionReceived";
import MyPurchaseById from "./Profil/MyFrips/MyPurchase/MyPurchaseById";
import MySellById from "./Profil/MyFrips/MySell/MySellById";
import NotificationComponent from "./Profil/NotificationComponent";
import RegisterSeller from "./Profil/RegisterSeller";
import EmailResetPassword from "./Profil/Reset/EmailResetPassword";
import ResetPasswordPage from "./Profil/Reset/ResetPasswordPage";
import Div100vh from "react-div-100vh";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const socket = io(API_ENDPOINT, { reconnection: true, autoConnect: true });

const App = () => {
  const [notification, setNotification] = useState(null);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  useEffect(() => {

    socket.on("connect", () => {
      store.dispatch(setSocket(socket));
      store.dispatch(loadUser(socket));
      store.dispatch(getAllConv());
      store.dispatch(idFavorite());
      store.dispatch(getItemCreationInfo());
    });
    socket.on("message notification", (data) => {
      if (!mobile) {
        if (
          !_.some(store.getState().notification.notificationUser, {
            id_Sender: data.id_Sender,
          })
        ) {
          setNotification(data);
          store.dispatch({ type: NOTIFICATION, payload: data });
        }
        store.dispatch(handleNotificaiton(data));
      }
    });

    return () => {
      socket.on("disconnect");
    };
  }, [
    store.getState().notification.unReadNotification,
    store.getState().auth,
    store.getState().socket,
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Div100vh
          style={{ backgroundColor: "#F5f5f3" ,display:"flex",flexDirection:"column"}}
        >
          <Router>
            <Header />
            <NotificationComponent
              mobile={mobile}
              notification={notification}
            />
            <Routes>
              <Route
                path="/signup"
                exact
                element={<Register />}
                key={"signUp"}
              />
              <Route
                path="/login"
                exact
                element={<LoginPage />}
                key={"login"}
              />
              <Route path="/member" key={"member-management"}>
                <Route path="/member/:name" element={<MemberProfile />} />
              </Route>

              <Route path="/items" key={"items-id"}>
                <Route path="/items/:id" element={<ItemPreview />} />
                <Route
                  path="/items/allNewItems"
                  element={<DisplayCatalogue />}
                />
              </Route>

              <Route element={<PrivateRoute />} key={"private-route"}>
                <Route path="/settings/profile" element={<UserProfile />} />
                <Route path="/members/myFrips" element={<MyFrips />} />
                <Route path="/members/myFrips/:url" element={<MyFrips />} />

                <Route
                  path="/members/myFrips/mySell/:id"
                  element={<MySellById />}
                />
                <Route path="/items/new" element={<ItemCreate />} />

                <Route
                  path="/members/myFrips/myProposition/:id"
                  element={<MyPropositionById />}
                />

                <Route
                  path="/members/myFrips/myPurchase/:id"
                  element={<MyPurchaseById />}
                />

                <Route
                  path="/members/myFrips/ReceivedProposition/:id_Item/:id_Sender"
                  element={<PropositionReceived />}
                />

                <Route path="/member/conversation" element={<Conversation />} />
                <Route path="/member/myFavorite" element={<MyFavorite />} />
                <Route path="/member/message/:id" element={<NewMessage />} />
                <Route
                  path="/member/register/Seller"
                  element={<RegisterSeller />}
                />

                <Route path="/items/edit/:id" element={<ItemEdit />} />

                <Route path="/payment/:id" element={<CheckOutComponent />} />
                <Route
                  path="/payment/:id/paymentStatus"
                  element={<StatusPaymentComponent />}
                />
              </Route>

              <Route path="/filter" element={<DisplayCatalogue />} />

              <Route path="/" key={"root-filter"}>
                <Route index element={<ItemList />} />

                <Route element={<CheckUrl />}>
                  <Route path=":upCategory" element={<DisplayCatalogue />}>
                    <Route path=":category" element={<DisplayCatalogue />}>
                      <Route
                        path=":subCategory"
                        element={<DisplayCatalogue />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path="/reset-password" element={<EmailResetPassword />} />

              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />

              <Route
                path="/Condition-general-de-vente-et-politique"
                exact
                element={<ConditionGeneral />}
              />

              <Route path="/admin" element={<Dashboard />} />
              <Route path="/aide" element={<Aide />} />
              <Route path="/aide/paymentInfo" element={<PaymentInfo />} />
              <Route path="/aide/sellInfo" element={<SellInfo />} />
              <Route path="/aide/buyInfo" element={<BuyInfo />} />

              <Route path="/aide/accountInfo" element={<AccountInfo />} />

              <Route path="*" element={<PageNotFound />} />
              <Route path="/PageIntrouvable" element={<PageNotFound />} />
            </Routes>
            {!mobile ? <Footer /> : null}
          </Router>
        </Div100vh>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
