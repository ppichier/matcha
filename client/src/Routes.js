import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MatchMe from "./components/match/MatchMe";
import Popularity from "./components/popularity/Popularity";
import Profile from "./components/profile/Profile";
import ProfileUser from "./components/profile/ProfileUser";
import VerifyAccount from "./components/login/VerifyAccount";
import RecoverPassword from "./components/login/RecoverPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./components/404/NotFound";
import CustomRoute from "./components/auth/CustomRoute";
// import ProfileMap from "./components/profile/ProfileMap";
import Chat from "./components/chat/Chat";
import AdminRoute from "./components/auth/AdminRoute";
import Admin from "./components/admin/Admin";
import { API } from "./config";
import SocketContext from "./socket/socket-context";
import io from "socket.io-client";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Dashboard from "./components/admin/Dashboard";

const socket = io("http://localhost:8000");

const Routes = () => {
  if (API === undefined) {
    console.error("API address is not set");
    return <Fragment></Fragment>;
  }

  let jwt = JSON.parse(localStorage.getItem("jwt"));
  if (jwt && jwt.token) {
    socket.emit("register", jwt.token, (data) => {
      // console.log(data);
    });
  }

  return (
    <SocketContext.Provider socket={socket}>
      <ReactNotification />
      <BrowserRouter>
        <Switch>
          <CustomRoute path="/" exact></CustomRoute>
          <Route path="/login" exact component={Login}></Route>;
          {/* <Route path="/map" exact component={ProfileMap}></Route>; */}
          <PrivateRoute
            path="/profile/me"
            exact
            component={ProfileUser}
            socket={socket}
          ></PrivateRoute>
          <PrivateRoute
            path="/profile/:id"
            exact
            component={Profile}
            socket={socket}
          ></PrivateRoute>
          <PrivateRoute
            path="/match"
            exact
            component={MatchMe}
            socket={socket}
          ></PrivateRoute>
          <PrivateRoute
            path="/popularity"
            exact
            component={Popularity}
            socket={socket}
          ></PrivateRoute>
          <PrivateRoute
            path="/chat"
            exact
            component={Chat}
            socket={socket}
          ></PrivateRoute>
          <Route path="/verifyAccount" exact component={VerifyAccount}></Route>
          <Route path="/admin" exact component={Admin}></Route>
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={Dashboard}
          ></AdminRoute>
          <Route
            path="/recoverPassword"
            exact
            component={RecoverPassword}
          ></Route>
          <Route path="" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};

export default Routes;
