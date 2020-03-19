import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MatchMe from "./components/match/MatchMe";
import Profile from "./components/profile/Profile";
import ProfileUser from "./components/profile/ProfileUser";
import VerifyAccount from "./components/login/VerifyAccount";
import RecoverPassword from "./components/login/RecoverPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./components/404/NotFound";
import CustomRoute from "./components/auth/CustomRoute";
// import ProfileMap from "./components/profile/ProfileMap";
import Chat from "./components/chat/Chat";
import { API } from "./config";

const Routes = () => {
  if (API === undefined) {
    console.error("API adress is not set");
    return <Fragment></Fragment>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" exact></CustomRoute>
        <Route path="/login" exact component={Login}></Route>;
        {/* <Route path="/map" exact component={ProfileMap}></Route>; */}
        <PrivateRoute
          path="/profile/me"
          exact
          component={ProfileUser}
        ></PrivateRoute>
        <PrivateRoute path="/profile" exact component={Profile}></PrivateRoute>;
        <PrivateRoute path="/match" exact component={MatchMe}></PrivateRoute>;
        <PrivateRoute path="/chat" exact component={Chat}></PrivateRoute>;
        <Route path="/verifyAccount" exact component={VerifyAccount}></Route>;
        <Route
          path="/recoverPassword"
          exact
          component={RecoverPassword}
        ></Route>
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
